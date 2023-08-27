import { auth, db } from "@/config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TweetProps } from "@/typings";
import { formatDateForTweet } from "@/utils/formatDate";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { MdOutlineModeComment } from "react-icons/md";
import { TweetMedia, AddComment } from "../../index";
import {
  handleBookmark,
  handleLike,
  handleRetweet,
} from "@/helpers/tweetHelpers";
import ProfilePicture from "../ProfilePicture";

const Tweet = ({
  tweetId,
  likes,
  retweets,
  media,
  text,
  timestamp,
  userId,
  bookmarkedBy,
}: TweetProps) => {
  const router = useRouter();
  // Logic to get info about the user with userId for each tweet
  // const userRef = doc(db, "users", userId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(doc(db, "users", userId));
      setUser(userSnap.data());
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format date for tweet timestamps
  const formattedDate = formatDateForTweet(timestamp);

  // For logics to handle tweet like and unlike
  // Liking and unLiking should be done by currently auth user
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser ? currentUser.uid : "";

  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const handleCommentBtnClick = (e: any) => {
    e.stopPropagation();
    setShowAddComment((prevState) => !prevState);
  };

  // Still querying for all comments then filtering with uid and storing in userTweets state, should use a more specific query.
  const commentsRef = collection(db, "comments");
  const [commentsListSnapshot, loading, error] = useCollection(commentsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const allCommentsCol = commentsListSnapshot?.docs;

  const allComments: {}[] = [];
  allCommentsCol?.forEach((comment) => {
    allComments.push(comment.data());
  });
  const tweetComments = allComments.filter(
    (comment: any) => comment.tweetId === tweetId
  );

  // tweetHelpers for tweet interactions.
  const handleTweetClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/tweet/${tweetId}`);
  };

  const handleLikeBtn = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    handleLike(tweetId, currentUserId, likes);
  };

  const handleRetweetBtn = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    handleRetweet(tweetId, currentUserId, retweets);
  };

  const handleBookmarkBtn = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    handleBookmark(tweetId, currentUserId, bookmarkedBy);
  };

  return (
    <div onClick={handleTweetClick} className="my-[2.317rem]">
      {/* <p>Daniel Jensen Retweeted</p> */}
      <div className=" rounded-[8px] bg-white  px-[1.523rem] pt-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)]  hover:cursor-pointer">
        {/* Clicking here should take you to the user profile of who made the tweet */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${userId}`);
          }}
          className="flex w-fit gap-[.635rem]"
        >
          <ProfilePicture userId={userId} width={40} height={40} />

          <div className="font-medium tracking-[-3.5%]">
            <div className="flex  items-center gap-4 leading-[2.4rem]">
              <span className="text-[1.6rem]">{user.userName}</span>
              <span className="text-[1.2rem] text-[#555555]">
                {user.displayName && `@${user.displayName}`}
              </span>
            </div>
            <p className="text-[1.2rem] leading-[1.63rem] text-[#bdbdbd]">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="mt-[2rem] mb-[1.4rem]">
          <p className="text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F]">
            {text}
          </p>
        </div>

        <div>
          <div>
            <TweetMedia images={media} />
          </div>

          <div className="mt-[1.4rem] mb-[0.651rem] flex justify-end gap-[1.6rem]">
            <span className="tweet-stats">
              {likes.length} {likes.length > 1 ? "Likes" : "Like"}
            </span>
            <span className="tweet-stats">
              {retweets.length} {retweets.length > 1 ? "Retweets" : "Retweet"}
            </span>
            <span className="tweet-stats">
              {tweetComments.length}{" "}
              {tweetComments.length > 1 ? "Comments" : "Comment"}
            </span>
            <span className="tweet-stats">{bookmarkedBy.length} Saved</span>
          </div>
        </div>

        <div className="flex justify-center border-y-[1px] border-[#F2F2F2] py-[.382rem]">
          <button onClick={handleCommentBtnClick} className="tweet-icons-btn">
            <MdOutlineModeComment className="tweet-icons" />
            <span className="hidden">Comment</span>
          </button>
          <button onClick={handleRetweetBtn} className="tweet-icons-btn">
            <FaRetweet
              style={retweets.includes(currentUserId) ? { color: "red" } : {}}
              className="tweet-icons"
            />
            <span className="hidden">Retweet</span>
          </button>
          <button onClick={handleLikeBtn} className="tweet-icons-btn">
            <AiOutlineHeart
              className="tweet-icons"
              style={likes.includes(currentUserId) ? { color: "red" } : {}}
            />
            <span className="hidden">Likes</span>
          </button>
          <button onClick={handleBookmarkBtn} className="tweet-icons-btn">
            <HiOutlineBookmark
              className="tweet-icons"
              style={
                bookmarkedBy.includes(currentUserId) ? { color: "blue" } : {}
              }
            />
            <span className="hidden">Save</span>
          </button>
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
