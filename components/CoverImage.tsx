import Image from "next/image";
import userPlaceholder from "../assets/user-placeholder.png";
import { CoverImageProps } from "@/typings";

const CoverImage = ({ coverImg }: CoverImageProps) => {
  return (
    <div className="">
      <Image
        // use better placeholder for ui.
        src={coverImg ? coverImg : userPlaceholder}
        alt="header-photo"
        width={375}
        height={168}
        className={` ${
          coverImg ? "" : "border-y-[1px] border-blueish"
        } h-[16.8rem] w-[37.5rem] object-cover
        `}
      />
    </div>
  );
};

export default CoverImage;
