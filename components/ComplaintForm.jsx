"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { getEmergencySuggestions } from "../lib/grok";

function ComplaintForm() {
  const { user, loading } = useAuth();
  const userId = user?._id || user?.userId;
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    lat: "",
    lng: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false); // <-- Use this for form submission loading
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setForm((prev) => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude }));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSuggestions([]);
    if (!userId) {
      setError("You must be logged in to submit a complaint. Please log in and try again.");
      return;
    }
    setFormLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("userId", userId);
    const res = await fetch("/api/complaints", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      setFormLoading(false);
      setError(data.error || "Submission failed");
      return;
    }
    let priorityBadge = null;
    if (data.complaint && data.complaint.priority) {
      let color = "#16a34a";
      if (data.complaint.priority === "HIGH") color = "#dc2626";
      else if (data.complaint.priority === "MEDIUM") color = "#eab308";
      else if (data.complaint.priority === "LOW") color = "#6b7280";
      priorityBadge = (
        <span style={{
          color,
          fontWeight: 600,
          border: `1px solid ${color}`,
          borderRadius: 6,
          padding: "2px 8px",
          marginLeft: 8
        }}>{data.complaint.priority}</span>
      );
    }
    // Call Grok API for suggestions
    try {
      const grokSuggestions = await getEmergencySuggestions({
        title: form.title,
        description: form.description,
        category: form.category,
      });
      setSuggestions(grokSuggestions);
    } catch (err) {
      setSuggestions([]);
    }
    setFormLoading(false);
    setSuccess(
      <span>
        Complaint submitted successfully!
        {priorityBadge && <><br />Assigned Priority: {priorityBadge}</>}
      </span>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded shadow mt-4 mx-auto"
      style={{
        maxWidth: 600,
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
        Submit a Complaint
      </h2>
      <div className="row mb-3">
        <div className="col-md-6 mb-2 mb-md-0">
          <label
            htmlFor="title"
            className="form-label"
            style={{ color: "#ddd", fontWeight: "500" }}
          >
            Title
          </label>
          <input
            name="title"
            id="title"
            placeholder="Title"
            value={form.title}
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
        <div className="col-md-6">
          <label
            htmlFor="category"
            className="form-label"
            style={{ color: "#ddd", fontWeight: "500" }}
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
            required
            style={{
              backgroundColor: "#111827",
              border: "1px solid #555",
              color: "#fff",
              borderRadius: "0.75rem",
              padding: "0.75rem",
            }}
          >
            <option value="">Select Category</option>
            <option value="Water">Water</option>
            <option value="Road">Road</option>
            <option value="Street Light">Street Light</option>
            <option value="Electricity">Electricity</option>
            <option value="Sewage">Sewage</option>
            <option value="Garbage">Garbage</option>
            <option value="Pothole">Pothole</option>
            <option value="Traffic">Traffic</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="description"
          className="form-label"
          style={{ color: "#ddd", fontWeight: "500" }}
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={form.description}
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
      <div className="mb-3">
        <label
          htmlFor="image"
          className="form-label"
          style={{ color: "#ddd", fontWeight: "500" }}
        >
          Image (optional)
        </label>
        <input
          name="image"
          id="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="form-control"
          style={{
            backgroundColor: "#111827",
            border: "1px solid #555",
            color: "#fff",
            borderRadius: "0.75rem",
            padding: "0.75rem",
          }}
        />
      </div>
      <div className="mb-3 d-flex align-items-center gap-2">
        <button
          type="button"
          onClick={handleLocation}
          className="btn"
          aria-label="Get Location"
          style={{
            background: "linear-gradient(135deg, #ff4d4f 0%, #ff6b3a 100%)",
            color: "#fff",
            fontWeight: "700",
            borderRadius: "2rem",
            boxShadow: "0 0 10px rgba(255,77,79,0.7)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Get Location
        </button>
        {form.lat && form.lng && <span className="small" style={{
          color:"#fff"
        }}>Lat: {form.lat}, Lng: {form.lng}</span>}
      </div>
      <button
        type="submit"
        className="btn w-100"
        disabled={formLoading}
        style={{
          background: "linear-gradient(135deg, #ff4d4f 0%, #ff6b3a 100%)",
          color: "#fff",
          fontWeight: "700",
          fontSize: "1.1rem",
          borderRadius: "2rem",
          boxShadow: "0 0 20px rgba(255,77,79,0.7)",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {formLoading ? "Submitting..." : "Submit"}
      </button>
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
          {suggestions.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ color: "#ff4d4f" }}>Emergency Steps:</h4>
              <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: 400 }}>
                {suggestions.map((step, idx) => (
                  <li key={idx} style={{ color: "#fff", marginBottom: 8 }}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default ComplaintForm;
