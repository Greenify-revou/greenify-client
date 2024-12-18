import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import SearchBar from "../SearchBar";
import { useAuth } from "@/src/context/AuthContext";
import { BiLogoUnity } from "react-icons/bi";

const Navbar = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [cartCount, setCartCount] = useState<number>(0);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  const handleIncrease = (itemId: number) => updateQuantity(itemId, 1);
  const handleDecrease = (itemId: number) => updateQuantity(itemId, -1);
  const handleRemove = (itemId: number) => removeFromCart(itemId);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" passHref>
            <img src="greenify-newlogo.png" alt="brand-logo" width={100} height={40} />
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Login, Register, Cart */}
        <div className="flex items-center gap-4">
          {/* Cart Dropdown */}
          <div className="relative group">
            {/* Cart Icon with Link */}
            <Link href="/cart" passHref>
              <div className="flex items-center gap-2 cursor-pointer relative">
                <FaShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Dropdown Cart */}
            <div className="absolute right-0 top-8 w-72 bg-white p-4 border border-gray-300 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-600">Your cart is empty</p>
              ) : (
                <div className="max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2 items-center">
                      {/* Product Image and Name */}
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.name} width={40} height={40} className="object-cover" />
                        <span className="block text-sm font-semibold">{item.name}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => handleDecrease(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => handleIncrease(item.id)}
                        >
                          +
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Checkout Button */}
              {cartItems.length > 0 && (
                <div className="mt-4">
                  <Link href="/checkout" passHref>
                    <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                      Go to Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {isAuthenticated ? (
            // If authenticated, show logout button
            <Link href="/login" passHref>
              <button
                className="bg-[#56B280] text-white py-2 px-4 rounded hover:bg-[#4c9f67] transition"
                onClick={() => logout()} // Use onClick for buttons
              >
                Logout
              </button>
            </Link>
          ) : (
            // If not authenticated, show login and register buttons
            <div className="flex space-x-4">
              <Link href="/login" passHref>
                <button className="bg-white text-[#56B280] py-2 px-4 rounded hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              <Link href="/register" passHref>
                <button className="bg-[#56B280] text-white py-2 px-4 rounded hover:bg-[#4c9f67] transition">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;