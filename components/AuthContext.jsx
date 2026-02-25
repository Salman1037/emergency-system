"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    const handler = () => fetchUser();
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
