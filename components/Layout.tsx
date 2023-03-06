import Navbar from "./Navbar";
// Universal app font setup
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/sign-in";
  return (
    <div className={`${poppins.className} bg-[#eee] bg-opacity-40`}>
      {!isHomePage && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
