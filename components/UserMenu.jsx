"use client";
import { useEffect, useState } from "react";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (loading) return <div className="spinner-border spinner-border-sm text-light ms-2" role="status" />;
  if (!user) return null;

  // User initials avatar
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="dropdown">
      <button className="btn btn-link dropdown-toggle text-white d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center" style={{ width: 32, height: 32, fontWeight: 600 }}>
          {initials}
        </span>
        <span className="d-none d-md-inline">{user.name || user.email}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><span className="dropdown-item-text">Role: {user.role}</span></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
}
