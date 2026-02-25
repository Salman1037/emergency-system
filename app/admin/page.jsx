"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [complaints, setComplaints] = useState([]);
  const [sosAlerts, setSosAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin");
      const data = await res.json();
      if (res.ok) {
        setComplaints(data.complaints || []);
        setSosAlerts(data.sosAlerts || []);
      } else {
        setError(data.error || "Failed to load data");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaintId: id, status }),
    });
    const data = await res.json();
    if (res.ok) {
      setComplaints((prev) => prev.map((c) => (c._id === id ? { ...c, status } : c)));
    } else {
      setError(data.error || "Failed to update status");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-2">Complaints</h3>
          <table className="w-full mb-8 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-2">{c.title}</td>
                  <td className="p-2">{c.category}</td>
                  <td className="p-2">
                    <span style={{
                      color: c.priority === "HIGH" ? "#dc2626" : c.priority === "MEDIUM" ? "#eab308" : c.priority === "LOW" ? "#6b7280" : "#16a34a",
                      fontWeight: 600,
                      border: `1px solid ${c.priority === "HIGH" ? "#dc2626" : c.priority === "MEDIUM" ? "#eab308" : c.priority === "LOW" ? "#6b7280" : "#16a34a"}`,
                      borderRadius: 6,
                      padding: "2px 8px"
                    }}>{c.priority}</span>
                  </td>
                  <td className="p-2">{c.status}</td>
                  <td className="p-2">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-2">SOS Alerts</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Location</th>
                <th className="p-2">Status</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {sosAlerts.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-2">Lat: {s.location?.lat}, Lng: {s.location?.lng}</td>
                  <td className="p-2">{s.status}</td>
                  <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
