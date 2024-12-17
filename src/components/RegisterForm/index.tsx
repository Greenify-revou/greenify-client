import { API_REGISTER } from "@/src/constants/api";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"; 

const RegisterForm = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); 
  const [birthDate, setBirthDate] = useState("");  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone, birthDate }),
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Register failed with status ${data.message}`);
      }

      console.log(data.message);
      
    } catch (error) {
      console.error(error);
    }
    
    console.log("Register with:", { email, password, phone, birthDate });
  };

  return (
    <div className="relative max-w-[468px] w-full mx-auto bg-white p-6 rounded-lg shadow-md py-16">
      {/* Back arrow icon */}
      <Link href="/">
        <FaArrowLeft className="absolute top-6 left-6 w-6 h-6 text-gray-700 cursor-pointer hover:text-dark-green transition-all duration-300" />
      </Link>

      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-medium text-center">Sign Up Now!</h2>
        <p className="text-base font-medium text-center mb-12">
          Already have an account?{" "}
          <Link href="/login" className="text-dark-green hover:opacity-50 transition-all duration-300">
            Sign In Now
          </Link>
        </p>

        <button
          type="button"
          className="flex justify-center items-center gap-2 w-full py-2 min-h-8 text-xs rounded-xl bg-white hover:bg-gray-200 border transition-all duration-300"
        >
          <img src="../images/google-icon.svg" alt="Google Logo" className="w-4 h-4" />
          Sign up with Google account
        </button>

        <hr className="my-4" />

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
            required
          />
          <p className="text-xs font-light mt-2 mb-6">Contoh: you@example.com</p>
        </div>

        <button
          type="submit"
          className="w-full h-8 bg-[#56B280] text-white rounded-xl hover:bg-green-400 transition-all duration-300"
        >
          Next Step
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;