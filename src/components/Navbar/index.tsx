import Link from "next/link";
import SearchBar from "../SearchBar";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" passHref>
          <img src="logo-greenify.png"alt="brand-logo" width={100} height={40} />
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Login, Register,*/}
        <div className="flex items-center gap-4">
          <Link href="/login" passHref>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition">
              Login
            </button>
          </Link>
          <Link href="/register" passHref>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition">
              Register
            </button>
          </Link>

          {/* User Profile Icon */}
          <Link href="/profile" passHref>
            <div className="cursor-pointer flex items-center gap-2 hover:text-gray-400 transition">
              <FaUserCircle size={24} />
              <span className="hidden sm:block"></span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;