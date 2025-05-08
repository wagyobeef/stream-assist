import React from "react";
import logo from "../red-cheeks-logo.jpg";

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
          marginBottom: "3.5rem",
        }}
      />
      <span
        className="font-bold"
        style={{ color: "#F28B82", fontSize: "3rem" }}
      >
        Hello
      </span>
    </div>
  );
};

export default DisplayScreen;
