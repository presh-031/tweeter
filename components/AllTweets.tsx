import { db } from "@/config/firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";

const AllTweets = () => {
  const tweetsRef = collection(db, "tweets");

  const [tweetsListSnapshot, loading, error] = useCollection(tweetsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}

      {tweetsListSnapshot?.docs.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          comments={tweet.data().comments}
          // numOfLikes={tweet.data().likes.length}
          likes={tweet.data().likes}
          numOfRetweets={tweet.data().retweets.length}
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
