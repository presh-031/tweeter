import WithAuthUser from "@/components/WithAuthUser";
import { db } from "@/config/firebase";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Bookmarks = () => {
  // const [currentUser, loading, error] = useAuthState(auth);
  // const currentUserId = currentUser?.uid;

  // const tweetsRef = collection(db, "tweets");

  // const tweetsQuery = query(tweetsRef, where("userId", "==", uid));

  // const [tweetsListSnapshot, loading, error] = useCollection(tweetsQuery, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });
  // const userTweets = tweetsListSnapshot?.docs;

  return <div className=" px-[1.90rem] pb-[9.615rem]">bookmarks</div>;
};

export default WithAuthUser(Bookmarks);
