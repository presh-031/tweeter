import { ReactNode, useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { GeneralLoader } from "..";

type WithAuthUserProps = {
  children: ReactNode;
};

const WithAuthUser = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = ({ children }: WithAuthUserProps) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [authStatusKnown, setAuthStatusKnown] = useState(false);

    useEffect(() => {
      if (!loading) {
        setAuthStatusKnown(true);
      }
    }, [loading]);

    if (!authStatusKnown) {
      return (
        <div className="mt-16 flex justify-center lg:mt-[10rem]">
          <GeneralLoader />
        </div>
      ); // Show loading message until authentication status is known
    }

    if (error) {
      // An error occurred while checking authentication status.
      router.replace("/log-in");
      return null;
    }

    if (!user) {
      router.replace("/log-in");
      return null;
    }

    return <Component>{children}</Component>;
  };

  return AuthenticatedComponent;
};

export default WithAuthUser;
