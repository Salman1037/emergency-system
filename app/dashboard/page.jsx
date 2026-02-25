"use client";
import StatusCard from "@/components/StatusCard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaints() {
      const res = await fetch("/api/complaints/user");
      const data = await res.json();
      setComplaints(data.complaints || []);
      setLoading(false);
    }
    fetchComplaints();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 display-6 fw-bold text-primary">My Complaints</h2>
      {loading ? (
        <div className="alert alert-info">Loading...</div>
      ) : complaints.length === 0 ? (
        <div className="alert alert-warning">No complaints found.</div>
      ) : (
        complaints.map((c) => <StatusCard key={c._id} complaint={c} />)
      )}
    </div>
  );
}
