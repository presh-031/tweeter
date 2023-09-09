import { db } from "@/config/firebase";
import { profileTweetsProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Like from "./Like";
import { GeneralLoader } from "..";

const ProfileLikes = ({ profileOwnerId }: profileTweetsProps) => {
  const likesRef = collection(db, "likes");
  const likesQuery = query(likesRef, where("userId", "==", profileOwnerId));
  const [likesListSnapShot, loading, error] = useCollection(likesQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const likes = likesListSnapShot?.docs;

  if (error) {
    return (
      <p className="text-center text-2xl font-semibold text-[#828282] ">
        Error loading likes. Please try again.
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
    <div>
      {likes?.length ? (
        likes.map((like) => <Like key={like.id} likeInfo={like} />)
      ) : (
        <p className="mt-16 text-center text-2xl font-semibold text-[#828282]">
          You haven&apos;t liked any tweets yet.
        </p>
      )}
    </div>
  );
};

export default ProfileLikes;
