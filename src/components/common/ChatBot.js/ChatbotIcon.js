/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import ChatbotModal from "../ChatBot.js/ChatbotModal";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatbotIcon({ userDetails }) {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const chat_bot = searchParams.get("chat_bot");
    const charBotId = searchParams.get("charBotId");
    const [show, setShow] = useState(chat_bot ? true : false);
    const [charBotIdState, setCharBotIdState] = useState(chat_bot && charBotId ? charBotId : "");

    const clearParams = () => {
        searchParams.delete("chat_bot");
        searchParams.delete("charBotId");
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        }, { replace: true });
    };

    useEffect(() => {
        if (chat_bot && charBotId) {
            setCharBotIdState(charBotId);
            clearParams();
        }
    }, [chat_bot, charBotId]);

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
                        handleClose={() => {
                            setShow(false);
                            setCharBotIdState("");
                            if (charBotIdState) {
                                clearParams();
                            }
                        }}
                        charBotId={charBotIdState}
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
