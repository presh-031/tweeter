import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { userInfoType } from "@/typings";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconContext } from "react-icons";
import { IoMdArrowDropdown } from "react-icons/io";
import logoSmall from "../assets/tweeter-small.svg";
import AppNav from "./AppNav";
import UserNav from "./UserNav";

const Navbar = () => {
  const [userNav, setUserNav] = useState(false);
  const toggleUserNav = () => {
    setUserNav((prevUserNav) => !prevUserNav);
  };

  const router = useRouter();

  const [userInfo, setUserInfo] = useState<userInfoType>({
    bio: "",
    createdAt: "",
    displayName: "",
    email: "",
    followers: [],
    following: [],
    headerImageUrl: "",
    profilePictureUrl: "",
    userName: "",
  });

  // Logic to get current user info for navbar
  const [currentUser, loading, error] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  useEffect(() => {
    if (currentUserId) {
      const getUser = async () => {
        // loading
        const userRef = doc(db, "users", currentUserId);

        try {
          const userSnap = await getDoc(userRef);
          // console.log(userSnap.data());
          const userDoc = userSnap.data();

          setUserInfo(userDoc);
        } catch (err) {
          console.error(err);
        }
      };

      getUser();
    }
  }, [currentUser]);

  return (
    <div className="flex justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={logoSmall} alt="tweeter" />
      </div>

      <div className="hidden">
        <AppNav />
      </div>

      <div onClick={toggleUserNav} className="flex items-center gap-4 ">
        <Image
          src={
            userInfo.profilePictureUrl
              ? userInfo.profilePictureUrl
              : // Default image shown should be a placeholder, actually
                "https://picsum.photos/id/1/40/40"
          }
          alt="profile-pic"
          width={32}
          height={32}
          className="h-[3.2rem] w-[3.2rem] rounded-[8px] outline"
        />

        {/* Normally hidden on mobile view */}
        <p className="hidden">
          {" "}
          {userInfo.displayName
            ? `@${userInfo.displayName}`
            : userInfo.userName}
        </p>

        <IconContext.Provider value={{ className: "react-icons" }}>
          <IoMdArrowDropdown />
        </IconContext.Provider>
      </div>

      {userNav && <UserNav toggleUserNav={toggleUserNav} />}
    </div>
  );
};

export default Navbar;
