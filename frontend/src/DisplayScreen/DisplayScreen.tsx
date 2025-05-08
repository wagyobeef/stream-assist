import React from "react";
import logo from "../red-cheeks-logo.jpg";
import igLogo from "../ig-logo.png";
import happyPika from "../gifs/happy-pika.gif";

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
        className="font-bold"
        style={{
          color: "#3A3A32",
          fontSize: "3rem",
          fontWeight: 600,
          marginBottom: ".5rem",
        }}
      >
        $2 start single or lot
      </span>
      <span
        className="font-bold"
        style={{ color: "#6B6B6B", fontSize: "1.75rem", fontWeight: 400 }}
      >
        This is some placeholder text
      </span>
      <img
        src={happyPika}
        alt="Happy Pikachu"
        style={{ marginTop: "3rem", width: "18rem", height: "auto" }}
      />
    </div>
  );
};

export default DisplayScreen;
