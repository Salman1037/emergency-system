"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const colors = {
    red: "#e10600",
    orange: "#ff8c1a",
    blue1: "#06141f",
    blue2: "#0c2534",
    blue3: "#091b28",
    hoverBg: "rgba(255,140,26,0.12)",
    activeBg: "rgba(225,6,0,0.22)",
    adminBg: "rgba(255,183,3,0.18)",
    white: "#ffffff",
    admin: "#ffb703",
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.dispatchEvent(new Event("auth-changed"));
    window.location.href = "/login";
  };

  const initials = (user?.name || user?.email || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  const navLink = (href, label, type = "normal") => {
    const isActive = pathname === href;
    const isHover = hovered === href;

    let text = colors.white;
    let bg = "transparent";

    if (isHover) bg = colors.hoverBg;
    if (isActive) bg = colors.activeBg;

    if (type === "admin") {
      text = colors.admin;
      bg = isActive || isHover ? colors.adminBg : "transparent";
    }

    return (
      <li className="nav-item" key={href}>
        <Link
          href={href}
          onClick={handleNavLinkClick}
          onMouseEnter={() => setHovered(href)}
          onMouseLeave={() => setHovered(null)}
          className="nav-link"
          style={{
            color: text,
            fontWeight: isActive ? 700 : 500,
            padding: "8px 14px",
            borderRadius: 10,
            background: bg,
            transition: "all 0.25s ease",
            textShadow:
              isHover || isActive
                ? "0 0 8px rgba(255,140,26,0.6)"
                : "none",
          }}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <style>{`
        @keyframes headerFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sosPulse {
          0%   { box-shadow: 0 0 0 rgba(225, 6, 0, 0); }
          50%  { box-shadow: 0 0 14px rgba(225, 6, 0, 0.9); }
          100% { box-shadow: 0 0 0 rgba(225, 6, 0, 0); }
        }
        @media (max-width: 991.98px) {
          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100vw;
            background: linear-gradient(120deg, #06141f, #0c2534, #091b28, #0c2534);
            z-index: 1000;
            padding: 1rem 0;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          }
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1030,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg, #e10600, #ff8c1a, #e10600)",
            boxShadow: "0 0 12px rgba(225,6,0,0.9)",
          }}
        />

        <nav
          className="navbar navbar-expand-lg"
          style={{
            background:
              "linear-gradient(120deg, #06141f, #0c2534, #091b28, #0c2534)",
            backgroundSize: "300% 300%",
            animation: "headerFlow 14s ease infinite",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div className="container-fluid position-relative">
            <Link
              href="/"
              className="navbar-brand fw-bold fs-4"
              style={{
                color: colors.orange,
                letterSpacing: "0.6px",
                textShadow: "0 0 12px rgba(255,140,26,0.7)",
              }}
              onClick={handleNavLinkClick}
            >
              Emergency System
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              style={{
                border: `1px solid ${colors.orange}`,
                background: "rgba(255,140,26,0.08)",
                borderRadius: 8,
                padding: 6,
              }}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
                {navLink("/dashboard", "Dashboard")}
                {navLink("/complaints", "Complaints")}

                <li className="nav-item">
                  <Link
                    href="/sos"
                    onClick={handleNavLinkClick}
                    onMouseEnter={() => setHovered("/sos")}
                    onMouseLeave={() => setHovered(null)}
                    className="nav-link"
                    style={{
                      color: colors.red,
                      fontWeight: 800,
                      padding: "8px 16px",
                      borderRadius: 12,
                      background:
                        pathname === "/sos" || hovered === "/sos"
                          ? colors.activeBg
                          : "transparent",
                      animation: "sosPulse 1.5s infinite",
                      transition: "all 0.25s ease",
                    }}
                  >
                    SOS
                  </Link>
                </li>

                {user?.role === "ADMIN" &&
                  navLink("/admin", "Admin", "admin")}

                {!user && !loading && (
                  <>
                    {navLink("/login", "Login")}
                    {navLink("/register", "Register")}
                  </>
                )}
              </ul>

              {loading && (
                <div
                  className="spinner-border spinner-border-sm text-light ms-3"
                  role="status"
                />
              )}

              {user && !loading && (
                <div
                  className="d-flex align-items-center ms-3 gap-2"
                  style={{ color: colors.white }}
                >
                  <span
                    className="rounded-circle d-inline-flex justify-content-center align-items-center"
                    style={{
                      width: 36,
                      height: 36,
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${colors.red}, ${colors.orange})`,
                      boxShadow:
                        "0 0 12px rgba(225,6,0,0.7), inset 0 0 6px rgba(255,255,255,0.2)",
                    }}
                  >
                    {initials}
                  </span>

                  <span className="d-none d-md-inline">
                    {user.name || user.email}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="btn btn-sm ms-2"
                    style={{
                      border: `1px solid ${colors.red}`,
                      color: colors.red,
                      fontWeight: 600,
                      borderRadius: 10,
                      padding: "6px 12px",
                      background: "rgba(225,6,0,0.05)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.red;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.boxShadow =
                        "0 0 14px rgba(225,6,0,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(225,6,0,0.05)";
                      e.currentTarget.style.color = colors.red;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}