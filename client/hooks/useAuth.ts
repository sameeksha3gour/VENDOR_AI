"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      console.log("🚀 Login function called");

      const data = await loginUser(email, password);

      console.log("✅ Login Response:", data);

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        console.log("✅ Token Saved");
      }

      return data;
    } catch (error) {
      console.error("❌ Login Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
}