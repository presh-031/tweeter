import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import withAuthUser from "@/components/WithAuthUser";

const index = () => {
  return (
    <div className=" px-[1.90rem]">
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

export default withAuthUser(index);
// export default index;
