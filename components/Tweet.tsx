import { auth, db } from "@/config/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { MdOutlineModeComment } from "react-icons/md";
import AddComment from "./AddComment";
import TweetMedia from "./TweetMedia";

type timestampType = {
  seconds: number;
  nanoseconds: number;
};
type tweetProps = {
  tweetId: string;
  // comments: {}[];
  likes: string[];
  // numOfLikes: number;
  // numOfRetweets: number;
  retweets: string[];
  media: string[];
  text: string;
  timestamp: timestampType;
  userId: string;
};

// Logic to convert timestamp to required format
const formatDate = (timestamp: timestampType) => {
  const date = moment.unix(timestamp.seconds).utcOffset(1);
  const formattedDate = date.format("DD MMMM [at] HH:mm");
  return formattedDate;
};

const Tweet = ({
  tweetId,
  // comments,
  likes,
  // numOfLikes,
  retweets,
  // numOfRetweets,
  media,
  text,
  timestamp,
  userId,
}: tweetProps) => {
  const router = useRouter();
  // Logic to get info about the user with userId for each tweet
  const userRef = doc(db, "users", userId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    };

    getUser();
  }, []);

  // Logic to format date for tweet timestamps
  const formattedDate = formatDate(timestamp);

  // Logic to handle tweet like and unlike
  // Liking and unLiking should be done by currently auth user
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser ? currentUser.uid : "";

  const handleLike = async () => {
    const tweetDocRef = doc(db, "tweets", tweetId);

    try {
      await updateDoc(tweetDocRef, {
        likes: [...likes, currentUserId],
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleUnlike = async () => {
    const tweetDocRef = doc(db, "tweets", tweetId);

    try {
      await updateDoc(tweetDocRef, {
        likes: likes.filter((like) => like !== currentUserId),
      });
    } catch (err) {
      alert(err);
    }
  };

  // Logic to handle tweet retweets
  // Retweeting should be done by currently auth user
  const handleRetweet = async () => {
    const tweetDocRef = doc(db, "tweets", tweetId);

    try {
      await updateDoc(tweetDocRef, {
        retweets: [...retweets, currentUserId],
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleUnretweet = async () => {
    const tweetDocRef = doc(db, "tweets", tweetId);

    // retweets still not adding up in tweets list
    try {
      await updateDoc(tweetDocRef, {
        retweets: retweets.filter((retweet) => retweet !== currentUserId),
      });
    } catch (err) {
      alert(err);
    }
  };

  // Logic to handle rendering of commenting component
  const [showAddComment, setShowAddComment] = useState(false);

  const handleCommentBtnClick = () => {
    setShowAddComment((prevState) => !prevState);
  };

  // Logic to handle fetching of tweet comments
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
    (comment) => comment.tweetId === tweetId
  );

  console.log(tweetComments);

  const handleTweetClick = (e) => {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      console.log("parent clicked");
      // 👇 your logic here
    }

    // if (e.currentTarget.id === "profile" || e.currentTarget.id === "button") {
    //   e.stopPropagation();
    //   console.log(`${e.currentTarget.id} clicked`);
    // } else {
    //   // If any other element inside the parent is clicked, execute the parent's click event
    //   console.log("Parent clicked");
    // }
  };

  return (
    // Clicking the tweet generally should show you more info about the tweet
    <div onClick={handleTweetClick} className="my-[2.317rem]">
      {/* <p>Daniel Jensen Retweeted</p> */}
      <div className=" rounded-[8px] px-[1.523rem] pt-[2rem] shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:cursor-pointer hover:shadow-xl">
        {/* Clicking here should take you to the user profile of who made the tweet */}
        <div
          onClick={() => {
            router.push(`/profile/${userId}`);
          }}
          className="flex w-fit gap-[.635rem]"
        >
          <Image
            src={
              user.profilePictureUrl
                ? user.profilePictureUrl
                : // Default image shown should be a placeholder, actually
                  "https://picsum.photos/id/1/40/40"
            }
            alt="profile-pic"
            width={40}
            height={40}
            className="rounded-[8px]"
          />
          <div className="font-medium tracking-[-3.5%]">
            <p className="text-[1.6rem] leading-[2.4rem]">
              {user.displayName ? `@${user.displayName}` : user.userName}
            </p>
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
          {/* Clicking the media should show you the images better */}
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
            <span className="tweet-stats">234 Saved</span>
          </div>
        </div>

        <div className="flex justify-center border-y-[1px] border-[#F2F2F2] py-[.382rem]">
          <button
            id="button"
            onClick={handleCommentBtnClick}
            className="tweet-icons-btn"
          >
            <MdOutlineModeComment className="tweet-icons" />
            <span className="hidden">Comment</span>
          </button>
          <button
            id="button"
            onClick={() => {
              retweets.includes(currentUserId)
                ? handleUnretweet()
                : handleRetweet();
            }}
            className="tweet-icons-btn"
          >
            <FaRetweet
              style={retweets.includes(currentUserId) ? { color: "red" } : {}}
              className="tweet-icons"
            />
            <span className="hidden">Retweet</span>
          </button>
          <button
            id="button"
            onClick={() => {
              likes.includes(currentUserId) ? handleUnlike() : handleLike();
            }}
            className="tweet-icons-btn"
          >
            <AiOutlineHeart
              className="tweet-icons"
              style={likes.includes(currentUserId) ? { color: "red" } : {}}
            />
            <span className="hidden">Likes</span>
          </button>
          <button id="button" className="tweet-icons-btn">
            <HiOutlineBookmark className="tweet-icons" />
            <span className="hidden">Save</span>
          </button>
        </div>

        {/* Add comment */}
        {showAddComment && (
          <AddComment
            tweetId={tweetId}
            // comments={tweetComments}
            setShowAddComment={setShowAddComment}
          />
        )}
      </div>
    </div>
  );
};

export default Tweet;
