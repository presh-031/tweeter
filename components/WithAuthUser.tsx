import { ReactNode } from "react";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type WithAuthUserProps = {
  children: ReactNode;
};

const WithAuthUser = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = ({ children }: WithAuthUserProps) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      router.replace("/sign-in");
      return null;
    }

    return <Component>{children}</Component>;
  };

  return AuthenticatedComponent;
};

export default WithAuthUser;
