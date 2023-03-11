import { Poppins } from "next/font/google";
import AppNav from "./AppNav";
import Navbar from "./Navbar";
// Universal app font setup
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // const { state, setState } = useContext(UserContext);

  const router = useRouter();
  const isHomePage = router.pathname === "/sign-in";
  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#eee] bg-opacity-40`}
    >
      {/* <UserProvider> */}
      {!isHomePage && <Navbar />}
      {children}
      {!isHomePage && <AppNav />}
      {/* </UserProvider> */}
    </div>
  );
};

export default Layout;
