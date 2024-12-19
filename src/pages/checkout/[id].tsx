import { useRouter } from "next/router";
import CheckoutPage from "../../components/Checkout/CheckoutPage";

const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const orderId = id as string;

  if (!orderId) {
    // Optionally, show a loading state or fallback while the id is being fetched
    return <div>Loading...</div>;
  }

  console.log(orderId); // Ensure this logs the correct id when available

  return <CheckoutPage order_id={orderId} />; 
};

export default Checkout;