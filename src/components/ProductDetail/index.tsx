import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext'; 

const ProductDetailCard = ({ id, product_name, product_category, product_description, product_price, image }: ProductDetailProps) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    const item = {
      id,
      name: product_name,
      price: product_price,
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 lg:py-10 bg-white shadow-md">
      {/* Left side */}
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img src={image} alt={product_name} className="mx-auto" width={400} height={400} />
      </div>

      {/* Right side */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-semibold text-[#070707]">{product_name}</h1>
        <p className="mt-2 text-lg text-gray-600">{product_category}</p>
        <p className="mt-4 text-lg text-gray-600">Rp.{product_price}</p>
        <p className="mt-4 text-lg text-gray-600">{product_description}</p>

        <div>
          <button 
            className="mt-4 py-1 px-3 bg-[#56B280] text-white text-sm rounded-lg shadow hover:bg-[#070707]"
            onClick={handleAddToCart}
          >
            <FaCartPlus className="inline mb-1" /> Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailCard;