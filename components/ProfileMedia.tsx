import { db } from "@/config/firebase";
import { ProfileOwnerTweetsImgsUiProps, profileTweetsProps } from "@/typings";
import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";
import { GeneralLoader } from "..";

const ProfileMedia = ({ profileOwnerId }: profileTweetsProps) => {
  const TweetImgRef = collection(db, "tweet-images");
  const TweetImgQuery = query(
    TweetImgRef,
    where("userId", "==", profileOwnerId)
  );
  const [tweetsImgsMetaData, loading, error] = useCollection(TweetImgQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const profileOwnerTweetsImgsMetaData = tweetsImgsMetaData?.docs;

  if (error) {
    return (
      <p className="text-center text-2xl font-semibold text-[#828282] ">
        Error loading media. Please try again.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="my-[10rem] flex justify-center">
        <GeneralLoader />
      </div>
    );
  }

  return (
    <div>
      {profileOwnerTweetsImgsMetaData?.length ? (
        profileOwnerTweetsImgsMetaData.map((imgMetaData) => (
          <ProfileOwnerTweetsImgsUi
            key={imgMetaData.id}
            imgMetaDataTweetId={imgMetaData.data().tweetId}
          />
        ))
      ) : (
        <p className="mt-16 text-center text-2xl font-semibold text-[#828282]">
          You have no media yet.
        </p>
      )}
    </div>
  );
};

export const ProfileOwnerTweetsImgsUi = ({
  imgMetaDataTweetId,
}: ProfileOwnerTweetsImgsUiProps) => {
  const [tweet, loading, error] = useDocument(
    doc(db, "tweets", imgMetaDataTweetId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      {tweet && (
        <Tweet
          tweetId={tweet.id}
          text={tweet.data()?.text}
          timestamp={tweet.data()?.timestamp}
          userId={tweet.data()?.userId}
        />
      )}
    </div>
  );
};

export default ProfileMedia;
