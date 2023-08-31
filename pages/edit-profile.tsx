import { useAuthState } from "react-firebase-hooks/auth";
import { WithAuthUser, EditProfileForm } from "..";
import { EditCoverImage, EditProfilePic } from "@/components/EditProfileImages";
import { auth, db } from "@/config/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useState } from "react";

const Edit = () => {
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  const [triggered, setTriggered] = useState(false);

  const triggerFunction = () => {
    setTriggered((prevTriggered) => !prevTriggered);
  };

  return (
    <div className="rounded-2xl px-20 pb-[9.615rem]">
      <div className="py-8 ">
        <p className="mb-12 text-4xl text-blueish">Edit Profile</p>

        <EditCoverImage authUserId={authUserId} triggered={triggered} />
        <EditProfilePic authUserId={authUserId} triggered={triggered} />
        <EditProfileForm
          authUserId={authUserId}
          triggerFunction={triggerFunction}
        />
      </div>
    </div>
  );
};

export default WithAuthUser(Edit);
