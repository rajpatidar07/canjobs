import React from 'react';
import { ExportExcelApi } from '../../api/api';
import { TfiExport } from 'react-icons/tfi';
import { toast } from 'react-toastify';

const ExportExcelButton = ({ tableName, portal, applicantType, status, local, type, tableData }) => {
    // Helper function to strip HTML tags and handle newlines
    const cleanData = (str) => {
        // Remove HTML tags using a regex
        const strippedStr = str.replace(/<[^>]*>/g, '');
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

    };
    /*Function to convert the array to excel */
    let ExcelConvertFunction = (data) => {
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','), // Header row
            ...data.map(row =>
                headers.map(header => `"${cleanData(String(row[header]))}"`).join(','))
        ];
        const csvString = csvRows.join('\n');
        // Step 2: Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: 'text/csv' });
        // Step 3: Create a link and trigger the download as .csv
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${getDownloadTitle()}_${new Date().toISOString()}.csv`; // Using getDownloadTitle to set the correct title
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    /*Api Function to get the array from table */
    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            let res = await ExportExcelApi(tableName, portal === "study" ? "study permit" : applicantType, status, local, type);
            if (res.status === 1) {
                let data = res.data;
                ExcelConvertFunction(data)

            } else {
                // Handle error response
                console.error("Error fetching data for export");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <button onClick={(e) => {
            if (tableName === "job" || tableName === "visa" || tableName === "task" || tableName === "interview") {
                if (tableData) { ExcelConvertFunction(tableData) } else {
                    toast.error("Excel Data not found", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                }
            } else { handleDownload(e) }
        }}
            title={`Export ${getDownloadTitle()} Excel`}
            className={`btn ${applicantType ? "" :"action_btn"}  `}>
            <TfiExport className={`${applicantType?"mx-3 font-size-3":"font-size-4"}  text-gray`} />{applicantType ? "  Export Excel" : ""}
        </button>
    );
};

export default ExportExcelButton;
