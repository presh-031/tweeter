import { LayoutProps } from "@/typings";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AppNav, NavBar, WithAuthUser } from "../index";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isSignUpPage = router.pathname === "/sign-up";
  const isLoginPage = router.pathname === "/log-in";

  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#eee] bg-opacity-40`}
    >
      <Toaster />
      {!isSignUpPage && !isLoginPage && <NavBar />}
      {children}
      {!isSignUpPage && !isLoginPage && (
        <div className="md:hidden">
          <AppNav />
        </div>
      )}
    </div>
  );
};

export default Layout;
