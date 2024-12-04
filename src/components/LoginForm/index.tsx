import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password, rememberMe });
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password/email"); 
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
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

      {/* Remember Me Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember Me</label>
      </div>

      {/* Forgot Password */}
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-blue-500 text-sm hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
