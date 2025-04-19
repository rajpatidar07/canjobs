// import { GetPdfBaseOfAnyFile } from "../../../api/api"
export default async function ConvertAnyFileToPdf(data) {
    try {
        // let sendData = {
        //     "fileUrl": data["@microsoft.graph.downloadUrl"],
        //     "mimeType": data.file.mimeType
        // }
        // let response = await GetPdfBaseOfAnyFile(sendData);
        let bas64OfPdfUrl;
        // console.log(response.data.file_url)
        try {
            const res = await fetch("https://api.canpathwaysjobs.com/uploads/mail_document/converted_680377c96689e.pdf");
            const blob = await res.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                bas64OfPdfUrl = base64data
                console.log('Base64 String:', base64data);
            };
        } catch (error) {
            console.error('Error converting PDF to Base64:', error);
        }
        return <div>{bas64OfPdfUrl}</div>
    } catch (error) {
        console.error("Error converting Word to PDF:", error);
        return <div>No Data Found</div>
    }
}
