import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { GOOD_REVIEW } from "@/src/constants/api";

const LandingReview = () => {
  const itemsPerPage = 3; // Number of items visible at a time
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  interface Review {
    id: number;
    name: string;
    review: string;
    profile_picture: string;
    rating: number;
    created_at: string;
    updated_at: string | null;
  }

  // Fetch reviews data from API
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(GOOD_REVIEW);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log("Fetched reviews:", data); // Debugging log
        setReviews(data.data.reviews || []); // Adjust according to your API response
      } catch{
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviews();
  }, []);



  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const paginatedReviews: Review[] = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  };

  if (loading) {
    return <p className="text-center">Loading reviews...</p>;
  }



  return (
    <section className="px-10 py-16 lg:py-24 bg-[#E5FAC0]">
      <h2 className="lg:text-5xl text-3xl text-center font-bold text-[#070707] mb-3">
        Reviews
      </h2>
      <h2 className="lg:text-3xl text-2xl text-center font-medium text-[#070707] mb-10">
        Some Quotes from Our Customers
      </h2>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedReviews.map((review: Review) => (
        <ReviewCard
            key={review.id}
            id={review.id}
            user_name={review.name} // Updated to match API response
            comment={review.review}
            image={review.profile_picture}
            rating={review.rating}
        />
        ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#070707] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-800 transition"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#070707] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-800 transition"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default LandingReview;
