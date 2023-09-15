import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import ProfilePicture from "../ProfilePicture";
import { formatDateForTweet } from "@/utils/formatDate";
import { TweetUserInfoProps } from "@/typings";

const TweetUserInfo = ({ userId, timestamp }: TweetUserInfoProps) => {
  const router = useRouter();
  // Logic to get info about the user with userId for each tweet
  // const userRef = doc(db, "users", userId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(doc(db, "users", userId));
      setUser(userSnap.data());
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format date for tweet timestamps
  const formattedDate = formatDateForTweet(timestamp);

  return (
    <div
      onClick={(e) => {
        router.push(`/profile/${userId}`);
      }}
      className="flex w-fit gap-[.635rem] md:gap-[1.8rem]"
    >
      <div className="flex h-[4rem] w-[4rem] items-center overflow-hidden rounded-[8px]">
        <ProfilePicture userId={userId} width={40} height={40} />
      </div>
      <div className="font-medium tracking-[-3.5%]">
        <div className="flex  items-center gap-4 leading-[2.4rem]">
          <span className="text-[1.6rem]">{user.userName}</span>
          <span className="text-[1.2rem] text-[#555555]">
            {user.displayName && `@${user.displayName}`}
          </span>
        </div>
        <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default memo(TweetUserInfo);
