import React from "react";

const Explore = () => {
  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <ul className="mt-[3.3rem] space-y-[1.2rem] rounded-[.8rem] bg-white py-[2rem] text-[1.4rem] font-semibold leading-normal tracking-[0.049rem]  text-[#828282] shadow-sm">
        <li className="flex items-center  gap-[1.7rem] text-blueish">
          <div className="h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] bg-[#2F80ED]"></div>
          Top
        </li>
        <li className="flex items-center gap-[1.7rem]">
          <div className="h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] bg-transparent"></div>
          Latest
        </li>
        <li className="flex items-center gap-[1.7rem]">
          <div className="h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] bg-transparent"></div>
          People
        </li>
        <li className="flex items-center gap-[1.7rem]">
          <div className="h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] bg-transparent"></div>
          Media
        </li>
      </ul>

      <div></div>
    </div>
  );
};

export default Explore;
