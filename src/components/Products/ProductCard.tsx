import { FaStar, FaRegStar } from "react-icons/fa";

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
    // const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product-detail/${props.id}`);
    };

    return (
        <section 
            className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 max-w-xs"
            onClick={handleNavigate}
        >
            {/* Product Image */}
            <img
                src={props.image}
                alt={props.product_name}
                className="w-full h-36 object-cover"
            />

            <div className="p-4">
                {/* Product Name */}
                <h3 className="text-sm font-bold text-gray-800 truncate">
                    {props.product_name}
                </h3>

                {/* Product Category */}
                <p className="text-xs text-gray-500 mt-1">
                    {props.product_category}
                </p>

                {/* Product Price */}
                <p className="text-md font-semibold text-gray-800 mt-2">
                    Rp {props.product_price.toLocaleString("id-ID")}
                </p>

                {/* Echo Point */}
                <div className="flex items-center text-xs text-gray-600 mt-2">
                    <span className="mr-2">Echo Points:</span>
                    {Array.from({ length: 5 }, (_, index) => {
                        const isFull = index + 1 <= Math.floor(props.echo_points);
                        return (
                            <span key={index} className="text-yellow-400">
                                {isFull ? (
                                    <FaStar className="inline mb-1" />
                                ) : (
                                    <FaRegStar className="inline mb-1" />
                                )}
                            </span>
                        );
                    })}
                </div>

                {/* Echo Material */}
                <div className="flex items-center text-xs text-gray-600 mt-1">
                    <span className="mr-2">Echo Materials:</span>
                    {Array.from({ length: 5 }, (_, index) => {
                        const isFull = index + 1 <= Math.floor(props.echo_materials);
                        return (
                            <span key={index} className="text-yellow-400">
                                {isFull ? (
                                    <FaStar className="inline mb-1" />
                                ) : (
                                    <FaRegStar className="inline mb-1" />
                                )}
                            </span>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductCard;