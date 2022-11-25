import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SearchContextProvider } from "../context/SearchContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchContextProvider>
  );
}
