import ExploreTabs from "@/components/ExploreTabs";
import LatestTweets from "@/components/LatestTweets";
import TopTweets from "@/components/TopTweets";
import React, { useState } from "react";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("top");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <ExploreTabs activeTab={activeTab} handleTabClick={handleTabClick} />

      <div>
        {activeTab === "top" && <TopTweets />}
        {activeTab === "latest" && <LatestTweets />}
        {/* {activeTab === "latest" && <People/> } */}
        {/* {activeTab === "latest" && <MediaTweets/> } */}
      </div>
    </div>
  );
};

export default Explore;
