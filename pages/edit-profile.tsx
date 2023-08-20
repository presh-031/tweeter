import { WithAuthUser, EditProfileForm } from "..";

const Edit = () => {
  return (
    <div className="rounded-2xl px-[1.90rem] pb-[9.615rem]">
      <div className="py-8 ">
        <p className="mb-16 text-4xl text-blueish">Edit Profile</p>
        <EditProfileForm />
      </div>
    </div>
  );
};

export default WithAuthUser(Edit);
