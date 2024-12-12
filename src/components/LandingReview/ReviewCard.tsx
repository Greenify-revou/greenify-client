import { FaStar, FaRegStar, FaEye } from "react-icons/fa";

interface ReviewProps {
    id: number,
    user_name: string,
    comment: string,
    image: string,
    rating: number
}

const ReviewCard = (props: ReviewProps) => {
    
    return(
        <div className="bg-white shadow-md rounded-md p-10">

            {/* User Image */}
            <img
                src={props.image}
                alt={props.user_name}
                className="min-w-28 min-h-28 object-cover rounded-full mx-auto"
            />

            {/* Comment */}
            <h3 className="mt-4 text-xl font-medium text-gray-600 text-center">{props.comment}</h3>

            {/* Username */}
            <p className="mt-2 text-lg text-gray-600 text-center">
                {props.user_name}
            </p>


            {/* Ratings */}
            <p className="mt-4 text-md text-gray-600 text-center">
               { Array.from({ length: 5 }, (_, index) => {
                    const isFull = index + 1 <= Math.floor(props.rating);
                    const isHalf = index + 1 === Math.ceil(props.rating) && !isFull;
                    return(
                        <span key={index} className="text-yellow-400">
                            {isFull ? <FaStar className="inline mb-1" /> : isHalf ? <FaRegStar className="inline mb-1" /> : <FaRegStar className="inline mb-1" />}
                        </span>
                    )}) 
                }
            </p>
            
        </div>
    )
}

export default ReviewCard