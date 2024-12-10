import { useState } from "react";
import ProductCard from "./ProductCard"

// Product Mock Up Models
const products_item = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    product_name: `lorem ipsum dolor is amet fordelum fiertius (${i+1})`,
    product_price: 0.00,
    product_description: `Description for Product ${i+1}`,
    product_category: `Product Category ${i+1}`,
    echo_points: 3,
    echo_materials: 4,
    image: "https://via.placeholder.com/200",
}));

const Products = () => {

    const itemsPerPage = 8; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products_item.length / itemsPerPage);
    const paginatedProducts = products_item.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
       <section className="px-10 py-16 lg:py-24 bg-[#D0FFD2]">

            <h2 className="lg:text-5xl text-3xl text-center font-bold text-[#070707] mb-3">Meet Our Products</h2>
            <h2 className="lg:text-3xl text-2xl text-center font-medium text-[#070707] mb-10">Order It for You and Safe The Earth</h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 lg:gap-6 gap-7">
                {paginatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        product_name={product.product_name}
                        product_description={product.product_description}
                        product_category={product.product_category}
                        echo_points={product.echo_points}
                        echo_materials={product.echo_materials}
                        image={product.image}
                        product_price={product.product_price}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded ${
                    i + 1 === currentPage
                        ? "bg-[#070707] text-white"
                        : "bg-white text-gray-800 hover:bg-[#070707] hover:text-white"
                    }`}
                >
                    {i + 1}
                </button>
                ))}
            </div>
            
       </section>
    )
}

export default Products