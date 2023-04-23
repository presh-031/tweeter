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
    <div className="mb-8 flex gap-[.635rem]">
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
      <div className="">
        <div className="flex h-[4rem] flex-col justify-center font-medium leading-[2.4rem]">
          <div className="flex items-center text-[1.6rem]">
            <span>{user.userName}</span>
            <span className="ml-4 text-[1.2rem] text-[#555555]">
              @{user.displayName}
            </span>
          </div>
          <span>{timeAgo}</span>
        </div>
        <p className="mt-4 text-[1.2rem] font-medium">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
