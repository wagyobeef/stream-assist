import React, { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_DEV_MODE === "true"
    ? "http://localhost:3001"
    : "http://3.17.187.202:3001";

const imageOptions = [
  { id: "default-image-id", label: "Default Image", url: "" },
  {
    id: "dancing-pika",
    label: "Dancing Pikachu",
    url: "/gifs/dancing-pika.gif",
  },
  { id: "crying-pika", label: "Crying Pikachu", url: "/gifs/crying-pika.gif" },
];

const AdminScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageId, setImageId] = useState(imageOptions[0].id);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch(`${API_BASE_URL}/set-state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          imageId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("State updated successfully!");
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus(data.error || "Failed to update state.");
        setTimeout(() => setStatus(null), 3000);
      }
    } catch {
      setStatus("Network error.");
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Title Section */}
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, marginBottom: ".5rem" }}>Title</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new title"
            style={{ fontSize: "1.1rem", padding: "0.5rem", width: "100%" }}
          />
        </div>
        {/* Subtitle Section */}
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, marginBottom: ".5rem" }}>Subtitle</div>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter new subtitle"
            style={{ fontSize: "1.1rem", padding: "0.5rem", width: "100%" }}
          />
        </div>
        {/* Image Section */}
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, marginBottom: ".5rem" }}>Image</div>
          <select
            value={imageId}
            onChange={(e) => setImageId(e.target.value)}
            style={{ fontSize: "1.1rem", padding: "0.5rem", width: "100%" }}
          >
            {imageOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{
            fontSize: "1.2rem",
            padding: "0.75rem 2rem",
            marginTop: "1rem",
          }}
        >
          Submit
        </button>
        {status && (
          <div
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              color: status.includes("success") ? "green" : "red",
              fontWeight: 600,
            }}
          >
            {status}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminScreen;
