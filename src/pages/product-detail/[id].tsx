import { useRouter } from "next/router";
import ProductDetail from "../../components/ProductDetail";
import useFetch from "@/src/hooks/useFetch";
import { API_PRODUCT } from "@/src/constants/api";

interface Product {
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

interface Response {
    data: Product;
    message: string;
    status: number;
}

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useFetch<Response>({ endpoint: API_PRODUCT + `/${id}` });

    if (loading) {
        return (
            <div className="text-center py-16">
                <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
            </div>
        );
    }

    if (error || !data?.data) {
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

    const product = data.data;

    // Map Product to match ProductDetailCardProps
    const productProps = {
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        product_desc: product.product_desc,
        category: product.category,
        eco_point: product.eco_point,
        recycle_material: product.recycle_material,
        stok: product.stok,
        image_url: product.image, // Rename `image` to `image_url`
        reviews: {
            average_rating: null, // Example data (replace with actual)
            total_reviews: 0, // Example data (replace with actual)
            reviews: [], // Example data (replace with actual)
        },
    };

    return <ProductDetail {...productProps} />;
};

export default ProductDetailPage;
