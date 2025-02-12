import { GetDocConvertToken } from "../../../api/api";

export default async function convertWordToPDF(data) {
    try {
        // Get Auth Token
        let response = await GetDocConvertToken();
        const accessToken = response?.data?.data;
        if (!accessToken) throw new Error("Failed to retrieve access token");

        // Set Headers
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        // Make Fetch Request
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };

        const fetchResponse = await fetch(
            `https://graph.microsoft.com/v1.0${data.parentReference.path}/${data.name}:/content?format=pdf`,
            requestOptions
        );

        if (!fetchResponse.ok) {
            throw new Error(`Failed to convert file: ${fetchResponse.statusText}`);
        }

        // Convert Response to Blob
        const pdfBlob = await fetchResponse.blob();

        // Generate Downloadable URL
        const pdfUrl = window.URL.createObjectURL(pdfBlob);
        return pdfUrl;
    } catch (error) {
        console.error("Error converting Word to PDF:", error);
        throw error; // Rethrow to allow handling by the caller
    }
}
