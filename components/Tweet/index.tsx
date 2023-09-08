import { auth } from "@/config/firebase";
import { useState } from "react";
import { TweetProps } from "@/typings";
import { useAuthState } from "react-firebase-hooks/auth";
import { TweetMedia, AddComment } from "../../index";
import TweetUserInfo from "./TweetUserInfo";
import TweetText from "./TweetText";
import RetweetBtn from "./RetweetBtn";
import LikeBtn from "./LikeBtn";
import BookmarkBtn from "./BookmarkBtn";
import CommentBtn from "./CommentBtn";
import TweetStats from "./TweetStats";

const Tweet = ({ tweetId, media, text, timestamp, userId }: TweetProps) => {
  // For logics to handle tweet like and unlike
  // Liking and unLiking should be done by currently auth user
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser ? currentUser.uid : "";

  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const handleCommentBtnClick = (e: any) => {
    e.stopPropagation();
    setShowAddComment((prevState) => !prevState);
  };

  return (
    <div className="mb-[2.317rem]">
      <div className=" w-full rounded-[8px] bg-white  px-[1.523rem] pt-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)] md:px-[2rem] md:shadow-[2px_2px_6px_rgba(0,0,0,0.1)]">
        <TweetUserInfo userId={userId} timestamp={timestamp} />

        <TweetText tweetId={tweetId} text={text} />

        <div>
          <div>
            <TweetMedia images={media} />
          </div>

          <TweetStats tweetId={tweetId} />
        </div>

        <div className="flex justify-center  border-y-[1px] border-[#F2F2F2] py-[.382rem]">
          <CommentBtn handleCommentBtnClick={handleCommentBtnClick} />
          <RetweetBtn tweetId={tweetId} currentUserId={currentUserId} />
          <LikeBtn tweetId={tweetId} currentUserId={currentUserId} />
          <BookmarkBtn tweetId={tweetId} currentUserId={currentUserId} />
        </div>

        {/* Add comment */}
        {showAddComment && (
          <AddComment tweetId={tweetId} setShowAddComment={setShowAddComment} />
        )}
      </div>
    </div>
  );
};

export default Tweet;
