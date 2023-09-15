import { db } from "@/config/firebase";
import { DisplayNameProps } from "@/typings";
import { doc } from "firebase/firestore";
import React, { memo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

const DisplayName = ({ authUserId }: DisplayNameProps) => {
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
  return (
    <p className="w-12  truncate text-lg  font-medium  leading-normal  tracking-[-0.049rem] md:min-w-fit md:max-w-[7rem] md:text-[1.4rem]">
      {authUserInfo?.displayName}
    </p>
  );
};

export default memo(DisplayName);
