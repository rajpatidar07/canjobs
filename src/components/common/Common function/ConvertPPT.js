import { GetDocConvertToken } from "../../../api/api";

const ConvertPPT = async (data) => {
    // Get Auth Token
    let response = await GetDocConvertToken();
    const accessToken = response?.data?.data;
    if (!accessToken) throw new Error("Failed to retrieve access token");
    const convertUrl = `https://graph.microsoft.com/v1.0/sites/${data.parentReference.siteId}/drives/${data.parentReference.driveId}/items/${data.id}/content?format=pdf`;

    try {
        const response = await fetch(convertUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        // console.log(response)
        if (!response.ok) {
            throw new Error(`Conversion failed: ${response.statusText}`);
        }   

        // Convert the response to a blob
        const pdfBlob = await response.blob();

        // Create a URL from the blob to use in the frontend
        const pdfUrl = URL.createObjectURL(pdfBlob);
        // console.log(pdfUrl, "pdfUrl")
        return pdfUrl;

    } catch (error) {
        console.error("Error converting PPT to PDF:", error);
        return "";
    }
};

export default ConvertPPT;
