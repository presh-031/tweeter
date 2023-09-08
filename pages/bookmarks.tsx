import WithAuthUser from "@/components/WithAuthUser";
import { auth, db } from "@/config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Tweet } from "..";

import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";
import Bookmark from "@/components/Bookmark";

const Bookmarks = () => {
  // Get current user info
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  const bookmarksRef = collection(db, "bookmarks");
  const bookmarksQuery = query(bookmarksRef, where("userId", "==", authUserId));
  const [bookmarks, bookmarksLoading, bookmarksError] = useCollection(
    bookmarksQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (bookmarksLoading) {
    return <p>Loading bookmarks</p>;
  }

  if (bookmarksError) {
    return <p>Error fetching bookmarks. Please try again</p>;
  }

  return (
    <div className=" flex justify-center px-[1.90rem] pb-[9.615rem]">
      <div className="flex flex-col border border-red-800">
        {bookmarks?.docs.length
          ? bookmarks?.docs.map((bookmark) => {
              return <Bookmark key={bookmark.id} bookmarkInfo={bookmark} />;
            })
          : "You have no bookmarks"}
      </div>
    </div>
  );
};

export default WithAuthUser(Bookmarks);
