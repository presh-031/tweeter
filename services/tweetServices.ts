import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

import { Timestamp, addDoc, collection } from "firebase/firestore";

// new tweet
export const postNewTweet = async (
  newTweetText: string,
  authUserId: string
) => {
  try {
    await addDoc(collection(db, "tweets"), {
      text: newTweetText,
      userId: authUserId,
      timestamp: Timestamp.now(),
      likes: [],
      retweets: [],
      media: [],
      comments: [],
      bookmarkedBy: [],
      likesCount: 0,
    });
  } catch (err) {
    alert(err);
  }
};

// like tweet
export const likeTweet = async (
  tweetId: string,
  currentUserId: string,
  likes: string[]
) => {
  const tweetDocRef = doc(db, "tweets", tweetId);

  try {
    await updateDoc(tweetDocRef, {
      likes: [...likes, currentUserId],
    });
  } catch (err) {
    alert(err);
  }
};

// unlike tweet
export const unlikeTweet = async (
  tweetId: string,
  currentUserId: string,
  likes: string[]
) => {
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
export const retweetTweet = async (
  tweetId: string,
  currentUserId: string,
  retweets: string[]
) => {
  const tweetDocRef = doc(db, "tweets", tweetId);

  try {
    await updateDoc(tweetDocRef, {
      retweets: [...retweets, currentUserId],
    });
  } catch (err) {
    alert(err);
  }
};

export const unRetweetTweet = async (
  tweetId: string,
  currentUserId: string,
  retweets: string[]
) => {
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

// bookmarkTweet
export const bookmarkTweet = async (
  tweetId: string,
  currentUserId: string,
  bookmarkedBy: string[]
) => {
  const tweetDocRef = doc(db, "tweets", tweetId);

  try {
    await updateDoc(tweetDocRef, {
      bookmarkedBy: [...bookmarkedBy, currentUserId],
    });
  } catch (err) {
    alert(err);
  }
};

// unbookmark tweet
export const unbookmarkTweet = async (
  tweetId: string,
  currentUserId: string,
  bookmarkedBy: string[]
) => {
  const tweetDocRef = doc(db, "tweets", tweetId);

  try {
    await updateDoc(tweetDocRef, {
      bookmarkedBy: bookmarkedBy.filter(
        (bookmarker) => bookmarker !== currentUserId
      ),
    });
  } catch (err) {
    alert(err);
  }
};
