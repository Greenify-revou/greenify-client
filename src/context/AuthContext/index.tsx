import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { API_ME, API_LOGIN } from "../../constants/api";

// Define types for user data and AuthContext
interface User {
  id: number;
  name: string;
  email: string;
  dateofbirth: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
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
          } catch (error) {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
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