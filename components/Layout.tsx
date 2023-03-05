import Navbar from "./Navbar";
// Universal app font setup
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`${poppins.className} bg-[#eee] bg-opacity-40`}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
