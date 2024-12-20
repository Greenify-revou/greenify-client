<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_RECOMMENDATIONS, API_CATEGORY } from "@/src/constants/api";
import RecommendationCard from "./RecommendationCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
=======
import { useState } from "react";
import ProductCard from "./ProductCard";
import useFetch from "@/src/hooks/useFetch";
import { API_ALL_PRODUCT } from "@/src/constants/api";
>>>>>>> dev-frontend

interface Recommendation {
    id: number;
    name: string;
    price: number;
    discount?: number;
    category: string;
    image_url: string;
    eco_point: number;
    recycle_material_percentage: number;
}

interface Category {
    id: number;
    category_name: string;
}

interface RecommendationResponse {
    data: {
        data: Recommendation[];
        page: number;
        per_page: number;
        total_items: number;
        total_pages: number;
    };
    message: string;
    status: string;
}

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const itemsPerPage = 10;

    const router = useRouter();

    const fetchRecommendations = async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${API_RECOMMENDATIONS}?page=${page}&per_page=${itemsPerPage}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }), // Add token only if it exists
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch recommendations");
            }

            const data: RecommendationResponse = await response.json();

            setRecommendations(data.data.data);
            setCurrentPage(data.data.page);
            setTotalPages(data.data.total_pages);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setError("Failed to load recommendations");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(API_CATEGORY);
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchRecommendations(currentPage);
        fetchCategories();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCategoryClick = (categoryName: string) => {
        router.push(`/search?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-10 bg-gray-50">
            <div className="max-w-screen-xl mx-auto">
                {/* Categories Section */}
                <div className="mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6">
                        Shop by Categories
                    </h2>
                    <div className="relative">
                        {/* Slider Container */}
                        <div className="overflow-x-scroll flex space-x-4 py-4 scrollbar-hide">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex-shrink-0 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md flex items-center justify-center text-center group hover:scale-105 transition-transform cursor-pointer"
                                    onClick={() => handleCategoryClick(category.category_name)}
                                >
                                    <p className="text-lg font-bold group-hover:underline">
                                        {category.category_name}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Left Arrow */}
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
                            onClick={() => {
                                document.querySelector(".overflow-x-scroll")?.scrollBy({
                                    left: -300,
                                    behavior: "smooth",
                                });
                            }}
                        >
                            <FaChevronLeft className="text-gray-800" />
                        </button>

                        {/* Right Arrow */}
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
                            onClick={() => {
                                document.querySelector(".overflow-x-scroll")?.scrollBy({
                                    left: 300,
                                    behavior: "smooth",
                                });
                            }}
                        >
                            <FaChevronRight className="text-gray-800" />
                        </button>
                    </div>
                </div>

                {/* Recommendations Section */}
                <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6">
                        Recommended for You
                    </h2>
                    <p className="text-lg text-gray-600 text-center mb-8">
                        Our top picks for eco-friendly and sustainable products.
                    </p>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {recommendations.map((recommendation) => (
                                    <RecommendationCard
                                        key={recommendation.id}
                                        id={recommendation.id}
                                        product_name={recommendation.name}
                                        price={recommendation.price}
                                        image_url={recommendation.image_url}
                                        eco_point={recommendation.eco_point}
                                        recycle_material={recommendation.recycle_material_percentage}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center items-center mt-10 space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                                            i + 1 === currentPage
                                                ? "bg-green-600 text-white"
                                                : "bg-white border border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
