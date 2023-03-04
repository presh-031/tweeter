// Universal app font setup
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <div className={`${jost.className}`}>{children}</div>;
};

export default Layout;
