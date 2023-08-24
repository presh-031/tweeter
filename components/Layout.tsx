import { LayoutProps } from "@/typings";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NavBar, AppNav } from "../index";
// Universal app font setup
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isSignInPage = router.pathname === "/sign-in";
  const isLoginPage = router.pathname === "/log-in";

  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#eee] bg-opacity-40`}
    >
      <Toaster />
      {!isSignInPage && !isLoginPage && <NavBar />}
      {children}
      {!isSignInPage && !isLoginPage && <AppNav />}
    </div>
  );
};

export default Layout;
