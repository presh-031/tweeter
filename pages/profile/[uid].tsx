import { auth, db } from "@/config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

import Tweet from "@/components/Tweet";
import withAuthUser from "@/components/WithAuthUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export type userInfo = {
  bio: string;
  createdAt: string;
  displayName: string;
  email: string;
  followers: string[];
  following: string[];
  headerImageUrl: string;
  profilePictureUrl: string;
  userName: string;
};

let currentUserIsProfileOwner;

const profile = () => {
  // check if incoming id is same as auth user id.

  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const router = useRouter();
  const { uid } = router.query;

  const [userInfo, userInfoLoading, userInfoError] = useDocumentData(
    doc(db, "users", uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", currentUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // Compare the two user IDs to determine if the profile page is being visited by the current user or another user
  if (currentUserId === uid) {
    // The profile page is being visited by the current user
    currentUserIsProfileOwner = true;
  } else {
    // The profile page is being visited by another user
    currentUserIsProfileOwner = false;
  }

  // Get all user's tweets with the uid
  // Still querying for all tweet then filtering with uid and storing in userTweets state, should use a more specific query.

  const tweetsRef = collection(db, "tweets");

  const [tweetsListSnapshot, loading, error] = useCollection(tweetsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const allTweetsCol = tweetsListSnapshot?.docs;

  const allTweets = [];
  allTweetsCol?.forEach((tweet) => {
    allTweets.push(tweet.data());
  });
  const userTweets = allTweets.filter((tweet) => tweet.userId === uid);

  // Logic to handleFollowBtnClick
  // follow
  const handleFollowBtnClick = async () => {
    console.log("btn clicked");
    // Update followers of followed user, and following of currentUser
    const followedUserDocRef = doc(db, "users", uid);
    const followingUserDocRef = doc(db, "users", currentUserId);

    try {
      await updateDoc(followedUserDocRef, {
        followers: [...userInfo?.followers, currentUserId],
      });
      await updateDoc(followingUserDocRef, {
        following: [...authUserInfo?.following, uid],
      });
    } catch (err) {
      alert(err);
    }
  };

  // unfollow
  const handleUnFollowBtnClick = async () => {
    const followedUserDocRef = doc(db, "users", uid);
    const followingUserDocRef = doc(db, "users", currentUserId);
    try {
      await updateDoc(followedUserDocRef, {
        followers: userInfo?.followers.filter(
          (follower: string) => follower !== currentUserId
        ),
      });
      await updateDoc(followingUserDocRef, {
        following: authUserInfo?.following.filter(
          (following: string) => following !== uid
        ),
      });
    } catch (err) {
      alert(err);
    }
  };

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
                      : // Default image shown should be a placeholder, actually
                        "https://picsum.photos/id/1/40/40"
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

              {/* Follow button only shows if the profile page is being visited by another user*/}
              {/* Clicking btn should follow user */}
              {currentUserIsProfileOwner || (
                <button
                  // onClick={handleFollowBtnClick}
                  onClick={() => {
                    userInfo.followers.includes(currentUserId)
                      ? handleUnFollowBtnClick()
                      : handleFollowBtnClick();
                  }}
                  className="mx-auto flex items-center gap-[.4rem] rounded-[4px] bg-[#2F80ED] py-[.80rem]  px-[2.4rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline"
                >
                  {userInfo.followers.includes(currentUserId) ? (
                    <>
                      <SlUserUnfollow />
                      <span>UnFollow</span>
                    </>
                  ) : (
                    <>
                      <SlUserFollow />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* User's Tweets */}
            <div>
              <div>
                {userTweets.length ? (
                  userTweets.map((tweet) => (
                    <Tweet
                      key={tweet.id}
                      tweetId={tweet.id}
                      likes={tweet.likes}
                      retweets={tweet.retweets}
                      media={tweet.media}
                      text={tweet.text}
                      timestamp={tweet.timestamp}
                      userId={tweet.userId}
                    />
                  ))
                ) : (
                  <p>No tweets yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuthUser(profile);
