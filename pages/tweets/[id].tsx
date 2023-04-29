import { collection, doc, orderBy, query, where } from "firebase/firestore";
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
  const commentsRef = collection(db, "comments");

  const commentsQuery = query(
    commentsRef,
    orderBy("timestamp", "desc"),
    where("tweetId", "==", id)
    // orderBy("timestamp")
  );

  const [comments, commentsLoading, commentsError] = useCollection(
    commentsQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(comments?.docs[0]?.data());

  // const comments = allComments?.docs.data.filter((comment) => {
  // return allComments.id == id;
  // });

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
      {/* {commentsError && <strong>Error: {JSON.stringify(commentsError)}</strong>} */}
      {commentsLoading && <span>Collection: Loading...</span>}
      {comments ? (
        comments.docs.map((comment) => {
          return (
            <Comment
              key={comment.id}
              text={comment.data()?.comment}
              timestamp={comment.data()?.timestamp}
              userId={comment.data()?.userId}
            />
          );
        })
      ) : (
        <p>No comments to see</p>
      )}
    </div>
  );
};

export default withAuthUser(TweetInfo);
