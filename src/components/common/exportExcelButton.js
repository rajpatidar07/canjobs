import React, { useState } from 'react';
import { ExportExcelApi } from '../../api/api';
import { TfiExport } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import SendExportCSVFIle from '../email/SendExportCSVFIle';

const ExportExcelButton = ({ tableName, portal, applicantType, status, local, type, tableData }) => {
    const [showModal, setShowModal] = useState(false);
    // const [name, setName] = useState('');
    const [fileBlob, setFileBlob] = useState(null);


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
        if (tableName === "employer") return "Employer";
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
        setFileBlob(blob);
        setShowModal(true);
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
            {showModal === true ? (
                <SendExportCSVFIle
                    fileBlob={fileBlob}
                    getDownloadTitle={getDownloadTitle}
                    show={showModal}
                    close={() => { setShowModal(false) }}
                />
            ) : null}
        </>
    );
};

export default ExportExcelButton;
