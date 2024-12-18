import React, { useEffect, useState } from 'react'

interface InterestModel {
  category_name: string
  created_at: string
  id: number
  updated_at?: Date
}

interface RegisterInterestFormProps {
  onSubmit: (selectedInterests: string[]) => void
}

const RegisterInterestForm: React.FC<RegisterInterestFormProps> = ({
  onSubmit
}) => {
  const [interests, setInterests] = useState<InterestModel[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleInterestChange = (name: string) => {
    const updatedSelected = selectedInterests.includes(name)
      ? selectedInterests.filter((interest) => interest !== name)
      : [...selectedInterests, name]

    setSelectedInterests(updatedSelected)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(selectedInterests)
  }

  const fetchInterests = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:5000/api/v1/products/category'
      )
      const data = await response.json()
      setInterests(data)
    } catch (error) {
      console.error('Error fetching interests:', error)
    }
  }

  useEffect(() => {
    fetchInterests()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-[468px] w-full mx-auto bg-white p-6 rounded-lg shadow-md py-16'
    >
      {interests.map((item) => (
        <button
          type='button'
          key={item.id}
          onClick={() => handleInterestChange(item.category_name)}
          className={`border border-black px-4 py-2 rounded-lg text-black hover:bg-[#56B280] hover:bg-opacity-60 ${
            selectedInterests.includes(item.category_name)
              ? 'bg-[#56B280]'
              : 'bg-white'
          }`}
        >
          {item.category_name}
        </button>
      ))}
      <button
        type='submit'
        className='w-full py-2 mb-3 min-h-8 text-xs rounded-xl text-white hover:text-black bg-[#56B280] hover:bg-normal-green focus:ring-2 focus:ring-dark-green focus:outline-none border transition-all duration-300'
      >
        REGISTER
      </button>
    </form>
  )
}

export default RegisterInterestForm
