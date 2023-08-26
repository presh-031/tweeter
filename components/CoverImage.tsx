import Image from "next/image";
import React from "react";

type CoverImageProps = {
  coverImg: string;
};
const CoverImage = ({ coverImg }: CoverImageProps) => {
  return (
    <div className="">
      <Image
        src={coverImg ? coverImg : "https://picsum.photos/id/220/375/168"}
        alt="header-photo"
        width={375}
        height={168}
        className={` ${
          coverImg ? "" : "border-y-[1px] border-blueish"
        } h-[16.8rem] w-[37.5rem] `}
      />
    </div>
  );
};

export default CoverImage;
