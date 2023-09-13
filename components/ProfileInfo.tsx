import { ProfileInfoProps } from "@/typings";

const ProfileInfo = ({
  userName,
  following,
  followers,
  bio,
}: ProfileInfoProps) => {
  return (
    <div className="lg:w-[427px]">
      <div className="lg:flex lg:items-center">
        <h1 className="mt-[2.5rem] text-[2.4rem] font-semibold leading-[3.6rem] tracking-[-3.5%] text-[#333333] lg:m-0 lg:mr-[2.6rem] lg:text-left">
          {userName}
        </h1>
        <div className="mt-[.4rem] mb-[1.4rem] flex items-center justify-center gap-8 text-[1.2rem] font-medium leading-[1.8rem] tracking-[-3.5%] text-[#828282] lg:m-0 lg:gap-[2.6rem] ">
          <p className="lg:mr-[2.6rem] lg:flex lg:gap-2">
            <span className="font-semibold  text-[#333333]">
              {following.length}{" "}
            </span>
            Following
          </p>
          <p className=" lg:flex lg:gap-2">
            <span className="font-semibold text-[#333333]">
              {followers.length}{" "}
            </span>
            Followers
          </p>
        </div>
      </div>
      <p className="mb-[2.563rem] text-[1.8rem] font-normal leading-[2.4rem] tracking-[-3.5%] text-[#828282] lg:m-0 lg:mt-[2.2rem] lg:text-left">
        {bio}
      </p>
    </div>
  );
};

export default ProfileInfo;
