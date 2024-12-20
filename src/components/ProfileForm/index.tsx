import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import Swal from "sweetalert2";
import { API_ADD_ADDRESS, API_GET_WISHLIST, API_REMOVE_WISHLIST, API_UPDATE_ADDRESS } from "@/src/constants/api";

interface Address {
  id?: number;
  name_address: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone_number: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  final_price: number;
  discount: number;
  stock: number;
  eco_point: number;
  recycle_material_percentage: number;
  image_url: string;
  reviews?: number;
  rating?: number;
}

interface WishlistItem {
  id: number;
  product_id: number;
  product: Product;
  created_at: string;
  is_active: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  dateofbirth: string;
  gender: string;
  phone_number: string;
  addresses: Address[];
  profile_picture: string | null;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "address" | "wishlist">("profile");
  const { user, fetchUserProfile } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (activeTab === "wishlist") {
      fetchWishlist();
    }
  }, [activeTab]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(API_GET_WISHLIST, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Load Wishlist",
          text: data.message || "An error occurred while fetching the wishlist.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while loading the wishlist.",
      });
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      const response = await fetch(API_REMOVE_WISHLIST, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Removed",
          text: "The item was removed from your wishlist.",
        });
        setWishlist((prev) => prev.filter((item) => item.product_id !== productId));
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to remove the item from your wishlist.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (tab: "profile" | "address" | "wishlist") => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow rounded">
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
        <button
          onClick={() => handleTabChange("wishlist")}
          className={`pb-2 text-lg font-semibold ${
            activeTab === "wishlist" ? "border-b-2 border-green-500 text-green-500" : "text-gray-700"
          }`}
        >
          Wishlist
        </button>
      </div>

      {activeTab === "profile" ? (
        <PersonalProfile user={user} />
      ) : activeTab === "address" ? (
        <AddressList addresses={user.addresses} onAddressChange={fetchUserProfile} />
      ) : (
        <Wishlist wishlist={wishlist} onRemove={removeFromWishlist} />
      )}
    </div>
  );
};

const Wishlist: React.FC<{ wishlist: WishlistItem[]; onRemove: (productId: number) => void }> = ({ wishlist, onRemove }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No items in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-md flex flex-col items-center text-center"
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-24 h-24 object-cover mb-4 rounded"
              />
              <h3 className="font-bold text-sm mb-2">{item.product.name}</h3>
              <p className="text-gray-700 text-xs mb-3">
                {item.product.description.length > 50
                  ? `${item.product.description.substring(0, 50)}...`
                  : item.product.description}
              </p>
              <div className="mb-2">
                <p className="text-green-500 font-bold text-sm">
                  {item.product.final_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                {item.product.discount > 0 && (
                  <p className="text-gray-500 line-through text-xs">
                    {item.product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                )}
              </div>
              <div className="flex justify-between w-full items-center text-xs">
                <p className="text-gray-700">
                  Eco Points: <span className="font-semibold">{item.product.eco_point}</span>
                </p>
                <p className="text-gray-700">
                  Rating: <span className="font-semibold">{item.product.rating || 0}/5</span>
                </p>
              </div>
              <button
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
                onClick={() => onRemove(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


interface PersonalProfileProps {
  user: User | null;
}

const fixImageUrl = (url: string): string => {
  return url.replace("https://i.ibb.co/", "https://i.ibb.co.com/");
};

const PersonalProfile: React.FC<PersonalProfileProps> = ({ user }) => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    dateofbirth: user?.dateofbirth || "",
    phone_number: user?.phone_number || "",
    gender: user?.gender || "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(user?.profile_picture || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file)); // Temporary preview
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please choose an image file before uploading.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=fc83cc32be937c536fe6b2af550feeea", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();
      const uploadedUrl = fixImageUrl(data.data.url); // Apply fixImageUrl function

      setProfileImage(uploadedUrl); // Update with the fixed URL
      Swal.fire({
        icon: "success",
        title: "Image Uploaded",
        text: "Your profile image has been uploaded successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading your image. Please try again.",
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ ...formData, profile_picture: profileImage });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating your profile. Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-4 relative">
        {/* Profile Image Preview */}
        <div className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 flex items-center justify-center relative overflow-hidden">
          <img
            src={profileImage || "https://via.placeholder.com/100"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          {/* File Input */}
          <input
            type="file"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {/* Text Inside Circle */}
          <span className="absolute text-xs text-gray-700">Choose File</span>
        </div>

        {/* Upload Image Button */}
        <button
          onClick={handleImageUpload}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 mb-2"
        >
          Upload Image
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
            value={new Date(formData.dateofbirth).toLocaleDateString("en-CA")}
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



const AddressList: React.FC<{
  addresses: Address[] | undefined;
  onAddressChange: () => void;
}> = ({ addresses, onAddressChange }) => {
  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const toggleAddAddressModal = () => setAddAddressModalOpen((prev) => !prev);

  const toggleEditAddressModal = (address?: Address) => {
    setSelectedAddress(address || null);
    setEditAddressModalOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleAddAddressModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Address
        </button>
      </div>

      {addresses?.map((address, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{address.name_address}</p>
            <p>{address.address}</p>
            <p>{address.phone_number}</p>
            <p>
              {address.city}, {address.province}, {address.postal_code}
            </p>
          </div>
          <button
            onClick={() => toggleEditAddressModal(address)}
            className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
          >
            Edit
          </button>
        </div>
      ))}

      {isAddAddressModalOpen && (
        <AddAddressModal onClose={toggleAddAddressModal} onSuccess={onAddressChange} />
      )}
      {isEditAddressModalOpen && selectedAddress && (
        <EditAddressModal
          address={selectedAddress}
          onClose={() => toggleEditAddressModal()}
          onSuccess={onAddressChange}
        />
      )}
    </div>
  );
};

const AddAddressModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Address>({
    name_address: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    phone_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ADD_ADDRESS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Address Added",
          text: "Your address has been added successfully.",
        });
        onClose();
        onSuccess();
      } else {
        Swal.fire({
          icon: "error",
          title: "Add Address Failed",
          text: "There was an issue adding the address.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the address.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="font-semibold text-lg mb-4">Add New Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name_address"
            value={formData.name_address}
            onChange={handleChange}
            placeholder="Name Address"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Province"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Postal Code"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Add Address
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const EditAddressModal: React.FC<{ address: Address; onClose: () => void; onSuccess: () => void }> = ({
  address,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Address>({
    name_address: address.name_address || "",
    address: address.address || "",
    city: address.city || "",
    province: address.province || "",
    postal_code: address.postal_code || "",
    phone_number: address.phone_number || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_UPDATE_ADDRESS}/${address.id}`, {
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
          title: "Address Updated",
          text: "Your address has been updated successfully.",
        });
        onSuccess();
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was an issue updating the address.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the address.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="font-semibold text-lg mb-4">Edit Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name_address"
            value={formData.name_address}
            onChange={handleChange}
            placeholder="Name Address"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Province"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Postal Code"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Update Address
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
