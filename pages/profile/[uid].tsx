import { auth, db, storage } from "@/config/firebase";
import { collection, doc, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Follow, UnFollow, WithAuthUser } from "../../index";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import userPlaceholder from "../../assets/user-placeholder.png";
import ProfileTweets from "@/components/ProfileTweets";
import CoverImage from "@/components/CoverImage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

let authUserIsProfileOwner;

const Profile = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [authUser] = useAuthState(auth);

  const authUserId = authUser ? authUser.uid : "";
  const profileOwnerId = uid ? uid.toString() : "";

  const [profileOwnerInfo, profileOwnerInfoLoading, profileOwnerInfoError] =
    useDocumentData(doc(db, "users", profileOwnerId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // here to prevent rerenders
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // determine if the profile page is being visited by the authuser or profileowner
  if (authUserId === profileOwnerId) {
    authUserIsProfileOwner = true;
    console.log(authUserIsProfileOwner);
  } else {
    authUserIsProfileOwner = false;
    console.log(authUserIsProfileOwner);
  }

  // testing image downloads.
  // use userId to fetch img metadata
  const metaDataRef = collection(db, "cover-images");
  const metaDataQuery = query(metaDataRef, where("userId", "==", authUserId));
  const [metaDataSnapshot, loadingmetaData, metaDataError] = useCollectionData(
    metaDataQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const metaData = metaDataSnapshot;

  // use fullPath in metadata to get imageURL
  const fullPath = metaData && metaData.length ? metaData[0].fullPath : "";

  const [imageURL, setImageURL] = useState("");
  async function getDownloadUrlForFile(fullPath: string) {
    try {
      const imageRef = ref(storage, fullPath ? fullPath : "");
      const downloadURL = await getDownloadURL(imageRef);

      setImageURL(downloadURL);
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  }

  useEffect(() => {
    getDownloadUrlForFile(fullPath);
  }, [fullPath]);

  return (
    <>
      {profileOwnerInfo && (
        <div className="pb-[9.615rem]">
          <CoverImage coverImg={imageURL} />
          <div className="px-[1.90rem] ">
            <div className="relative rounded-[1.2rem] px-[1.6rem] pb-[2.316rem] pt-[4.388rem] text-center shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
              <div className="absolute top-[-8.7rem] left-[50%] translate-x-[-50%] overflow-hidden rounded-[8px] p-[.8rem] ">
                <Image
                  src={
                    profileOwnerInfo.profilePictureUrl
                      ? profileOwnerInfo.profilePictureUrl
                      : userPlaceholder
                  }
                  alt="profile-pic"
                  width={116}
                  height={116}
                  className="h-[11.6rem] w-[11.6rem] rounded-[8px]"
                />
              </div>
              <div className="">
                <div>
                  <h1 className="text-[2.4rem] font-semibold leading-[3.6rem] tracking-[-3.5%] text-[#333333]">
                    {profileOwnerInfo.userName}
                  </h1>
                  <div className="mt-[.4rem] mb-[1.4rem] flex items-center justify-center gap-8 text-[1.2rem] font-medium leading-[1.8rem] tracking-[-3.5%] text-[#828282] ">
                    <p>
                      <span className="font-semibold text-[#333333]">
                        {profileOwnerInfo.following.length}
                      </span>{" "}
                      Following
                    </p>
                    <p>
                      <span className="font-semibold text-[#333333]">
                        {profileOwnerInfo.followers.length}
                      </span>{" "}
                      Followers
                    </p>
                  </div>
                </div>
                <p className="mb-[2.563rem] text-[1.8rem] font-normal leading-[2.4rem] tracking-[-3.5%] text-[#828282]">
                  {profileOwnerInfo.bio}
                </p>
              </div>
              {!authUserIsProfileOwner && (
                <>
                  {profileOwnerInfo.followers.includes(authUserId) ? (
                    <UnFollow
                      userInfo={profileOwnerInfo}
                      routeId={profileOwnerId}
                      currentUserId={authUserId}
                      authUserInfo={authUserInfo}
                    />
                  ) : (
                    <Follow
                      userInfo={profileOwnerInfo}
                      routeId={profileOwnerId}
                      currentUserId={authUserId}
                      authUserInfo={authUserInfo}
                    />
                  )}
                </>
              )}
            </div>
            <ProfileTweets profileOwnerId={profileOwnerId} />
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuthUser(Profile);
