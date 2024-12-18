import { useState } from "react";
import ProductCard from "./ProductCard";
import useFetch from "@/src/hooks/useFetch";
import { API_PRODUCT } from "@/src/constants/api";

// Product Mock Up Models
const products_item = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    product_name: `Product Name ${i + 1}`,
    product_price: 130000 + i * 5000,
    product_description: `Description for Product ${i + 1}`,
    product_category: `Category ${i + 1}`,
    echo_points: 4 + (i % 5),
    echo_materials: 3 + (i % 4),
    image: "https://via.placeholder.com/200",
}));

interface Product {
    id: number;
    product_name: string;
    price: number;
    product_desc: string;
    category: string;
    eco_point: number;
    recyle_material: number;
    review: [number];
    stock: number;
    seller_id: number;
    category_id: number;
    image: string;
}

interface Response {
    data: Product[];
    message: string;
    status: number;
}

const Products = () => {
    const { data, loading, error } = useFetch<Response>({ endpoint: API_PRODUCT })

    const products = data?.data || [];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
                Meet Our Products
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-screen-xl mx-auto">
                {paginatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        product_name={product.product_name}
                        product_description={product.product_desc}
                        product_category={product.category}
                        echo_points={product.eco_point}
                        echo_materials={product.recyle_material}
                        image={product.image}
                        product_price={product.price}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                            i + 1 === currentPage
                                ? "bg-green-600 text-white"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Products;