import Head from 'next/head';

import '../styles/globals.css';
import { AuthContext, AuthContextProvider } from '../Context/AuthContext';

const MyApp = ({ Component, pageProps }) => (
  <>
  <AuthContextProvider>
    <Head>
      <title>AMU Metro</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    <Component {...pageProps} />
    </AuthContextProvider>
  </>
);

export default MyApp;