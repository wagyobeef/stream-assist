import React, { useState } from "react";

const AdminScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("http://192.168.0.191:3001/update-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Title updated successfully!");
      } else {
        setStatus(data.error || "Failed to update title.");
      }
    } catch {
      setStatus("Network error.");
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
        fontSize: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new title"
          style={{
            fontSize: "1.5rem",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <button
          type="submit"
          style={{ fontSize: "1.2rem", padding: "0.5rem 1.5rem" }}
        >
          Update Title
        </button>
      </form>
      {status && (
        <div style={{ marginTop: "1rem", fontSize: "1rem" }}>{status}</div>
      )}
    </div>
  );
};

export default AdminScreen;
