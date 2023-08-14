import { collection, orderBy, query } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { GeneralLoader, Tweet } from "../index";

const AllTweets = () => {
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, orderBy("timestamp", "desc"));
  const [allTweets, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // console.log(allTweets?.docs[2].data());
  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="mt-16 flex justify-center">
          <GeneralLoader />
        </div>
      )}
      {allTweets?.docs?.map((tweet) => (
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
      ))}
    </div>
  );
};

export default AllTweets;
