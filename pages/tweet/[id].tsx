import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";
import { WithAuthUser, Comment, Tweet } from "../../index";

const TweetInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const routeId = `${id ? id : ""}`;

  const [tweet, tweetLoading, tweetError] = useDocument(
    doc(db, "tweets", routeId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Logic to get tweet comments
  const commentsRef = collection(db, "comments");
  const commentsQuery = query(
    commentsRef,
    // orderBy("timestamp", "desc"),
    where("tweetId", "==", id)
  );
  const [comments, commentsLoading, commentsError] = useCollection(
    commentsQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // console.log(comments?.docs[0]?.data());

  // still yet to order comments by timestamp.
  return (
    <div className="px-[1.90rem] pb-[9.615rem]">
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
          bookmarkedBy={tweet.data()?.bookmarkedBy}
        />
      )}

      <p className="mb-4 text-[1.8rem] font-medium">Comments</p>
      {commentsError && <strong>Error: {JSON.stringify(commentsError)}</strong>}
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

export default WithAuthUser(TweetInfo);