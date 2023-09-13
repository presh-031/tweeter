import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { UserNavProps } from "@/typings";

const UserNav = ({ authUserId, toggleShowUserNav }: UserNavProps) => {
  const router = useRouter();
  const [signOut] = useSignOut(auth);

  const handleProfileClick = () => {
    router.push(`/profile/${authUserId}`);
    toggleShowUserNav();
  };

  const handleMyAccountClick = () => {
    router.push("/edit-profile");
    toggleShowUserNav();
  };

  const handleLogOut = async () => {
    const success = await signOut();
    if (success) {
      toast.success("Signed out Successfully.");
    }
  };

  return (
    // backdrop for nav
    <ul className="absolute right-[1.7rem] top-[5.2rem] z-[100] flex flex-col gap-[.4rem] rounded-[12px] bg-white px-[1.392rem] py-[1.527rem] text-[1.2rem] leading-[1.634rem]  tracking-[-3.5%] text-[#4F4F4F] shadow-lg">
      <li
        onClick={handleProfileClick}
        className="flex cursor-pointer items-center gap-[1.167rem] rounded-[8px] py-[1.1rem] pr-12 pl-[1.4rem] hover:bg-[#f2f2f2]"
      >
        <CgProfile />
        Profile
      </li>

      <li
        onClick={handleMyAccountClick}
        className="flex cursor-pointer items-center gap-[1.167rem] rounded-[8px] py-[1.1rem] pr-12 pl-[1.4rem] hover:bg-[#f2f2f2]"
      >
        <IoMdSettings />
        My account
      </li>

      <li className="my-[.71rem] border-t-[1px] border-[#e0e0e0]"></li>

      <li
        onClick={handleLogOut}
        className="flex cursor-pointer items-center gap-[1.167rem] rounded-[8px] py-[1.1rem] pr-12 pl-[1.4rem] text-[#EB5757] hover:bg-[#f2f2f2]"
      >
        <TbLogout />
        Logout
      </li>
    </ul>
  );
};

export default UserNav;
