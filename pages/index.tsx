import AllTweets from "@/components/AllTweets";
import NewTweet from "@/components/NewTweet";
import withAuthUser from "@/components/WithAuthUser";

const index = () => {
  // const { state, setState } = useContext(UserContext);

  // console.log(state);
  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <div>
        <div>
          <NewTweet />
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
