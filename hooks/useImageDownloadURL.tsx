import { storage } from "@/config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

// use fullPath in metadata to get imageURL
const useImageDownloadURL = (metaData: any) => {
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    async function getDownloadUrlForImg(fullPath: string) {
      try {
        if (fullPath) {
          const imageRef = ref(storage, fullPath ? fullPath : "");
          const downloadURL = await getDownloadURL(imageRef);

          setImageURL(downloadURL);
        }
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    }

    if (metaData) {
      const fullPath = metaData.fullPath;
      getDownloadUrlForImg(fullPath);
    }
  }, [metaData]);

  return imageURL;
};

export default useImageDownloadURL;
