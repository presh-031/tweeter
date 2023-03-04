import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const index = () => {
  const [user, loading, error] = useAuthState(auth);
  return <div>index</div>;
};

export default index;
