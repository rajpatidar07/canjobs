import React, { useState } from "react";
import { ReplyToMail } from "../../api/api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReplyEmailForm = ({ mesId, emailType, setShowReplyForm, setApiCall,toggleReplyFormClick }) => {
    const [message, setMessage] = useState('');
    console.log(mesId, emailType)
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const onReplyClick = async (e) => {
        e.preventDefault();
        // Handle form submission here
        // You can access subject, message, and attachment here
        // Don't forget to call setShowReplyForm to hide the form
        try {
            let res = await ReplyToMail(mesId, emailType, message)
            if (res.data === "Reply sent successfully") {
                toast.success("Replied successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setApiCall(true)
                setShowReplyForm(false);
            }
        } catch (err) { console.log(err) }
    };

    return (
        <form onSubmit={onReplyClick}>
            <div className="form-group">
                <label>Message:</label>
                <textarea
                    className="form-control"
                    value={message}
                    onChange={handleMessageChange}
                ></textarea>
            </div>
            <div className="d-flex">
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
                <button className="btn btn-outline-primary" onClick={toggleReplyFormClick}>
                    Cancel
                </button></div>
        </form>
    );
};
export default ReplyEmailForm;
