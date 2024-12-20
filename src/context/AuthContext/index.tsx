import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { API_ME, API_LOGIN, API_SELLER_PROFILE } from "../../constants/api";
import Swal from "sweetalert2";

// Define types for user and seller profile data
interface Address {
  id: number;
  address: string;
  name_address: string;
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
  addresses: Address[];
  profile_picture: string | null;
}

interface SellerProfile {
  id: number;
  address: string;
  phone_number: string;
  store_description: string;
  store_logo: string;
  store_name: string;
  user_id: number;
}

interface AuthContextType {
  user: User | null;
  sellerProfile: SellerProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchSellerProfile: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  updateUser: (updatedUserData: Partial<User>) => Promise<void>;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(API_ME, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Fetch user profile failed: ${json.message}`);
      }

      setUser(json.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsAuthenticated(false); // Ensure the user is logged out if fetching fails
    }
  };

  // Fetch seller profile
  const fetchSellerProfile = async () => {
    try {
      const response = await fetch(API_SELLER_PROFILE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.warn(`Fetch seller profile failed: ${json.message}`);
      }
      setSellerProfile(json.data);
    } catch (error) {
      console.error("Failed to fetch seller profile:", error);
    }
  };

  // Optimized function to fetch both profiles concurrently
  const initializeAuth = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Fetch user and seller profiles concurrently
      await Promise.all([fetchUserProfile(), fetchSellerProfile()]);
    } catch (error) {
      console.error("Initialization error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: json.message ? json.message : "Unknown error occurred",
        });
        setIsAuthenticated(false);
        return;
      }

      localStorage.setItem("access_token", json.data.access_token);
      await initializeAuth();
    } catch (error) {
      console.error("Login error:", error);

      // SweetAlert for login failure
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error instanceof Error ? error.message : "Unknown error occurred",
      });

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setSellerProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have successfully logged out.",
    });
  };

  // Initialize authentication state on first render
  useEffect(() => {
    initializeAuth();
  }, []);

  const updateUser = async (updatedUserData: Partial<User>) => {
    try {
      const response = await fetch(API_ME, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(updatedUserData),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(`Update user failed: ${json.message}`);
      }
      // Update the local user state with the new data
      setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedUserData } : null));

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again later.",
      });
      throw new Error("Failed to update user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sellerProfile,
        isAuthenticated,
        loading,
        login,
        logout,
        fetchSellerProfile,
        fetchUserProfile,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
