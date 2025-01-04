import React, { useState } from "react";
import { forwardMail } from "../../api/api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForwardEmailForm = ({ data, emailType, setShowForwardForm, setApiCall, toggleForwardFormClick }) => {
    const [forwardTo, setForwardTo] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(data)
    const onForwardMailClick = async (e) => {
        e.preventDefault();
        let new_data = {
            to: forwardTo,
            subject: data.subject,
            body: data.body.content,
            cc_email: "",
            bcc_email: "",
            originalTo: data?.toRecipients[0]?.emailAddress?.address,
            originalDate: data.sentDateTime,
            originalFrom: data.from.emailAddress.address
        }

        try {
            setLoading(true)
            let res = await forwardMail(new_data);
            if (res.message === "email sent successfully") {
                toast.success("Email forwarded successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setApiCall(true)
                setShowForwardForm(false);
                setLoading(false)
            }
        } catch (err) { console.log(err) }
    };

    return (
        <form onSubmit={onForwardMailClick}>
            <div className="form-group">
                <label>To:</label>
                <input
                    maxLength={100}
                    name="email"
                    value={forwardTo || ""}
                    onChange={(e) => setForwardTo(e.target.value)}
                    type="email"
                    className={"form-control"}
                    placeholder="Email"
                    id="email"
                />
            </div>
            <div className="d-flex">
                {loading ?
                    <button
                        className="btn btn-primary mx-2"
                        type="button"
                        disabled
                    >
                        <span
                            className="spinner-border spinner-border-sm "
                            role="status"
                            aria-hidden="true"
                        ></span>
                        <span className="sr-only">Loading...</span>
                    </button>
                    : <button type="submit" className="btn btn-primary mx-2">
                        Send
                    </button>}
                <button className="btn btn-outline-primary" onClick={toggleForwardFormClick}>
                    Cancel
                </button></div>
        </form>
    );
};
export default ForwardEmailForm;
