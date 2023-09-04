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

  return (
    <div className="mb-[2.317rem]">
      {/* <p>Daniel Jensen Retweeted</p> */}
      <div className=" w-full rounded-[8px] bg-white  px-[1.523rem] pt-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)] md:px-[2rem] md:shadow-[2px_2px_6px_rgba(0,0,0,0.1)]">
        <div
          onClick={(e) => {
            router.push(`/profile/${userId}`);
          }}
          className="flex w-fit gap-[.635rem]  md:gap-[1.8rem]"
        >
          <div className="flex h-[4rem] w-[4rem] items-center">
            <ProfilePicture userId={userId} width={40} height={40} />
          </div>
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

        <p
          onClick={() => {
            router.push(`/tweet/${tweetId}`);
          }}
          className="mt-[2rem] mb-[1.4rem]  text-[1.60rem] font-normal leading-[2.179rem] tracking-[-3.5%] text-[#4F4F4F] md:text-[1.8rem]"
        >
          {text}
        </p>

        <div>
          <div>
            <TweetMedia images={media} />
          </div>

          <div className="mt-[1.4rem] mb-[0.651rem] flex justify-end gap-[1.6rem]  text-[1.2rem]">
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

        <div className="flex justify-center  border-y-[1px] border-[#F2F2F2] py-[.382rem]">
          <button onClick={handleCommentBtnClick} className="tweet-icons-btn">
            <MdOutlineModeComment className="tweet-icons" />
            <span className="hidden md:block">Comment</span>
          </button>
          <button
            onClick={() => handleRetweet(tweetId, currentUserId, retweets)}
            className={` tweet-icons-btn ${
              retweets.includes(currentUserId) ? "text-[#27AE60] " : ""
            }`}
          >
            <FaRetweet
              className="tweet-icons"
              style={
                retweets.includes(currentUserId) ? { color: "#27AE60" } : {}
              }
            />
            <span className="hidden md:block">Retweet</span>
          </button>
          <button
            onClick={() => {
              handleLike(tweetId, currentUserId, likes);
            }}
            className={` tweet-icons-btn ${
              likes.includes(currentUserId) ? "text-[#EB5757] " : ""
            }`}
          >
            <AiOutlineHeart
              className="tweet-icons"
              style={likes.includes(currentUserId) ? { color: "#EB5757" } : {}}
            />
            <span className="hidden md:block">Like</span>
          </button>
          <button
            onClick={() => {
              handleBookmark(tweetId, currentUserId, bookmarkedBy);
            }}
            className={` tweet-icons-btn ${
              bookmarkedBy.includes(currentUserId) ? "text-[#2D9CDB] " : ""
            }`}
          >
            <HiOutlineBookmark
              className="tweet-icons"
              style={
                bookmarkedBy.includes(currentUserId) ? { color: "#2D9CDB" } : {}
              }
            />
            <span className="hidden md:block">Save</span>
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
