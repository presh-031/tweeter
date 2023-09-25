import { LayoutProps } from "@/typings";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AppNav, NavBar, WithAuthUser } from "../index";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Layout = ({ children }: LayoutProps) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#eee] bg-opacity-40`}
    >
      <Toaster />
      {user && <NavBar />}
      {children}
      {user && (
        <div className="md:hidden">
          <AppNav />
        </div>
      )}
    </div>
  );
};

export default Layout;
