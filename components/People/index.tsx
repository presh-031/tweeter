import { auth, db } from "@/config/firebase";
import { collection, doc, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { GeneralLoader, User } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

const People = ({ max = 10 }) => {
  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    orderBy("followers", "desc"), //should order by "followersCount" cos "followers" is an arr.
    limit(max) //top 10 users based on followers
  );
  const [topUsers, loading, error] = useCollectionData(usersQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // console.log(topUsers);

  // Get auth user info for follow and unfollow btns.
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  }

  if (loading) {
    return (
      <div className=" flex justify-center">
        <GeneralLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[.8rem]">
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
