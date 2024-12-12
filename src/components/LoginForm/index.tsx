import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login with:', { email, password, rememberMe })
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password/email')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md py-16'
    >
      <h2 className='text-3xl font-medium text-center mb-2'>
      Log In
      </h2>
      <p className='text-base font-medium text-center mb-12'>
        Don't have an account ?{' '}
        <Link
          href='/register'
          className='text-dark-green hover:opacity-50 transition-all duration-300'
        >
          Register Now
        </Link>
      </p>
      <div className='mb-4'>
        <label htmlFor='email' className='block text-sm font-medium text-black'>
          Email address
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <div className='flex justify-between items-center'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-black'
          >
            Password
          </label>
          <button
            type='button'
            onClick={handleForgotPassword}
            className='text-blue-500 text-xs hover:underline'
          >
            Forgot Password?
          </button>
        </div>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm'
          required
        />
      </div>

      {/* Remember Me Checkbox */}
      <div className='mb-4 flex items-center'>
        <input
          type='checkbox'
          id='rememberMe'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className='h-4 w-4 text-blue-500 focus:ring-blue-500'
        />
        <label htmlFor='rememberMe' className='ml-2 text-sm text-gray-700'>
          Remember Me
        </label>
      </div>

      {/* Forgot Password */}
      <div className='mb-4 text-right'></div>

      <button
        type='submit'
        className='w-full h-8 bg-[#56B280] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#56B280] focus:outline-none text-sm text-white hover:bg-green-400'
      >
        Login
      </button>
      <hr className='my-4' />
      <button
        type='button'
        className='flex gap-4 justify-center items-center w-full h-8 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#56B280] focus:outline-none text-sm'
      >
        <img src='/public/google-icon.svg' alt='Google' className='w-4 h-4' />
        Sign Up with Google Account
      </button>
    </form>
  )
}

export default LoginForm