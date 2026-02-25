"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  // Redirect to dashboard if already logged in
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) router.replace("/dashboard");
      }
      setChecking(false);
    }
    checkAuth();
  }, [router]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Login failed");
    else {
      setSuccess("Login successful!");
      window.dispatchEvent(new Event("auth-changed"));
      setTimeout(() => router.push("/complaints"), 800);
    }
  };
  if (checking)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="spinner-border text-danger"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        />
      </div>
    );

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div
          className="card shadow-lg border-0 p-4"
          style={{
            backgroundColor: "#0c1324",
            borderRadius: "1rem",
            border: "1px solid #444",
            boxShadow: "0 0 30px rgba(255,0,0,0.5)",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: "#ff4d4f",
              fontWeight: "800",
              textShadow: "0 0 10px rgba(255,77,79,0.7)",
            }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <label
                htmlFor="email"
                className="form-label"
                style={{ color: "#ddd", fontWeight: "500" }}
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
                autoComplete="off"
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #555",
                  color: "#fff",
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                }}
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: "#ddd", fontWeight: "500" }}
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                required
                autoComplete="off"
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #555",
                  color: "#fff",
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                }}
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn w-100"
                style={{
                  background:
                    "linear-gradient(135deg, #ff4d4f 0%, #ff6b3a 100%)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  borderRadius: "2rem",
                  boxShadow: "0 0 20px rgba(255,77,79,0.7)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Login
              </button>
            </div>
          </form>
          {error && (
            <div
              className="alert mt-3 text-center"
              style={{
                backgroundColor: "rgba(255,0,0,0.1)",
                color: "#ff4d4f",
                border: "1px solid #ff4d4f",
                borderRadius: "1rem",
                boxShadow: "0 0 15px rgba(255,0,0,0.5)",
                animation: "pulse 1.2s infinite",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="alert mt-3 text-center"
              style={{
                backgroundColor: "rgba(0,255,0,0.1)",
                color: "#52c41a",
                border: "1px solid #52c41a",
                borderRadius: "1rem",
                boxShadow: "0 0 15px rgba(82,196,26,0.5)",
                animation: "pulse 1.2s infinite",
              }}
            >
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
