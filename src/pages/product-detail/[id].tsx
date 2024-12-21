import { useRouter } from "next/router";
import ProductDetail from "../../components/ProductDetail";
import useFetch from "@/src/hooks/useFetch";
import { API_PRODUCT } from "@/src/constants/api";
import { ProductProps } from "@/src/components/Products/ProductCard";



interface ProductDetailModel extends ProductProps{
    stock : number;
}
interface Response {
    data: ProductDetailModel;
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
    console.log(data.data);
    // Map Product to match ProductDetailCardProps
    const productProps = {
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        product_desc: product.product_desc,
        category: product.category_name,
        eco_point: product.eco_point,
        recycle_material: product.recycle_material,
        stock: product.stock,
        discount : product.discount,
        image_url: product.image_url, // Renaming `image` to `image_url`
        reviews: {
            average_rating: product.reviews?.average_rating || null, // Ensure `average_rating` exists or set to null
            total_reviews: product.reviews?.total_reviews || 0, // Ensure `total_reviews` exists or set to 0
            reviews: product.reviews?.reviews || [], // Ensure `reviews` is an array or default to an empty array
        },
    };

    return <ProductDetail {...productProps} />;
};

export default ProductDetailPage;
