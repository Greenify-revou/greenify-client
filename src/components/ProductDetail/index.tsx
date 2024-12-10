import { FaCartPlus, FaRegStar, FaStar } from "react-icons/fa";

interface ProductDetailProps {
    id: number,
    product_name: string,
    product_category: string,
    product_description: string,
    product_price: number,
    image: string,
    echo_points: number,
    echo_materials: number,
    addCart: () => void
}

const ProductDetailCard = (props: ProductDetailProps) => {
    return(
        <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 lg:py-10 bg-white shadow-md">

            {/* Left side */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
                <img
                    src={props.image}
                    alt={props.product_name}
                    className="mx-auto"
                    width={400}
                    height={400}
                />
            </div>

            {/* Right side */}
            <div className="lg:w-1/2">
                
                {/* Product Name */}
                <h1 className="text-3xl font-semibold text-[#070707]">{props.product_name}</h1>

                {/* Product Category */}
                <p className="mt-2 text-lg text-gray-600">{props.product_category}</p>

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
                    
                {/* Product Description */}
                <p className="mt-4 text-lg text-gray-600">{props.product_description}</p>

                 {/* Button */}
                <div>
                    <button 
                        className="mt-4 py-1 px-3 bg-[#56B280] text-white text-sm rounded-lg shadow hover:bg-[#070707]"
                        onClick={props.addCart}
                    >
                        <FaCartPlus className="inline mb-1" /> Add to Cart
                    </button>
                </div>


            </div>

        </section>
    )
}

export default ProductDetailCard