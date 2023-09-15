import { TweetTextProps } from "@/typings";
import React, { memo } from "react";

const TweetText = ({ text }: TweetTextProps) => {
  console.log("tweet text");
  return (
    <p className="mt-[2rem] mb-[1.4rem]  text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F] md:text-[1.8rem]">
      {text}
    </p>
  );
};

export default memo(TweetText);
