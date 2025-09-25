import React, { useState } from 'react';
import { ExportExcelApi, SendEmail } from '../../api/api';
import { TfiExport } from 'react-icons/tfi';
import { toast } from 'react-toastify';

const ExportExcelButton = ({ tableName, portal, applicantType, status, local, type, tableData }) => {
    const [showModal, setShowModal] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    const [fileBlob, setFileBlob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Helper function to strip HTML tags and handle newlines
    const cleanData = (value) => {
        if (typeof value === 'object' && value !== null) {
            // Convert object to JSON string
            return JSON.stringify(value);
        }
        // Remove HTML tags using a regex
        const strippedStr = String(value).replace(/<[^>]*>/g, '');
        // Replace newlines with a space
        return strippedStr.replace(/\n/g, ' ');
    };
    /*Functional rendering according to the pages */
    const getDownloadTitle = () => {
        if (portal === "study") return "Student";
        if (tableName === "employee") return "Candidate";
        if (tableName === "employer") return "Client";
        if (tableName === "admin") return "Admin";
        if (tableName === "job") return "Jobs";
        if (tableName === "visa") return "Visa";
        if (tableName === "task") return "Task";
        if (tableName === "interview") return "Interview";
        if (tableName === "agent") return "Partner";
        if (tableName === "Consultation") return "Consultation";

    };
    /*Function to convert the array to excel and set blob */
    const generateBlob = (data) => {
        if (!data || data.length === 0) return;
        const allKeys = new Set();
        data.forEach(row => {
            if (typeof row === 'object' && row !== null) {
                Object.keys(row).forEach(key => allKeys.add(key));
            }
        });
        const headers = Array.from(allKeys);
        const csvRows = [
            headers.join(','), // Header row
            ...data.map(row =>
                headers.map(header => `"${cleanData(row[header])}"`).join(','))
        ];
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        console.log(blob)
        setFileBlob(blob);
        setShowModal(true);
    }
    /*Function to download the file */
    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(fileBlob);
        link.download = `${getDownloadTitle()}_${new Date().toISOString().replace(/:/g, '-')}.csv`;
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
        const file = new File([fileBlob], `${getDownloadTitle()}_${new Date().toISOString().replace(/:/g, '-')}.csv`, { type: 'text/csv' });
        const data = {
            email: email,
            subject: `Exported ${getDownloadTitle()} Data`,
            description: `Please find the attached exported data for ${getDownloadTitle()}.`,
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
                setShowModal(false);
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
    /*Api Function to get the array from table */
    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            let res = await ExportExcelApi(tableName, portal === "study" ? "study permit" : applicantType, status, local, type);
            if (res.status === 1) {
                let data = res.data;
                generateBlob(data);
            } else {
                // Handle error response
                console.error("Error fetching data for export");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleExportClick = (e) => {
        if (tableName === "job" || tableName === "visa" || tableName === "task" || tableName === "interview" || tableName === "Consultation") {
            if (tableData) {
                generateBlob(tableData);
            } else {
                toast.error("Excel Data not found", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            }
        } else {
            handleDownload(e);
        }
    };

    return (
        <>
            <button onClick={handleExportClick}
                title={`Export ${getDownloadTitle()} Excel`}
                className={`btn `}>
                <TfiExport className={`font-size-4 text-gray mx-3`} /> Export Excel
            </button>
            {showModal && (
                <div className="modal fade show " style={{ display: 'block' }} tabIndex="-1" role="dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-dialog bg-white" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h5 className="modal-title">Export Options</h5>
                                <button type="button" className="close" onClick={(e) => {
                                    e.preventDefault();
                                    setShowModal(false);
                                }}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {!sendEmail ? (
                                    <p>Do you want to send this file via email?</p>
                                ) : (
                                    <div>
                                        <div className="form-group">
                                            <label>Email ID</label>
                                            <input required type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        {/* <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div> */}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                {!sendEmail ? (
                                    <>
                                        <button type="button" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); downloadFile(); setShowModal(false); }}>No, Just Download</button>
                                        <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); setSendEmail(true); }}>Yes, Send Email</button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); setSendEmail(false); }}>Back</button>
                                        <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleSendEmail(); }} disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Email & Download'
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default ExportExcelButton;
