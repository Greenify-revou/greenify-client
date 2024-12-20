import VerificationForm from "../../components/ForgotPassword/VerificationForm";

const VerifyPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <VerificationForm email={""} />
    </div>
  );
};

export default VerifyPage;
