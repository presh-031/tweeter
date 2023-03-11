import "@/styles/globals.css";

import Layout from "@/components/Layout";
import { UserProvider } from "@/context/userContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // const { state, setState } = useContext(UserContext);

  // Get currently auth user's Id, and use it to get their data from firestore.
  // Both useAuthState and useDocuments loading and error states should translate into user loading and error states.
  // const [user] = useAuthState(auth);

  // console.log(user?.uid);
  // const userRef = doc(db, "users", user?.uid || "");
  // const [snapshot, loading, error] = useDocument(userRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // console.log();
  // useEffect(() => {
  //   setState(snapshot?.data());
  // }, [loading]);

  return (
    <Layout>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Layout>
  );
}
