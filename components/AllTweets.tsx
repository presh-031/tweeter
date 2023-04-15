import { collection, orderBy, query } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";

const AllTweets = () => {
  const tweetsRef = collection(db, "tweets");

  // Create a query object that orders the documents by the "timestamp" field
  const tweetsQuery = query(tweetsRef, orderBy("timestamp", "desc"));

  const [tweetsListSnapshot, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}

      {/* Tweets should be ordered such that new tweets are at the top */}
      {tweetsListSnapshot?.docs.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          // comments={tweet.data().comments}
          // numOfLikes={tweet.data().likes.length}
          likes={tweet.data().likes}
          // numOfRetweets={tweet.data().retweets.length}
          retweets={tweet.data().retweets}
          media={tweet.data().media}
          text={tweet.data().text}
          timestamp={tweet.data().timestamp}
          userId={tweet.data().userId}
        />
      ))}
    </div>
  );
};

export default AllTweets;
