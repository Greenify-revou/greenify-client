import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "address">("profile");

  const handleTabChange = (tab: "profile" | "address") => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="border-b flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange("profile")}
          className={`pb-2 text-lg font-semibold ${
            activeTab === "profile" ? "border-b-2 border-green-500 text-green-500" : "text-gray-700"
          }`}
        >
          Personal Profile
        </button>
        <button
          onClick={() => handleTabChange("address")}
          className={`pb-2 text-lg font-semibold ${
            activeTab === "address" ? "border-b-2 border-green-500 text-green-500" : "text-gray-700"
          }`}
        >
          Address List
        </button>
      </div>

      {activeTab === "profile" ? <PersonalProfile /> : <AddressList />}
    </div>
  );
};

const PersonalProfile: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2"
        />
        <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300 mb-2">
          Choose Photo
        </button>
        <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300">
          Change Password
        </button>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Year"
              className="w-1/3 border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
            />
            <input
              type="number"
              placeholder="Month"
              className="w-1/3 border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
            />
            <input
              type="number"
              placeholder="Day"
              className="w-1/3 border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300">
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

const AddressList: React.FC = () => {
  const addresses = [
    {
      id: 1,
      name: "Dody",
      phone: "620000000",
      address: "Jl Jendral Sudirman no.10",
    },
    {
      id: 2,
      name: "Ridky",
      phone: "62555555",
      address: "Jl Jendral Sudirman no.9",
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add New Address
        </button>
      </div>
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border border-gray-300 rounded p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{address.name}</p>
            <p>{address.phone}</p>
            <p>{address.address}</p>
          </div>
          <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300">
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;