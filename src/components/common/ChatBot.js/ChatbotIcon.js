import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import ChatbotModal from "../ChatBot.js/ChatbotModal";

export default function ChatbotIcon({ userDetails }) {
    const [show, setShow] = useState(false);

    return (
        <>
            {/* Floating Chat Window */}
            <div
                className="position-fixed bottom-0 end-0 m-4"
                style={{ zIndex: 1050 }}
            >
                {/* Chat Icon */}
                {!show && (
                    <div
                        className="bg-danger rounded-circle shadow d-flex align-items-center justify-content-center"
                        style={{
                            width: "60px",
                            height: "60px",
                            cursor: "pointer",
                        }}
                        title="Chat with Support"
                        onClick={() => setShow(true)}
                    >
                        <AiOutlineMessage size={28} color="#fff" />
                    </div>
                )}

                {/* Chat Window */}
                {show && (
                    <ChatbotModal
                        userDetails={userDetails}
                        show={show}
                        handleClose={() => setShow(false)}
                    />
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </>
    );
}
