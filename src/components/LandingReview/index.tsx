import { useState } from "react";
import ReviewCard from "./ReviewCard";


// Review Mock Up Models
const reviews_item = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    user_name: `Jhon Doe`,
    user_comment: `Lorem Ipsum dolor is amet (${i+1})`,
    user_image: `https://via.placeholder.com/150`,
    ratings: 4
}));

const LandingReview = () => {

    const itemsPerPage = 3; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(reviews_item.length / itemsPerPage);
    const paginatedReviews = reviews_item.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section className="px-10 py-16 lg:py-24 bg-[#E5FAC0]">
            
            {/* Section Header */}
            <h2 className="lg:text-5xl text-3xl text-center font-bold text-[#070707] mb-3">Reviews</h2>
            <h2 className="lg:text-3xl text-2xl text-center font-medium text-[#070707] mb-10">Some Quotes from Our Customers</h2>

            {/* Reviews List */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 gap-7">
                {paginatedReviews.map((review) => (
                    <ReviewCard
                        id={review.id}
                        user_name={review.user_name}
                        comment={review.user_comment}
                        image={review.user_image}
                        rating={review.ratings}
                    />
                ))}
            </div>

             {/* Pagination */}
             <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded ${
                    i + 1 === currentPage
                        ? "bg-[#070707] text-white"
                        : "bg-white text-gray-800 hover:bg-[#070707] hover:text-white"
                    }`}
                >
                    {i + 1}
                </button>
                ))}
            </div>

        </section>
    )
}

export default LandingReview