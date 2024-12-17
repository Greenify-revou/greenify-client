import { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import RegisterFormBiodata from "../../components/RegisterFormBiodata";

const RegisterPage = () => {
  const [step, setStep] = useState(1); // 1: Email Form, 2: Biodata Form

  const handleNextStep = () => {
    setStep(2); // Pindah ke form biodata
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === 1 && <RegisterForm onNext={handleNextStep} />}
      {step === 2 && <RegisterFormBiodata />}
    </div>
  );
};

export default RegisterPage;