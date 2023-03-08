import { db } from "@/config/firebase";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";

const AllTweets = () => {
  const [tweetsList, setTweetsList] = useState<any[]>([]);

  const postsRef = collection(db, "tweets");

  const [tweetsListSnapshot, loading, error] = useCollection(postsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  // useEffect(() => {
  //   const q = query(postsRef);
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let tweetsArray: any = [];
  //     querySnapshot.forEach((doc) => {
  //       tweetsArray.push({ ...doc.data(), id: doc.id });
  //     });
  //     setTweetsList(tweetsArray);
  //   });
  //   return () => unsub();
  // }, []);

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}

      {tweetsListSnapshot?.docs.map((tweet) => (
        <Tweet
          key={tweet.id}
          comments={tweet.data().comments}
          numOfLikes={tweet.data().likes.length}
          numOfRetweets={tweet.data().retweets.length}
          media={tweet.data().media}
          text={tweet.data().text}
          timestamp={tweet.data().timestamp}
          userId={tweet.data().userId}
        />
      ))}
      {/* {tweetsList?.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            comments={tweet.comments}
            numOfLikes={tweet.likes.length}
            numOfRetweets={tweet.retweets.length}
            media={tweet.media}
            text={tweet.text}
            timestamp={tweet.timestamp}
            userId={tweet.userId}
          />
        );
      })} */}
    </div>
  );
};

export default AllTweets;
