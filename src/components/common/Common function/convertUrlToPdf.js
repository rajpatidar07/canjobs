import jsPDF from "jspdf";

export default function convertUrlToPDF(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable cross-origin resource sharing (CORS)
        img.src = imageUrl;

        img.onload = () => {
            try {
                const doc = new jsPDF();
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = doc.internal.pageSize.getHeight();

                let imgWidth, imgHeight;
                const imgAspectRatio = img.width / img.height;
                const pdfAspectRatio = pdfWidth / pdfHeight;

                if (imgAspectRatio > pdfAspectRatio) {
                    imgWidth = pdfWidth;
                    imgHeight = imgWidth / imgAspectRatio;
                } else {
                    imgHeight = pdfHeight;
                    imgWidth = imgHeight * imgAspectRatio;
                }

                const xPosition = (pdfWidth - imgWidth) / 2;
                const yPosition = (pdfHeight - imgHeight) / 2;

                doc.addImage(img, "JPEG", xPosition, yPosition, imgWidth, imgHeight);
                
                // Convert PDF to Blob
                const pdfBlob = doc.output("blob");

                // Convert PDF Blob to base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(pdfBlob);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = (error) => reject(error);
    });
}
