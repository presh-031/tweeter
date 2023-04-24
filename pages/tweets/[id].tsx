import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

import Comment from "@/components/Comment";
import Tweet from "@/components/Tweet";
import withAuthUser from "@/components/WithAuthUser";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";

const TweetInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [tweet, tweetLoading, tweetError, snapshot] = useDocumentData(
    doc(db, "tweets", id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // useEffect(() => {
  //   if (id) {
  //     const getTweet = async () => {
  //       const tweetRef = doc(db, "tweets", id);

  //       try {
  //         const tweetSnap = await getDoc(tweetRef);
  //         const tweetDoc = tweetSnap.data();

  //         setTweet(tweetDoc);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     getTweet();
  //   }
  // }, []);

  // Logic to get tweet comments
  // Get all tweet's comments with the id
  // Still querying for all comments then filtering with id and storing in tweetComments state, should use a more specific query.

  const commentsRef = collection(db, "comments");

  // Create a query object that orders the documents by the "timestamp" field
  const commentsQuery = query(commentsRef, orderBy("timestamp", "desc"));

  const [commentsListSnapshot, loading, error] = useCollection(commentsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const allCommentsCol = commentsListSnapshot?.docs;

  const allComments = [];
  allCommentsCol?.forEach((comment) => {
    allComments.push(comment.data());
  });
  const tweetComments = allComments.filter((comment) => comment.tweetId === id);

  console.log(tweet);
  return (
    <div className="px-[1.90rem] pb-[9.615rem]">
      {tweet ? (
        <>
          <Tweet
            tweetId={id ? id : ""}
            likes={tweet.likes}
            retweets={tweet.retweets}
            media={tweet.media}
            text={tweet.text}
            timestamp={tweet.timestamp}
            userId={tweet.userId}
          />

          <div>
            <>
              <p className="mb-4 text-[1.8rem] font-medium">Comments</p>
              {tweetComments.length ? (
                tweetComments.map((comment) => (
                  <Comment
                    text={comment.comment}
                    timestamp={comment.timestamp}
                    userId={comment.userId}
                  />
                ))
              ) : (
                <p>No comments to see</p>
              )}
            </>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default withAuthUser(TweetInfo);
