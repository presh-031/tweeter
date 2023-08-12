import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import { timestampType } from "@/typings";
import { formatDateToTimeAgo } from "@/utils/formatDate";
import Image from "next/image";

type CommentProps = {
  text: string;
  timestamp: timestampType;
  userId: string;
};
const Comment = ({ text, timestamp, userId }: CommentProps) => {
  //  Logic to Get info about user that made the comment
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(doc(db, "users", userId));
      setUser(userSnap.data());
    };

    getUser();
  }, []);

  const timeAgo = formatDateToTimeAgo(timestamp);

  return (
    <div className="mb-4 rounded-[8px] bg-white  px-[1.523rem] py-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)]  hover:cursor-pointer">
      <div className="flex w-fit gap-[.635rem]">
        <Image
          src={
            user.profilePictureUrl
              ? user.profilePictureUrl
              : // Default image shown should be a placeholder, actually
                "https://picsum.photos/id/1/40/40"
          }
          alt="profile-pic"
          width={40}
          height={40}
          className="h-[4rem] w-[4rem] rounded-[8px]"
        />
        <div className="font-medium tracking-[-3.5%]">
          <div className="flex  items-center gap-4 leading-[2.4rem]">
            <span className="text-[1.6rem]">{user.userName}</span>
            <span className="text-[1.2rem] text-[#555555]">
              {user.displayName && `@${user.displayName}`}
            </span>
          </div>
          <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
            {timeAgo}
          </p>
        </div>
      </div>

      <p className="mt-[2rem] mb-[1.4rem] text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F]">
        {text}
      </p>
    </div>
  );
};

export default Comment;
