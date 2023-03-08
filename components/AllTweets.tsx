import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import Tweet from "./Tweet";

const AllTweets = () => {
  const [tweetsList, setTweetsList] = useState<any[]>([]);

  const postsRef = collection(db, "tweets");

  useEffect(() => {
    const q = query(postsRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tweetsArray: any = [];
      querySnapshot.forEach((doc) => {
        tweetsArray.push({ ...doc.data(), id: doc.id });
      });
      setTweetsList(tweetsArray);
    });
    return () => unsub();
  }, []);

  return (
    <div>
      {tweetsList?.map((tweet) => {
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
      })}
    </div>
  );
};

export default AllTweets;
