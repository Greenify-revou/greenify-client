import { useState } from "react";

const RegisterForm = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[468px] w-full mx-auto bg-white p-6 rounded-lg shadow-md py-16"
    >
      <h2 className="text-3xl font-medium text-center">Daftar Sekarang!</h2>
      <p className="text-base font-medium text-center mb-12">
        Sudah punya akun? Masuk Sekarang
      </p>

      <button
        type="button"
        className="flex justify-center items-center gap-2 w-full py-2 min-h-8 text-xs rounded-xl bg-white hover:bg-gray-200 border transition-all duration-300"
      >
        <img
          src="../images/google-icon.svg"
          alt="Google Logo"
          className="w-4 h-4"
        />
        Daftar dengan akun Google
      </button>

      <hr className="my-4" />

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
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
        <p className="text-xs font-light mt-2 mb-6">Contoh: email@tokopedia.com</p>
      </div>

      <button
        type="submit"
        className="w-full py-2 mb-3 min-h-8 text-xs rounded-xl text-white hover:text-black bg-[#56B280] hover:bg-normal-green focus:ring-2 focus:ring-dark-green focus:outline-none border transition-all duration-300"
      >
        Daftar Sekarang
      </button>

      <p className="text-xs font-light text-center">
        Dengan mendaftar anda menyetujui syarat dan ketentuan Greenify
      </p>
    </form>
  );
};

export default RegisterForm;