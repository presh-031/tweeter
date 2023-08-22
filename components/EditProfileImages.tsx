import { MdOutlineBrokenImage } from "react-icons/md";
import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import useSelectedImage from "@/hooks/useSelectedImage";

const EditCoverImage = () => {
  const { selectedImage, handleImageChange, deleteSelectedImage } =
    useSelectedImage();

  return (
    <div className="relative h-[10rem] w-full rounded-[.8rem] bg-[#777777] bg-opacity-80">
      <label
        htmlFor="cover-picker"
        className="absolute top-[1rem] left-[1rem] block w-fit rounded-full bg-black bg-opacity-50 p-2"
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
        <Image
          src={selectedImage}
          alt="Selected"
          width={80}
          height={80}
          className="mt-[1rem] h-full w-full max-w-full rounded-[8px] object-cover "
        />
      )}
    </div>
  );
};

const EditProfilePic = () => {
  const { selectedImage, handleImageChange, deleteSelectedImage } =
    useSelectedImage();

  return (
    <div className="relative mt-8 flex h-[5rem] w-[5rem] items-center justify-center overflow-hidden rounded-[.8rem] bg-black bg-opacity-20">
      <label
        htmlFor="profile-picker"
        className="absolute top-1/2 left-1/2 z-[100] block w-fit -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-60 p-2"
      >
        <MdOutlineBrokenImage className=" text-3xl text-white" />
      </label>

      <input
        type="file"
        id="profile-picker"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {selectedImage ? (
        <Image
          src={selectedImage}
          alt="Selected"
          width={50}
          height={50}
          className="mt-[1rem] h-[5rem] w-[5rem]  rounded-[8px] object-cover "
        />
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
  );
};

const EditProfileImages = () => {
  return (
    <>
      <EditCoverImage />
      <EditProfilePic />
    </>
  );
};

export default EditProfileImages;
