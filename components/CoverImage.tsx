import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import { CoverImageProps } from "@/typings";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { useEffect, useState } from "react";

const CoverImage = ({ userId }: CoverImageProps) => {
  // IMAGE DOWNLOADS.
  // use userId to fetch img metadata

  const [mostRecentDocumentMetaData, setmostRecentDocumentMetaData] = useState(
    {}
  );

  useEffect(() => {
    const queryMostRecentCoverImage = async () => {
      try {
        const q = query(
          collection(db, "cover-images"),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const mostRecentDocumentData = querySnapshot.docs[0].data();
          // console.log("Most recent cover image data:", mostRecentDocumentData);
          setmostRecentDocumentMetaData(mostRecentDocumentData);
        } else {
          console.log('The "cover-images" collection is empty.');
        }
      } catch (error) {
        console.error("Error getting the most recent cover image:", error);
      }
    };

    queryMostRecentCoverImage();
  }, []);

  // use fullPath in metadata to get imageURL
  const coverImageURL = useImageDownloadURL(mostRecentDocumentMetaData);

  return (
    <div className="">
      {coverImageURL ? (
        <Image
          src={coverImageURL}
          alt="Cover Image"
          width={375}
          height={168}
          className=" h-[16.8rem] w-[37.5rem] object-cover"
        />
      ) : (
        <div className="h-[16.8rem] w-[37.5rem] bg-blueish"></div>
      )}
    </div>
  );
};

export default CoverImage;
