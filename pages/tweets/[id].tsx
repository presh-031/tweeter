import { timestampType } from "@/components/Tweet";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import { useRouter } from "next/router";

type tweet = {
  userId: string;
  timestamp: timestampType;
  text: string;
  retweets: string[];
  media: string[];
  likes: string[];
};
const TweetInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [tweet, setTweet] = useState<any>({});

  // const [tweet, setTweet] = useState<tweet>({
  //   userId: "",
  //   timestamp: {
  //     seconds: 0,
  //     nanoseconds: 0,
  //   },
  //   text: "",
  //   retweets: [],
  //   media: [],
  //   likes: [],
  // });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      const getTweet = async () => {
        const tweetRef = doc(db, "tweets", id);

        try {
          const tweetSnap = await getDoc(tweetRef);
          const tweetDoc = tweetSnap.data();

          setLoading(false);
          setTweet(tweetDoc);
        } catch (err) {
          console.error(err);
        }
      };
      getTweet();
    }
  }, [id]);

  return (
    <div>
      {id
        ? "tweet"
        : // <Tweet
          //   key={id}
          //   tweetId={id}
          //   likes={tweet.likes}
          //   retweets={tweet.retweets}
          //   media={tweet.media}
          //   text={tweet.text}
          //   timestamp={tweet.timestamp}
          //   userId={tweet.userId}
          // />
          "Loading"}
    </div>
  );
};

export default TweetInfo;
