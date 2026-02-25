"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoadingComplaints(true);
    fetch("/api/complaints")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setComplaints(data))
      .catch(() => setComplaints([]))
      .finally(() => setLoadingComplaints(false));
  }, [user]);

  if (loading || loadingComplaints) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your dashboard.</div>;

  return (
    <div>
      <h2>Your Complaints</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {complaints.length === 0 && <div>No complaints found.</div>}
        {complaints.map((c) => (
          <div
            key={c._id}
            style={{
              background: "#0c1324",
              color: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
              padding: "1.5rem",
              minWidth: 320,
              maxWidth: 350,
              width: "100%",
              marginBottom: "1rem",
              border: "1px solid #444",
            }}
          >
            {c.image && (
              <img
                src={c.image}
                alt={c.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: "0.75rem",
                  marginBottom: "1rem",
                  background: "#222",
                }}
              />
            )}
            <h3 style={{ marginBottom: 8 }}>{c.title}</h3>
            <div style={{ color: "#aaa", fontSize: 14, marginBottom: 8 }}>
              {new Date(c.createdAt).toLocaleString()}
            </div>
            <div style={{ marginBottom: 12 }}>{c.description}</div>
            <div>
              <span
                style={{
                  background: "#222",
                  color: "#ffb703",
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontWeight: 600,
                  marginRight: 8,
                }}
              >
                {c.category}
              </span>
              <span
                style={{
                  background: "#222",
                  color: "#16a34a",
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontWeight: 600,
                  marginRight: 8,
                }}
              >
                {c.status || "Pending"}
              </span>
              <span
                style={{
                  background: "#222",
                  color: "#eab308",
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontWeight: 600,
                }}
              >
                {c.priority || "Normal"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
