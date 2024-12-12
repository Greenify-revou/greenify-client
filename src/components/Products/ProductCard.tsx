import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface ProductProps {
    id: number;
    product_name: string;
    product_category: string;
    product_description: string;
    product_price: number;
    image: string;
    echo_points: number;
    echo_materials: number;
}

const ProductCard = (props: ProductProps) => {
    return (
        <Link href={`/product-detail/${props.id}`} passHref>
            <section 
                className="bg-white shadow-sm rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-gray-300"
            >
                {/* Product Image */}
                <img
                    src={props.image}
                    alt={props.product_name}
                    className="w-full h-40 object-cover"
                />

                {/* Card Content */}
                <div className="p-3">
                    {/* Product Name */}
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
                        {props.product_name}
                    </h3>

                    {/* Product Price */}
                    <p className="text-lg font-semibold text-green-500 mt-1">
                        Rp {props.product_price.toLocaleString("id-ID")}
                    </p>

                    {/* Location */}
                    <p className="text-xs text-gray-500 mt-1">Jakarta Barat</p>

                    {/* Rating */}
                    <div className="flex items-center text-xs text-yellow-500 mt-1">
                        <FaStar className="mr-1" /> 4.9 | 10rb+ sold
                    </div>
                </div>
            </section>
        </Link>
    );
};

export default ProductCard;