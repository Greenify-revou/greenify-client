import React from "react";

interface CartItemProps {
  id: number;
  productName: string;
  productPrice: number;
  quantity: number;
  imageUrl: string;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  productName,
  productPrice,
  quantity,
  imageUrl,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div className="flex items-center border-b pb-4 mb-4">
      <img src={imageUrl} alt={productName} className="w-16 h-16 rounded-md" />
      <div className="ml-4 flex-1">
        <h4 className="font-medium text-lg">{productName}</h4>
        <button
          className="text-sm text-red-500 underline"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => onQuantityChange(id, Number(e.target.value))}
          className="w-12 text-center border rounded"
        />
        <p className="ml-4">${(productPrice * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;