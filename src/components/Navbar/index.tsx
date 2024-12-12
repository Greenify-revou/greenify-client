import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import SearchBar from "../SearchBar";
import { useState } from "react";

const Navbar = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" passHref>
            <img src="logo-greenify.png" alt="brand-logo" width={100} height={40} />
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Login, Register, Cart, User Profile */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div 
            className="relative cursor-pointer flex items-center gap-2 hover:text-gray-400 transition"
            onMouseEnter={() => setIsCartVisible(true)}
            onMouseLeave={() => setIsCartVisible(false)}
          >
            <FaShoppingCart size={24} />
            
            {/* Cart Form*/}
            {isCartVisible && (
              <div className="absolute mt-2 w-64 bg-white p-4 border border-gray-300 shadow-lg rounded-md">
                <h3 className="font-semibold text-lg">Your Cart</h3>
                <p className="text-sm text-gray-600">No items in your cart.</p>
                <Link href="/checkout">
                  <button className="w-full py-2 mt-4 bg-[#56B280] text-white rounded-lg hover:bg-[#4c9f67] transition">
                    Go to Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>

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

          {/* User Profile Icon */}
          {/* <Link href="/profile" passHref>
            <div className="cursor-pointer flex items-center gap-2 hover:text-gray-400 transition">
              <FaUserCircle size={24} />
              <span className="hidden sm:block"></span>
            </div>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;