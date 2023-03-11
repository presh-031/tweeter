import Image from "next/image";
import TestTweet from "../components/TestTweet";

const profile = () => {
  return (
    <div className="px-[1.90rem] ">
      <div>
        <Image />
      </div>
      <div>
        <div>
          <Image />
        </div>
        <div>
          <div>
            <h1>Daniel Jensen</h1>
            <p>
              <span>2,569</span> Following
            </p>
            <p>
              <span>10.8k</span>Followers
            </p>
          </div>
          <p>Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰</p>
        </div>
        <div>
          <button>Follow</button>
        </div>
      </div>

      <div>
        {/* <div></div> */}
        <div>
          <TestTweet />
          <TestTweet />
        </div>
      </div>
    </div>
  );
};

export default profile;
