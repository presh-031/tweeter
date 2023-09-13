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
import ProfileTabs from "@/components/ProfileTabs";
import { useEffect, useState } from "react";
import ProfileLikes from "@/components/ProfileLikes";
import ProfileMedia from "@/components/ProfileMedia";

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

  // Logic for the tabs
  const storedValue = localStorage.getItem("activeProfileTab");
  const [activeProfileTab, setActiveProfileTab] = useState(
    storedValue || "tweets"
  );
  useEffect(() => {
    localStorage.setItem("activeProfileTab", activeProfileTab);
  }, [activeProfileTab]);

  const handleTabClick = (tabName: string) => {
    setActiveProfileTab(tabName);
  };

  return (
    <>
      {profileOwnerInfo && (
        <div className="pb-[9.615rem]">
          <div className="w-full">
            {authUserIsProfileOwner ? (
              <CoverImage userId={authUserId} />
            ) : (
              <CoverImage userId={profileOwnerId} />
            )}
          </div>
          <div className=" px-[1.90rem] ">
            <div className="relative bottom-10 mx-auto max-w-[1071px]  rounded-[1.2rem]  bg-white px-[1.6rem] pb-[2.316rem] pt-[4.388rem] text-center  shadow-[0_2px_4px_rgba(0,0,0,0.05)]  lg:flex lg:items-start lg:justify-between lg:p-0 lg:px-[2.4rem] lg:pt-[2.4rem]">
              <div className="absolute top-[-6.2rem] left-[50%] flex h-[12.4rem] w-[12.4rem] translate-x-[-50%] items-center overflow-hidden rounded-[8px]  p-[.8rem] lg:hidden">
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
              <div className="lg:flex">
                <div className="hidden h-[15.2rem] w-[15.2rem] overflow-hidden rounded-[8px] lg:relative lg:bottom-[6.1rem] lg:mr-[2.4rem] lg:block">
                  {authUserIsProfileOwner ? (
                    <ProfilePicture
                      userId={authUserId}
                      height={152}
                      width={152}
                    />
                  ) : (
                    <ProfilePicture
                      userId={profileOwnerId}
                      height={152}
                      width={152}
                    />
                  )}
                </div>
                <ProfileInfo
                  userName={profileOwnerInfo.userName}
                  following={profileOwnerInfo.following}
                  followers={profileOwnerInfo.followers}
                  bio={profileOwnerInfo.bio}
                />
              </div>

              {!authUserIsProfileOwner && (
                <div className="">
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
                </div>
              )}
            </div>

            <div className="mx-auto mt-[2.5rem] max-w-[1071px] lg:flex lg:gap-[2.4rem]">
              <ProfileTabs
                activeProfileTab={activeProfileTab}
                handleTabClick={handleTabClick}
              />
              <div className="w-full">
                {activeProfileTab === "tweets" && (
                  <ProfileTweets profileOwnerId={profileOwnerId} />
                )}
                {activeProfileTab === "media" && (
                  <ProfileMedia profileOwnerId={profileOwnerId} />
                )}
                {activeProfileTab === "likes" && (
                  <ProfileLikes profileOwnerId={profileOwnerId} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuthUser(Profile);
