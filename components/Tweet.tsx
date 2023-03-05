import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import Image from "next/image";
import { MdOutlineModeComment } from "react-icons/md";
const Tweet = () => {
  return (
    <div>
      {/* Idea: Vertical slideshow of who retweeted. Scrolls automatically every 2secs */}
      <div className="mb-[1rem] mt-[2.7rem] text-[1.4rem] font-normal leading-[1.9rem] tracking-[-3.5%] text-[#828282]">
        <p>Daniel Jensen Retweeted</p>
      </div>

      <div className="outline">
        <div>
          <div>
            <Image />
          </div>
          <div>
            <p>Peyton Lyons</p>
            <p>24 August at 20:43</p>
          </div>
        </div>

        <div>
          <p>
            Travelling - it leaves you speechless, then turns you into a
            storyteller
          </p>
        </div>

        <div>
          <Image />
        </div>

        <div>
          <button>
            <MdOutlineModeComment />
            Comment
          </button>
          <button>
            <FaRetweet />
            Retweet
          </button>
          <button>
            <AiOutlineHeart />
            Likes
          </button>
          <button>
            <HiOutlineBookmark />
            Save
          </button>
        </div>

        {/* <Reply/> */}
      </div>
    </div>
  );
};

export default Tweet;
