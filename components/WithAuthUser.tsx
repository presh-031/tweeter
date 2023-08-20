import { ReactNode, useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type WithAuthUserProps = {
  children: ReactNode;
};

const WithAuthUser = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = ({ children }: WithAuthUserProps) => {
    //   const router = useRouter();
    //   const [user, loading, error] = useAuthState(auth);
    //   const [authStatusKnown, setAuthStatusKnown] = useState(false);

    //   useEffect(() => {
    //     if (!loading) {
    //       setAuthStatusKnown(true);
    //     }
    //   }, [loading]);

    //   if (!authStatusKnown) {
    //     return <p>Loading...</p>; // Show loading message until authentication status is known
    //   }

    //   if (error) {
    //     console.error("Authentication error:", error);
    //     router.replace("/sign-in");
    //     return <p>An error occurred while checking authentication status.</p>;
    //   }

    //   if (!user) {
    //     router.replace("/sign-in");
    //     return null;
    //   }

    return <Component>{children}</Component>;
  };

  return AuthenticatedComponent;
};

export default WithAuthUser;
