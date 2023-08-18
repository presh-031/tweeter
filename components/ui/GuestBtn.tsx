import React from "react";
import { FaUser } from "react-icons/fa";

const GuestBtn = () => {
  const disabled = true;

  return (
    <button
      disabled={disabled}
      className={` ${
        disabled ? "opacity-20" : ""
      } flex w-full items-center justify-center gap-2 rounded-xl border-[1px] border-gray-800 p-4 text-center text-xl`}
    >
      <FaUser />
      <span> continue as guest</span>
    </button>
  );
};

export default GuestBtn;
