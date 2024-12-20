import React from "react";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, onCheckout }) => {
  return (
    <div className="p-4 border-t">
      <div className="flex justify-between mb-4">
        <span className="font-medium">Subtotal</span>
        <span>Rp{subtotal.toFixed(2)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
      >
        Check-out
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Tax and shipping cost will be calculated later.
      </p>
    </div>
  );
};

export default CartSummary;