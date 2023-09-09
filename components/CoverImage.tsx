import Image from "next/image";
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
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
          where("userId", "==", userId),
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
  }, [userId]);

  // use fullPath in metadata to get imageURL
  const coverImageURL = useImageDownloadURL(mostRecentDocumentMetaData);

  // Get route for cover image styling.
  const router = useRouter();
  const isProfilePage = router.pathname === "/profile/[uid]" ? true : false;

  return (
    <div>
      {coverImageURL ? (
        <Image
          src={coverImageURL}
          alt="Cover Image"
          width={375}
          height={168}
          className={`${
            isProfilePage ? "lg:h-[29.7rem]" : ""
          } h-[16.8rem] w-full min-w-[34.5rem] object-cover`}
        />
      ) : (
        <div
          className={` ${
            isProfilePage ? "lg:h-[29.7rem]" : ""
          } h-[16.8rem] w-full min-w-[34.5rem] bg-blueish`}
        ></div>
      )}
    </div>
  );
};

export default CoverImage;
