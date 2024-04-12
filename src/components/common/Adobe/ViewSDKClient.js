// class ViewSDKClient {
//     constructor() {
//         this.readyPromise = new Promise((resolve) => {
//             if (window.AdobeDC) {
//                 resolve();
//             } else {
//                 document.addEventListener("adobe_dc_view_sdk.ready", () => {
//                     resolve();
//                 });
//             }
//         });
//         this.adobeDCView = undefined;
//     }

//     ready() {
//         return this.readyPromise;
//     }

//     previewFile(divId, viewerConfig, url, data) {
//         console.log(data.name, data);
//         const fileExtension = data.name.split('.').pop().toLowerCase();
//         console.log("File extension:", fileExtension);

//         const config = {
//             clientId: "d9b36f468d7a4e4e8b275f13728f1132",
//         };

//         if (divId) {
//             config.divId = divId;
//         }

//         this.adobeDCView = new window.AdobeDC.View(config);

//         // Set viewer configuration with all options enabled for all file types
//         viewerConfig = {
//             ...viewerConfig,
//             embedMode: window.AdobeDC.View.Enum.EmbedMode.INLINE, // Display inline
//             showAnnotationTools: true, // Show annotation tools
//             showDownloadPDF: true, // Show download PDF option
//             showPrintPDF: true, // Show print PDF option
//             enableFormFilling: true, // Enable form filling
//             showLeftHandPanel: true, // Show left-hand panel
//             showSearchPDF: true, // Show search PDF option
//             showDocumentInfo: true, // Show document information
//         };

//         const previewFilePromise = this.adobeDCView.previewFile({
//             content: {
//                 location: {
//                     url: url,
//                     fileExtension: fileExtension,
//                     fileType: data.mimeType
//                 },
//             },
//             metaData: {
//                 fileName: data.name,
//                 id: data.id,
//             }
//         }, viewerConfig);

//         return previewFilePromise;
//     }

//     previewFileUsingFilePromise(divId, filePromise, data) {
//         this.adobeDCView = new window.AdobeDC.View({
//             clientId: "d9b36f468d7a4e4e8b275f13728f1132",
//             divId,
//         });

//         this.adobeDCView.previewFile({
//             content: {
//                 promise: filePromise,
//             },
//             metaData: {
//                 fileName: data.name
//             }
//         }, {});
//     }

//     registerSaveApiHandler() {
//         const saveApiHandler = (metaData, content, options) => {
//             console.log(metaData, content, options);
//             return new Promise(resolve => {
//                 setTimeout(() => {
//                     const response = {
//                         code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
//                         data: {
//                             metaData: Object.assign(metaData, { updatedAt: new Date().getTime() })
//                         },
//                     };
//                     resolve(response);
//                 }, 2000);
//             });
//         };
//         this.adobeDCView.registerCallback(
//             window.AdobeDC.View.Enum.CallbackType.SAVE_API,
//             saveApiHandler,
//             {}
//         );
//     }

//     registerEventsHandler() {
//         this.adobeDCView.registerCallback(
//             window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
//             event => {
//                 console.log(event);
//             },
//             {
//                 enablePDFAnalytics: true,
//             }
//         );
//     }
// }

// export default ViewSDKClient;
class ViewSDKClient {
    constructor() {
        this.readyPromise = new Promise((resolve) => {
            if (window.AdobeDC) {
                resolve();
            } else {
                document.addEventListener("adobe_dc_view_sdk.ready", () => {
                    resolve();
                });
            }
        });
        this.adobeDCView = undefined;
    }

    ready() {
        return this.readyPromise;
    }

    previewFile(divId, viewerConfig, url, data) {
        console.log(data.name, data);
        const fileExtension = data.name.split('.').pop().toLowerCase();
        console.log("File extension:", fileExtension);

        const config = {
            clientId: "d9b36f468d7a4e4e8b275f13728f1132",
        };

        if (divId) {
            config.divId = divId;
        }

        this.adobeDCView = new window.AdobeDC.View(config);

        // Set viewer configuration with all options enabled for all file types
        viewerConfig = {
            ...viewerConfig,
            embedMode: window.AdobeDC.View.Enum.EmbedMode.INLINE, // Display inline
            showAnnotationTools: true, // Show annotation tools
            showDownloadPDF: true, // Show download PDF option
            showPrintPDF: true, // Show print PDF option
            enableFormFilling: true, // Enable form filling
            showLeftHandPanel: true, // Show left-hand panel
            showSearchPDF: true, // Show search PDF option
            showDocumentInfo: true, // Show document information
        };

        const previewFilePromise = this.adobeDCView.previewFile({
            content: {
                location: {
                    url: url,
                    fileExtension: fileExtension,
                    fileType: data.mimeType
                },
            },
            metaData: {
                fileName: data.name,
                id: data.id,
            }
        }, viewerConfig);

        return previewFilePromise;
    }

    previewFileUsingFilePromise(divId, filePromise, data) {
        this.adobeDCView = new window.AdobeDC.View({
            clientId: "d9b36f468d7a4e4e8b275f13728f1132",
            divId,
        });

        this.adobeDCView.previewFile({
            content: {
                promise: filePromise,
            },
            metaData: {
                fileName: data.name
            }
        }, {});
    }

    saveAnnotations(annotationData) {
        if (!this.adobeDCView) {
            console.error("Adobe DC View is not initialized.");
            return;
        }
console.log(annotationData)
        // // Make a POST request to a server endpoint with the annotation data
        // fetch("https://example.com/save-annotations", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(annotationData),
        // })
        // .then(response => {
        //     if (response.ok) {
        //         console.log("Annotations saved successfully.");
        //     } else {
        //         console.error("Failed to save annotations.");
        //     }
        // })
        // .catch(error => {
        //     console.error("Error saving annotations:", error);
        // });
    }

    registerSaveApiHandler() {
        const saveApiHandler = (metaData, content, options) => {
            // Call saveAnnotations with metaData containing annotation data
            this.saveAnnotations(metaData);
            return new Promise(resolve => {
                setTimeout(() => {
                    const response = {
                        code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                        data: {
                            metaData: Object.assign(metaData, { updatedAt: new Date().getTime() })
                        },
                    };
                    resolve(response);
                }, 2000);
            });
        };
        this.adobeDCView.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.SAVE_API,
            saveApiHandler,
            {}
        );
    }

    registerEventsHandler() {
        this.adobeDCView.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            event => {
                console.log(event);
            },
            {
                enablePDFAnalytics: true,
            }
        );
    }
}

export default ViewSDKClient;
