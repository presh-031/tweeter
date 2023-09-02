import { auth, db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Follow, UnFollow, WithAuthUser } from "../../index";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileTweets from "@/components/ProfileTweets";
import CoverImage from "@/components/CoverImage";
import ProfilePicture from "@/components/ProfilePicture";
import ProfileInfo from "@/components/ProfileInfo";

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
  } else {
    authUserIsProfileOwner = false;
  }

  return (
    <>
      {profileOwnerInfo && (
        <div className="pb-[9.615rem]">
          {authUserIsProfileOwner ? (
            <CoverImage userId={authUserId} />
          ) : (
            <CoverImage userId={profileOwnerId} />
          )}
          <div className="px-[1.90rem] ">
            <div className="relative rounded-[1.2rem]  px-[1.6rem] pb-[2.316rem] pt-[4.388rem] text-center shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
              <div className="absolute top-[-8.7rem] left-[50%] flex h-[12.4rem] w-[12.4rem] translate-x-[-50%] items-center overflow-hidden rounded-[8px]  p-[.8rem] ">
                {authUserIsProfileOwner ? (
                  <ProfilePicture
                    userId={authUserId}
                    height={116}
                    width={116}
                  />
                ) : (
                  <ProfilePicture
                    userId={profileOwnerId}
                    height={116}
                    width={116}
                  />
                )}
              </div>
              <ProfileInfo
                userName={profileOwnerInfo.userName}
                following={profileOwnerInfo.following}
                followers={profileOwnerInfo.followers}
                bio={profileOwnerInfo.bio}
              />

              {!authUserIsProfileOwner && (
                <>
                  {profileOwnerInfo.followers.includes(authUserId) ? (
                    <UnFollow
                      profileOwnerInfo={profileOwnerInfo}
                      profileOwnerId={profileOwnerId}
                      authUserId={authUserId}
                      authUserInfo={authUserInfo}
                    />
                  ) : (
                    <Follow
                      profileOwnerInfo={profileOwnerInfo}
                      profileOwnerId={profileOwnerId}
                      authUserId={authUserId}
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
