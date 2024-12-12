import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import axios from "axios";

interface CartItemData {
  id: number;
  productName: string;
  productPrice: number;
  quantity: number;
  imageUrl: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Fetch cart data from backend
    const fetchCartItems = async () => {
      const response = await axios.get("/api/cart");
      setCartItems(response.data.items);
      calculateSubtotal(response.data.items);
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = (items: CartItemData[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateSubtotal(updatedCart);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    calculateSubtotal(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      await axios.post("/api/checkout", { items: cartItems });
      alert("Checkout successful!");
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart Items</h1>
      <button className="text-green-500 underline mb-6">
        Back to shopping
      </button>
      <div className="border rounded-md p-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productName}
              productPrice={item.productPrice}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default CheckoutPage;