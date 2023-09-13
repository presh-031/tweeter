import WithAuthUser from "@/components/WithAuthUser";

import { auth, db } from "@/config/firebase";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { GeneralLoader } from "..";

import Bookmark from "@/components/Bookmark";

const Bookmarks = () => {
  // Get current user info
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  const bookmarksRef = collection(db, "bookmarks");
  const bookmarksQuery = query(
    bookmarksRef,
    where("userId", "==", authUserId),
    orderBy("timestamp", "desc")
  );
  const [bookmarks, loading, error] = useCollection(bookmarksQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (error) {
    return (
      <p className="mt-[10rem] text-center text-2xl font-semibold text-[#828282] ">
        Error fetching bookmarks. Please try again
      </p>
    );
  }

  if (loading) {
    return (
      <div className="my-[10rem] flex justify-center">
        <GeneralLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1071px] justify-center px-[1.90rem] pb-[9.615rem]">
      <div className="mt-[2.317rem] flex flex-col">
        {bookmarks?.docs.length ? (
          bookmarks?.docs.map((bookmark) => {
            return <Bookmark key={bookmark.id} bookmarkInfo={bookmark} />;
          })
        ) : (
          <p className="mt-[10rem] text-center text-2xl font-semibold text-[#828282] ">
            You have no bookmarks
          </p>
        )}
      </div>
    </div>
  );
};

export default WithAuthUser(Bookmarks);
