import React from 'react';
import { TbTableExport } from "react-icons/tb";
import { ExportExcelApi } from '../../api/api';
const ExportExcelButton = ({ type }) => {
    // Helper function to strip HTML tags and handle newlines
    const cleanData = (str) => {
        // Remove HTML tags using a regex
        const strippedStr = str.replace(/<[^>]*>/g, '');

        // Replace newlines with a format that works in Excel (quotation marks around values)
        return strippedStr.replace(/\n/g, ' ');
    };
    const handleDownload = async () => {
        try {
            let res = await ExportExcelApi(type)
            if (res.status === 1) {
                let data = res.data
                // Step 1: Convert the array of objects to a CSV string
                const headers = Object.keys(data[0]);

                const csvRows = [
                    headers.join(','), // Header row
                    ...data.map(row =>
                        headers.map(header => `"${cleanData(String(row[header]))}"`).join(',') // Clean each cell
                    )
                ];

                const csvString = csvRows.join('\n');

                // Step 2: Create a Blob from the CSV string
                const blob = new Blob([csvString], { type: 'application/vnd.ms-excel' });

                // Step 3: Create a link and trigger the download as .xls
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${type === "employee" ? `Applicant ${new Date()}` : `Client ${new Date()}`}.xls`; // Set the file extension to .xls
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {

            }

        } catch (err) {
            console.log(err)
        }
    };


    return (
        <button onClick={handleDownload}
            title={`Export ${type} Excel`}
            className="btn btn-outline-info action_btn text-gray">
            <TbTableExport />
        </button>
    );
};

export default ExportExcelButton;
