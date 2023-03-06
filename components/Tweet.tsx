import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import Image from "next/image";
import { MdOutlineModeComment } from "react-icons/md";
const Tweet = () => {
  return (
    <div>
      {/* Idea: Vertical slideshow of who retweeted. Scrolls automatically every 2secs */}
      {/* <div className="mb-[1rem] mt-[2.7rem] text-[1.4rem] font-normal leading-[1.9rem] tracking-[-3.5%] text-[#828282]">
        <p>Daniel Jensen Retweeted</p>
      </div> */}

      <div className="my-[2.317rem] px-[1.523rem] pt-[2rem] shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[.635rem]">
          <Image
            src="https://picsum.photos/id/220/40/40"
            alt="dev"
            width={40}
            height={40}
            className="rounded-[8px]"
          />
          <div className="font-medium tracking-[-3.5%] ">
            <p className="text-[1.6rem] leading-[2.4rem] ">Peyton Lyons</p>
            <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
              24 August at 20:43
            </p>
          </div>
        </div>

        <div className="mt-[2rem] mb-[1.4rem]">
          <p className="text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F]">
            Travelling - it leaves you speechless, then turns you into a
            storyteller
          </p>
        </div>

        <div>
          <Image
            src="https://picsum.photos/id/237/311/192"
            alt="dev"
            width={311}
            height={192}
            className="rounded-[8px]"
          />
          <div className="mt-[1.4rem] mb-[0.651rem] flex justify-end gap-[1.6rem]">
            <span className="tweet-stats">449 Comments</span>
            <span className="tweet-stats">59k Retweets</span>
            <span className="tweet-stats">234 Saved</span>
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

        {/* <Reply/> */}
      </div>
    </div>
  );
};

export default Tweet;
