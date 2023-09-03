import { ProfileInfoProps } from "@/typings";

const ProfileInfo = ({
  userName,
  following,
  followers,
  bio,
}: ProfileInfoProps) => {
  return (
    <div className="">
      <div>
        <h1 className="mt-[2.5rem] text-[2.4rem] font-semibold leading-[3.6rem] tracking-[-3.5%] text-[#333333]">
          {userName}
        </h1>
        <div className="mt-[.4rem] mb-[1.4rem] flex items-center justify-center gap-8 text-[1.2rem] font-medium leading-[1.8rem] tracking-[-3.5%] text-[#828282] ">
          <p>
            <span className="font-semibold text-[#333333]">
              {following.length}
            </span>{" "}
            Following
          </p>
          <p>
            <span className="font-semibold text-[#333333]">
              {followers.length}
            </span>{" "}
            Followers
          </p>
        </div>
      </div>
      <p className="mb-[2.563rem] text-[1.8rem] font-normal leading-[2.4rem] tracking-[-3.5%] text-[#828282]">
        {bio}
      </p>
    </div>
  );
};

export default ProfileInfo;
