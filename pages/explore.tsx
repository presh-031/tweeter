import { db } from "@/config/firebase";
import { collection, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("top");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Get all user's tweets with the most interactions
  // const tweetsRef = collection(db, "tweets");

  // const tweetsQuery = query(tweetsRef, where("userId", "==", uid));

  // const [tweetsListSnapshot, loading, error] = useCollection(tweetsQuery, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });
  // const topTweets = tweetsListSnapshot?.docs;

  // console.log(topTweets)
  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <ul className="mt-[3.3rem] space-y-[1.2rem] rounded-[.8rem] bg-white py-[2rem] text-[1.4rem] font-semibold leading-normal tracking-[0.049rem]  text-[#828282] shadow-sm">
        <li
          onClick={() => handleTabClick("top")}
          className={` ${
            activeTab === "top" ? "text-blueish" : ""
          } flex items-center  gap-[1.7rem] `}
        >
          <div
            className={`${
              activeTab === "top" ? "bg-blueish" : "bg-transparent"
            } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 `}
          ></div>{" "}
          Top
        </li>
        <li
          onClick={() => handleTabClick("latest")}
          className={` ${
            activeTab === "latest" ? "text-blueish" : ""
          } flex items-center  gap-[1.7rem] `}
        >
          <div
            className={`${
              activeTab === "latest" ? "bg-blueish" : "bg-transparent"
            } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 `}
          ></div>
          Latest
        </li>
        <li
          onClick={() => handleTabClick("people")}
          className={` ${
            activeTab === "people" ? "text-blueish" : ""
          } flex items-center  gap-[1.7rem] `}
        >
          <div
            className={`${
              activeTab === "people" ? "bg-blueish" : "bg-transparent"
            } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 `}
          ></div>{" "}
          People
        </li>
        <li
          onClick={() => handleTabClick("media")}
          className={` ${
            activeTab === "media" ? "text-blueish" : ""
          } flex items-center  gap-[1.7rem] `}
        >
          <div
            className={`${
              activeTab === "media" ? "bg-blueish" : "bg-transparent"
            } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 `}
          ></div>{" "}
          Media
        </li>
      </ul>

      <div></div>
    </div>
  );
};

export default Explore;
