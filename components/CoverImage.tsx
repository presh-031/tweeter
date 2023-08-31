import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import { CoverImageProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";

const CoverImage = ({ userId }: CoverImageProps) => {
  // IMAGE DOWNLOADS.
  // use userId to fetch img metadata
  const metaDataRef = collection(db, "cover-images");
  const metaDataQuery = query(metaDataRef, where("userId", "==", userId));
  const [metaDataSnapshot, loadingmetaData, metaDataError] = useCollectionData(
    metaDataQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const metaData = metaDataSnapshot;

  // use fullPath in metadata to get imageURL
  const coverImageURL = useImageDownloadURL(metaData);

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
