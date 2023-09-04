import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";
import { WithAuthUser, Comment, Tweet } from "../../index";

const TweetInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const routeId = id ? id.toString() : "";

  const [tweet, tweetLoading, tweetError] = useDocument(
    doc(db, "tweets", routeId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  //Tweet comments
  const commentsRef = collection(db, "comments");
  const commentsQuery = query(
    commentsRef,
    where("tweetId", "==", id)
    // should order comments, but orderBy causes firebase error. Remember to look into.
    // orderBy("timestamp", "desc")
  );
  const [comments, commentsLoading, commentsError] = useCollection(
    commentsQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="mx-auto max-w-[1071px] px-[1.90rem] pb-[9.615rem] pt-[2.317rem] ">
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

      <p className="my-2 text-[1.8rem] font-medium">Comments</p>
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
