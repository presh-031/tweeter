import { db } from "@/config/firebase";
import { collection, doc } from "firebase/firestore";
import React from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";
import { BookmarkInfoProps } from "@/typings";

const Bookmark = ({ bookmarkInfo }: BookmarkInfoProps) => {
  //   console.log(bookmarkInfo.data());

  const tweetId = bookmarkInfo.data().tweetId;
  const [tweet, tweetLoading, tweetError] = useDocument(
    doc(db, "tweets", tweetId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  //   console.log(tweet?.data());
  return (
    <div>
      {tweet ? (
        <Tweet
          key={tweet.id} //check id
          tweetId={tweet.id}
          media={tweet.data()?.media}
          text={tweet.data()?.text}
          timestamp={tweet.data()?.timestamp}
          userId={tweet.data()?.userId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Bookmark;
