import { db } from "@/config/firebase";
import { profileTweetsProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Like from "./Like";

const ProfileLikes = ({ profileOwnerId }: profileTweetsProps) => {
  const likesRef = collection(db, "likes");
  const likesQuery = query(likesRef, where("userId", "==", profileOwnerId));
  const [likes, likesLoading, likesError] = useCollection(likesQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      {" "}
      {likes?.docs.map((like) => {
        return <Like likeInfo={like} />;
      })}
    </div>
  );
};

export default ProfileLikes;
