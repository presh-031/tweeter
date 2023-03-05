import Image from "next/image";
import { MdOutlineImage } from "react-icons/md";
import dev from "../assets/devchallenges.png";

const NewTweet = () => {
  return (
    <div className="mt-[1.469rem] px-[1.39rem] py-[1.091rem] outline drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
      <p className="border-b-[1px] border-[#f2f2f2] pb-[.74rem] text-[1.2rem] font-semibold leading-[1.8rem] tracking-[-3.5%] text-[#4F4F4F]">
        Tweet something
      </p>
      <div className="flex outline">
        <Image src={dev} alt="dev" className="h-[4rem] w-[4rem]" />
        <input
          className="w-full pl-[1.2rem] text-[1.6rem] font-medium leading-[2.179rem] tracking-[-3.5%] outline-none placeholder:text-[#bdbdbd]"
          type="text"
          placeholder="What's happening?"
        />
      </div>
      <div className="mt-[3rem] flex justify-between">
        <div>
          <MdOutlineImage />
          {/* <p>Everyone can reply</p> */}
        </div>
        <input
          className="rounded-[4px] bg-blueish px-[2.4rem] py-[.8rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white"
          type="submit"
          value="Tweet"
        />
      </div>
    </div>
  );
};

export default NewTweet;
