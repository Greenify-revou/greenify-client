import React, { useEffect, useState } from "react";
import ReviewProductPage from "../../components/ReviewProductPage";
import { useRouter } from "next/router";
import { API_ORDER_ITEMS } from "@/src/constants/api";

interface OrderItem {
  id: number;
  invoice_number: string;
  product_id: number;
  product_name: string;
  total_price: number;
  quantity: number;
  image_url: string;
}

interface Response {
  data: OrderItem[];
  message: string;
  status: number;
}

const ReviewPage: React.FC = () => {
  const [purchasedProducts, setPurchasedProducts] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before fetching
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(API_ORDER_ITEMS + `/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data: Response = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        setPurchasedProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchOrderItems();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReviewProductPage products={purchasedProducts} />
    </div>
  );
};

export default ReviewPage;
