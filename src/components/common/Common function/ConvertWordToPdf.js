import { GetDocConvertToken } from "../../../api/api";

export default async function convertWordToPDF(data) {
    try {
        let response = await GetDocConvertToken();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${response.data.data}`);
        myHeaders.append("Content-type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(
            `https://graph.microsoft.com/v1.0${data.parentReference.path}/${data.name}:/content?format=pdf`,
            requestOptions
        )
            .then(function (resp) {
                return resp.blob();
            })
            .then(function (blob) {
                return window.URL.createObjectURL(blob);
            })
            .catch((error) => console.error(error));
    } catch (error) {
        console.error("Error downloading or parsing the file:", error);
    }

    return; // Return the base64 PDF data
};