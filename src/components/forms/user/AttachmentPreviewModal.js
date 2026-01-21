import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose, IoMdDownload, IoMdImage, IoMdDocument, IoMdVideocam } from 'react-icons/io';
import './AttachmentPreviewModal.css';

function AttachmentPreviewModal({ show, onHide, file, fileUrl }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!file || !fileUrl) {
        return null;
    }

    const fileType = file.type;
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getFileIcon = () => {
        if (fileType.includes("image/")) return <IoMdImage />;
        if (fileType === "application/pdf") return <IoMdDocument />;
        if (fileType.includes("video/")) return <IoMdVideocam />;
        return <IoMdDocument />;
    };

    const renderContent = () => {
        if (error) {
            return (
                <div className="error-message">
                    <div className="file-icon">{getFileIcon()}</div>
                    <h4>Preview Error</h4>
                    <p>{error}</p>
                    <button className="download-btn" onClick={handleDownload}>
                        <IoMdDownload /> Download File
                    </button>
                </div>
            );
        }

        if (fileType.includes("image/")) {
            return (
                <div>
                    <img
                        src={fileUrl}
                        alt={fileName}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setError("Failed to load image preview.");
                        }}
                    />
                    {isLoading && <div className="loading-spinner"></div>}
                </div>
            );
        } else if (fileType === "application/pdf") {
            return (
                <>
                    <iframe
                        src={fileUrl}
                        title={fileName}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setError("Failed to load PDF preview.");
                        }}
                    >
                        <p>Your browser does not support iframes. <a href={fileUrl} download={fileName}>Download the PDF</a> instead.</p>
                    </iframe>
                    {isLoading && <div className="loading-spinner"></div>}
                </>
            );
        } else if (fileType.includes("word") || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
            return (
                <div className="preview-not-available">
                    <div className="file-icon">{getFileIcon()}</div>
                    <h4>Preview Not Available</h4>
                    <p>Direct preview of Word documents (.doc/.docx) is not supported in browsers without external services.</p>
                    <p>The file will be attached when you send the email.</p>
                    <button className="download-btn" onClick={handleDownload}>
                        <IoMdDownload /> Download File
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <iframe
                        src={fileUrl}
                        title={fileName}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setError("Failed to load file preview.");
                        }}
                    >
                        <p>Preview not directly supported. <a href={fileUrl} download={fileName}>Download the file</a> instead.</p>
                    </iframe>
                    {isLoading && <div className="loading-spinner"></div>}
                </div>
            );
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            className="attachment-preview-modal"
        >
            <Modal.Header>
                <Modal.Title>
                    <span>
                        {getFileIcon()} Preview: {fileName}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#ccc', marginLeft: '10px' }}>
                        ({fileSize})
                    </span>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={onHide}
                        aria-label="Close preview"
                    >
                        <IoMdClose />
                    </button>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="attachment-preview-content">
                    {renderContent()}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AttachmentPreviewModal;