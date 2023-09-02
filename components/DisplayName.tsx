import { db } from "@/config/firebase";
import { DisplayNameProps } from "@/typings";
import { doc } from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

const DisplayName = ({ authUserId }: DisplayNameProps) => {
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
  return <p className="w-12 truncate text-lg">{authUserInfo?.displayName}</p>;
};

export default DisplayName;
