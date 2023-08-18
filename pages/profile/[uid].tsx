import { auth, db } from "@/config/firebase";
import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { Tweet, WithAuthUser } from "../../index";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import userPlaceholder from "../../assets/user-placeholder.png";

let currentUserIsProfileOwner;

const Profile = () => {
  // check if incoming id is same as auth user id.

  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser ? currentUser.uid : "";

  const router = useRouter();
  const { uid } = router.query;
  const routeId = uid ? uid.toString() : "";

  const [userInfo, userInfoLoading, userInfoError] = useDocumentData(
    doc(db, "users", routeId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // const [authUserInfo, authUserInfoLoading, authUserInfoError] =
  //   useDocumentData(doc(db, "users", currentUserId), {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   });

  // determine if the profile page is being visited by the current user or another user
  if (currentUserId === uid) {
    currentUserIsProfileOwner = true;
  } else {
    currentUserIsProfileOwner = false;
  }

  // Get all user's tweets with the uid
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, where("userId", "==", uid));
  const [tweetsListSnapshot, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const userTweets = tweetsListSnapshot?.docs;

  return (
    <>
      {userInfo && (
        <div className="pb-[9.615rem]">
          <div className=" ">
            <Image
              src={
                userInfo.headerImageUrl
                  ? userInfo.headerImageUrl
                  : // Default image shown should be a placeholder, actually
                    "https://picsum.photos/id/220/375/168"
              }
              alt="header-photo"
              width={375}
              height={168}
              className="h-[16.8rem] w-[37.5rem]"
            />
          </div>
          <div className="px-[1.90rem] ">
            <div className="relative rounded-[1.2rem] px-[1.6rem] pb-[2.316rem] pt-[4.388rem] text-center shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
              <div className="absolute top-[-8.7rem] left-[50%] translate-x-[-50%] overflow-hidden rounded-[8px] p-[.8rem] ">
                <Image
                  src={
                    userInfo.profilePictureUrl
                      ? userInfo.profilePictureUrl
                      : userPlaceholder
                  }
                  alt="profile-pic"
                  width={116}
                  height={116}
                  className="h-[11.6rem] w-[11.6rem]"
                />
              </div>
              <div className="">
                <div>
                  <h1 className="text-[2.4rem] font-semibold leading-[3.6rem] tracking-[-3.5%] text-[#333333]">
                    {userInfo.userName}
                  </h1>
                  <div className="mt-[.4rem] mb-[1.4rem] flex items-center justify-center gap-8 text-[1.2rem] font-medium leading-[1.8rem] tracking-[-3.5%] text-[#828282] ">
                    <p>
                      <span className="font-semibold text-[#333333]">
                        {userInfo.following.length}
                      </span>{" "}
                      Following
                    </p>
                    <p>
                      <span className="font-semibold text-[#333333]">
                        {userInfo.followers.length}
                      </span>{" "}
                      Followers
                    </p>
                  </div>
                </div>
                <p className="mb-[2.563rem] text-[1.8rem] font-normal leading-[2.4rem] tracking-[-3.5%] text-[#828282]">
                  {userInfo.bio}
                </p>
              </div>

              {/* {currentUserIsProfileOwner ? <UnFollow /> : <Follow />} */}
            </div>

            {/* User's Tweets */}
            <div>
              {userTweets?.length ? (
                userTweets.map((tweet) => (
                  <Tweet
                    key={tweet.id}
                    tweetId={tweet.id}
                    likes={tweet.data().likes}
                    retweets={tweet.data().retweets}
                    media={tweet.data().media}
                    text={tweet.data().text}
                    timestamp={tweet.data().timestamp}
                    userId={tweet.data().userId}
                    bookmarkedBy={tweet.data().bookmarkedBy}
                  />
                ))
              ) : (
                <p>No tweets yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuthUser(Profile);
