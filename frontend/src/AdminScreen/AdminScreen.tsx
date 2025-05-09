import React, { useState, useEffect } from "react";

const API_BASE_URL =
  import.meta.env.VITE_DEV_MODE === "true"
    ? "http://localhost:3001"
    : "https://live.redcheekstcg.com";

const AdminScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageId, setImageId] = useState("");
  const [imageOptions, setImageOptions] = useState<
    { id: string; label: string; url: string }[]
  >([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [presetTitles, setPresetTitles] = useState<string[]>([]);
  const [titleMode, setTitleMode] = useState<"preset" | "custom">("preset");
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [customTitle, setCustomTitle] = useState<string>("");

  useEffect(() => {
    setError(null);
    fetch(`${API_BASE_URL}/get-image-options`)
      .then((res) => res.json())
      .then((data) => {
        setImageOptions(data);
      })
      .catch(() => {
        setImageOptions([]);
        setError("Failed to load image options.");
      });
    fetch(`${API_BASE_URL}/get-preset-titles`)
      .then((res) => res.json())
      .then((data) => {
        setPresetTitles(data);
        if (data.length > 0) {
          setSelectedPreset(data[0]);
          setTitle(data[0]);
        }
      })
      .catch(() => {
        setPresetTitles([]);
        setError("Failed to load preset titles.");
      });
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleMode(e.target.value === "custom" ? "custom" : "preset");
    if (e.target.value === "custom") {
      setTitle(customTitle);
    } else {
      setSelectedPreset(e.target.value);
      setTitle(e.target.value);
    }
  };

  const handleCustomTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTitle(e.target.value);
    setTitle(e.target.value);
  };

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
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          padding: 48,
        }}
      >
        {error && (
          <div
            style={{
              color: "red",
              marginBottom: 16,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {/* Title Section */}
          <div style={{ width: "100%", marginBottom: "2rem" }}>
            <div
              style={{
                fontWeight: 700,
                marginBottom: ".5rem",
                textAlign: "left",
              }}
            >
              Title
            </div>
            {Array.isArray(presetTitles) &&
              presetTitles.map((preset) => (
                <label
                  key={preset}
                  style={{
                    display: "block",
                    marginBottom: ".5rem",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <input
                    type="radio"
                    name="title"
                    value={preset}
                    checked={
                      titleMode === "preset" && selectedPreset === preset
                    }
                    onChange={handleTitleChange}
                    style={{ marginRight: ".5rem" }}
                  />
                  {preset}
                </label>
              ))}
            <label
              style={{
                display: "block",
                marginBottom: ".5rem",
                textAlign: "left",
                width: "100%",
              }}
            >
              <input
                type="radio"
                name="title"
                value="custom"
                checked={titleMode === "custom"}
                onChange={handleTitleChange}
                style={{ marginRight: ".5rem" }}
              />
              Custom:
              <input
                type="text"
                value={customTitle}
                onChange={handleCustomTitleChange}
                disabled={titleMode !== "custom"}
                placeholder="Enter custom title"
                style={{
                  fontSize: "1.1rem",
                  padding: "0.5rem",
                  marginLeft: ".5rem",
                }}
              />
            </label>
          </div>
          {/* Subtitle Section */}
          <div style={{ width: "100%", marginBottom: "2rem" }}>
            <div
              style={{
                fontWeight: 700,
                marginBottom: ".5rem",
                textAlign: "left",
              }}
            >
              Subtitle
            </div>
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
            <div
              style={{
                fontWeight: 700,
                marginBottom: ".5rem",
                textAlign: "left",
              }}
            >
              Image
            </div>
            <select
              value={imageId}
              onChange={(e) => setImageId(e.target.value)}
              style={{ fontSize: "1.1rem", padding: "0.5rem", width: "100%" }}
            >
              <option value="">No Image</option>
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
                textAlign: "center",
              }}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminScreen;
