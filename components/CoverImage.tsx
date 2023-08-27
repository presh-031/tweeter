import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import { CoverImageProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useImageDownloadURL from "@/hooks/useImageDownloadURL";

const CoverImage = ({ userId }) => {
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
      <Image
        // use better placeholder for ui.
        src={coverImageURL ? coverImageURL : userPlaceholder}
        alt="header-photo"
        width={375}
        height={168}
        className={` ${
          coverImageURL ? "" : "border-y-[1px] border-blueish"
        } h-[16.8rem] w-[37.5rem] object-cover
        `}
      />
    </div>
  );
};

export default CoverImage;
