import { GetPdfBaseOfAnyFile } from "../../../api/api";

// import { GetPdfBaseOfAnyFile } from "../../../api/api"
export default async function ConvertAnyFileToPdf(data) {
    try {
        let sendData = {
            "fileUrl": data["@microsoft.graph.downloadUrl"],
            "mimeType": data.file.mimeType
        }
        let response = await GetPdfBaseOfAnyFile(sendData);
        // let bas64OfPdfUrl;
        // try {
        //     const res = await fetch(response?.data?.file_url);
        //     const blob = await res.blob();
        //     const reader = new FileReader();
        //     reader.readAsDataURL(blob);
        //     reader.onloadend = () => {
        //         const base64data = reader.result;
        //         bas64OfPdfUrl = base64data
        //         console.log('Base64 String:', base64data);
        //     };
        // } catch (error) {
        //     console.error('Error converting PDF to Base64:', error);
        // }
        return response?.data?.base64;
    } catch (error) {
        console.error("Error converting Word to PDF:", error);
        return ""
    }
}
