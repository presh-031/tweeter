import "@/styles/globals.css";

import Layout from "@/components/Layout";
import { UserProvider } from "@/context/userContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Layout>
  );
}
