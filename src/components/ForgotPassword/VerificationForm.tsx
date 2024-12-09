import { useState } from "react";
import { useRouter } from "next/router";

const VerificationForm = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying code:", code);
    
    router.push("/forgot-password/reset");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Verification Code
      </h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Enter the verification code sent to your email.
      </p>
      <div className="mb-4">
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
      >
        Verify Code
      </button>
    </form>
  );
};

export default VerificationForm;
