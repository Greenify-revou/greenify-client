import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from "next/router";
import { PROTECTED_PAGE } from "../constants/pages";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isProtectedRoute = PROTECTED_PAGE.includes(router.pathname);

  return (
    <>
    <AuthProvider>
      <Navbar />
      {!isProtectedRoute ? 
        (<Component {...pageProps}/>)
        :
        (
          <ProtectedRoute>
          <Component {...pageProps} />
          </ProtectedRoute>
        )
      }
      <Footer />
    </AuthProvider>
    </>
  );
}

