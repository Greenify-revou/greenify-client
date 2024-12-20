import { API_ADD_ADDRESS } from "@/src/constants/api";
import { useAuth } from "@/src/context/AuthContext";
import React, { useState } from "react";

interface Address {
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone_number: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  dateofbirth: string;
  gender: string;
  phone_number: string;
  address: Address[];
}

interface PersonalProfileProps {
  user: User | null;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "address">("profile");
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (tab: "profile" | "address") => {
    setActiveTab(tab);
  };

  // const addAddress = async () => {
  //   try {
  //     const response = await fetch(API_ADD_ADDRESS, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user_id: user.id }),
  //     });
  //     })
  //   }
  // };

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

      {activeTab === "profile" ? <PersonalProfile user={user} /> : <AddressList addresses={user?.address} />}
    </div>
  );
};

interface PersonalProfileProps {
  user: User | null;
}

const PersonalProfile: React.FC<PersonalProfileProps> = ({ user }) => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    dateofbirth: user?.dateofbirth || "",
    phone_number: user?.phone_number || "",
    gender: user?.gender || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

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
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={new Date(formData.dateofbirth).toLocaleDateString("en-CA")} // Format as 'YYYY-MM-DD'
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-green-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
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

interface AddressListProps {
  addresses: Address[] | undefined;
}

const AddressList: React.FC<AddressListProps> = ({ addresses }) => {

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add New Address
        </button>
      </div>
      {addresses?.map((address, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{address.address}</p>
            <p>{address.phone_number}</p>
            <p>
              {address.city}, {address.province}, {address.postal_code}
            </p>
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
