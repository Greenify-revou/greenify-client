import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { API_ME, API_LOGIN } from "../../constants/api";

// Define types for user data and AuthContext
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

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateUser: (updatedUserData: Partial<User>) => Promise<void>;
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
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage when app initializes
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(API_ME, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
      })

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Fetch user profile failed ${json.message}`);
      }

      setUser(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  }

  // Login function
  const login = async (email: string, password: string) => {
    try {
          const response = await fetch(API_LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })

          const json = await response.json();

          if(!response.ok) {
            throw new Error(`Login failed: ${json.message}`);
          }
          
          try {
            localStorage.setItem("access_token", json.data.access_token);
            await fetchUserProfile();
          } catch {
            throw new Error(`Login failed: ${json.message}`);
          }
    }
    catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  }

  // Logout function
  const logout = () => {
    setLoading(false);
    localStorage.removeItem("access_token");
    setUser(null);
  };
  
  // isAuthenticate check
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
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
      console.error(error);
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
        updateUser
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