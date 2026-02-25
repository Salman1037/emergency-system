// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   FiGrid,
//   FiFileText,
//   FiAlertTriangle,
//   FiShield,
//   FiChevronLeft,
// } from "react-icons/fi";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [hovered, setHovered] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);

//   const colors = {
//     red: "#e10600",
//     orange: "#ff8c1a",
//     blue1: "#06141f",
//     blue2: "#0c2534",
//     hoverBg: "rgba(255,140,26,0.12)",
//     activeBg: "rgba(225,6,0,0.22)",
//     adminBg: "rgba(255,183,3,0.18)",
//     text: "#ffffff",
//     admin: "#ffb703",
//   };

//   const NavItem = ({
//     href,
//     label,
//     icon,
//     type = "normal",
//   }) => {
//     const isActive = pathname === href;
//     const isHover = hovered === href;

//     let bg = "transparent";
//     let color = colors.text;

//     if (isHover) bg = colors.hoverBg;
//     if (isActive) bg = colors.activeBg;

//     if (type === "admin") {
//       color = colors.admin;
//       bg = isHover || isActive ? colors.adminBg : "transparent";
//     }

//     if (type === "sos") {
//       color = colors.red;
//       bg = isHover || isActive ? colors.activeBg : "transparent";
//     }

//     return (
//       <li className="nav-item">
//         <Link
//           href={href}
//           onMouseEnter={() => setHovered(href)}
//           onMouseLeave={() => setHovered(null)}
//           className="nav-link d-flex align-items-center gap-3"
//           style={{
//             color,
//             padding: "10px 14px",
//             borderRadius: 10,
//             fontWeight: isActive ? 700 : 500,
//             background: bg,
//             transition: "all 0.25s ease",
//             whiteSpace: "nowrap",
//             justifyContent: collapsed
//               ? "center"
//               : "flex-start",
//             textShadow:
//               isHover || isActive
//                 ? "0 0 8px rgba(255,140,26,0.6)"
//                 : "none",
//           }}
//         >
//           <span
//             style={{
//               fontSize: 18,
//               minWidth: 22,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {icon}
//           </span>

//           {!collapsed && <span>{label}</span>}
//         </Link>
//       </li>
//     );
//   };

//   return (
//     <>
//       <style jsx>{`
//         @keyframes sosPulse {
//           0% {
//             box-shadow: 0 0 0 rgba(225, 6, 0, 0);
//           }
//           50% {
//             box-shadow: 0 0 14px rgba(225, 6, 0, 0.9);
//           }
//           100% {
//             box-shadow: 0 0 0 rgba(225, 6, 0, 0);
//           }
//         }
//       `}</style>

//       <aside
//         className="d-none d-md-flex flex-column"
//         style={{
//           width: collapsed ? 72 : 240,
//           transition: "width 0.3s ease",
//           background: `linear-gradient(180deg, ${colors.blue1}, ${colors.blue2})`,
//           borderRight: "1px solid rgba(255,255,255,0.06)",
//           boxShadow:
//             "8px 0 20px rgba(0,0,0,0.5), inset -1px 0 0 rgba(255,255,255,0.04)",
//           minHeight: "100vh",
//           position: "sticky",
//           top: 0,
//           zIndex: 1020,
//         }}
//       >
//         {/* emergency strip */}
//         <div
//           style={{
//             height: 3,
//             background:
//               "linear-gradient(90deg, #e10600, #ff8c1a, #e10600)",
//             boxShadow: "0 0 10px rgba(225,6,0,0.9)",
//           }}
//         />

//         {/* header + toggle */}
//         <div
//           className="d-flex align-items-center justify-content-between px-3"
//           style={{
//             height: 54,
//             borderBottom: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           {!collapsed && (
//             <span
//               style={{
//                 color: colors.orange,
//                 fontWeight: 700,
//                 letterSpacing: "0.5px",
//                 textShadow:
//                   "0 0 8px rgba(255,140,26,0.6)",
//               }}
//             >
//               Control Panel
//             </span>
//           )}

//           <button
//             onClick={() => setCollapsed((p) => !p)}
//             className="btn btn-sm"
//             style={{
//               color: colors.orange,
//               border:
//                 "1px solid rgba(255,140,26,0.35)",
//               background: "transparent",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 6,
//               borderRadius: 8,
//             }}
//             title={
//               collapsed
//                 ? "Expand sidebar"
//                 : "Collapse sidebar"
//             }
//           >
//             <FiChevronLeft
//               size={18}
//               style={{
//                 transform: collapsed
//                   ? "rotate(180deg)"
//                   : "rotate(0deg)",
//                 transition:
//                   "transform 0.3s ease",
//               }}
//             />
//           </button>
//         </div>

//         {/* nav */}
//         <div className="p-2">
//           <ul className="nav flex-column gap-2">
//             <NavItem
//               href="/dashboard"
//               label="Dashboard"
//               icon={<FiGrid />}
//             />

//             <NavItem
//               href="/complaints"
//               label="Complaints"
//               icon={<FiFileText />}
//             />

//             {/* SOS */}
//             <li className="nav-item">
//               <Link
//                 href="/sos"
//                 onMouseEnter={() =>
//                   setHovered("/sos")
//                 }
//                 onMouseLeave={() =>
//                   setHovered(null)
//                 }
//                 className="nav-link d-flex align-items-center gap-3"
//                 style={{
//                   color: colors.red,
//                   padding: "10px 14px",
//                   borderRadius: 12,
//                   fontWeight: 800,
//                   justifyContent: collapsed
//                     ? "center"
//                     : "flex-start",
//                   background:
//                     pathname === "/sos" ||
//                     hovered === "/sos"
//                       ? colors.activeBg
//                       : "transparent",
//                   animation:
//                     "sosPulse 1.5s infinite",
//                   transition:
//                     "all 0.25s ease",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: 18,
//                     minWidth: 22,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <FiAlertTriangle />
//                 </span>

//                 {!collapsed && (
//                   <span>SOS Alerts</span>
//                 )}
//               </Link>
//             </li>

//             <NavItem
//               href="/admin"
//               label="Admin Panel"
//               type="admin"
//               icon={<FiShield />}
//             />
//           </ul>
//         </div>
//       </aside>
//     </>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiFileText,
  FiAlertTriangle,
  FiShield,
  FiChevronLeft,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const colors = {
    red: "#e10600",
    orange: "#ff8c1a",
    blue1: "#06141f",
    blue2: "#0c2534",
    hoverBg: "rgba(255,140,26,0.12)",
    activeBg: "rgba(225,6,0,0.22)",
    adminBg: "rgba(255,183,3,0.18)",
    text: "#ffffff",
    admin: "#ffb703",
  };

  const NavItem = ({ href, label, icon, type = "normal" }) => {
    const isActive = pathname === href;
    const isHover = hovered === href;

    let bg = "transparent";
    let color = colors.text;

    if (isHover) bg = colors.hoverBg;
    if (isActive) bg = colors.activeBg;

    if (type === "admin") {
      color = colors.admin;
      bg = isHover || isActive ? colors.adminBg : "transparent";
    }

    if (type === "sos") {
      color = colors.red;
      bg = isHover || isActive ? colors.activeBg : "transparent";
    }

    return (
      <li className="nav-item">
        <Link
          href={href}
          onMouseEnter={() => setHovered(href)}
          onMouseLeave={() => setHovered(null)}
          className="nav-link d-flex align-items-center gap-3"
          style={{
            color,
            padding: "10px 14px",
            borderRadius: 10,
            fontWeight: isActive ? 700 : 500,
            background: bg,
            transition: "all 0.25s ease",
            whiteSpace: "nowrap",
            justifyContent: collapsed ? "center" : "flex-start",
            textShadow:
              isHover || isActive
                ? "0 0 8px rgba(255,140,26,0.6)"
                : "none",
          }}
        >
          <span
            style={{
              fontSize: 18,
              minWidth: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </span>

          {!collapsed && <span>{label}</span>}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* ✅ IMPORTANT: normal style tag (NOT styled-jsx) */}
      <style>{`
        @keyframes sosPulse {
          0%   { box-shadow: 0 0 0 rgba(225, 6, 0, 0); }
          50%  { box-shadow: 0 0 14px rgba(225, 6, 0, 0.9); }
          100% { box-shadow: 0 0 0 rgba(225, 6, 0, 0); }
        }
      `}</style>

      <aside
        className="d-none d-md-flex flex-column"
        style={{
          width: collapsed ? 72 : 240,
          transition: "width 0.3s ease",
          background: `linear-gradient(180deg, ${colors.blue1}, ${colors.blue2})`,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            "8px 0 20px rgba(0,0,0,0.5), inset -1px 0 0 rgba(255,255,255,0.04)",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          zIndex: 1020,
        }}
      >
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg, #e10600, #ff8c1a, #e10600)",
            boxShadow: "0 0 10px rgba(225,6,0,0.9)",
          }}
        />

        <div
          className="d-flex align-items-center justify-content-between px-3"
          style={{
            height: 54,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {!collapsed && (
            <span
              style={{
                color: colors.orange,
                fontWeight: 700,
                letterSpacing: "0.5px",
                textShadow: "0 0 8px rgba(255,140,26,0.6)",
              }}
            >
              Control Panel
            </span>
          )}

          <button
            onClick={() => setCollapsed((p) => !p)}
            className="btn btn-sm"
            style={{
              color: colors.orange,
              border: "1px solid rgba(255,140,26,0.35)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 6,
              borderRadius: 8,
            }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FiChevronLeft
              size={18}
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>

        <div className="p-2">
          <ul className="nav flex-column gap-2">
            <NavItem
              href="/dashboard"
              label="Dashboard"
              icon={<FiGrid />}
            />

            <NavItem
              href="/complaints"
              label="Complaints"
              icon={<FiFileText />}
            />

            <li className="nav-item">
              <Link
                href="/sos"
                onMouseEnter={() => setHovered("/sos")}
                onMouseLeave={() => setHovered(null)}
                className="nav-link d-flex align-items-center gap-3"
                style={{
                  color: colors.red,
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  justifyContent: collapsed ? "center" : "flex-start",
                  background:
                    pathname === "/sos" || hovered === "/sos"
                      ? colors.activeBg
                      : "transparent",
                  animation: "sosPulse 1.5s infinite",
                  transition: "all 0.25s ease",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    minWidth: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiAlertTriangle />
                </span>

                {!collapsed && <span>SOS Alerts</span>}
              </Link>
            </li>

            <NavItem
              href="/admin"
              label="Admin Panel"
              type="admin"
              icon={<FiShield />}
            />
          </ul>
        </div>
      </aside>
    </>
  );
}