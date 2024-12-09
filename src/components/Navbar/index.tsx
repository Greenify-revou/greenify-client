import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" passHref>
            <Image src="/src/assets/logo1.png" alt="Logo" width={100} height={40} />
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Login & Register Buttons */}
        <div className="flex gap-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
