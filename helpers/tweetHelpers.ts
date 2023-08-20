import {
  bookmarkTweet,
  likeTweet,
  retweetTweet,
  unRetweetTweet,
  unbookmarkTweet,
  unlikeTweet,
} from "@/services/tweetServices";

export const handleLike = (
  tweetId: string,
  currentUserId: string,
  likes: string[]
) => {
  likes.includes(currentUserId)
    ? unlikeTweet(tweetId, currentUserId, likes)
    : likeTweet(tweetId, currentUserId, likes);
};

export const handleRetweet = (
  tweetId: string,
  currentUserId: string,
  retweets: string[]
) => {
  retweets.includes(currentUserId)
    ? unRetweetTweet(tweetId, currentUserId, retweets)
    : retweetTweet(tweetId, currentUserId, retweets);
};

export const handleBookmark = (
  tweetId: string,
  currentUserId: string,
  bookmarkedBy: string[]
) => {
  bookmarkedBy.includes(currentUserId)
    ? unbookmarkTweet(tweetId, currentUserId, bookmarkedBy)
    : bookmarkTweet(tweetId, currentUserId, bookmarkedBy);
};
