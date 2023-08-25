import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { userInfoType } from "@/typings";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import logo from "../assets/tweeter.svg";
import userPlaceholder from "../assets/user-placeholder.png";
import { AppNav, UserNav } from "../index";

const NavBar = () => {
  const router = useRouter();
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  // firebase hooks breaks stuff here.
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(doc(db, "users", authUserId));
      setUser(userSnap.data());
    };

    getUser();
  }, [authUserId]);

  const [showUserNav, setShowUserNav] = useState(false);
  const toggleShowUserNav = () => {
    setShowUserNav((prevShowUserNav) => !prevShowUserNav);
  };

  return (
    <div className="flex justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={logo} alt="tweeter" />
      </div>

      <div className="hidden">
        <AppNav />
      </div>

      <div onClick={toggleShowUserNav} className="flex items-center">
        <Image
          src={
            user?.profilePictureUrl ? user.profilePictureUrl : userPlaceholder
          }
          alt="profile-pic"
          width={32}
          height={32}
          className="h-[3.2rem] w-[3.2rem] rounded-[8px] outline"
        />

        <p className="w-12 truncate text-lg">{user?.displayName}</p>

        {showUserNav ? (
          <RiArrowUpSFill className="text-3xl" />
        ) : (
          <RiArrowDownSFill className="text-3xl" />
        )}
      </div>
      {showUserNav && <UserNav toggleShowUserNav={toggleShowUserNav} />}
    </div>
  );
};

export default NavBar;
