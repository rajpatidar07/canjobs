import React from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';

function AttachmentPreviewModal({ show, onHide, file, fileUrl }) {
    if (!file || !fileUrl) {
        return null;
    }

    const fileType = file.type;
    const fileName = file.name;

    let content;

    // --- Logic for different file types ---

    if (fileType.includes("image/")) {
        // Direct Image Preview
        content = (
            <img
                src={fileUrl}
                alt={fileName}
                style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
        );
    } else if (fileType === "application/pdf") {
        // PDF Preview using iframe
        content = (
            <iframe
                src={fileUrl}
                title={fileName}
                width="100%"
                height="800px"
                style={{ border: 'none' }}
                allowFullScreen
            >
                <p>Your browser does not support iframes. You can download the PDF instead.</p>
            </iframe>
        );
    } else if (fileType.includes("word") || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        // Word Document Preview using Google Docs Viewer (Best effort preview, requires CORS/public access, but often works for in-memory files)
        // For local File objects, we rely on the object URL being compatible with Google Viewer
        // Fallback: If Google Viewer fails, you might have to prompt the user to download.
        // NOTE: The object URL might not work directly with the Google Viewer proxy. 
        // For client-side File objects, direct iframe with fileUrl is often the only option that works reliably in most modern browsers for simple text/docs, but Word is tricky.

        // Option 1: Direct iframe for better local security (might work for simple text/RTF but not complex DOCX)
        // content = (
        //     <iframe
        //         src={fileUrl}
        //         title={fileName}
        //         width="100%"
        //         height="800px"
        //         style={{ border: 'none' }}
        //     />
        // );

        // Option 2: Inform the user (Word preview in browser is notoriously difficult without external services)
        content = (
            <div className="p-4 text-center">
                <h4>Preview Not Available</h4>
                <p>Direct preview of Word documents (.doc/.docx) is often not supported by browsers without downloading or using a licensed third-party service.</p>
                <p className="mt-3">The file will be attached when you send the email: {fileName}</p>
            </div>
        );


    } else {
        // General fallback for any other supported type (like plain text, other viewer-supported types)
        content = (
            <iframe
                src={fileUrl}
                title={fileName}
                width="100%"
                height="800px"
                style={{ border: 'none' }}
            >
                <p>Preview not directly supported. The file is attached.</p>
            </iframe>
        );
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                <Modal.Title><span>Preview: {fileName}</span>
                    <button type="button" className="close" onClick={onHide} style={{ border: 'none', background: 'transparent' }}>
                        <IoMdClose size={24} />
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '70vh', overflow: 'auto', backgroundColor: '#ffffff', padding: '20px' }}>
                    {content}
                </Modal.Body>
        </Modal>
    );
}

export default AttachmentPreviewModal;