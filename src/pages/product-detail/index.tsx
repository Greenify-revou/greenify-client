import ProductDetail from "@/src/components/ProductDetail";
import { API_PRODUCT } from "@/src/constants/api";
import useFetch from "@/src/hooks/useFetch";


// Product Mock Up Models
const products_item = {
    id: 1,
    product_name: `lorem ipsum dolor is amet fordelum fiertius`,
    product_price: 0.00,
    product_description: `Description for Product`,
    product_category: `Product Category`,
    echo_points: 3,
    echo_materials: 4,
    image: "https://via.placeholder.com/400",
};

const ProductDetailPage = () => {
    const addToCart = () => {
        alert("Product added to cart");
    }

    return(
        <section className="px-10 py-16 lg:py-24 bg-[#f5f5f5] h-screen">
            <ProductDetail
                id={products_item.id}
                product_name={products_item.product_name}
                product_description={products_item.product_description}
                product_category={products_item.product_category}
                echo_points={products_item.echo_points}
                echo_materials={products_item.echo_materials}
                image={products_item.image}
                product_price={products_item.product_price}
                addCart={addToCart}
            />
        </section>
    )
}

export default ProductDetailPage