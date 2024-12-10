import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
    return (
        <div>
            <footer className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 lg:py-10 bg-[#E4E4E4]">
            
                {/* Left Side */}
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <img
                        src="logo-greenify.png"
                        alt="brand-logo"
                        className="mx-auto"
                        width={300}
                        height={300}
                    />
                    <p className="text-center text-lg sm:mb-10">
                        Combining Local, Raw, and Recyclable materials for Eco Friendly Goods
                    </p>
                </div>

                {/* Right Side */}
                <div className="lg:flex lg:justify-center lg:w-1/2 text-center lg:text-left lg:space-x-20 mt-4">
                    
                    {/* Site Links */}
                    <ul className="text-lg">
                        <li><a href="#" target="_blank" className="hover:underline">Home</a></li>
                        <li><a href="#" target="_blank" className="hover:underline">About</a></li>
                        <li><a href="#" target="_blank" className="hover:underline">Raw Material</a></li>
                        <li><a href="#" target="_blank" className="hover:underline">Finished Goods</a></li> 
                    </ul>

                    {/* Social Media */}
                    <ul className="lg:mt-0 mt-4 text-lg">
                        <li>
                            <FaInstagram className="inline-block mr-2" />
                            <a href="https://www.instagram.com/" target="_blank" className="hover:underline">Follow Us on Instagram</a>
                        </li>
                        <li>
                            <FaFacebook className="inline-block mr-2" />
                            <a href="https://www.facebook.com/" target="_blank" className="hover:underline">Follow Us on Facebook</a>
                        </li>
                        <li>
                            <SiGmail className="inline-block mr-2" />
                            <a href="https://www.gmail.com/" target="_blank" className="hover:underline">Contact Us on Gmail</a>
                        </li>
                    </ul> 
                </div>
            </footer>

            {/* Copy Right */}
            <div className="bg-[#070707]">
                <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-white">
                        &copy; {new Date().getFullYear()} Greenify - All rights reserved.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Footer