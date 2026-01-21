import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExcelToPdfConverter = async (excelUrl) => {
    if (!excelUrl) {
        alert("Please enter an Excel file URL first.");
        return null;
    }

    try {
        const response = await fetch(excelUrl);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const binaryStr = event.target.result;
                    const workbook = XLSX.read(binaryStr, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];

                    // Ensure full range of data is extracted
                    const range = XLSX.utils.decode_range(sheet["!ref"]);
                    const maxColumns = range.e.c + 1;

                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

                    if (jsonData.length === 0) {
                        alert("The Excel sheet is empty.");
                        resolve(null);
                        return;
                    }
                    // Ensure all rows have the same column count
                    const rows = jsonData.map(row =>
                        Array.from({ length: maxColumns }, (_, i) => row[i] || "")
                    );

                    const doc = new jsPDF("p", "mm", "a4");
                    doc.autoTable({
                        head: [jsonData[0]],
                        body: rows.slice(1),
                        startY: 20,
                        margin: { top: 10 },
                        styles: { fontSize: 8, cellPadding: 2 },
                        columnStyles: { 0: { halign: "center" } },
                        theme: "striped",
                    });
                    const pdfBase64 = doc.output("datauristring");
                    resolve(pdfBase64);  // Return Base64 from Promise

                } catch (error) {
                    console.error("Error processing Excel file:", error);
                    reject(error);
                }
            };

            reader.onerror = (error) => reject(error);
            reader.readAsBinaryString(blob);
        });

    } catch (error) {
        console.error("Error fetching Excel file:", error);
        alert("Failed to fetch Excel file. Please check the URL.");
        return null;
    }
};

export default ExcelToPdfConverter;
