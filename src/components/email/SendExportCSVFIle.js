import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { SendEmail } from '../../api/api';

export default function SendExportCSVFIle(props) {
    const [sendEmail, setSendEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    /*Function to download the file */
    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(props.fileBlob);
        link.download = `${props.getDownloadTitle()}_${new Date().toISOString().replace(/:/g, '-')}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /*Function to send email */
    const handleSendEmail = async () => {
        if (!email) {
            toast.error("Please enter email", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        setIsLoading(true);
        const file = new File([props.fileBlob], `${props.getDownloadTitle()}_${new Date().toISOString().replace(/:/g, '-')}.csv`, { type: 'text/csv' });
        const data = {
            email: email,
            subject: `Exported ${props.getDownloadTitle()} Data`,
            description: `Please find the attached exported data for ${props.getDownloadTitle()}.`,
            bccemail: '',
            adminemail: '',
            signature: localStorage.getItem("admin_signature"),
            sender_id: localStorage.getItem('admin_id'),
        };
        const FileList = [file];
        try {
            const res = await SendEmail(data, FileList, '');
            if (res.status === 1) {
                downloadFile();
                toast.success("Email sent successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                props.close()
                setSendEmail(false);
                setEmail('');
            } else {
                toast.error("Failed to send email", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error sending email", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Modal show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <Modal.Header>
                    <Modal.Title>Export Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!sendEmail ? (
                        <p>Do you want to send this file via email?</p>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label className="form-label">Email ID</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* If you want Name field later
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {!sendEmail ? (
                        <>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    downloadFile();
                                    props.close();
                                }}
                            >
                                No, Just Download
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => setSendEmail(true)}
                            >
                                Yes, Send Email
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                onClick={() => setSendEmail(false)}
                            >
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                onClick={async () => {
                                    setIsLoading(true);
                                    await handleSendEmail(email);
                                    setIsLoading(false);
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Email & Download"
                                )}
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </div>
        </Modal>
    )
}
