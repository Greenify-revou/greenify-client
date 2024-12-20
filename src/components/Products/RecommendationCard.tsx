import { FaRecycle, FaLeaf } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface RecommendationProps {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    eco_point: number;
    recycle_material: number;
    discount?: number;
}

const RecommendationCard = ({
    id,
    product_name,
    price,
    image_url,
    eco_point,
    recycle_material,
    discount,
}: RecommendationProps) => {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);

    return (
        <Link href={`/product-detail/${id}`} passHref>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105">
                <div className="relative w-full h-40">
                    <Image
                        src={image_url}
                        alt={product_name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                    {discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{discount}%
                        </span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {product_name}
                    </h3>
                    <p className="text-lg font-bold text-green-600 mt-2">{formattedPrice}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                        <div className="flex items-center">
                            <FaLeaf className="text-green-500 mr-1" />
                            {eco_point} Eco Points
                        </div>
                        <div className="flex items-center">
                            <FaRecycle className="text-blue-500 mr-1" />
                            {recycle_material}% Recycled
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RecommendationCard;
