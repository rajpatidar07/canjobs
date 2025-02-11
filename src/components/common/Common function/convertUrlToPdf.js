import jsPDF from "jspdf";

export default function convertUrlToPDF(imageUrl) {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin resource sharing (CORS) for the image
    img.src = imageUrl;
    img.onload = () => {
        const doc = new jsPDF();
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        let imgWidth, imgHeight;
        const imgAspectRatio = img.width / img.height;
        const pdfAspectRatio = pdfWidth / pdfHeight;
        if (imgAspectRatio > pdfAspectRatio) {
            // Image is wider than the PDF page
            imgWidth = pdfWidth;
            imgHeight = imgWidth / imgAspectRatio;
        } else {
            // Image is taller than or equal to the PDF page
            imgHeight = pdfHeight;
            imgWidth = imgHeight * imgAspectRatio;
        }
        const xPosition = (pdfWidth - imgWidth) / 2;
        const yPosition = (pdfHeight - imgHeight) / 2;
        doc.addImage(img, "JPEG", xPosition, yPosition, imgWidth, imgHeight); // Set the image dimensions to fit the PDF page
        // Convert PDF to Blob
        const pdfBlob = doc.output("blob");
        // Convert PDF Blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            return base64String;

        };
        reader.readAsDataURL(pdfBlob);
    };
};