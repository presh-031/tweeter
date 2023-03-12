import Image from "next/image";
import { SlUserFollow } from "react-icons/sl";
import TestTweet from "../components/TestTweet";
const profile = () => {
  return (
    <>
      <div className=" ">
        <Image
          src="https://picsum.photos/id/220/375/168"
          alt="header-photo"
          width={375}
          height={168}
        />
      </div>
      <div className="px-[1.90rem] ">
        <div className="relative rounded-[1.2rem] px-[1.6rem] pb-[2.316rem] pt-[4.388rem] text-center shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <Image
            src="https://picsum.photos/id/80/116/116"
            alt="header-photo"
            width={116}
            height={116}
            className=" absolute top-[-8.7rem] left-[50%] translate-x-[-50%] rounded-[8px]"
          />
          <div className="">
            <div>
              <h1 className="text-[2.4rem] font-semibold leading-[3.6rem] tracking-[-3.5%] text-[#333333]">
                Daniel Jensen
              </h1>
              <div className="mt-[.4rem] mb-[1.4rem] flex items-center justify-center gap-8 text-[1.2rem] font-medium leading-[1.8rem] tracking-[-3.5%] ">
                <p>
                  <span className="font-semibold">2,569</span> Following
                </p>
                <p>
                  <span className="font-semibold">10.8K</span>Followers
                </p>
              </div>
            </div>
            <p className="mb-[2.563rem] text-[1.8rem] font-normal leading-[2.4rem] tracking-[-3.5%] text-[#828282]">
              Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰
            </p>
          </div>
          <div>
            <button className="mx-auto flex items-center gap-[.4rem] rounded-[4px] bg-[#2F80ED] py-[.80rem]  px-[2.4rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline">
              <SlUserFollow />
              <span>Follow</span>
            </button>
          </div>
        </div>

        <div>
          {/* <div></div> */}
          <div>
            <TestTweet />
            <TestTweet />
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
