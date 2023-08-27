import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/config/firebase";

const ProfilePicture = ({ authUserId, height, width }) => {
  // IMAGE DOWNLOADS.
  // use userId to fetch img metadata
  const metaDataRef = collection(db, "profile-pictures");
  const metaDataQuery = query(metaDataRef, where("userId", "==", authUserId));
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
      alt="profile-pic"
      width={width}
      height={height}
      className={`h-[${height}px] w-[${width}px] rounded-[8px] object-cover`}
    />
  );
};

export default ProfilePicture;
