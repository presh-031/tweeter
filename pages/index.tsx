import AllTweets from "@/components/AllTweets";
import NewTweet from "@/components/NewTweet";
import WithAuthUser from "@/components/WithAuthUser";

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

export default WithAuthUser(index);
// export default index;
