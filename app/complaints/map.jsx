import MapView from "@/components/MapView";
import { useEffect, useState } from "react";

export default function ComplaintsMapPage() {
  const [points, setPoints] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchComplaints() {
      try {
        const res = await fetch("/api/complaints/user");
        if (!res.ok) throw new Error("Failed to fetch complaints");
        const data = await res.json();
        setPoints(
          (data.complaints || [])
            .filter((c) => c.location && c.location.lat && c.location.lng)
            .map((c) => ({
              lat: Number(c.location.lat),
              lng: Number(c.location.lng),
              label: c.title,
            }))
        );
      } catch (err) {
        setError("Could not load complaints map.");
      }
    }
    fetchComplaints();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Complaints Map</h2>
      {error ? (
        <div className="text-red-600 font-semibold mb-4">{error}</div>
      ) : (
        <MapView points={points} />
      )}
    </div>
  );
}
