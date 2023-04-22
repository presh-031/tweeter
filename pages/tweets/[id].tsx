import Tweet, { timestampType } from "@/components/Tweet";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";

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

  const [tweet, setTweet] = useState<any>();

  const [loadingTweet, setLoadingTweet] = useState(true);
  useEffect(() => {
    if (id) {
      const getTweet = async () => {
        const tweetRef = doc(db, "tweets", id);

        try {
          const tweetSnap = await getDoc(tweetRef);
          const tweetDoc = tweetSnap.data();

          setLoadingTweet(false);
          setTweet(tweetDoc);
        } catch (err) {
          console.error(err);
        }
      };
      getTweet();
    }
  }, [id]);

  // Logic to get tweet comments
  // Get all tweet's comments with the id
  // Still querying for all comments then filtering with id and storing in tweetComments state, should use a more specific query.

  const commentsRef = collection(db, "comments");

  const [commentsListSnapshot, loading, error] = useCollection(commentsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const allCommentsCol = commentsListSnapshot?.docs;

  const allComments = [];
  allCommentsCol?.forEach((comment) => {
    allComments.push(comment.data());
  });
  const tweetComments = allComments.filter((comment) => comment.tweetId === id);

  console.log(tweetComments);
  return (
    <div className="px-8">
      {tweet ? (
        <>
          <Tweet
            key={id}
            tweetId={id}
            likes={tweet.likes}
            retweets={tweet.retweets}
            media={tweet.media}
            text={tweet.text}
            timestamp={tweet.timestamp}
            userId={tweet.userId}
          />
          <div>
            <>
              <p>Comments</p>
              {tweetComments.map((comment) => (
                <div>
                  <Image
                    src="https://picsum.photos/id/220/40/40"
                    alt="dev"
                    width={40}
                    height={40}
                    className="rounded-[8px]"
                  />
                  <div>
                    <div>
                      <span>FEYI</span>
                      <span>@feyi_x . 6h</span>
                    </div>
                    <p>Comment details go here</p>
                  </div>
                </div>
              ))}
            </>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default TweetInfo;