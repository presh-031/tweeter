import { MdClose, MdOutlineBrokenImage } from "react-icons/md";
import useSelectedImage from "@/hooks/useSelectedImage";
import { v4 } from "uuid";
import { ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { db, storage } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { EditProfileImagesProps } from "@/typings";
import useImageUploader from "@/hooks/useImageUploader";
import { useEffect } from "react";
import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";

export const EditCoverImage = ({
  authUserId,
  triggered,
}: EditProfileImagesProps) => {
  const { selectedImage, handleImageChange, deleteSelectedImage } =
    useSelectedImage();
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const imageRef = ref(storage, `cover-images/${selectedImage?.name + v4()}`);

  const saveCoverImageMetaData = async (fullPath: string) => {
    const metaData = {
      fullPath,
      userId: authUserId,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "cover-images"), metaData);
    } catch (err) {
      alert(err);
    }
  };

  const uploadImage = useImageUploader();
  const upload = async () => {
    await uploadImage(
      selectedImage,
      imageRef,
      uploadFile,
      saveCoverImageMetaData
    );
  };

  useEffect(() => {
    // console.log("Function in  cover image triggered!");
    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered]);

  return (
    <>
      {/* {error && <strong>Error: {error.message}</strong>}
      {uploading && <span>Uploading file...</span>}
      {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>} */}
      {/* {selectedImage && <span>Selected file: {selectedImage.name}</span>} */}

      <div className="relative h-[10rem] w-full overflow-hidden rounded-[.8rem] bg-[#777777] bg-opacity-80">
        <label
          htmlFor="cover-picker"
          className="absolute top-[1rem] left-[1rem] z-[1000] block w-fit cursor-pointer rounded-full bg-black bg-opacity-50 p-2"
        >
          <MdOutlineBrokenImage className=" text-3xl text-white" />
        </label>
        <input
          type="file"
          id="cover-picker"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {selectedImage && (
          <div className="relative ">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              width={100}
              height={100}
              className="h-[10rem] w-full  object-cover "
            />
            <div
              onClick={deleteSelectedImage}
              className="absolute top-[1rem] right-[1rem] z-[1000] flex h-[2.2rem] w-[2.2rem] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-80"
            >
              <MdClose className="text-4xl text-white" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const EditProfilePic = ({
  authUserId,
  triggered,
}: EditProfileImagesProps) => {
  const { selectedImage, handleImageChange, deleteSelectedImage } =
    useSelectedImage();

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const imageRef = ref(
    storage,
    `profile-pictures/${selectedImage?.name + v4()}`
  );

  const saveProfilePictureMetaData = async (fullPath: string) => {
    const metaData = {
      fullPath,
      userId: authUserId,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "profile-pictures"), metaData);
    } catch (err) {
      alert(err);
    }
  };

  const uploadImage = useImageUploader();
  const upload = async () => {
    await uploadImage(
      selectedImage,
      imageRef,
      uploadFile,
      saveProfilePictureMetaData
    );
  };

  useEffect(() => {
    // console.log("Function in  profile pic triggered!");
    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered]);

  return (
    <>
      {/* {error && <strong>Error: {error.message}</strong>}
      {uploading && <span>Uploading file...</span>}
      {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>} */}
      {selectedImage && <span>Selected file: {selectedImage.name}</span>}

      <div className="relative mt-8 flex h-[5rem] w-[5rem] items-center justify-center rounded-[.8rem] bg-black bg-opacity-20">
        <label
          htmlFor="profile-picker"
          className="absolute top-1/2 left-1/2 z-[1000] block w-fit -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-black bg-opacity-60 p-2"
        >
          <MdOutlineBrokenImage className="text-3xl text-white" />
        </label>

        <input
          type="file"
          id="profile-picker"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {selectedImage ? (
          <div className="relative">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              width={50}
              height={50}
              className="h-[5rem] w-[5rem] object-cover "
            />
            <div
              onClick={deleteSelectedImage}
              className="absolute top-[-1rem] right-[-1rem] z-[1000] flex h-[2.2rem] w-[2.2rem] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-80"
            >
              <MdClose className="text-4xl text-white" />
            </div>
          </div>
        ) : (
          <Image
            src={userPlaceholder}
            alt="select-profile-pic"
            width={50}
            height={50}
            className="opacity-30 "
          />
        )}
      </div>
    </>
  );
};
