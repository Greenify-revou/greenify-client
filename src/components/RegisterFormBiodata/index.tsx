import { useState } from 'react'

interface RegisterFormBiodataProps {
  onSubmit: (data: {
    fullName: string
    dateofbirth: string
    gender: string
    password: string
  }) => void
  onNext: () => void
}

const RegisterFormBiodata = ({
  onSubmit,
  onNext
}: RegisterFormBiodataProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    birthDate: { year: '', month: '', day: '' },
    gender: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'year' || name === 'month' || name === 'day') {
      setFormData((prev) => ({
        ...prev,
        birthDate: { ...prev.birthDate, [name]: value }
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match')
      return
    }

    const biodataData = {
      fullName: formData.fullName,
      dateofbirth: `${formData.birthDate.year}-${formData.birthDate.month}-${formData.birthDate.day}`,
      gender: formData.gender,
      password: formData.password
    }

    onSubmit(biodataData)
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-[468px] w-full mx-auto bg-white p-6 rounded-lg shadow-md py-16'
    >
      <h2 className='text-3xl font-medium text-center'>Personal Information</h2>
      <p className='text-base font-medium text-center mb-12'>
        Fill in your personal details to register for a Greenify account.
      </p>

      <div className='mb-4'>
        <label
          htmlFor='fullName'
          className='block text-sm font-medium text-gray-700'
        >
          Full Name
        </label>
        <input
          type='text'
          id='fullName'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          className='w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='confirmPassword'
          className='block text-sm font-medium text-gray-700'
        >
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          className='w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
          required
        />
      </div>

      <div className='mb-4'>
        {/* Gender Dropdown */}
        <label
          htmlFor='gender'
          className='block text-sm font-medium text-gray-700'
        >
          Gender
        </label>
        <select
          id='gender'
          name='gender'
          value={formData.gender}
          onChange={handleChange}
          className='w-full h-8 py-1 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
          required
        >
          <option value='' disabled>
            Select Gender
          </option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Date of Birth
        </label>
        <div className='flex gap-2'>
          <input
            type='number'
            name='year'
            placeholder='Year'
            value={formData.birthDate.year}
            onChange={handleChange}
            className='w-1/3 h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
            required
          />
          <input
            type='number'
            name='month'
            placeholder='Month'
            value={formData.birthDate.month}
            onChange={handleChange}
            className='w-1/3 h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
            required
          />
          <input
            type='number'
            name='day'
            placeholder='Day'
            value={formData.birthDate.day}
            onChange={handleChange}
            className='w-1/3 h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
            required
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full py-2 mb-3 min-h-8 text-xs rounded-xl text-white hover:text-black bg-[#56B280] hover:bg-normal-green focus:ring-2 focus:ring-dark-green focus:outline-none border transition-all duration-300'
      >
        NEXT
      </button>
    </form>
  )
}

export default RegisterFormBiodata
