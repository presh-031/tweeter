import WithAuthUser from "@/components/WithAuthUser";
import { auth, db } from "@/config/firebase";
import { collection, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Tweet } from "..";

const Bookmarks = () => {
  // Get current user info
  const [currentUser, loadingCurrentUser, errorCurrentUser] =
    useAuthState(auth);
  const currentUserId = currentUser ? currentUser.uid : "";

  const [userInfo, userInfoLoading, userInfoError] = useDocumentData(
    doc(db, "users", currentUserId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const bookmarkedTweetsIds = userInfo?.bookmarkedTweets;

  // Simply fetching all tweets and filtering on the FE.
  // const tweetsRef = collection(db, "tweets");
  // const [tweetSnapshots, loading, error] = useCollection(tweetsRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // const bookmarkedTweets = tweetSnapshots?.docs.filter((doc) =>
  //   bookmarkedTweetsIds.includes(doc.id)
  // );

  // const tweetsRef = collection(db, "tweets");

  // let tweetsQuery;
  // if (bookmarkedTweetsIds?.length) {
  //   tweetsQuery = query(tweetsRef, where("tweetId", "in", bookmarkedTweetsIds));
  //   console.log("bookmarks are there");
  // } else {
  //   // query that won't fetch anything
  //   tweetsQuery = query(tweetsRef, where("tweetId", "==", ""));
  //   console.log("bookmarks are not there");
  // }

  // const [tweetSnapshots, loading, error] = useCollectionData(tweetsQuery, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // console.log(tweetSnapshots);

  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      bookmarks
      {bookmarkedTweets?.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
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
      })}
    </div>
  );
};

export default WithAuthUser(Bookmarks);
