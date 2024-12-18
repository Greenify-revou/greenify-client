import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutPages = ["/login", "/register", "/dashboard-seller","/dashboard-seller/voucherPage", "/dashboard-seller/productPage"];

  const isNoLayoutPage = noLayoutPages.includes(router.pathname);

  return (
    <CartProvider>
      {!isNoLayoutPage && <Navbar />}
      <Component {...pageProps} />
      {!isNoLayoutPage && <Footer />}
    </CartProvider>
  );
}
