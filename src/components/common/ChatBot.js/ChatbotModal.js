import React, { useState, useEffect, useRef } from "react";
import { Modal, FormControl, Button } from "react-bootstrap";
import { getChat, addUpdateChat } from "../../../api/api";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function ChatbotModal({ show, handleClose, userDetails }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const user_id = localStorage.getItem("employee_id");
    const employer_id = localStorage.getItem("company_id");
    const admin_id = localStorage.getItem("admin_id");
    const agent_id = localStorage.getItem("agent_id");
    const user_type = localStorage.getItem("userType");
    const admin_type = localStorage.getItem("admin_type");

    const fetchChat = async () => {
        const res = await getChat(userDetails.user_id, userDetails.user_type);
        if (res?.data) setMessages(res.data);
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        const payload = {
            sender_id:
                user_type === "user"
                    ? user_id
                    : user_type === "employer"
                        ? employer_id
                        : user_type === "admin"
                            ? admin_id
                            : agent_id,
            sender_type:
                user_type === "user"
                    ? "employee"
                    : user_type === "employer"
                        ? "employer"
                        : user_type === "admin"
                            ? admin_type
                            : "agent",
            context_user_id: userDetails.user_id,
            context_user_type: userDetails.user_type,
            message: newMessage,
            attachment: null,
        };

        await addUpdateChat(payload);
        setNewMessage("");
        fetchChat();
    };

    useEffect(() => {
        if (show) fetchChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <Modal show={show}
            onHide={handleClose}
            centered
            size="md"
            contentClassName="border-0 rounded-4 shadow-lg"
        >
            <div
                className="card shadow-lg border-0"
                style={{
                    width: "350px",
                    height: "480px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    animation: "slideUp 0.3s ease-out",
                }}
            >
                {/* Header */}
                <div
                    className="d-flex justify-content-between align-items-center text-white px-3 py-2"
                    style={{ backgroundColor: "#FA474A" }}
                >
                    <h6 className="mb-0 fw-bold text-white">Chat Support</h6>
                    <AiOutlineClose
                        size={22}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClose()}
                    />
                </div>

                {/* Body */}
                <Modal.Body
                    style={{
                        backgroundColor: "#fff",
                        maxHeight: "60vh",
                        overflowY: "auto",
                        padding: "1rem",
                    }}
                >
                    {messages.length ? (
                        messages.map((msg, idx) => {
                            const isSender =
                                msg.sender_id ===
                                (user_type === "user"
                                    ? user_id
                                    : user_type === "employer"
                                        ? employer_id
                                        : user_type === "admin"
                                            ? admin_id
                                            : agent_id) &&
                                msg.sender_type ===
                                (user_type === "user"
                                    ? "employee"
                                    : user_type === "employer"
                                        ? "employer"
                                        : user_type === "admin"
                                            ? admin_type
                                            : "agent");

                            return (
                                <div
                                    key={idx}
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
                                        <div>{msg.message}</div>
                                        <div
                                            style={{
                                                fontSize: "0.75rem",
                                                opacity: 0.7,
                                                textAlign: isSender ? "right" : "left",
                                                marginTop: "4px",
                                            }}
                                        >
                                            {msg.created_at ? formatTime(msg.created_at) : ""}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-secondary mt-4">
                            <p>No messages yet. Start a conversation 👋</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </Modal.Body>

                {/* Input Area */}
                <div
                    className="d-flex align-items-center bg-white px-3 py-3"
                    style={{
                        borderTop: "1px solid #eee",
                        borderBottomLeftRadius: "1rem",
                        borderBottomRightRadius: "1rem",
                    }}
                >
                    <FormControl
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="ps-3 py-2 me-2"
                        style={{
                            borderRadius: "25px",
                            border: "1px solid #ddd",
                            fontSize: "0.95rem",
                            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                        }}
                    />

                    <Button
                        onClick={handleSend}
                        className="d-flex align-items-center justify-content-center border-0"
                        style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            backgroundColor: "#FA474A",
                            boxShadow: "0 3px 6px rgba(250,71,74,0.4)",
                            transition: "transform 0.2s ease, box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.08)";
                            e.currentTarget.style.boxShadow =
                                "0 4px 10px rgba(250,71,74,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                                "0 3px 6px rgba(250,71,74,0.4)";
                        }}
                    >
                        <FaPaperPlane size={18} color="#fff" />
                    </Button>
                </div>
            </div>
        </Modal>

    );
}
