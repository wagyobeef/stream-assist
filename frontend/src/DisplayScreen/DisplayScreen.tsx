import React, { useEffect, useState } from "react";
import logo from "../red-cheeks-logo.jpg";
import igLogo from "../ig-logo.png";

interface State {
  title: string;
  subtitle: string;
  image: {
    id: string;
    url: string;
    label?: string;
  };
}

const API_BASE_URL =
  import.meta.env.VITE_DEV_MODE === "true"
    ? "http://localhost:3001"
    : "https://live.redcheekstcg.com";

const DisplayScreen: React.FC = () => {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchState = () => {
      fetch(`${API_BASE_URL}/get-state`)
        .then(async (res) => {
          const text = await res.text();
          try {
            const data = JSON.parse(text);
            if (isMounted) setState(data);
          } catch (err) {
            console.error("Response was not valid JSON. Raw response:", text);
            throw err;
          }
        })
        .catch((err) => {
          console.error("Error fetching state:", err);
        });
    };
    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center pt-12 font-sans">
      <img
        src={logo}
        alt="Red Cheeks Logo"
        style={{
          width: "12rem",
          height: "12rem",
          borderRadius: "9999px",
          objectFit: "cover",
          marginBottom: "1.5rem",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        <img
          src={igLogo}
          alt="Instagram Logo"
          style={{ width: "2rem", height: "2rem", marginRight: "0.75rem" }}
        />
        <span
          style={{ color: "#C24141", fontSize: "2.25rem", fontWeight: 600 }}
        >
          redcheekstcg
        </span>
      </div>
      <span
        className="fonwht-bold"
        style={{
          color: "#3A3A32",
          fontSize: "3rem",
          fontWeight: 600,
          marginBottom: ".5rem",
        }}
      >
        {state ? state.title : ""}
      </span>
      <span
        className="font-bold"
        style={{ color: "#6B6B6B", fontSize: "1.75rem", fontWeight: 400 }}
      >
        {state ? state.subtitle : ""}
      </span>
      {state && state.image && state.image.url && state.image.url !== "" && (
        <img
          src={`${API_BASE_URL}${state.image.url}`}
          alt={state.image.label || "Gif"}
          style={{
            marginTop: "3rem",
            width: "18rem",
            height: "auto",
            borderRadius: ".25rem",
          }}
        />
      )}
    </div>
  );
};

export default DisplayScreen;
