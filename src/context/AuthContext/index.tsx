import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { API_ME, API_LOGIN } from "../../constants/api";

// Define types for user data and AuthContext
interface User {
  id: string;
  name: string;
  email: string;
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
  const [loading, setLoading] = useState(true);


  // Load user from localStorage when app initializes
  const fetchUserProfile = () => {
        fetch(API_ME, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_access")}`
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        })
  }

  // Login function
  const login = (email: string, password: string) => {
    fetch(API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token_access", data.token_access);
      fetchUserProfile();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
        setLoading(false);
    })

  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token_access");
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