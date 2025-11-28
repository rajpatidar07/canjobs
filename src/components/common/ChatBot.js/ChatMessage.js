import React from "react";
import ConvertTime from "../Common function/ConvertTime";

export default function ChatMessage({ message, isSender, isHighlighted }) {

  return (
    <div className={`d-flex mb-3 ${isSender ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`p-3 shadow-sm ${isSender ? "text-white" : "text-dark bg-light"}`}
        style={{
          backgroundColor: isSender
            ? "#FA474A"
            : "#f1f1f1",
          maxWidth: "75%",
          wordBreak: "break-word",
          fontSize: "0.95rem",
          lineHeight: "1.5",
          border: isHighlighted
            ? "2px solid #007bff"
            : "1px solid transparent",
          borderRadius: isSender
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
          transition: "border 0.2s ease",
        }}>
        <div>{message.message}</div>
        <div
          style={{
            fontSize: "0.75rem",
            opacity: 0.7,
            textAlign: isSender ? "right" : "left",
            marginTop: "4px",
          }}>
          {ConvertTime({ _date: message.created_at, format: "h:mm A" })}
        </div>
      </div>
    </div>
  );
}
