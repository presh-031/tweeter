import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";

// follow
export const follow = async (
  routeId: string,
  currentUserId: string,
  userInfo: any,
  authUserInfo: any
) => {
  console.log("btn clicked");
  // Update followers of followed user, and following of currentUser
  const otherUserDocRef = doc(db, "users", routeId);
  const currentUserDocRef = doc(db, "users", currentUserId);

  try {
    await updateDoc(otherUserDocRef, {
      followers: [...userInfo?.followers, currentUserId],
    });
    await updateDoc(currentUserDocRef, {
      following: [...authUserInfo?.following, routeId],
    });
  } catch (err) {
    alert(err);
  }
};

// unfollow
export const unFollow = async (
  routeId: string,
  currentUserId: string,
  userInfo: any,
  authUserInfo: any
) => {
  const otherUserDocRef = doc(db, "users", routeId);
  const currentUserDocRef = doc(db, "users", currentUserId);
  try {
    await updateDoc(otherUserDocRef, {
      followers: userInfo?.followers.filter(
        (follower: string) => follower !== currentUserId
      ),
    });
    await updateDoc(currentUserDocRef, {
      following: authUserInfo?.following.filter(
        (following: string) => following !== routeId
      ),
    });
  } catch (err) {
    alert(err);
  }
};
