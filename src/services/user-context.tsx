import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { request } from "./api";

// Define the user type
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    request({
      url: "/user/account",
      success: (response) => setUser(response.data),
      fail: () => setUser(null),
    });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Create a custom hook for easier usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
