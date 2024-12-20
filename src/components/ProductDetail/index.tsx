import { FaCartPlus, FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import Image from "next/image";

interface Review {
  user_name: string;
  review: string;
  rating: number;
  created_at: string;
}

interface ProductDetailCardProps {
  id: number;
  product_name: string;
  price: number;
  product_desc: string;
  category: string;
  eco_point: number;
  recycle_material: number;
  stock: number;
  image_url: string;
  discount?: number;
  reviews: {
    average_rating: number | null;
    total_reviews: number;
    reviews: Review[];
  };
}

const ProductDetailCard = ({
  id,
  product_name,
  category,
  product_desc,
  price,
  image_url,
  eco_point,
  recycle_material,
  stock,
  discount,
  reviews,
}: ProductDetailCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id,
      product_id: id,
      product_name: product_name,
      total_price: price,
      quantity: 1,
      image_url: image_url,
    };
    addToCart(item);
  };

  const images = image_url ? image_url.split(";") : [];

  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  console.log(stock)

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="lg:w-1/2 px-4">
          <div className="flex flex-col gap-4">
            {images.length > 0 && (
              <Image
                src={images[0]}
                alt={`${product_name} main image`}
                className="rounded-lg"
                layout="responsive"
                width={250}
                height={250}
              />
            )}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((url, index) => (
                <div key={index} className="w-20 h-20 flex-shrink-0">
                  <Image
                    src={url}
                    alt={`${product_name} image ${index + 1}`}
                    className="rounded-lg object-cover"
                    layout="fixed"
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center lg:text-left">{product_name}</h1>
          {reviews?.average_rating && (
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-yellow-500 mt-2">
              <FaStar />
              <span className="text-lg font-medium">
                {reviews.average_rating.toFixed(1)} / 5
              </span>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2 text-center lg:text-left">{category}</p>
          {discount ? (
            <div className="mt-4 text-center lg:text-left">
              <p className="text-lg font-semibold text-red-500 line-through">
                Rp.{new Intl.NumberFormat("id-ID").format(price)}
              </p>
              <p className="text-2xl font-semibold text-[#56B280]">
                Rp.{new Intl.NumberFormat("id-ID").format(discountedPrice)}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-semibold text-[#56B280] mt-4 text-center lg:text-left">
              Rp.{new Intl.NumberFormat("id-ID").format(price)}
            </p>
          )}
          <p className="text-gray-600 mt-4 text-center lg:text-left">{product_desc}</p>

          <div className="mt-4 text-center lg:text-left">
            <p className="text-gray-600 text-sm">
              <strong>Eco Points:</strong> {eco_point}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Recycle Material:</strong> {recycle_material}%
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Stock:</strong> {stock > 0 ? stock : "Out of stock"}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center mt-6 bg-[#56B280] text-white text-lg font-medium py-2 px-6 rounded-lg hover:bg-[#070707] hover:shadow-md transition"
            disabled={stock <= 0}
          >
            <FaCartPlus className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        <div className="mt-4">
          {/* Average Rating */}
          {reviews?.average_rating !== null && reviews?.average_rating !== undefined ? (
            <div className="flex items-center space-x-2 text-yellow-500">
              <FaStar />
              <span className="text-lg font-medium">
                {reviews.average_rating} / 5
              </span>
              <span className="text-gray-500">
                ({reviews.total_reviews} reviews)
              </span>
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>

        {/* Individual Reviews */}
        <div className="mt-6 space-y-4">
          {reviews?.reviews?.length > 0 ? (
            reviews.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md border"
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">{review.user_name}</p>
                  <p className="text-yellow-500 flex items-center">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-sm" />
                    ))}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-1">{review.review}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(review.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available</p>
          )}
        </div>
      </div>

    </section>
  );
};

export default ProductDetailCard;
