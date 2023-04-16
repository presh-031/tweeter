import AllTweets from "@/components/AllTweets";
import NewTweet from "@/components/NewTweet";
import withAuthUser from "@/components/WithAuthUser";

const index = () => {
  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <div>
        <div>
          <NewTweet />
          <AllTweets />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default withAuthUser(index);
// export default index;
