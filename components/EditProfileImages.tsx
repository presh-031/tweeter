import { MdOutlineBrokenImage } from "react-icons/md";
import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";

const EditProfileImages = () => {
  return (
    <div>
      <div className="relative h-[10rem] w-full rounded-[.8rem] bg-[#777777] bg-opacity-80">
        <div className="absolute top-[1rem] left-[1rem] w-fit rounded-full bg-black bg-opacity-50 p-2">
          <MdOutlineBrokenImage className=" text-3xl text-white" />
        </div>
      </div>

      <div className="relative mt-8 h-[5rem] w-[5rem] overflow-hidden rounded-[.8rem] bg-black bg-opacity-20">
        <Image
          src={userPlaceholder}
          alt="select-profile-pic"
          width={50}
          height={50}
          className="opacity-30 "
        />
        <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-60 p-2">
          <MdOutlineBrokenImage className=" text-3xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default EditProfileImages;
