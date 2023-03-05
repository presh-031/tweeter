import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const index = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className=" px-[1.90rem]">
      {/* <Navbar /> */}
      <div>
        <div>
          <NewTweet />
          <Tweet />
          <Tweet />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default index;
