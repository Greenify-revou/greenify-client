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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchSellerProfile: () => Promise<boolean>;
  fetchUserProfile: () => Promise<boolean>;
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
  const fetchUserProfile = async (retries = 3): Promise<boolean> => {
    while (retries > 0) {
      try {
        const response = await fetch(API_ME, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.warn("Fetch user profile failed:", errorData.message);
          retries--;
          if (retries === 0) {
              // Swal.fire({
              //   icon: "warning",
              //   title: "Fetch User Failed",
              //   text: errorData.message || "Could not retrieve user profile.",
              // });
            setIsAuthenticated(false);
            setUser(null);
            return false;
          }
          continue; // Retry the request
        }
  
        const json = await response.json();
        setUser(json.data);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error("Fetch user profile error:", error);
        retries--;
        if (retries === 0) {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Failed to connect to the server. Please try again later.",
          });
          setIsAuthenticated(false);
          setUser(null);
          return false;
        }
      }
    }
    return false;
  };

  // Fetch seller profile
  const fetchSellerProfile = async (): Promise<boolean> => {
    try {
      const response = await fetch(API_SELLER_PROFILE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.warn("Fetch seller profile failed:", errorData.message);
        setSellerProfile(null);
        return false;
      }

      const json = await response.json();
      setSellerProfile(json.data);
      return true;
    } catch (error) {
      console.error("Failed to fetch seller profile:", error);
      setSellerProfile(null);
      return false;
    }
  };

  // Optimized function to fetch both profiles concurrently
  const initializeAuth = async (): Promise<boolean> => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setSellerProfile(null);
        return false;
      }

      // Fetch user and seller profiles concurrently
      const [userSuccess, sellerSuccess] = await Promise.all([
        fetchUserProfile(),
        fetchSellerProfile(),
      ]);

      return userSuccess && sellerSuccess;
    } catch (error) {
      console.error("Initialization error:", error);
      setIsAuthenticated(false);
      setUser(null);
      setSellerProfile(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorData.message || "Invalid email or password.",
        });
        return false;
      }

      const json = await response.json();
      localStorage.setItem("access_token", json.data.access_token);

      const authSuccess = await initializeAuth();
      if (authSuccess) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have been logged in successfully!",
        });
      }
      return authSuccess;
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to connect to the server. Please try again later.",
      });
      return false;
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
    }).then(() => {
      window.location.href = "/"; // Redirect to home
    });
  };

  // Update user profile
  const updateUser = async (updatedUserData: Partial<User>): Promise<void> => {
    try {
      const response = await fetch(API_ME, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Update user failed: ${errorData.message}`);
      }

      const json = await response.json();
      setUser((prevUser) => (prevUser ? { ...prevUser, ...json.data } : null));

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
    } catch (error) {
      console.error("Update user error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again later.",
      });
    }
  };

  // Initialize authentication state on first render
  useEffect(() => {
    initializeAuth();
  }, []);

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
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
