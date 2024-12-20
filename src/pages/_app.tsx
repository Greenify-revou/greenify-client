import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from "next/router";
import { PROTECTED_PAGE } from "../constants/pages";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Pages that don't require layout
  const noLayoutPages = ["/login", "/register"];
  const isNoLayoutPage = noLayoutPages.includes(router.pathname);

  // Pages that require authentication
  const isProtectedRoute = PROTECTED_PAGE.includes(router.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {!isNoLayoutPage && <Navbar />}
        {!isProtectedRoute ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
        {!isNoLayoutPage && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
