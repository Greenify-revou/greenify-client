import { useRouter } from "next/router";
import ProductDetail from "../../components/ProductDetail";

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Mock Data
    const mockProducts = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        product_name: `Product Name ${i + 1}`,
        product_price: 130000 + i * 5000,
        product_description: `Detailed description for Product ${i + 1}`,
        product_category: `Category ${i + 1}`,
        echo_points: 4 + (i % 5),
        echo_materials: 3 + (i % 4),
        image: "https://via.placeholder.com/500",
    }));

    const product = mockProducts.find((item) => item.id === Number(id));

    if (!product) {
        return (
            <div className="text-center py-16">
                <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return <ProductDetail {...product} />;
};

export default ProductDetailPage;