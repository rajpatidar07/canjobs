import { GetDocConvertToken } from "../../../api/api";

export default async function convertPPTtoPDF(pptUrl) {
    try {
        // Step 1: Fetch the PPT File
        const response = await fetch(pptUrl);
        const pptBlob = await response.blob();

        // Step 2: Convert PPT to PDF using a third-party API (Example: CloudConvert)
        const formData = new FormData();
        formData.append("file", pptBlob, "file.pptx");
        // Get Auth Token
        let res = await GetDocConvertToken();
        const accessToken = res?.data?.data;
        if (!accessToken) throw new Error("Failed to retrieve access token");

        const cloudConvertResponse = await fetch("https://api.cloudconvert.com/v2/convert", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        const pdfBlob = await cloudConvertResponse.blob();

        // Step 3: Convert PDF to Base64
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
            console.log(reader.result.split(",")[1]); // Extract base64
        };
    } catch (error) {
        console.error("Error converting PPT to PDF:", error);
    }
};
