import Image from "next/image";
import { CoverImageProps } from "@/typings";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";

const CoverImage = ({ userId }: CoverImageProps) => {
  // Get route for cover image styling.
  const router = useRouter();
  const isProfilePage = router.pathname === "/profile/[uid]" ? true : false;

  const CoverImgRef = collection(db, "cover-images");
  const CoverImgQuery = query(
    CoverImgRef,
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const [profilePicMetaData, loading, error] = useCollection(CoverImgQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const mostRecentCoverImgMetaData = profilePicMetaData?.docs[0]?.data();

  // use fullPath in metadata to get imageURL
  const coverImageURL = useImageDownloadURL(mostRecentCoverImgMetaData);

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
