import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";
import { ProfilePictureProps } from "@/typings";

const ProfilePicture = ({ userId, height, width }: ProfilePictureProps) => {
  // IMAGE DOWNLOADS.
  // use userId to fetch img metadata
  const metaDataRef = collection(db, "profile-pictures");
  const metaDataQuery = query(metaDataRef, where("userId", "==", userId));
  const [metaDataSnapshot, loadingmetaData, metaDataError] = useCollectionData(
    metaDataQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const metaData = metaDataSnapshot;

  // use fullPath in metadata to get imageURL
  const profilePictureURL = useImageDownloadURL(metaData);
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
