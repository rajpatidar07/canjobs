import React from "react";

export default function MondayBadge() {
  return (
    <span
      className="badge"
      style={{
        backgroundColor: "#007bff",
        color: "white",
        fontWeight: 600,
        fontSize: "0.55rem",
        padding: "0.1em 0.3em",
        borderRadius: "0.25rem",
        boxShadow: "0 1px 2px rgba(0, 123, 255, 0.4)",
        marginRight: 4,
        display: "inline-block",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        userSelect: "none",
        minWidth: "30px",
        textAlign: "center",
      }}
      title="Monday Data"
    >
      Monday
    </span>
  );
}
