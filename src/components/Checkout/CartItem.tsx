import React from "react";
import CartItem from "../Checkout/CartItem";
import CartSummary from "../Checkout/CartSummary";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); 

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Proceed to checkout!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart Items */}
      <div className="border rounded-md p-4 mb-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.name}
              productPrice={item.price}
              quantity={item.quantity}
              imageUrl="https://via.placeholder.com/100" 
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary */}
      <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
    </div>
  );
};

export default CheckoutPage;