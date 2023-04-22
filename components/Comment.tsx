import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import moment from "moment";
import Image from "next/image";
import { timestampType } from "./Tweet";

type CommentProps = {
  text: string;
  timestamp: timestampType;
  userId: string;
};
const Comment = ({ text, timestamp, userId }: CommentProps) => {
  console.log(text, timestamp, userId);

  //  Logic to Get info about user that made the comment
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(doc(db, "users", userId));
      setUser(userSnap.data());
    };

    getUser();
  }, []);

  console.log(user);

  //   Logic to convert timestamp to timeAgo
  const formatDate = (timestamp: timestampType) => {
    const date = moment.unix(timestamp.seconds).utcOffset(1);
    return moment(date).fromNow();
  };
  const timeAgo = formatDate(timestamp);
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
