import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
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
  const [shippingFee, setShippingFee] = useState(7000); 
  const [insuranceFee, setInsuranceFee] = useState(800); 
  const [useInsurance, setUseInsurance] = useState(true);
  const [total, setTotal] = useState(0);
  const [promoMessage] = useState("Pakai promo biar makin hemat!");

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get("/api/cart");
      setCartItems(response.data.items);
      calculateTotals(response.data.items, shippingFee, insuranceFee, useInsurance);
    };

    fetchCartItems();
  }, [shippingFee, insuranceFee, useInsurance]);

  const calculateTotals = (items: CartItemData[], shipping: number, insurance: number, insuranceActive: boolean) => {
    const cartSubtotal = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    setSubtotal(cartSubtotal);
    const finalTotal = cartSubtotal + shipping + (insuranceActive ? insurance : 0);
    setTotal(finalTotal);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotals(updatedCart, shippingFee, insuranceFee, useInsurance);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    calculateTotals(updatedCart, shippingFee, insuranceFee, useInsurance);
  };

  const handleInsuranceToggle = () => {
    setUseInsurance(!useInsurance);
  };

  const handleCheckout = async () => {
    try {
      await axios.post("/api/checkout", { items: cartItems, total });
      alert("Checkout successful!");
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Delivery Address */}
      <div className="border rounded-md p-4 mb-4">
        <h2 className="font-semibold">Delivery Address</h2>
        <p className="text-gray-700">Rumah &#x2022; Ridzky</p>
        <p className="text-gray-500">Jl Jendral Sudirman no.10</p>
        <button className="text-[#56B280] underline mt-2">Change</button>
      </div>

      {/* Cart Items */}
      <div className="border rounded-md p-4 mb-4">
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
      </div>

      {/* Shipping Options */}
      <div className="border rounded-md p-4 mb-4">
        <h2 className="font-semibold mb-2">Shipping</h2>
        <p>J&T Reguler (Rp{shippingFee.toLocaleString()})</p>
        <p className="text-gray-500">Estimated arrival: 19 Dec</p>
        <div className="mt-2">
          <input
            type="checkbox"
            checked={useInsurance}
            onChange={handleInsuranceToggle}
            className="mr-2"
          />
          <label>Shipping Insurance (Rp{insuranceFee.toLocaleString()})</label>
        </div>
      </div>

      {/* Promo Section */}
      <div className="border rounded-md p-4 mb-4 bg-green-100">
        <p className="text-[#56B280] font-medium">{promoMessage}</p>
      </div>

      {/* Shopping Summary */}
      <div className="border rounded-md p-4 mb-4">
        <h2 className="font-semibold mb-2">Shopping Summary</h2>
        <div className="flex justify-between mb-1">
          <span>Total Harga (1 Barang)</span>
          <span>Rp{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Total Ongkos Kirim</span>
          <span>Rp{shippingFee.toLocaleString()}</span>
        </div>
        {useInsurance && (
          <div className="flex justify-between mb-1">
            <span>Total Asuransi Pengiriman</span>
            <span>Rp{insuranceFee.toLocaleString()}</span>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Shopping Total</span>
          <span>Rp{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-[#56B280] text-white py-2 rounded-md font-bold hover:bg-green-600"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default CheckoutPage;
