import MapView from "@/components/MapView";
import { useEffect, useState } from "react";

export default function SOSMapPage() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    async function fetchSOS() {
      const res = await fetch("/api/admin");
      const data = await res.json();
      setPoints(
        (data.sosAlerts || [])
          .filter((s) => s.location && s.location.lat && s.location.lng)
          .map((s) => ({
            lat: Number(s.location.lat),
            lng: Number(s.location.lng),
            label: `SOS: ${s.status}`,
          }))
      );
    }
    fetchSOS();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">SOS Alerts Map</h2>
      <MapView points={points} />
    </div>
  );
}
