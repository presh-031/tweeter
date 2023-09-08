import { auth, db } from "@/config/firebase";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
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
import TweetUserInfo from "./TweetUserInfo";
import TweetText from "./TweetText";
import RetweetBtn from "./RetweetBtn";
import LikeBtn from "./LikeBtn";
import BookmarkBtn from "./BookmarkBtn";
import CommentBtn from "./CommentBtn";

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

  // check if tweet has been bookmarked by authUser
  const bookmarksRef = collection(db, "bookmarks");
  const bookmarksQuery = query(
    bookmarksRef,
    where("userId", "==", currentUserId),
    where("tweetId", "==", tweetId)
  );
  const [bookmarkedTweet, bookmarkedLoading, bookmarkedError] = useCollection(
    bookmarksQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // check if tweet has been liked by authUser
  const likesRef = collection(db, "likes");
  const likesQuery = query(
    likesRef,
    where("userId", "==", currentUserId),
    where("tweetId", "==", tweetId)
  );
  const [likedTweet, likedLoading, likedError] = useCollection(likesQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // check if tweet has been retweeted by authUser
  const retweetsRef = collection(db, "retweets");
  const retweetsQuery = query(
    retweetsRef,
    where("userId", "==", currentUserId),
    where("tweetId", "==", tweetId)
  );
  const [retweetedTweet, retweetedLoading, retweetedError] = useCollection(
    retweetsQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // console.log("bookmarks", bookmarkedTweet?.docs[0].id);
  // if (bookmarkedTweet?.docs.length) {
  //   bookmarkedTweet.docs.forEach((doc) => {
  //     console.log("Document ID:", doc.id); // This line gets the document ID
  //     console.log("Document data:", doc.data()); // This line gets the document data
  //   });
  // }
  // console.log(bookmarkedTweet?.docs.length);
  return (
    <div className="mb-[2.317rem]">
      <div className=" w-full rounded-[8px] bg-white  px-[1.523rem] pt-[2rem] shadow-[2px_2px_4px_rgba(0,0,0,0.05)] md:px-[2rem] md:shadow-[2px_2px_6px_rgba(0,0,0,0.1)]">
        <TweetUserInfo userId={userId} timestamp={timestamp} />
        <TweetText tweetId={tweetId} text={text} />
        <div>
          <div>
            <TweetMedia images={media} />
          </div>

          <div className="mt-[1.4rem] mb-[0.651rem] flex justify-end gap-[1.6rem]  text-[1.2rem]">
            <span className="tweet-stats">
              {/* {likes.length} {likes.length > 1 ? "Likes" : "Like"} */}
            </span>
            <span className="tweet-stats">
              {/* {retweets.length} {retweets.length > 1 ? "Retweets" : "Retweet"} */}
            </span>
            <span className="tweet-stats">
              {/* {tweetComments.length}{" "}
              {tweetComments.length > 1 ? "Comments" : "Comment"} */}
            </span>
            {/* <span className="tweet-stats">{bookmarkedBy.length} Saved</span> */}
          </div>
        </div>

        <div className="flex justify-center  border-y-[1px] border-[#F2F2F2] py-[.382rem]">
          <CommentBtn handleCommentBtnClick={handleCommentBtnClick} />
          <RetweetBtn
            retweetedTweet={retweetedTweet}
            tweetId={tweetId}
            currentUserId={currentUserId}
          />
          <LikeBtn
            likedTweet={likedTweet}
            tweetId={tweetId}
            currentUserId={currentUserId}
          />
          <BookmarkBtn
            bookmarkedTweet={bookmarkedTweet}
            tweetId={tweetId}
            currentUserId={currentUserId}
          />
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
