import React from "react";
import CartSummary from "../Checkout/CartSummary";

interface CartItemProps {
  id: number;
  product_name: string;
  image_url: string;
  total_price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, product_name, image_url, total_price, quantity }) => {
  

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Cart Items */}
      <div className="space-y-4">
        <div
          key={id}
          className="border rounded-md p-4 flex items-center gap-4"
        >
          <img
            src={image_url}
            alt={product_name}
            className="w-16 h-16 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{product_name}</h2>
            <p className="text-sm text-gray-600">
              Price: Rp {total_price.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600">Quantity: {quantity}</p>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      {/* <CartSummary subtotal={subtotal} onCheckout={handleCheckout} /> */}
    </div>
  );
};

export default CartItem;
