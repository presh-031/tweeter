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
    <div className="min-h-full rounded-2xl bg-white px-20  pt-24 pb-[9.615rem] sm:bg-[#F2F2F2] sm:px-28">
      <div className="min-[500px]:mx-auto min-[500px]:max-w-[500px] min-[500px]:rounded-[.8rem] min-[500px]:p-24 sm:bg-white">
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
