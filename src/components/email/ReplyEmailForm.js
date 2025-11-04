import React, { useState } from "react";
import { ReplyToMail } from "../../api/api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignatureTextEditor from "../SignatureTextEditor";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
// import TextEditor from "../common/TextEditor";
const ReplyEmailForm = ({ mesId, emailType, setShowReplyForm, setApiCall, toggleReplyFormClick }) => {
    const [formData, setFormData] = useState({ message: '' });
    const [fileBase, setFileBase] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const syntheticEvent = { target: { files: e.dataTransfer.files } };
            await AddAttachmentChange(syntheticEvent);
            e.dataTransfer.clearData();
        }
    };

    /* Function to add files in bulk*/
    const AddAttachmentChange = async (event) => {
        const files = event.target.files;
        {
            // Check the number of files selected
            if (files.length > 15) {
                toast.error("You can only upload a maximum of 15 files at a time", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                return;
            }

            const maxSize = 1024 * 8000; // 8 MB
            const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

            // Start with existing files array or empty
            const existingFiles = Array.isArray(fileBase) ? [...fileBase] : [];
            const newFiles = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Check file type
                const fileType = `.${file.name.split(".").pop()}`;
                if (!allowedTypes.includes(fileType.toLowerCase())) {
                    toast.error(
                        `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        }
                    );
                    return;
                }

                // Check file size
                if (file.size > maxSize) {
                    toast.error(
                        `Document size can't be more than 8 MB for file '${file.name}'`,
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        }
                    );
                    return;
                }

                // Check if file already exists by name
                if (!existingFiles.some(f => f.name === file.name) && !newFiles.some(f => f.name === file.name)) {
                    newFiles.push(file);
                }
            }

            // Append new files to existing files
            const updatedFiles = [...existingFiles, ...newFiles];
            setFileBase(updatedFiles);
            setFileNames(updatedFiles.map(f => f.name));
        }
    };

    //Function to Remove any attachments
    const handleRemoveFile = (fileName) => {
        const newFileBase = fileBase.filter(file => file.name !== fileName);
        const newFileNames = fileNames.filter((name) => name !== fileName);
        setFileBase(newFileBase);
        setFileNames(newFileNames);
    };

    const onReplyClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle form submission here
        // You can access subject, message, and attachment here
        // Don't forget to call setShowReplyForm to hide the form
        try {
            let res = await ReplyToMail(mesId, emailType, formData.message, fileBase)
            if (res.message === "Reply sent successfully") {
                toast.success("Replied successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setApiCall(true)
                setShowReplyForm(false);
                setFormData({ message: '' });
                setFileBase([]);
                setFileNames([]);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    return (
        <form onSubmit={onReplyClick}>
            <div className="form-group">
                <label>Message:</label>
                <div
                    className={
                        "border rounded overflow-hidden"
                    }
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    style={{
                        minHeight: "100px",
                        padding: "10px",
                        border: isDragging ? "2px dashed #007bff" : "2px dashed #ccc",
                        borderRadius: "5px",
                        backgroundColor: isDragging ? "#e9f5ff" : "transparent",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                    }}
                >
                    <SignatureTextEditor
                        name="message"
                        state={formData.message || ""}
                        setState={setFormData}
                        placeholder="Enter message here"
                        id="message"
                    />
                    <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                        Drag and drop files here or click "Attach Files" button to upload attachments.
                    </div>
                </div>
            </div>
            <div className="mail-file-attachments">
                {fileNames.map((fileName) => (
                    <div key={fileName} className="mail-file-attachment">
                        <p>{fileName}</p>
                        <button
                            type="button"
                            className="mail-remove-file"
                            onClick={() => handleRemoveFile(fileName)}
                        >
                            <IoMdClose />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mb-2">
                <label
                    className="btn btn-secondary"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.style.border = "2px dashed #007bff";
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.style.border = "";
                    }}
                    onDrop={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.style.border = "";
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            const syntheticEvent = { target: { files: e.dataTransfer.files } };
                            await AddAttachmentChange(syntheticEvent);
                            e.dataTransfer.clearData();
                        }
                    }}
                >
                    <AiOutlineCloudUpload className="font-size-3 mr-2" />
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            AddAttachmentChange(e);
                        }}
                        placeholder="Attach file"
                        multiple
                    />
                    Attach Files
                </label>
            </div>
            <div className="d-flex">
                <button type="submit" className="btn btn-primary" disabled={loading === true}>
                    {loading === true ? "Sending..." : "Send"}
                </button>
                <button className="btn btn-outline-primary" onClick={toggleReplyFormClick} disabled={loading}>
                    Cancel
                </button></div>
        </form>
    );
};
export default ReplyEmailForm;
