import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";

const AddComment = () => {
  // Logic to get info of auth user, for Id and profilePic
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const userRef = doc(db, "users", currentUserId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());

      // return userSnap.data();
    };

    getUser();
  }, [currentUserId]);

  console.log(user);

  // Logic to handle comment creation
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    // const key = e.target.value;
    // if ()
    // setComment(key);
    console.log(e.key);
  };

  return (
    <div className="flex gap-[1.622rem] pt-[.9rem] pb-[2rem]">
      {/* Image here is that of the currently auth user */}
      <div className=" h-[4rem] w-[4rem]">
        {user.profilePictureUrl && (
          <Image
            src={user.profilePictureUrl}
            alt="profile-pic"
            width={40}
            height={40}
            loading="eager"
            className="h-[4rem] w-[4rem] rounded-[8px]"
          />
        )}
      </div>

      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        className="h-[4rem] flex-1 border-[1px] border-[#f2f2f2] bg-[#fafafa] px-[1.2rem] text-[1.4rem] font-medium leading-[1.9rem] tracking-[-3.5%] text-[#bdbdbd]"
        placeholder="Tweet your reply"
      />
    </div>
  );
};

export default AddComment;
