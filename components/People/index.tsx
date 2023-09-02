import { auth, db } from "@/config/firebase";
import { collection, doc, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { GeneralLoader, User } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

const People = () => {
  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    orderBy("followers", "desc"), //should order by "followersCount" cos "followers" is an arr.
    limit(10) //top 10 users based on followers
  );
  const [topUsers, loading, error] = useCollectionData(usersQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(topUsers);

  // Get auth user info
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
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
            profileOwnerInfo={user}
            profileOwnerId={user.uid}
            authUserId={authUserId}
            authUserInfo={authUserInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default People;
