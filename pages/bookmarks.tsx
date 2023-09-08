import WithAuthUser from "@/components/WithAuthUser";
import { auth, db } from "@/config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Tweet } from "..";

import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";
import Bookmark from "@/components/Bookmark";

const Bookmarks = () => {
  // Get current user info
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  const bookmarksRef = collection(db, "bookmarks");
  const bookmarksQuery = query(bookmarksRef, where("userId", "==", authUserId));
  const [bookmarks, bookmarksLoading, bookmarksError] = useCollection(
    bookmarksQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchBookmarkedTweets = async () => {
  //     const bookmarksRef = collection(db, "bookmarks");
  //     const bookmarksQuery = query(
  //       bookmarksRef,
  //       where("userId", "==", authUserId)
  //     );

  //     try {
  //       const snapshot = await getDocs(bookmarksQuery);
  //       const fetchedTweets = [];

  //       for (const docSnap of snapshot.docs) {
  //         const tweetId = docSnap.data().tweetId;
  //         const tweetRef = doc(db, "tweets", tweetId);
  //         const tweetSnapshot = await getDocs(tweetRef);

  //         if (tweetSnapshot.exists()) {
  //           fetchedTweets.push(tweetSnapshot.data());
  //         } else {
  //           // Handle the case where the tweet no longer exists
  //           // This can happen if a tweet was deleted after being bookmarked
  //         }
  //       }

  //       // setBookmarkedTweets(fetchedTweets);
  //       console.log(fetchedTweets);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching bookmarks:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookmarkedTweets();
  // }, [authUserId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // const [authUserInfo, authUserInfoLoading, authUserInfoError] =
  //   useDocumentData(doc(db, "users", authUserId), {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   });
  //   const bookmarkedTweetsIds = authUserInfo?.bookmarkedTweets;
  //   console.log(bookmarkedTweetsIds);

  //   //Still just simply fetching all tweets and filtering on the FE.
  //   const tweetsRef = collection(db, "tweets");
  //   const [tweetSnapshots, loading, error] = useCollection(tweetsRef, {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   });
  //   const bookmarkedTweets = tweetSnapshots?.docs.filter((tweet) =>
  //     bookmarkedTweetsIds.includes(tweet.id)
  //   );
  //   // console.log(bookmarkedTweets[0]?.data().id);
  return (
    <div className=" flex justify-center px-[1.90rem] pb-[9.615rem]">
      {/* <p className="mt-[4rem] w-[80%] text-center text-2xl">
        Bookmarks feature in progress. Please check back later.
      </p>{" "} */}
      <div className="flex flex-col border border-red-800">
        {bookmarks?.docs.map((bookmark) => {
          return <Bookmark bookmarkInfo={bookmark} />;
        })}
      </div>
    </div>
  );
};

export default WithAuthUser(Bookmarks);
