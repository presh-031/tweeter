import { db } from "@/config/firebase";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Comment from "./Comment";
import { GeneralLoader } from "..";
import { TweetCommentsProps } from "@/typings";

const TweetComments = ({ tweetId }: TweetCommentsProps) => {
  const commentsRef = collection(db, "comments");
  const commentsQuery = query(
    commentsRef,
    where("tweetId", "==", tweetId),
    orderBy("timestamp", "desc") //add timestamp to comments (new and existing)
  );

  const [comments, loading, error] = useCollection(commentsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (error) {
    console.log(error); //handle error
  }

  if (loading) {
    return (
      <div className="mt-16 flex justify-center lg:mt-[10rem]">
        <GeneralLoader />
      </div>
    );
  }

  return (
    <div>
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
        <p className="mt-[10rem] text-center text-2xl font-semibold text-[#828282]">
          No comments to see
        </p>
      )}
    </div>
  );
};

export default TweetComments;
