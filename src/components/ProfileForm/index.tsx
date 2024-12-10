import React from "react";

const ProfileForm: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <button className="mt-2 bg-gray-100 px-3 py-1 rounded text-sm border hover:bg-gray-200">
            Choose Photo
          </button>
        </div>
        <button className="mt-2 bg-gray-100 px-3 py-1 rounded text-sm border hover:bg-gray-200">
          Change Password
        </button>
      </div>
      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Year"
              className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
            />
            <input
              type="number"
              placeholder="Month"
              className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
            />
            <input
              type="number"
              placeholder="Day"
              className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-green-300"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:ring focus:ring-green-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;