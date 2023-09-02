import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";
import { ProfilePictureProps } from "@/typings";
import { useEffect, useState } from "react";

const ProfilePicture = ({ userId, height, width }: ProfilePictureProps) => {
  // IMAGE DOWNLOADS.
  // use userId to fetch img metadata
  const [mostRecentProfilePicMetaData, setmostRecentProfilePicMetaData] =
    useState({});

  useEffect(() => {
    const queryMostRecentProfilePic = async () => {
      try {
        const q = query(
          collection(db, "profile-pictures"),
          where("userId", "==", userId),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const mostRecentProfilePicData = querySnapshot.docs[0].data();
          // console.log("Most recent ProfilePic data:", mostRecentDocumentData);
          setmostRecentProfilePicMetaData(mostRecentProfilePicData);
        } else {
          console.log('The "profile-pictures" collection is empty.');
        }
      } catch (error) {
        console.error("Error getting the most recent profile picture:", error);
      }
    };

    queryMostRecentProfilePic();
  }, [userId]);

  // use fullPath in metadata to get imageURL
  const profilePictureURL = useImageDownloadURL(mostRecentProfilePicMetaData);
  return (
    <Image
      src={profilePictureURL ? profilePictureURL : userPlaceholder}
      alt="Profile picture"
      width={width}
      height={height}
      className={` aspect-auto min-h-[${height}px] overflow-hidden  w-[${width}px] rounded-[8px] object-cover`}
    />
  );
};

export default ProfilePicture;
