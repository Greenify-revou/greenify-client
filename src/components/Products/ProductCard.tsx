import { FaStar, FaRecycle, FaLeaf } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export interface ProductProps {
    id: number;
    product_name: string;
    category_name: string;
    product_desc: string;
    price: number;
    image_url: string;
    eco_point: number;
    recycle_material: number;
    discount?: number;
    reviews: {
        average_rating: number | null;
        total_reviews: number;
        reviews: {
            user_name: string;
            review: string;
            rating: number;
            created_at: string;
        }[];
    };
}

const ProductCard = ({
    id,
    product_name,
    category_name,
    price,
    image_url,
    eco_point,
    recycle_material,
    discount,
    reviews,
}: ProductProps) => {
    const averageRating = reviews?.average_rating;
    const totalReviews = reviews?.total_reviews;

    const discountedPrice = discount ? price - (price * discount) / 100 : price;

    // Format price to Indonesian Rupiah
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(discountedPrice);

    const originalPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);

    return (
        <Link href={`/product-detail/${id}`} passHref>
            <section
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-transform border border-gray-200 relative flex flex-col h-96"
                aria-label={`View details of ${product_name}`}
            >
                {/* Product Image */}
                <div className="relative w-full h-40">
                    <Image
                        src={image_url}
                        alt={product_name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        priority
                    />
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                        {product_name}
                    </h3>

                    {/* Product Category */}
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-1 rounded mb-2">
                        {category_name}
                    </span>

                   {/* Product Price and Discount */}
                   <div className="mt-auto flex items-center">
                        <p className="text-lg font-bold text-[#56B280]">
                            {formattedPrice}
                        </p>
                        {discount && discount > 0 && (
                            <span className="ml-2 text-xs bg-red-500 text-white font-semibold px-2 py-1 rounded">
                                -{discount}%
                            </span>
                        )}
                    </div>
                    {discount && discount > 0 && (
                        <p className="text-xs text-gray-500 line-through">
                            {originalPrice}
                        </p>
                    )}

                    {/* Average Rating */}
                    <div className="flex items-center text-sm text-yellow-500 mt-2">
                        <FaStar className="mr-1" />
                        {averageRating ? (
                            <span>
                                {averageRating} | {totalReviews}{" "}
                                {totalReviews > 1 ? "reviews" : "review"}
                            </span>
                        ) : (
                            <span>No reviews yet</span>
                        )}
                    </div>

                    {/* Eco Points & Recycled Materials */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                        <div className="flex items-center">
                            <FaLeaf className="text-green-500 mr-2" />
                            <span>
                                <strong>{eco_point}</strong> Eco Points
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FaRecycle className="text-blue-500 mr-2" />
                            <span>{recycle_material}% Recycled</span>
                        </div>
                    </div>
                </div>
            </section>
        </Link>
    );
};

export default ProductCard;
