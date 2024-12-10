import { FaStar, FaRegStar, FaEye } from "react-icons/fa";

interface ProductProps {
    id: number,
    product_name: string,
    product_category: string,
    product_description: string,
    product_price: number,
    image: string,
    echo_points: number,
    echo_materials: number
}

const ProductCard = (props: ProductProps) => {
    
    return(
        <section className="bg-white shadow-md rounded-md p-4">

            {/* Product Image */}
            <img
                src={props.image}
                alt={props.product_name}
                className="w-full h-48 object-cover rounded-md"
            />

            {/* Product Name */}
            <h3 className="mt-4 text-xl font-semibold text-[#070707]">{props.product_name}</h3>

            {/* Product Category */}
            <p className="mt-2 text-md text-gray-600">
                {props.product_category}
            </p>

            {/* Product Price */}
            <p className="mt-4 text-lg text-gray-600">Rp.{props.product_price}</p>

            {/* Echo Point */}
            <p className="mt-4 text-md text-gray-600">
                Echo Point : <span> </span>
               { Array.from({ length: 5 }, (_, index) => {
                    const isFull = index + 1 <= Math.floor(props.echo_points);
                    const isHalf = index + 1 === Math.ceil(props.echo_points) && !isFull;
                    return(
                        <span key={index} className="text-yellow-400">
                            {isFull ? <FaStar className="inline mb-1" /> : isHalf ? <FaRegStar className="inline mb-1" /> : <FaRegStar className="inline mb-1" />}
                        </span>
                    )}) 
                }
            </p>
            
            {/* Echo Material */}
            <p className="mt-0 text-md text-gray-600">
                Echo Material : <span> </span>
                { Array.from({ length: 5 }, (_, index) => {
                    const isFull = index + 1 <= Math.floor(props.echo_materials);
                    const isHalf = index + 1 === Math.ceil(props.echo_materials) && !isFull;
                    return(
                        <span key={index} className="text-yellow-400">
                            {isFull ? <FaStar className="inline mb-1" /> : isHalf ? <FaRegStar className="inline mb-1" /> : <FaRegStar className="inline mb-1" />}
                        </span>
                    )}) 
                }
            </p>

            {/* Button */}
            <div>
                <button 
                    className="
                    mt-4 py-1 px-3 bg-[#56B280] text-white text-sm rounded-lg shadow hover:bg-[#070707]"
                >
                    <FaEye className="inline mb-1"/> View Detail
                </button>
            </div>

        </section>
    )
}

export default ProductCard