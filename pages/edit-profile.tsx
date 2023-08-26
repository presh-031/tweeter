import { useAuthState } from "react-firebase-hooks/auth";
import { WithAuthUser, EditProfileForm } from "..";
import EditProfileImages from "@/components/EditProfileImages";
import { auth, db } from "@/config/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

const Edit = () => {
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  return (
    <div className="rounded-2xl px-20 pb-[9.615rem]">
      <div className="py-8 ">
        <p className="mb-12 text-4xl text-blueish">Edit Profile</p>

        <EditProfileImages authUserId={authUserId} />
        <EditProfileForm />
      </div>
    </div>
  );
};

export default WithAuthUser(Edit);
