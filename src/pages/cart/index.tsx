import React from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleIncrease = (itemId: number) => {
    updateQuantity(itemId, 1);
  };

  const handleDecrease = (itemId: number) => {
    updateQuantity(itemId, -1);
  };

  const handleRemove = (itemId: number) => {
    removeFromCart(itemId);
  };

  return (
    <section className="max-w-screen-lg mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Go shop some products!</p>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      Price: Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            <p className="text-lg">
              Total Price:{" "}
              <span className="font-bold">
                Rp{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString("id-ID")}
              </span>
            </p>

            {/* Checkout Button */}
            <Link href="/checkout" passHref>
              <button className="mt-4 w-full bg-[#56B280] text-white py-2 rounded hover:bg-green-600 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;