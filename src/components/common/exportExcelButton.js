import React from 'react';
import { ExportExcelApi } from '../../api/api';
import { RiFileDownloadFill } from 'react-icons/ri';

const ExportExcelButton = ({ tableName, portal, applicantType, status, local, type }) => {
    // Helper function to strip HTML tags and handle newlines
    const cleanData = (str) => {
        // Remove HTML tags using a regex
        const strippedStr = str.replace(/<[^>]*>/g, '');
        // Replace newlines with a space
        return strippedStr.replace(/\n/g, ' ');
    };

    const getDownloadTitle = () => {
        if (portal === "study") return "Student";
        if (tableName === "employee") return "Candidate";
        if (tableName === "employer") return "Client";
        if (tableName === "admin") return "Admin";
        if (tableName === "view_job_posted") return "Jobs";
        if (tableName === "employee_visa") return "Visa";
    };

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            let res = await ExportExcelApi(tableName, portal === "study" ? "study permit" : applicantType, status, local, type);
            if (res.status === 1) {
                let data = res.data;
                // Step 1: Convert the array of objects to a CSV string
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
            } else {
                // Handle error response
                console.error("Error fetching data for export");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button onClick={(e) => handleDownload(e)}
            title={`Export ${getDownloadTitle()} Excel`}
            className="btn action_btn text-gray font-weight-bold font-size-8">
            <RiFileDownloadFill />
        </button>
    );
};

export default ExportExcelButton;
