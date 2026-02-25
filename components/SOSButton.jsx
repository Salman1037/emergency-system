"use client";

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function SOSButton() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSOS = () => {
    setLoading(true);
    setStatus("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch("/api/sos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              }),
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) setStatus(data.error || "Failed to send SOS");
            else setStatus("SOS alert sent successfully!");
          } catch (e) {
            setLoading(false);
            setStatus("Network error. Please try again.");
          }
        },
        () => {
          setLoading(false);
          setStatus("Location access denied.");
        }
      );
    } else {
      setLoading(false);
      setStatus("Geolocation not supported.");
    }
  };

  const isSuccess = status.toLowerCase().includes("success");
  const isError =
    status.toLowerCase().includes("failed") ||
    status.toLowerCase().includes("denied") ||
    status.toLowerCase().includes("error");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#0b0f19] via-[#0e1324] to-[#0b0f19]">

      {/* siren glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.18),transparent_60%)]" />
      </div>

      {/* title */}
      <h2 className="relative z-10 mb-2 text-3xl md:text-4xl font-extrabold tracking-wide text-red-500">
        Emergency SOS
      </h2>

      <p className="relative z-10 mb-10 text-sm md:text-base text-gray-400 text-center max-w-md">
        Press immediately in a real emergency. Your live GPS location will be sent to the control system.
      </p>

      {/* button wrapper */}
      <div className="relative">

        {/* outer siren ring */}
        {!loading && (
          <>
            <span className="absolute inset-[-22px] rounded-full animate-[ping_1.4s_ease-out_infinite] bg-red-600/25" />
            <span className="absolute inset-[-40px] rounded-full animate-[pulse_2s_ease-in-out_infinite] bg-orange-500/10" />
          </>
        )}

        {/* main button */}
        <button
          onClick={handleSOS}
          disabled={loading}
          className={`
            relative z-10
            flex flex-col items-center justify-center gap-2
            w-44 h-44 sm:w-52 sm:h-52
            rounded-full
            text-white
            font-extrabold
            tracking-wider
            uppercase
            bg-gradient-to-br
            from-red-700 via-red-600 to-orange-500
            shadow-[0_0_35px_rgba(239,68,68,0.8),inset_0_0_20px_rgba(255,255,255,0.08)]
            transition-all duration-200
            hover:shadow-[0_0_55px_rgba(239,68,68,1),inset_0_0_25px_rgba(255,255,255,0.12)]
            hover:scale-105
            active:scale-95
            disabled:opacity-60
            disabled:cursor-not-allowed
            ${loading ? "animate-pulse" : ""}
          `}
        >
          <FiAlertTriangle className="text-5xl sm:text-6xl drop-shadow-lg" />

          <span className="text-2xl sm:text-3xl">
            {loading ? "Sending" : "SOS"}
          </span>

          <span className="text-[11px] sm:text-xs text-white/80 tracking-widest">
            EMERGENCY
          </span>
        </button>

        {/* rotating siren border */}
        {!loading && (
          <div className="absolute inset-[-6px] rounded-full border-2 border-red-500/40 animate-[spin_8s_linear_infinite]" />
        )}
      </div>

      {/* status message */}
      {status && (
        <div
          className={`
            relative z-10 mt-10
            px-6 py-4
            rounded-2xl
            text-center
            font-semibold
            text-sm md:text-base
            border
            backdrop-blur
            shadow-xl
            transition-all
            ${
              isSuccess
                ? "bg-emerald-950/70 text-emerald-400 border-emerald-600"
                : isError
                ? "bg-red-950/70 text-red-400 border-red-600 animate-[pulse_1.4s_ease-in-out_infinite]"
                : "bg-yellow-950/70 text-yellow-400 border-yellow-600"
            }
          `}
        >
          {status}
        </div>
      )}
    </div>
  );
}