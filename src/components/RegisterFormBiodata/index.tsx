import { useState } from 'react';

const RegisterFormBiodata = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    birthDate: { year: '', month: '', day: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'year' || name === 'month' || name === 'day') {
      setFormData((prev) => ({
        ...prev,
        birthDate: { ...prev.birthDate, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok');
      return;
    }

    console.log('Register Data:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[468px] w-full mx-auto bg-white p-6 rounded-lg shadow-md py-16"
    >
      <h2 className="text-3xl font-medium text-center">Personal Information</h2>
      <p className="text-base font-medium text-center mb-12">
        Fill in your personal details to register for a Greenify account.
      </p>

      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.birthDate.year}
            onChange={handleChange}
            className="w-1/3 h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
            required
          />
          <input
            type="number"
            name="month"
            placeholder="Month"
            value={formData.birthDate.month}
            onChange={handleChange}
            className="w-1/3 h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
            required
          />
          <input
            type="number"
            name="day"
            placeholder="Day"
            value={formData.birthDate.day}
            onChange={handleChange}
            className="w-1/3 h-8 py-2 px-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-green focus:outline-none text-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 mb-3 min-h-8 text-xs rounded-xl text-white hover:text-black bg-[#56B280] hover:bg-normal-green focus:ring-2 focus:ring-dark-green focus:outline-none border transition-all duration-300"
      >
        REGISTER
      </button>
    </form>
  );
};

export default RegisterFormBiodata;