import { useState } from "react";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const page = router.pathname;
  const [activeTab, setActiveTab] = useState(page);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    router.push(tabName);
  };
  return (
    <nav className="flex  justify-between gap-[8rem] text-[1.4rem] font-medium leading-normal tracking-[-0.049rem]">
      <p
        onClick={() => handleTabClick("/")}
        className={`${
          activeTab === "/" ? "text-[#2F80ED]" : "text-[#828282]"
        } cursor-pointer`}
      >
        Home
      </p>

      <p
        onClick={() => handleTabClick("/explore")}
        className={`${
          activeTab === "/explore" ? "text-[#2F80ED]" : "text-[#828282]"
        } cursor-pointer`}
      >
        Explore
      </p>

      <p
        onClick={() => handleTabClick("/bookmarks")}
        className={`${
          activeTab === "/bookmarks" ? "text-[#2F80ED]" : "text-[#828282]"
        } cursor-pointer`}
      >
        Bookmarks
      </p>
    </nav>
  );
};

export default Nav;
