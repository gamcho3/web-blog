import "../styles/globals.css";
import Layout from "../component/layout/layout";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta></meta>
        <title></title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
