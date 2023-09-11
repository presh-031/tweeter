import { WithAuthUser, NewTweet, AllTweets, People } from "../index";
const Home = () => {
  return (
    <>
      <div className="mx-auto mt-[1.469rem] max-w-[1071px] px-[1.90rem] pb-[9.615rem] md:mt-[2rem] md:px-[2.4rem] lg:flex lg:gap-[2.5rem]">
        <div className="lg:w-full">
          <NewTweet />
          <AllTweets />
        </div>
        <div className="hidden h-fit bg-white lg:block ">
          <p className="mx-[1.523rem] border-b-[1px] border-[#e0e0e0] pt-[1.387rem] pb-[-.5rem] text-[1.2rem] font-semibold leading-normal tracking-[-0.042rem]">
            Who to follow
          </p>
          <div className="flex w-[37.5rem] justify-center">
            <People max={3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuthUser(Home);
