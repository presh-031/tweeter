import Image from "next/image";
import React from "react";

interface MediaProps {
  images: string[];
}

const Media: React.FC<MediaProps> = ({ images }) => {
  const numImages = images.length;
  return (
    <div className="flex flex-wrap">
      {numImages === 1 && (
        <div className="w-full">
          <Image
            src={images[0]}
            alt="media"
            width={311}
            height={192}
            className="rounded-[8px]"
            layout="responsive"
          />
        </div>
      )}
      {numImages === 2 && (
        <>
          <div className="w-1/2 pr-2">
            <Image
              src={images[0]}
              alt="media"
              width={311}
              height={192}
              className="rounded-[8px]"
              layout="responsive"
            />
          </div>
          <div className="w-1/2 pl-2">
            <Image
              src={images[1]}
              alt="media"
              width={311 / 2}
              height={192 / 2}
              className="rounded-[8px]"
              layout="responsive"
            />
          </div>
        </>
      )}
      {numImages === 3 && (
        <>
          <div className="w-1/2 pr-2">
            <Image
              src={images[0]}
              alt="media"
              layout="responsive"
              width={311 / 2}
              height={192 / 2}
              className="mb-2 rounded-[8px]"
            />
            <Image
              src={images[1]}
              alt="media"
              width={311 / 2}
              height={192 / 2}
              className="rounded-[8px]"
              layout="responsive"
            />
          </div>
          <div className="w-1/2 pl-2">
            <Image
              src={images[2]}
              alt="media"
              width={311}
              height={192}
              className="rounded-[8px]"
              layout="responsive"
            />
          </div>
        </>
      )}
      {numImages >= 4 && (
        <>
          <div className="w-1/2 pr-2">
            <Image
              src={images[0]}
              alt="media"
              layout="responsive"
              width={311 / 2}
              height={192 / 2}
              className="mb-2 rounded-[8px]"
            />
            <Image
              src={images[1]}
              alt="media"
              width={311 / 2}
              height={192 / 2}
              className="rounded-[8px]"
              layout="responsive"
            />
          </div>
          <div className="w-1/2 pl-2">
            <Image
              src={images[2]}
              alt="media"
              layout="responsive"
              width={311 / 2}
              height={192 / 2}
              className="mb-2 rounded-[8px]"
            />
            <Image
              src={images[3]}
              width={311 / 2}
              height={192 / 2}
              className="rounded-[8px]"
              alt="media"
              layout="responsive"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Media;
