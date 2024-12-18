import { useState } from "react";
import { useRouter } from "next/router";
import { API_CHECK_OTP, API_REFRESH_OTP } from "@/src/constants/api";

interface VerificationFormProps {
  email: string;
  onNext?: () => void;
}

const VerificationForm = ({ email, onNext }: VerificationFormProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Verifying OTP code:", otpCode);

    try {
      const response = await fetch(API_CHECK_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email,
          otp_code: otpCode 
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const json = response.json();

      console.log(json);

      if (onNext) {
        onNext();
      } else {
        router.push("/forgot-password/reset");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const resendOTPCode = async () => {
    try {
      const response = await fetch(API_REFRESH_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
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
          onClick={resendOTPCode}
          className="text-blue-500 hover:underline"
        >
          Didn't get the code? Resend Code
        </button>
      </div>
    </form>
  );
};

export default VerificationForm;