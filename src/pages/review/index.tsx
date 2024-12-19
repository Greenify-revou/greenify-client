import React from "react";
import ReviewProductPage from "../../components/ReviewProductPage";

const ReviewPage: React.FC = () => {
  // Contoh produk yang telah dibeli (mock data)
  const purchasedProducts = [
    { id: 1, name: "Product A", imageUrl: "/product-a.jpg" },
    { id: 2, name: "Product B", imageUrl: "/product-b.jpg" },
  ];

  return (
    <div>
      <ReviewProductPage products={purchasedProducts} />
    </div>
  );
};

export default ReviewPage;