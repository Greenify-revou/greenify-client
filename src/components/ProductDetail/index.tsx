// import { FaCartPlus, FaStar } from "react-icons/fa";
// import { useCart } from "../../context/CartContext";
// import { useState } from "react";

// interface Review {
//   rating: number;
//   comment: string;
//   reviewer: string; // Add reviewer name
// }

// interface ProductDetailCardProps {
//   id: number;
//   product_name: string;
//   price: number;
//   product_desc: string;
//   category: string;
//   eco_point: number;
//   recycle_material: number;
//   stock: number;
//   images?: string[]; // Optional: Array of image URLs
//   reviews?: Review[]; // Optional: Array of reviews
// }

// const ProductDetailCard = ({
//   id,
//   product_name,
//   category,
//   product_desc,
//   price,
//   images = [], // Default to an empty array if undefined
//   eco_point,
//   recycle_material,
//   stock,
//   reviews = [], // Default to an empty array if undefined
// }: ProductDetailCardProps) => {
//   const { addToCart } = useCart();
//   const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : ""); // Default to the first image or empty string

//   // const handleAddToCart = () => {
//   //   const item = {
//   //     id,
//   //     product_id: id,
//   //     product_name: product_name,
//   //     total_price: price,
//   //     quantity: 1,
//   //     imageUrl: selectedImage,
//   //   };
//   //   addToCart(item);
//   // };

//   const averageRating =
//     reviews.length > 0
//       ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
//       : null;

//   return (
//     <section className="max-w-screen-lg mx-auto p-6 bg-white shadow-md rounded-lg">
//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Image Gallery */}
//         <div className="lg:w-1/2">
//           <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt={product_name}
//                 className="object-contain max-h-full"
//               />
//             ) : (
//               <p className="text-gray-400">No Image Available</p>
//             )}
//           </div>
//           {images.length > 0 && (
//             <div className="flex space-x-2 mt-4 overflow-x-auto">
//               {images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`Thumbnail ${index + 1}`}
//                   className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
//                     selectedImage === img ? "ring-2 ring-green-500" : "ring-1 ring-gray-300"
//                   }`}
//                   onClick={() => setSelectedImage(img)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Details */}
//         <div className="lg:w-1/2">
//           <h1 className="text-3xl font-semibold text-gray-800">{product_name}</h1>
//           <p className="mt-2 text-sm text-gray-500">{category}</p>

//           {/* Price */}
//           <p className="mt-4 text-2xl font-bold text-green-600">
//             Rp {price}
//           </p>

//           {/* Product Details */}
//           <div className="mt-4 space-y-2">
//             <p className="text-gray-700">
//               <strong>Eco Points:</strong> {eco_point}
//             </p>
//             <p className="text-gray-700">
//               <strong>Recycle Material:</strong> {recycle_material}%
//             </p>
//             <p className="text-gray-700">
//               <strong>Stock:</strong> {stock > 0 ? stock : "Out of Stock"}
//             </p>
//             <p className="text-gray-700">{product_desc}</p>
//           </div>

//           {/* Reviews and Ratings */}
//           <div className="mt-6">
//             <div className="flex items-center space-x-2">
//               <FaStar className="text-yellow-400" />
//               {averageRating ? (
//                 <span className="text-gray-700">
//                   {averageRating} ({reviews.length}{" "}
//                   {reviews.length > 1 ? "reviews" : "review"})
//                 </span>
//               ) : (
//                 <span className="text-gray-500">No reviews yet</span>
//               )}
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             className="mt-6 py-3 px-6 w-full lg:w-auto bg-green-500 text-white text-lg rounded-lg shadow hover:bg-green-600 flex items-center justify-center"
//             onClick={handleAddToCart}
//             disabled={stock === 0}
//           >
//             <FaCartPlus className="mr-2" /> Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       {reviews.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
//           <div className="space-y-4">
//             {reviews.map((review, index) => (
//               <div
//                 key={index}
//                 className="p-4 bg-gray-100 rounded-lg shadow-md flex items-start space-x-4"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full">
//                   {review.reviewer[0].toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-800">
//                     <strong>{review.reviewer}</strong>
//                   </p>
//                   <p className="text-sm text-gray-600">{review.comment}</p>
//                   <div className="flex items-center mt-1">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         className={`mr-1 ${
//                           i < review.rating ? "text-yellow-400" : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ProductDetailCard;
