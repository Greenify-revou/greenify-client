import React, { use, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { API_ADD_VOUCHER, API_CART_ITEMS, API_ORDER_ITEMS, API_PAYMENT } from "@/src/constants/api";
import { useRouter } from "next/router";

interface OrderItem {
  id: number;
  invoice_number: string;
  product_id: number;
  product_name: string;
  total_price: number;
  quantity: number;
  image_url: string;
}

interface CheckoutPageProps {
  order_id: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({order_id}) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(7000); 
  const [insuranceFee, setInsuranceFee] = useState(800); 
  const [useInsurance, setUseInsurance] = useState(true);
  const [total, setTotal] = useState(0);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter();

  const fetchOrderItems = async () => {
    try {
      const response = await fetch(API_ORDER_ITEMS + `/${order_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log(data)

      setOrderItems(data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotals = () => {
    const cartSubtotal = orderItems.reduce((sum, item) => sum + item.total_price * item.quantity, 0);
    setSubtotal(cartSubtotal);
    const finalTotal = cartSubtotal + shippingFee + (useInsurance ? insuranceFee : 0);
    setTotal(finalTotal);
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);
  
  useEffect(() => {
    calculateTotals();
  }, [orderItems, shippingFee, useInsurance]);

  const handleInsuranceToggle = () => {
    setUseInsurance(!useInsurance);
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(API_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          order_id: order_id,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      };

      console.log("Payment successful!");

      router.push(`/review/${order_id}`);
    } catch (error) {
      console.error("Checkout failed", error);
    }
  }

  const togglePromoModal = () => {
    setIsPromoModalOpen(!isPromoModalOpen);
  };

  const handlePromoSubmit = async () => {
    try {
      const response = await fetch(API_ADD_VOUCHER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          invoice_number: orderItems[0]?.invoice_number,
          kode_voucher: promoCode
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      console.log("Promo code applied successfully!");
      // Re-fetch order items after applying the promo code
      await fetchOrderItems();
    } catch (error) {
      console.error("Error applying promo code:", error);
    } finally {
      setIsPromoModalOpen(false);
      setPromoCode(""); // Reset promo code input
    }
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
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          {orderItems.length > 0 ? (
            orderItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.product_id}
                product_name={item.product_name}
                total_price={item.total_price}
                quantity={item.quantity}
                image_url={item.image_url}
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
          onClick={handlePayment}
          className="w-full bg-[#56B280] text-white py-2 rounded-md font-bold hover:bg-green-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
