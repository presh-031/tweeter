import { db } from "@/config/firebase";
import { collection, doc } from "firebase/firestore";
import React from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";

const Bookmark = ({ bookmarkInfo }) => {
  console.log(bookmarkInfo.data());

  const tweetId = bookmarkInfo.data().tweetId;
  const [tweet, tweetLoading, tweetError] = useDocument(
    doc(db, "tweets", tweetId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(tweet?.data());
  return (
    <div>
      {tweet ? (
        <Tweet
          key={tweet.id} //check id
          tweetId={tweet.id}
          likes={tweet.data()?.likes}
          retweets={tweet.data()?.retweets}
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
