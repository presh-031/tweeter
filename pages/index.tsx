import AllTweets from "@/components/AllTweets";
import NewTweet from "@/components/NewTweet";
import WithAuthUser from "@/components/WithAuthUser";

const Home = () => {
  return (
    <div className=" px-[1.90rem] pb-[9.615rem]">
      <>
        <div>
          <NewTweet />
          <AllTweets />
        </div>
        <div></div>
      </>
    </div>
  );
};

export default WithAuthUser(Home);
// export default index;
