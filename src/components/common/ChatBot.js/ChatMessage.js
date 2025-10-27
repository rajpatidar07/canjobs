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
                className={`p-3 shadow-sm ${isSender ? "text-white" : "text-dark bg-light border"
                    }`}
                style={{
                    backgroundColor: isSender ? "#FA474A" : "#f1f1f1",
                    borderRadius: isSender
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    maxWidth: "75%",
                    wordBreak: "break-word",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                }}
            >
                <div>{message.message}</div>
                <div
                    style={{
                        fontSize: "0.75rem",
                        opacity: 0.7,
                        textAlign: isSender ? "right" : "left",
                        marginTop: "4px",
                    }}
                >
                    {formattedTime}
                </div>
            </div>
        </div>
    );
}
