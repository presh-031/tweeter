import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { userInfoType } from "@/typings";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import logo from "../assets/tweeter.svg";

import { AppNav, UserNav } from "../index";

const Navbar = () => {
  const [showUserNav, setShowUserNav] = useState(false);

  const toggleShowUserNav = () => {
    setShowUserNav((prevShowUserNav) => !prevShowUserNav);
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

          if (userDoc) {
            const userInfoData: userInfoType = {
              bio: userDoc.bio,
              createdAt: userDoc.createdAt,
              displayName: userDoc.displayName,
              email: userDoc.email,
              followers: userDoc.followers,
              following: userDoc.following,
              headerImageUrl: userDoc.headerImageUrl,
              profilePictureUrl: userDoc.profilePictureUrl,
              userName: userDoc.userName,
            };

            setUserInfo(userInfoData);
            // setUserInfo(userDoc);
          }
        } catch (err) {
          console.error(err);
        }
      };

      getUser();
    }
    // }, [currentUser]);
  }, [currentUserId]);

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

      <div onClick={toggleShowUserNav} className="flex items-center gap-4 ">
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

        <p className="text-lg">
          {userInfo.displayName
            ? `@${userInfo.displayName}`
            : userInfo.userName}
        </p>

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

export default Navbar;
