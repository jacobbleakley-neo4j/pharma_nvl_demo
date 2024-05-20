import React from "react";

const FitToScreenButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      top: "100px",
      right: "40px",
      zIndex: 1000,
      backgroundColor: "#006699",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      style={{ width: "24px", height: "24px" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  </button>
);

export default FitToScreenButton;
