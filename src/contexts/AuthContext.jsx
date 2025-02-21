"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  // Helper to get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  // Helper to save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userData = { id: user.id, email: user.email, name: user.name };
        const token = "fake-jwt-token";
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        toast.success("Welcome back!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        toast.error("User already exists");
        throw new Error("User already exists");
      }
      
      const newUser = {
        id: users.length + 1,
        email,
        password,
        name
      };
      
      // Save user to "database"
      saveUsers([...users, newUser]);
      
      // Log user in
      const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
      const token = "fake-jwt-token";
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        toast.error("User not found");
        throw new Error("User not found");
      }
      
      // Update password
      users[userIndex].password = newPassword;
      saveUsers(users);
      
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Failed to reset password");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};