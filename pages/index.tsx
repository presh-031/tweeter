import AllTweets from "@/components/AllTweets";
import NewTweet from "@/components/NewTweet";
import withAuthUser from "@/components/WithAuthUser";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

const index = () => {
  const { state } = useContext(UserContext);

  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <div>
        <div>
          <NewTweet />
          <p>{state}</p>
          {/* Tweet container, where we'll transform the tweets data returned */}
          <AllTweets />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default withAuthUser(index);
// export default index;
