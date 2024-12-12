import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  let hoverTimeout: NodeJS.Timeout | null = null;

  // Example cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Spiced Mint Candleleaf", price: 9.99, quantity: 1 },
    { id: 2, name: "Vanilla Bliss Candle", price: 12.99, quantity: 2 },
  ]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsCartVisible(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsCartVisible(false);
    }, 300); 
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout); 
    };
  }, []);

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" passHref>
            <img
              src="logo-greenify.png"
              alt="brand-logo"
              width={100}
              height={40}
            />
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Login, Register, Cart, User Profile */}
        <div className="flex items-center gap-4 relative">
          {/* Cart Icon */}
          <div
            className="relative cursor-pointer flex items-center gap-2 hover:text-black transition"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaShoppingCart size={24} />

            {/* Cart Dropdown */}
            {isCartVisible && (
              <div
                className="absolute top-10 right-0 mt-2 w-64 bg-white p-4 border border-gray-300 shadow-lg rounded-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="font-semibold text-lg mb-2">Your Cart</h3>
                {cartItems.length > 0 ? (
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-black">
                            {item.quantity} x Rp{item.price.toFixed(2)}
                          </p>
                        </div>
                        <p>Rp{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium mt-2">
                      <span>Subtotal</span>
                      <span>Rp{subtotal.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout">
                      <button className="w-full py-2 mt-4 bg-[#56B280] text-white rounded-lg hover:bg-[#4c9f67] transition">
                        Go to Checkout
                      </button>
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No items in your cart.</p>
                )}
              </div>
            )}
          </div>

          {/* Login and Register */}
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
      </div>
    </nav>
  );
};

export default Navbar;