import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext'; 

interface ProductDetailCardProps {
  id: number;
  product_name: string;
  price: number;
  product_desc: string;
  category: string;
  eco_point: number;
  recycle_material: number;
  stok: number;
  image: string;
}

const ProductDetailCard = ({ id, product_name, category, product_desc, price, image, eco_point, recycle_material, stok }: ProductDetailCardProps) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    const item = {
      id,
      name: product_name,
      price: price,
      quantity: 1,
      imageUrl: image
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
        <p className="mt-2 text-lg text-gray-600">{category}</p>
        <p className="mt-4 text-lg text-gray-600">Rp.{price}</p>
        <p className="mt-4 text-lg text-gray-600">Eco Point: {eco_point}</p>
        <p className="mt-4 text-lg text-gray-600">Recycle Material: {recycle_material}%</p>
        <p className="mt-4 text-lg text-gray-600">Stock: {stok}</p>
        <p className="mt-4 text-lg text-gray-600">{product_desc}</p>

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