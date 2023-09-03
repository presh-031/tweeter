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
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <ExploreTabs activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className="md:mt-22 mt-16">
        {activeTab === "top" && <TopTweets />}
        {activeTab === "latest" && <LatestTweets />}
        {activeTab === "people" && <People />}
        {/* {activeTab === "latest" && <MediaTweets />} */}
      </div>
    </div>
  );
};

export default WithAuthUser(Explore);
