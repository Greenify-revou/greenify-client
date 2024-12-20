import { FaStar, FaRecycle, FaLeaf } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
    id: number;
    product_name: string;
    category_name: string;
    product_desc: string;
    price: number;
    image_url: string;
    eco_point: number;
    recycle_material: number;
    discount?: number;
    reviews: { rating: number }[];
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
    // Calculate the average rating
    const averageRating = reviews.length
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : null;

    // Format price to Indonesian Rupiah
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);

    return (
        <Link href={`/product-detail/${id}`} passHref>
            <section
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-transform border border-gray-200 relative flex flex-col h-80"
            >
                {/* Discount Badge */}
                {discount && discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{discount}%
                    </div>
                )}

                {/* Product Image */}
                <div className="relative w-full h-36">
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
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                        {product_name}
                    </h3>

                    {/* Product Category */}
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-1 rounded mb-2">
                        {category_name}
                    </span>

                    {/* Product Price */}
                    <p className="text-lg font-bold text-[#56B280] mt-auto">
                        {formattedPrice}
                    </p>

                    {/* Average Rating */}
                    <div className="flex items-center text-sm text-yellow-500 mt-2">
                        <FaStar className="mr-1" />
                        {averageRating ? (
                            <span>
                                {averageRating} | {reviews.length}{" "}
                                {reviews.length > 1 ? "reviews" : "review"}
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
