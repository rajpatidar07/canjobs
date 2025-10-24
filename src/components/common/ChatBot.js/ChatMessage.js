import React from "react";

export default function ChatMessage({ message, isSender }) {
    const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            className={`d-flex mb-3 ${isSender ? "justify-content-end" : "justify-content-start"
                }`}
        >
            <div
                className={`p-3 rounded-4 shadow-sm ${isSender ? "bg-primary text-white" : "bg-light text-dark border"
                    }`}
                style={{
                    maxWidth: "70%",
                    wordWrap: "break-word",
                }}
            >
                <p className="mb-1 small">{message.message}</p>
                <p className="mb-0 text-end text-muted" style={{ fontSize: "0.7rem" }}>
                    {formattedTime}
                </p>
            </div>
        </div>
    );
}
