import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import Comment from "@/components/Comment";
import Tweet from "@/components/Tweet";
import withAuthUser from "@/components/WithAuthUser";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";

const TweetInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [tweet, tweetLoading, tweetError] = useDocument(doc(db, "tweets", id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // Logic to get tweet comments
  // Get all tweet's comments with the id
  // Still querying for all comments then filtering with id and storing in tweetComments state, should use a more specific query.
  const commentsRef = collection(db, "comments");

  // Query object that orders the documents by the "timestamp" field
  const commentsQuery = query(
    commentsRef,
    // where("tweetId", "==", id),
    orderBy("timestamp", "desc")
  );

  const [comments, commentsLoading, commentsError] = useCollection(
    commentsQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // console.log(comments?.docs[0].id);

  return (
    <div className="px-[1.90rem] pb-[9.615rem]">
      {/* Rendering tweet states */}
      {tweetError && <strong>Error: {JSON.stringify(tweetError)}</strong>}
      {tweetLoading && <span>Collection: Loading...</span>}
      {tweet && (
        <Tweet
          tweetId={tweet.id}
          likes={tweet.data()?.likes}
          retweets={tweet.data()?.retweets}
          media={tweet.data()?.media}
          text={tweet.data()?.text}
          timestamp={tweet.data()?.timestamp}
          userId={tweet.data()?.userId}
        />
      )}

      <p className="mb-4 text-[1.8rem] font-medium">Comments</p>
      {/* Rendering comment states */}
      {commentsError && <strong>Error: {JSON.stringify(commentsError)}</strong>}
      {commentsLoading && <span>Collection: Loading...</span>}
      {comments ? (
        comments.docs.map((comment) => (
          <Comment
            key={comment.id}
            text={comment.data()?.comment}
            timestamp={comment.data()?.timestamp}
            userId={comment.data()?.userId}
          />
        ))
      ) : (
        <p>No comments to see</p>
      )}
    </div>
  );
};

export default withAuthUser(TweetInfo);
