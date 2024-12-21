import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_SELLER_PROFILE, UPDATE_SELLER } from "@/src/constants/api";

// Utility to fix image URL
const fixImageUrl = (url: string): string => {
  return url.replace("https://i.ibb.co/", "https://i.ibb.co.com/");
};

interface SellerProfile {
  id: number;
  store_name: string;
  store_description: string;
  address: string;
  phone_number: string;
  store_logo: string | null;
}

const SellerProfileContent: React.FC = () => {
  const [formData, setFormData] = useState<SellerProfile>({
    id: 0,
    store_name: "",
    store_description: "",
    address: "",
    phone_number: "",
    store_logo: null,
  });
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [dataLoading, setDataLoading] = useState(true); // Loading state for data fetching
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  // Fetch seller profile from the API
  const fetchSellerProfile = async () => {
    try {
      setDataLoading(true); // Start data loading
      const response = await fetch(API_SELLER_PROFILE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        setFormData(data.data);
        setImagePreview(data.data.store_logo);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch seller profile.",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while fetching the profile.",
      });
    } finally {
      setDataLoading(false); // End data loading
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUpload(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!imageUpload) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please select a file to upload.",
      });
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", imageUpload);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=fc83cc32be937c536fe6b2af550feeea",
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const fixedUrl = fixImageUrl(data.data.url);
      setFormData((prev) => ({ ...prev, store_logo: fixedUrl }));
      Swal.fire({
        icon: "success",
        title: "Image Uploaded",
        text: "Your image has been uploaded successfully!",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Error uploading image. Please try again.",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(UPDATE_SELLER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
        });
        fetchSellerProfile(); // Reload updated profile
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    // Show loading spinner while data is being fetched
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        <p className="ml-4">Loading seller profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Seller Profile
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="store_name" className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              id="store_name"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              placeholder="Enter your store name"
              required
            />
          </div>
          <div>
            <label htmlFor="store_description" className="block text-sm font-medium text-gray-700 mb-2">
              Store Description
            </label>
            <textarea
              id="store_description"
              name="store_description"
              value={formData.store_description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              placeholder="Describe your store"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              placeholder="Enter your store address"
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Updating Profile..." : "Update Profile"}
          </button>
        </form>

        {/* Image Upload Section */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <label htmlFor="store_logo" className="block text-sm font-medium text-gray-700 mb-2">
              Store Logo
            </label>
            <input
              type="file"
              id="store_logo"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              disabled={!imageUpload}
            >
              Upload Image
            </button>
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 mt-4 object-cover rounded-md border"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfileContent;
