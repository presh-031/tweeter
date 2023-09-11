import { db } from "@/config/firebase";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { MediaProps } from "@/typings";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Media = ({ tweetId }: MediaProps) => {
  // IMAGE DOWNLOADS.
  // use userId to fetch img metadata
  const [mostRecentDocumentMetaData, setmostRecentDocumentMetaData] = useState(
    {}
  );
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const queryMostRecentCoverImage = async () => {
      try {
        const q = query(
          collection(db, "tweet-images"),
          where("tweetId", "==", tweetId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const mostRecentDocumentData = querySnapshot.docs[0].data();
          // console.log("Most recent cover image data:", mostRecentDocumentData);
          setmostRecentDocumentMetaData(mostRecentDocumentData);
        } else {
          console.log('The "tweet-images" collection is empty.');
        }

        // Data is loaded, set isLoading to false
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting the most recent tweet image:", error);
      }
    };

    queryMostRecentCoverImage();
  });

  // use fullPath in metadata to get imageURL
  const tweetImageURL = useImageDownloadURL(mostRecentDocumentMetaData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap">
      {tweetImageURL ? (
        <div className="w-full">
          <Image
            src={tweetImageURL}
            alt="media"
            width={311}
            height={192}
            className="max-h-[50rem] w-full rounded-[8px] object-cover"
          />
        </div>
      ) : (
        Object.keys(mostRecentDocumentMetaData).length !== 0 && (
          <div
            className="  h-[16.8rem]
            w-full min-w-[34.5rem] bg-blueish lg:h-[29.7rem]"
          ></div>
        )
      )}
    </div>
  );
};

export default Media;
