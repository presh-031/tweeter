import { db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";
import { LikeProps } from "@/typings";

const Like = ({ likeInfo }: LikeProps) => {
  console.log(likeInfo.data());

  const tweetId = likeInfo.data().tweetId;
  const [tweet, tweetLoading, tweetError] = useDocument(
    doc(db, "tweets", tweetId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(tweet?.data());
  return (
    <div>
      {tweet ? (
        <Tweet
          key={tweet.id} //check id
          tweetId={tweet.id}
          media={tweet.data()?.media}
          text={tweet.data()?.text}
          timestamp={tweet.data()?.timestamp}
          userId={tweet.data()?.userId}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Like;
