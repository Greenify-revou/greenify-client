import { useState } from "react";
import ProductCard from "../../components/Products/ProductCard";

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

const SearchPage = () => {
    const mockProducts: ProductProps[] = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        product_name: `Product ${index + 1}`,
        product_category: `Category ${index + 1}`,
        product_description: `Description ${index + 1}`,
        product_price: 9999,
        image: "https://via.placeholder.com/200",
        echo_points: 50,
        echo_materials: 10,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(mockProducts.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedProducts = mockProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-screen-xl mx-auto">
                {paginatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        product_name={product.product_name}
                        product_category={product.product_category}
                        product_description={product.product_description}
                        product_price={product.product_price}
                        image={product.image}
                        echo_points={product.echo_points}
                        echo_materials={product.echo_materials}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 mx-1 rounded ${
                            currentPage === index + 1
                                ? "bg-green-600 text-white"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchPage;