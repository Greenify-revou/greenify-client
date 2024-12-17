import { API_REGISTER } from "@/src/constants/api";
import { useState } from "react";

const RegisterForm = () => {
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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Input Nomor Telepon */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Input Tanggal Lahir */}
      <div className="mb-4">
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-400">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;