import { useState } from "react";
import ReviewCard from "./ReviewCard";

// Review Mock-Up Models
const reviews_item = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    user_name: `John Doe`,
    user_comment: `Lorem Ipsum dolor is amet (${i + 1})`,
    user_image: `https://via.placeholder.com/150`,
    ratings: 4
}));

const LandingReview = () => {
    const itemsPerPage = 3; // Number of items visible at a time
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(reviews_item.length / itemsPerPage);
    const paginatedReviews = reviews_item.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNext = () => {
        setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
    };

    return (
        <section className="px-10 py-16 lg:py-24 bg-[#E5FAC0]">
            {/* Section Header */}
            <h2 className="lg:text-5xl text-3xl text-center font-bold text-[#070707] mb-3">Reviews</h2>
            <h2 className="lg:text-3xl text-2xl text-center font-medium text-[#070707] mb-10">Some Quotes from Our Customers</h2>

            {/* Reviews List */}
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 gap-7">
                    {paginatedReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            id={review.id}
                            user_name={review.user_name}
                            comment={review.user_comment}
                            image={review.user_image}
                            rating={review.ratings}
                        />
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#070707] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-800 transition"
                >
                    &#8249; {/* Previous Arrow */}
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#070707] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-800 transition"
                >
                    &#8250; {/* Next Arrow */}
                </button>
            </div>
        </section>
    );
};

export default LandingReview;