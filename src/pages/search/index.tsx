import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/Products/ProductCard";
import { API_CATEGORY, API_SEARCH_PRODUCT } from "@/src/constants/api";



interface ProductProps {
    id: number;
    product_name: string;
    category_name: string;
    product_desc: string;
    price: number; // Update this to be a number
    image_url: string;
    eco_point: number;
    recycle_material: number;
    discount?: number;
    reviews: {
        average_rating: number | null;
        total_reviews: number;
        reviews: {
            user_name: string;
            review: string;
            rating: number;
            created_at: string;
        }[];
    };
}

interface Category {
    id: number;
    category_name: string;
}

const SearchPage = () => {
    const router = useRouter();
    const { words, category } = router.query;

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        (category as string) || null
    );
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [hasDiscount, setHasDiscount] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const itemsPerPage = 8;

    // Fetch product categories
    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(API_CATEGORY, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data = await response.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error(error);
        }
    }, []);

    // Fetch products based on filters
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
    
        try {
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                per_page: itemsPerPage.toString(),
                ...(words && { words: words.toString() }),
                ...(selectedCategory && { category: selectedCategory }),
                ...(minPrice && { min_price: minPrice }),
                ...(maxPrice && { max_price: maxPrice }),
                has_discount: hasDiscount ? "true" : "false",
                sort_order: sortOrder === "newest" ? "desc" : "asc",
            });
    
            const response = await fetch(`${API_SEARCH_PRODUCT}?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
    
            const data = await response.json();
    
            // Update products and pagination based on the API structure
            setProducts(data.data.products || []);
            setTotalPages(data.data.pagination?.total_pages || 1);
        } catch (error: unknown) {
            setError(
                (error as Error).message || "An error occurred while fetching products."
            );
        } finally {
            setLoading(false);
        }
    }, [
        currentPage,
        words,
        selectedCategory,
        minPrice,
        maxPrice,
        hasDiscount,
        sortOrder,
    ]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (category) {
            setSelectedCategory(category as string);
        }
    }, [category]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const resetFilters = () => {
        setSelectedCategory(null);
        setMinPrice("");
        setMaxPrice("");
        setHasDiscount(false);
        setSortOrder("newest");
        setCurrentPage(1);
    };

    return (
        <div className="flex max-w-screen-xl mx-auto">
            {/* Sidebar */}
            <aside className="w-64 p-6 border-r border-gray-300 bg-gray-50 flex flex-col h-full min-h-[80vh]">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                {/* Categories Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="categories"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Categories
                    </label>
                    <select
                        id="categories"
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.category_name}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Price Range
                    </label>
                    <div className="flex space-x-2 mt-1">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-1/2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-1/2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                </div>

                {/* Discount Filter */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Discount
                    </label>
                    <input
                        type="checkbox"
                        checked={hasDiscount}
                        onChange={() => setHasDiscount(!hasDiscount)}
                        className="mt-1 focus:ring-green-600"
                    />{" "}
                    Has Discount
                </div>

                {/* Sort Order */}
                <div>
                    <label
                        htmlFor="sortOrder"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Sort By
                    </label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <button
                    onClick={resetFilters}
                    className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-600"
                >
                    Reset Filters
                </button>
            </aside>

            {/* Products Section */}
            <main className="flex-1 p-6 bg-white">
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 mb-4 rounded">{error}</div>
                )}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-10">No products found.</p>
                        )}

                        {/* Pagination */}
                        <div className="flex justify-center mt-8 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === index + 1
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default SearchPage;
