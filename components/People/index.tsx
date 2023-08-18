import { db } from "@/config/firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { GeneralLoader, User } from "../..";

const People = () => {
  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    orderBy("followers", "desc"),
    limit(10) //top 10 tweets based on likes
  );
  const [topUsers, loading, error] = useCollection(usersQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(topUsers);
  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="mt-16 flex justify-center">
          <GeneralLoader />
        </div>
      )}

      <div className=" mt-16 overflow-hidden rounded-[8px]">
        {topUsers?.docs.map((user) => (
          <User
            key={user.id}
            // userId={user.id}
            bio={user.data().bio}
            createdAt={user.data().createdAt}
            displayName={user.data().displayName}
            email={user.data().email}
            followers={user.data().followers}
            following={user.data().following}
            headerImageUrl={user.data().headerImageUrl}
            profilePictureUrl={user.data().profilePictureUrl}
            userName={user.data().userName}
          />
        ))}
      </div>
    </div>
  );
};

export default People;
