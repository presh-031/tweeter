import { db } from "@/config/firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { GeneralLoader, User } from "../..";

const People = () => {
  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    orderBy("followers", "desc"),
    limit(10) //top 10 users based on followers
  );
  const [topUsers, loading, error] = useCollectionData(usersQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="mt-16 flex justify-center">
          <GeneralLoader />
        </div>
      )}

      <div className=" mt-16 overflow-hidden rounded-[8px]">
        {topUsers?.map((user) => (
          <User
            key={user.uid}
            userId={user.uid}
            bio={user.bio}
            createdAt={user.createdAt}
            displayName={user.displayName}
            email={user.email}
            followers={user.followers}
            following={user.following}
            userName={user.userName}
            bookmarkedTweets={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default People;
