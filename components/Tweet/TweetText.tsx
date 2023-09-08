import { useRouter } from "next/router";
import React from "react";

const TweetText = ({ tweetId, text }) => {
  const router = useRouter();

  return (
    <p
      onClick={() => {
        router.push(`/tweet/${tweetId}`);
      }}
      className="mt-[2rem] mb-[1.4rem]  text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F] md:text-[1.8rem]"
    >
      {text}
    </p>
  );
};

export default TweetText;
