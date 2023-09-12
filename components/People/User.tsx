import { userServicesProps } from "@/typings";
import Image from "next/image";
import React from "react";
import ProfilePicture from "../ProfilePicture";
import Follow from "../ui/Follow";
import { useRouter } from "next/router";
import UnFollow from "../ui/UnFollow";
import CoverImage from "../CoverImage";

export type userType = {
  userId: string;
  bio: string;
  createdAt: string;
  displayName: string;
  email: string;
  followers: string[];
  following: string[];
  userName: string;
  bookmarkedTweets: string[];
};

const User = ({
  profileOwnerInfo,
  profileOwnerId,
  authUserId,
  authUserInfo,
}: userServicesProps) => {
  const router = useRouter();
  const { uid, userName, displayName, followers, bio } = profileOwnerInfo;

  return (
    <div className="w-full  bg-white  px-[1.5rem] pt-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)]  hover:cursor-pointer">
      <div className="flex items-center justify-between">
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${uid}`);
          }}
          className="flex w-fit gap-[.635rem] "
        >
          <div className="flex h-[4rem] w-[4rem] items-center overflow-hidden rounded-[8px]">
            <ProfilePicture userId={uid} width={40} height={40} />
          </div>
          <div className="font-medium tracking-[-3.5%]">
            <div className="flex  items-center gap-2 leading-[2.4rem]">
              <span className="text-[1.6rem]">{userName}</span>
              <span className="text-[1.2rem] text-[#555555]">
                {displayName && `@${displayName}`}
              </span>
            </div>
            <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
              {followers.length}{" "}
              {followers.length > 1 ? "followers" : "follower"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[2rem] mb-[1.4rem]">
        <p className="text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F] md:text-[1.8rem]">
          {bio}
        </p>
      </div>

      <div className="h-[10rem] overflow-hidden  md:h-[16.8rem]">
        <CoverImage userId={profileOwnerId} />
      </div>

      <div className="my-[1.4rem] w-fit">
        {profileOwnerInfo.followers.includes(authUserId) ? (
          <UnFollow
            profileOwnerInfo={profileOwnerInfo}
            profileOwnerId={profileOwnerId}
            authUserId={authUserId}
            authUserInfo={authUserInfo}
          />
        ) : (
          <Follow
            profileOwnerInfo={profileOwnerInfo}
            profileOwnerId={profileOwnerId}
            authUserId={authUserId}
            authUserInfo={authUserInfo}
          />
        )}
      </div>

      <div className="border-b-[1px] border-[#F2F2F2] "></div>
    </div>
  );
};

export default User;
