import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

const ReviewProductPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const [reviews, setReviews] = useState<{
    [key: number]: { rating: number | null; text: string };
  }>({});

  const handleRatingChange = (productId: number, rating: number) => {
    setReviews((prev) => {
      const currentRating = prev[productId]?.rating;
      return {
        ...prev,
        [productId]: { ...prev[productId], rating: currentRating === rating ? null : rating },
      };
    });
  };

  const handleTextChange = (productId: number, text: string) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], text },
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted reviews:", reviews);
    alert("Thank you for your feedback!");
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

      <form onSubmit={(e) => e.preventDefault()}>
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-md p-4 mb-4 flex gap-4 items-center"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="font-semibold mb-2">{product.name}</h2>

              <div className="mb-2">
                <h3 className="font-medium">Your Rating</h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-3xl ${
                        reviews[product.id]?.rating && star <= reviews[product.id].rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(product.id, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Your Review</h3>
                <textarea
                  value={reviews[product.id]?.text || ""}
                  onChange={(e) => handleTextAreaResize(e, product.id)}
                  placeholder="Write your review here..."
                  className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#56B280] resize-none"
                  rows={1}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-[#56B280] text-white py-2 rounded-md font-bold hover:bg-green-600"
        >
          Submit Reviews
        </button>
      </form>
    </div>
  );
};

export default ReviewProductPage;