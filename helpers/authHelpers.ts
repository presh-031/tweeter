import { db } from "@/config/firebase";
import { UserCredential } from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";

export const createNewUserInDb = async (
  user: UserCredential | undefined,
  fullName: string | null
) => {
  const newId = user ? user.user.uid : "";

  // Logic to check if this user is new or already exists in our users collection.
  const userRef = doc(db, "users", newId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const email = user?.user.email;
    const bio = "Human";
    const defaultDisplayName = generateDefaultDisplayName(email);

    const newUserInfo = {
      userName: fullName || "",
      displayName: defaultDisplayName || "",
      email,
      createdAt: Timestamp.now(),
      followers: [],
      following: [],
      bio,
      headerImageUrl: "",
      profilePictureUrl: "",
    };

    try {
      // setDoc will force the new user doc to use a custom Id, which is set to newId, which is the new Id generated by firebase auth, hence synced.
      await setDoc(doc(db, "users", newId), newUserInfo);
    } catch (err) {
      console.error(err);
    }
  }
};
