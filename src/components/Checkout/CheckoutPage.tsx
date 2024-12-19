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
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

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

  const togglePromoModal = () => {
    setIsPromoModalOpen(!isPromoModalOpen);
  };

  const handlePromoSubmit = () => {
    alert(`Promo code ${promoCode} submitted!`);
    setIsPromoModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Section */}
      <div>
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
        <div className="border rounded-md p-4 mb-4 bg-green-100 cursor-pointer" onClick={togglePromoModal}>
          <p className="text-[#56B280] font-medium">Pakai promo biar makin hemat!</p>
        </div>

        {isPromoModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="font-semibold text-lg mb-4">Enter Promo Code</h2>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="w-full border p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#56B280]"
              />
              <button
                onClick={handlePromoSubmit}
                className="w-full bg-[#56B280] text-white py-2 rounded-md font-bold hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={togglePromoModal}
                className="w-full mt-2 bg-gray-200 py-2 rounded-md font-bold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div>
        {/* Payment Method */}
        <div className="border rounded-md p-4 mb-4">
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <div className="mb-4">
            <h3 className="font-medium">Credit/Debit Card</h3>
            <div className="border p-4 rounded-md">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border-b mb-2 p-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Holder Name"
                className="w-full border-b mb-2 p-2 focus:outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  className="w-1/2 border-b p-2 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border-b p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium">QRIS</h3>
            <div className="border p-4 rounded-md text-center">
              <img
                src="qr-dummy.png"
                alt="QR Code"
                className="mx-auto w-48 h-48 mt-2"
              />
            </div>
          </div>
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
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
