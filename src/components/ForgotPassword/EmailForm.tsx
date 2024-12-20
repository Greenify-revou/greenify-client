import { useState } from "react";
import { useRouter } from "next/router";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending verification to:", email);
    
    router.push("/forgot-password/verify");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md py-36"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Forgot Password
      </h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Enter your email to receive a verification code.
      </p>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-[#56B280] text-white rounded-lg hover:bg-green-400 transition"
      >
        Send Verification Code
      </button>
    </form>
  );
};

export default EmailForm;
