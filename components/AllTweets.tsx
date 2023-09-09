import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { GeneralLoader, Tweet } from "../index";

const AllTweets = () => {
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, orderBy("timestamp", "desc"));
  const [allTweets, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (error) {
    return (
      <p className="mt-16 text-center text-2xl font-semibold text-[#828282] ">
        Error loading tweets. Please try again.
      </p>
    );
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
      {allTweets?.docs?.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          media={tweet.data().media}
          text={tweet.data().text}
          timestamp={tweet.data().timestamp}
          userId={tweet.data().userId}
        />
      ))}
    </div>
  );
};

export default AllTweets;
