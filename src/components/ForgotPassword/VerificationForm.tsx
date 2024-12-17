import { useState } from "react";
import { useRouter } from "next/router";

const VerificationForm = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const router = useRouter();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Verifying OTP code:", otpCode);

    router.push("/forgot-password/reset");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md py-32"
      autoComplete="off" 
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Email Verification
      </h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Enter the numeric OTP code that has been sent to your email.
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            maxLength={1}
            required
            autoComplete="off" // Disable autocomplete for each input field
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#56B280] text-white rounded-lg hover:bg-green-400 transition"
      >
        Next
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => console.log("Resend OTP")}
          className="text-blue-500 hover:underline"
        >
          Didn't get the code? Resend Code
        </button>
      </div>
    </form>
  );
};

export default VerificationForm;