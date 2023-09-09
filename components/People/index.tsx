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
    limit(max) //top  users
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
    return (
      <p className="text-center text-2xl font-semibold text-[#828282] ">
        Error loading people. Please try again.
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
    <div className="w-full overflow-hidden rounded-[.8rem]">
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
  );
};

export default People;
