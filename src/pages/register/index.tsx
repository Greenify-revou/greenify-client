import { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import RegisterFormBiodata from "../../components/RegisterFormBiodata";
import VerificationForm from "../../components/ForgotPassword/VerificationForm";


const RegisterPage = () => {
  const [step, setStep] = useState(1); // 1: Email Form, 2: Biodata Form
  const [email, setEmail] = useState("");

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const getEmail = (email: string) => {
    setEmail(email);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === 1 && <RegisterForm getEmail={getEmail} onNext={nextStep}/>}
      {step === 2 && <VerificationForm email={email} onNext={nextStep}/>}
      {step === 3 && <RegisterFormBiodata email={email}/>}
    </div>
  );
};

export default RegisterPage;