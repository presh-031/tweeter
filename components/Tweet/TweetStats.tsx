import { db } from "@/config/firebase";
import { TweetStatsProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const TweetStats = ({ tweetId }: TweetStatsProps) => {
  // check all tweet likes
  const allLikesRef = collection(db, "likes");
  const allLikesQuery = query(allLikesRef, where("tweetId", "==", tweetId));
  const [allTweetLikes, allTweetLikesLoading, allTweetLikesError] =
    useCollection(allLikesQuery, {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // check all tweet retweets
  const allRetweetsRef = collection(db, "retweets");
  const allRetweetsQuery = query(
    allRetweetsRef,
    where("tweetId", "==", tweetId)
  );
  const [allTweetRetweets, allTweetRetweetsLoading, allTweetRetweetsError] =
    useCollection(allRetweetsQuery, {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // check all tweet bookmarks
  const allBookmarksRef = collection(db, "bookmarks");
  const allBookmarksQuery = query(
    allBookmarksRef,
    where("tweetId", "==", tweetId)
  );
  const [allTweetBookmarks, allTweetBookmarksLoading, allTweetBookmarksError] =
    useCollection(allBookmarksQuery, {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // check all tweet comments
  const allCommentsRef = collection(db, "comments");
  const allTweetCommentsQuery = query(
    allCommentsRef,
    where("tweetId", "==", tweetId)
  );
  const [allTweetComments, allTweetCommentsLoading, allTweetCommentsError] =
    useCollection(allTweetCommentsQuery, {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  return (
    <div className="mt-[1.4rem] mb-[0.651rem] flex justify-end gap-[1.6rem]  text-[1.2rem]">
      <span className="tweet-stats">
        {allTweetLikes?.docs?.length}{" "}
        {
          allTweetLikes?.docs
            ? allTweetLikes.docs.length > 1
              ? "Likes"
              : "Like"
            : "Like" // Default value if allTweetLikes.docs is undefined
        }
      </span>

      <span className="tweet-stats">
        {allTweetRetweets?.docs?.length}{" "}
        {
          allTweetRetweets?.docs
            ? allTweetRetweets.docs.length > 1
              ? "Retweets"
              : "Retweet"
            : "Retweet" // Default value if allTweetRetweets.docs is undefined
        }
      </span>

      <span className="tweet-stats">
        {allTweetComments?.docs?.length}{" "}
        {
          allTweetComments?.docs
            ? allTweetComments.docs.length > 1
              ? "Comments"
              : "Comment "
            : "Comment" // Default value if allTweetComments.docs is undefined
        }
      </span>
      <span className="tweet-stats">
        {allTweetBookmarks?.docs?.length}{" "}
        {
          allTweetBookmarks?.docs
            ? allTweetBookmarks.docs.length > 1
              ? "Bookmarks"
              : "Bookmark"
            : "Bookmark" // Default value if allTweetBookmarks.docs is undefined
        }
      </span>
    </div>
  );
};

export default TweetStats;
