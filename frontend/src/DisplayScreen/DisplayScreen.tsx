import React from "react";
import logo from "../red-cheeks-logo.jpg";
import igLogo from "../ig-logo.png";

const DisplayScreen: React.FC = () => {
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
          marginBottom: "2.5rem",
        }}
      />
      <div className="flex flex-row items-center mb-16">
        <img
          src={igLogo}
          alt="Instagram Logo"
          style={{ width: "2rem", height: "2rem", marginRight: "0.75rem" }}
        />
        <span
          style={{ color: "#ED8C8C", fontSize: "2.25rem", fontWeight: 600 }}
        >
          redcheekstcg
        </span>
      </div>
      <span
        className="font-bold"
        style={{ color: "#3A3A32", fontSize: "3rem", fontWeight: 600 }}
      >
        $2 start singles
      </span>
    </div>
  );
};

export default DisplayScreen;
