// import "../styles/globals.css";
// import type { AppProps } from "next/app";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Navbar />
//       <Component {...pageProps} />
//       <Footer />
//     </>
//   );
// }

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutPages = [
    "/login",
    "/register",
    "/forgot-password/email",
    "/forgot-password/verify",
    "/forgot-password/reset",
  ];

  const isNoLayoutPage = noLayoutPages.includes(router.pathname);

  return (
    <>
      {!isNoLayoutPage && <Navbar />}
      <Component {...pageProps} />
      {!isNoLayoutPage && <Footer />}
    </>
  );
  
}