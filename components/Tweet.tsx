import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import moment from "moment";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { MdOutlineModeComment } from "react-icons/md";
import TweetMedia from "./TweetMedia";

type timestampType = {
  seconds: number;
  nanoseconds: number;
};

type tweetProps = {
  comments: {}[];
  numOfLikes: number;
  numOfRetweets: number;
  media: [];
  text: string;
  timestamp: timestampType;
  userId: string;
};

// Logic to convert timestamp to required format
const formatDate = (timestamp: timestampType) => {
  const date = moment.unix(timestamp.seconds).utcOffset(0);
  const formattedDate = date.format("DD MMMM [at] HH:mm");
  return formattedDate;
};

const Tweet = ({
  comments,
  numOfLikes,
  numOfRetweets,
  media,
  text,
  timestamp,
  userId,
}: tweetProps) => {
  // Logic to get info about the user with userId for each tweet
  const userRef = doc(db, "users", userId);
  // const [user, loading, error, snapshot] = useDocumentData<any>(userRef);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    };

    getUser();
  }, []);

  const formattedDate = formatDate(timestamp);
  return (
    <div>
      {/* Idea: Vertical slideshow of who retweeted. Scrolls automatically every 2secs */}
      {/* <div className="mb-[1rem] mt-[2.7rem] text-[1.4rem] font-normal leading-[1.9rem] tracking-[-3.5%] text-[#828282]">
        <p>Daniel Jensen Retweeted</p>
      </div> */}

      <div className="my-[2.317rem] rounded-[8px] px-[1.523rem] pt-[2rem] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[.635rem]">
          <Image
            src={
              user.profilePictureUrl
                ? user.profilePictureUrl
                : // Default image shown should be a placeholder, actually
                  "https://picsum.photos/id/1/40/40"
            }
            alt="dev"
            width={40}
            height={40}
            className="rounded-[8px]"
          />
          <div className="font-medium tracking-[-3.5%]">
            <p className="text-[1.6rem] leading-[2.4rem]">
              {user.displayName ? `@${user.displayName}` : user.userName}
            </p>
            <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="mt-[2rem] mb-[1.4rem]">
          <p className="text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F]">
            {text}
          </p>
        </div>

        <div>
          <div>
            <TweetMedia images={media} />
          </div>
          <div className="mt-[1.4rem] mb-[0.651rem] flex justify-end gap-[1.6rem]">
            <span className="tweet-stats">
              {numOfLikes} {numOfLikes > 1 ? "Likes" : "Like"}
            </span>
            <span className="tweet-stats">
              {numOfRetweets} {numOfRetweets > 1 ? "Retweets" : "Retweet"}
            </span>
            <span className="tweet-stats">449 Comments</span>
            {/* <span className="tweet-stats">234 Saved</span> */}
          </div>
        </div>

        <div className="flex justify-center border-y-[1px] border-[#F2F2F2] py-[.382rem]">
          <button className="tweet-icons-btn">
            <MdOutlineModeComment className="tweet-icons" />
            <span className="hidden">Comment</span>
          </button>
          <button className="tweet-icons-btn">
            <FaRetweet className="tweet-icons" />
            <span className="hidden">Retweet</span>
          </button>
          <button className="tweet-icons-btn">
            <AiOutlineHeart className="tweet-icons" />
            <span className="hidden">Likes</span>
          </button>
          <button className="tweet-icons-btn">
            <HiOutlineBookmark className="tweet-icons" />
            <span className="hidden">Save</span>
          </button>
        </div>

        {/* <Reply /> */}
      </div>
    </div>
  );
};

export default Tweet;
