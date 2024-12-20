import React, { useState } from "react";
import { API_ADD_REVIEW } from "@/src/constants/api";

interface Product {
  product_id: number;
  invoice_number: string;
  product_name: string;
  image_url: string;
}

const ReviewProductPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const [reviews, setReviews] = useState<{
    [key: number]: { rating: number | null; text: string };
  }>({});

  // const handleRatingChange = (productId: number, rating: number) => {
  //   setReviews((prev) => {
  //     const currentRating = prev[productId]?.rating;
  //     return {
  //       ...prev,
  //       [productId]: { ...prev[productId], rating: currentRating === rating ? null : rating },
  //     };
  //   });
  // };

  const handleTextChange = (productId: number, text: string) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], text },
    }));
  };

  const handleSubmit = async (product: Product) => {
    const { rating, text } = reviews[product.product_id] || {};

    const reviewData = {
      invoice_number: product.invoice_number,
      product_id: product.product_id,
      rating: rating || 0, // Default to 0 if no rating
      review: text || "", // Default to empty string if no review
    };

    console.log("Submitted review:", reviewData);

    try {
      const response = await fetch(API_ADD_REVIEW, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log("Review added successfully for product:", product.product_name);
    } catch (error) {
      console.error("Error adding review:", error);
    }

    alert(`Thank you for your feedback on ${product.product_name}!`);
  };

  const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>, productId: number) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    handleTextChange(productId, e.target.value);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Review Your Purchased Products</h1>

      {products.map((product) => (
        <div
          key={product.product_id}
          className="border rounded-md p-4 mb-4 flex gap-4 items-center"
        >
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex-1">
            <h2 className="font-semibold mb-2">{product.product_name}</h2>

            <div className="mb-2">
              <h3 className="font-medium">Your Rating</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                  key={star}
                  className={`cursor-pointer text-3xl ${
                    star <= (reviews?.[product.product_id]?.rating ?? 0)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <h3 className="font-medium">Your Review</h3>
              <textarea
                value={reviews[product.product_id]?.text || ""}
                onChange={(e) => handleTextAreaResize(e, product.product_id)}
                placeholder="Write your review here..."
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#56B280] resize-none"
                rows={1}
              />
            </div>

            <button
              onClick={() => handleSubmit(product)}
              className="w-full bg-[#56B280] text-white py-2 rounded-md font-bold hover:bg-green-600"
            >
              Submit Review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewProductPage;
