import {
  WithAuthUser,
  LatestTweets,
  TopTweets,
  ExploreTabs,
  People,
} from "../index";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const storedValue = localStorage.getItem("activeTab");
  const [activeTab, setActiveTab] = useState(storedValue || "top");
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mx-auto max-w-[1071px] px-[1.90rem] pt-[3.3rem] pb-[9.615rem] lg:flex lg:gap-[2.4rem]">
      <ExploreTabs activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className="mt-16 flex  w-full justify-center md:mt-20 lg:mt-0">
        {activeTab === "top" && <TopTweets />}
        {activeTab === "latest" && <LatestTweets />}
        {activeTab === "people" && <People />}
        {/* {activeTab === "latest" && <MediaTweets />} */}
      </div>
    </div>
  );
};

export default WithAuthUser(Explore);
