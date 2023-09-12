import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";
import { ProfilePictureProps } from "@/typings";

const ProfilePicture = ({ userId, height, width }: ProfilePictureProps) => {
  const profilePicsRef = collection(db, "profile-pictures");
  const profilePicsQuery = query(
    profilePicsRef,
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const [profilePicMetaData, loading, error] = useCollection(profilePicsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const mostRecentProfilePicMetaData = profilePicMetaData?.docs[0]?.data();

  // use fullPath in metadata to get imageURL
  const profilePictureURL = useImageDownloadURL(mostRecentProfilePicMetaData);
  return (
    <Image
      src={profilePictureURL ? profilePictureURL : userPlaceholder}
      alt="Profile picture"
      width={width}
      height={height}
      className={` aspect-auto h-[${height}px] overflow-hidden  w-[${width}px] rounded-[8px] object-cover`}
    />
  );
};

export default ProfilePicture;
