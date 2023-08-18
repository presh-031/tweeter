import { userInfoType } from "@/typings";
import Image from "next/image";
import React from "react";
import userPlaceholder from "../../assets/user-placeholder.png";
const User = ({
  bio,
  createdAt,
  displayName,
  email,
  followers,
  following,
  headerImageUrl,
  profilePictureUrl,
  userName,
  bookmarkedTweets,
}: userInfoType) => {
  return (
    <div className=" bg-white  px-[1.523rem] pt-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)]  hover:cursor-pointer">
      <div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            // router.push(`/profile/${userId}`);
          }}
          className="flex w-fit gap-[.635rem] "
        >
          <Image
            src={profilePictureUrl ? profilePictureUrl : userPlaceholder}
            alt="profile-pic"
            width={40}
            height={40}
            className="rounded-[8px]"
          />
          <div className="font-medium tracking-[-3.5%]">
            <div className="flex  items-center gap-4 leading-[2.4rem]">
              <span className="text-[1.6rem]">{userName}</span>
              <span className="text-[1.2rem] text-[#555555]">
                {displayName && `@${displayName}`}
              </span>
            </div>
            <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
              {/* {formattedDate} */}
            </p>
          </div>
        </div>

        <div></div>
      </div>

      <div className="mt-[2rem] mb-[1.4rem]">
        <p className="text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F]">
          {bio}
        </p>
      </div>

      {/* <div>
          <div>
            <TweetMedia images={media} />
          </div>
        </div> */}

      <div className="border-b-[1px] border-[#F2F2F2] "></div>
    </div>
  );
};

export default User;
