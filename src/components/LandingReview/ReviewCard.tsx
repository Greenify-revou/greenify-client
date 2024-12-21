import { FaStar, FaRegStar } from "react-icons/fa";

interface ReviewProps {
  id: number;
  user_name: string;
  comment: string;
  image: string;
  rating: number;
}

// Rating Component for Reusability
const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center mt-2" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFull = index + 1 <= Math.floor(rating);
        const isHalf = index + 1 === Math.ceil(rating) && !isFull;
        return (
          <span key={index} className="text-yellow-400">
            {isFull ? (
              <FaStar aria-hidden="true" className="inline mb-1" />
            ) : isHalf ? (
              <FaRegStar aria-hidden="true" className="inline mb-1" />
            ) : (
              <FaRegStar aria-hidden="true" className="inline mb-1" />
            )}
          </span>
        );
      })}
    </div>
  );
};

const ReviewCard = (props: ReviewProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
      {/* User Image */}
      <img
        src={props.image}
        alt={props.user_name || "User Avatar"}
        className="w-20 h-20 object-cover rounded-full"
      />

      {/* Username */}
      <p className="mt-4 text-lg font-semibold text-gray-700">{props.user_name}</p>

      {/* Comment */}
      <p className="mt-2 text-sm text-gray-500">{props.comment}</p>

      {/* Ratings */}
      <Rating rating={props.rating} />
    </div>
  );
};

export default ReviewCard;
