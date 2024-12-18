import { useState } from 'react'
import RegisterForm from '../../components/RegisterForm'
import RegisterFormBiodata from '../../components/RegisterFormBiodata'
import VerificationForm from '../../components/ForgotPassword/VerificationForm'
import RegisterInterestForm from '@/src/components/RegisterInterestForm'
import { API_REGISTER } from '@/src/constants/api'

interface RegistrationData {
  fullName: string
  email: string
  dateofbirth: string // ISO format (YYYY-MM-DD)
  gender: string
  password: string
  interests: string[]
}

const RegisterPage = () => {
  const [step, setStep] = useState(1) // Steps in the registration process
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    dateofbirth: '',
    gender: '',
    password: '',
    interests: []
  })

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handleEmailChange = (email: string) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      email
    }))
  }

  const handleBiodataSubmit = (biodataData: {
    fullName: string
    dateofbirth: string
    gender: string
    password: string
  }) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      ...biodataData
    }))
    nextStep()
  }

  const handleSubmitRegistration = async (selectedInterests: string[]) => {
    const finalData = {
      ...registrationData,
      interests: selectedInterests
    }

    try {
      const response = await fetch(API_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Registration successful:', result)
    } catch (error) {
      console.error('Failed to submit registration data:', error)
    }

    setStep((prevStep) => prevStep + 1)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      {step === 1 && (
        <RegisterForm getEmail={handleEmailChange} onNext={nextStep} />
      )}
      {step === 2 && (
        <VerificationForm email={registrationData.email} onNext={nextStep} />
      )}
      {step === 3 && (
        <RegisterFormBiodata onSubmit={handleBiodataSubmit} onNext={nextStep} />
      )}
      {step === 4 && (
        <RegisterInterestForm onSubmit={handleSubmitRegistration} />
      )}
    </div>
  )
}

export default RegisterPage
