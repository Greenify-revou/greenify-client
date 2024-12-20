import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { API_ME, API_LOGIN } from "../../constants/api";

// Define types for user data and AuthContext
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
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUserData: Partial<User>) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
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
      setIsAuthenticated(false);
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

      if (!response.ok) {
        throw new Error(`Login failed: ${json.message}`);
      }

      localStorage.setItem("access_token", json.data.access_token);
      await fetchUserProfile(); // Fetch user profile after login
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  // Check authentication state on app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
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
      setUser((prevUser) => ({
        ...prevUser!,
        ...updatedUserData,
      }));
    } catch (error) {
      console.error("Failed to update user:", error);
      throw new Error("Failed to update user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        updateUser,
        fetchUserProfile,
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
