import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ points = [] }) {
  const center = points.length
    ? [points[0].lat, points[0].lng]
    : [20.5937, 78.9629]; // Default: India
  return (
    <div className="w-full h-96 rounded shadow overflow-hidden">
      <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {points.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              {p.label || `Lat: ${p.lat}, Lng: ${p.lng}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
