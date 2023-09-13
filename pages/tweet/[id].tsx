import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";
import { WithAuthUser, Comment, Tweet, GeneralLoader } from "../../index";
import TweetComments from "@/components/TweetComments";

const TweetInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const routeId = id ? id.toString() : "";

  const [tweet, loading, error] = useDocument(doc(db, "tweets", routeId), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (error) {
    console.log(error); //handle error
  }

  if (loading) {
    return (
      <div className="mt-16 flex justify-center  lg:mt-[10rem]">
        <GeneralLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1071px] px-[1.90rem] pb-[9.615rem] pt-[2.317rem] ">
      {tweet && (
        <>
          <Tweet
            tweetId={tweet.id}
            text={tweet.data()?.text}
            timestamp={tweet.data()?.timestamp}
            userId={tweet.data()?.userId}
          />
          <p className="my-2 text-[1.8rem] font-medium">Comments</p>
          <TweetComments tweetId={tweet?.id} />
        </>
      )}
    </div>
  );
};

export default WithAuthUser(TweetInfo);
