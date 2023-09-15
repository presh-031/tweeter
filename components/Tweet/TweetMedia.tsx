import { db } from "@/config/firebase";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { MediaProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import Image from "next/image";
import { memo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Media = ({ tweetId }: MediaProps) => {
  const TweetImgRef = collection(db, "tweet-images");
  const TweetImgQuery = query(TweetImgRef, where("tweetId", "==", tweetId));
  const [tweetMetaData, loading, error] = useCollection(TweetImgQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const tweetImgMetaData = tweetMetaData?.docs[0]?.data();

  // use fullPath in metadata to get imageURL
  const tweetImageURL = useImageDownloadURL(tweetImgMetaData);

  // If both conditions are never satisfied , then the tweet has no img metadata associated at all, so component returns null.
  if (tweetImgMetaData) {
    if (tweetImageURL) {
      return (
        <div className="w-full">
          <Image
            src={tweetImageURL}
            alt="media"
            width={311}
            height={192}
            className="max-h-[50rem] w-full rounded-[8px] object-cover"
          />
        </div>
      );
    }
    // Loading state for tweets with ImgMetaData but still loading the tweetImageUrl
    return (
      <div
        className="h-[16.8rem]
      w-full bg-blueish lg:h-[29.7rem]"
      ></div>
    );
  }
  return null;
};

export default memo(Media);
