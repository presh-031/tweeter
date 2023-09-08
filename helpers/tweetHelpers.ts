import { db } from "@/config/firebase";
import {
  bookmarkTweet,
  likeTweet,
  retweetTweet,
  unRetweetTweet,
  unbookmarkTweet,
  unlikeTweet,
} from "@/services/tweetServices";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

export const handleLike = (
  tweetId: string,
  currentUserId: string,
  likedTweet: any
) => {
  // add new bookmark document to bookmarks

  if (likedTweet?.docs.length) {
    unlikeTweet(likedTweet);
  } else {
    likeTweet(tweetId, currentUserId);
  }
};

export const handleRetweet = (
  tweetId: string,
  currentUserId: string,
  retweetedTweet: any
) => {
  if (retweetedTweet?.docs.length) {
    unRetweetTweet(retweetedTweet);
  } else {
    retweetTweet(tweetId, currentUserId);
  }
};

export const handleBookmark = async (
  tweetId: string,
  currentUserId: string,
  bookmarkedTweet: any
) => {
  if (bookmarkedTweet?.docs.length) {
    unbookmarkTweet(bookmarkedTweet);
  } else {
    bookmarkTweet(tweetId, currentUserId);
  }
};
