import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const index = () => {
  // To get info about current user in users collection, use auth state to get current user id and find the user with the id in the users collection.
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
