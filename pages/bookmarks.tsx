import WithAuthUser from "@/components/WithAuthUser";
import { auth, db } from "@/config/firebase";
import { arrayUnion, collection, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Tweet } from "..";

import firebase from "firebase/app";
import "firebase/firestore";

const Bookmarks = () => {
  //   // Get current user info
  //   const [authUser] = useAuthState(auth);
  //   const authUserId = authUser ? authUser.uid : "";
  //   const [authUserInfo, authUserInfoLoading, authUserInfoError] =
  //     useDocumentData(doc(db, "users", authUserId), {
  //       snapshotListenOptions: { includeMetadataChanges: true },
  //     });
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
      <p className="mt-[4rem] w-[80%] text-center text-2xl">
        Bookmarks feature in progress. Please check back later.
      </p>
      {/* {bookmarkedTweets?.map((tweet) => {
        return (
          <Tweet
            key={tweet.id} //check id
            tweetId={tweet.id}
            likes={tweet.data()?.likes}
            retweets={tweet.data()?.retweets}
            media={tweet.data()?.media}
            text={tweet.data()?.text}
            timestamp={tweet.data()?.timestamp}
            userId={tweet.data()?.userId}
            bookmarkedBy={tweet.data()?.bookmarkedBy}
          />
        );
      })} */}
    </div>
  );
};

export default WithAuthUser(Bookmarks);
