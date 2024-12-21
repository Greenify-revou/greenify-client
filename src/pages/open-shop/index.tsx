import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useRouter } from "next/router";
import { useAuth } from "@/src/context/AuthContext";
import { API_CREATE_SELLER } from "@/src/constants/api";

const fixImageUrl = (url: string): string => {
  return url.replace("https://i.ibb.co/", "https://i.ibb.co.com/");
};

const OpenShop = () => {
  const { user } = useAuth(); // Get the authenticated user
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    store_name: "",
    store_description: "",
    store_logo: "",
    address: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Temporary preview of the image
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUpload(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a temporary URL for preview
    }
  };

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
      const response = await fetch("https://api.imgbb.com/1/upload?key=fc83cc32be937c536fe6b2af550feeea", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const fixedUrl = fixImageUrl(data.data.url); // Apply the fixImageUrl function
      setFormData((prev) => ({ ...prev, store_logo: fixedUrl }));
      Swal.fire({
        icon: "success",
        title: "Image Uploaded",
        text: "Your image has been uploaded successfully!",
      });
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Error uploading image. Please try again.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.store_logo) {
      Swal.fire({
        icon: "warning",
        title: "Missing Logo",
        text: "Please upload your store logo before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_CREATE_SELLER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create shop.");
      }

      Swal.fire({
        icon: "success",
        title: "Shop Created",
        text: "Your shop has been created successfully!",
      });
      // Check if already on /seller-profile
    if (router.pathname !== "/dashboard-seller") {
        router.push("/dashboard-seller"); // Navigate to the seller profile page
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Open Your Shop</h1>
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
                <label
                  htmlFor="store_description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                {loading ? "Creating Shop..." : "Open Shop"}
              </button>
            </form>

            {/* Image Upload Section */}
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <label
                  htmlFor="store_logo"
                  className="block text-sm font-medium text-gray-700 mb-2 text-center"
                >
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
                <div className="mt-4">
                  <h2 className="text-sm font-medium text-gray-700 text-center mb-2">Logo Preview</h2>
                  <img
                    src={imagePreview}
                    alt="Store Logo Preview"
                    className="w-40 h-40 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default OpenShop;
