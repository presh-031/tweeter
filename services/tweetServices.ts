import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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
      likesCount: 0,
    });
  } catch (err) {
    alert(err);
  }
};

// like tweet
export const likeTweet = async (tweetId: string, currentUserId: string) => {
  try {
    await addDoc(collection(db, "likes"), {
      userId: currentUserId,
      tweetId,
    });
  } catch (err) {
    alert(err);
  }
};

// unlike tweet
export const unlikeTweet = async (
  likedTweet: any //check type
) => {
  try {
    const likeDocRef = doc(db, "likes", likedTweet?.docs[0].id);
    await deleteDoc(likeDocRef);
  } catch (err) {
    alert(err);
  }
};

// Logic to handle tweet retweets
// Retweeting should be done by currently auth user
export const retweetTweet = async (tweetId: string, currentUserId: string) => {
  try {
    await addDoc(collection(db, "retweets"), {
      userId: currentUserId,
      tweetId,
    });
  } catch (err) {
    alert(err);
  }
};

export const unRetweetTweet = async (
  retweetedTweet: any //check type
) => {
  try {
    const retweetDocRef = doc(db, "retweets", retweetedTweet?.docs[0].id);
    await deleteDoc(retweetDocRef);
  } catch (err) {
    alert(err);
  }
};

// bookmarkTweet
export const bookmarkTweet = async (tweetId: string, currentUserId: string) => {
  try {
    await addDoc(collection(db, "bookmarks"), {
      userId: currentUserId,
      tweetId,
    });
  } catch (err) {
    alert(err);
  }
};

// unbookmark tweet
export const unbookmarkTweet = async (
  bookmarkedTweet: any //check type
) => {
  try {
    const bookmarkDocRef = doc(db, "bookmarks", bookmarkedTweet?.docs[0].id);
    await deleteDoc(bookmarkDocRef);
  } catch (err) {
    alert(err);
  }
};
