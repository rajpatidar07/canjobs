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
        // Promise that resolves when AdobeDC SDK is ready
        this.readyPromise = new Promise((resolve) => {
            if (window.AdobeDC) {
                resolve();
            } else {
                document.addEventListener("adobe_dc_view_sdk.ready", () => {
                    resolve();
                });
            }
        });
        this.adobeDCView = undefined; // Initialize AdobeDC View object
    }

    // Method to check if AdobeDC SDK is ready
    ready() {
        return this.readyPromise;
    }

    // Method to preview a file
    previewFile(divId, viewerConfig, url, data) {
        // Log file information
        console.log(data.name, data);
        const fileExtension = data.name.split('.').pop().toLowerCase();
        console.log("File extension:", fileExtension);

        const config = {
            clientId: "d9b36f468d7a4e4e8b275f13728f1132",
        };

        if (divId) {
            config.divId = divId;
        }

        // Create AdobeDC View object
        this.adobeDCView = new window.AdobeDC.View(config);

        // Set viewer configuration
        viewerConfig = {
            ...viewerConfig,
            embedMode: window.AdobeDC.View.Enum.EmbedMode.INLINE,
            showAnnotationTools: true,
            showDownloadPDF: true,
            showPrintPDF: true,
            enableFormFilling: true,
            showLeftHandPanel: true,
            showSearchPDF: true,
            showDocumentInfo: true,
        };

        // Preview file using AdobeDC View object
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

        // Register save API handler with dynamic annotation message
        const annotationMessage = "This is a sample annotation message.";
        this.registerSaveApiHandler(annotationMessage);

        return previewFilePromise;
    }

    // Method to preview a file using a file promise
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

        // Register save API handler with dynamic annotation message
        const annotationMessage = "This is a sample annotation message.";
        this.registerSaveApiHandler(annotationMessage);
    }

    // Method to register a save API handler with dynamic annotation message
    registerSaveApiHandler(annotationMessage) {
        const saveApiHandler = (metaData, content, options) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const documentId = metaData.id;
                    const savedData = JSON.parse(localStorage.getItem(documentId)) || {};
                    savedData[metaData.id] = content;
                    console.log("data", savedData);
                    localStorage.setItem(`annotations${documentId}`, JSON.stringify(savedData));

                    // Set the dynamic annotation message
                    const response = {
                        code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                        data: {
                            metaData: Object.assign(metaData, {
                                updatedAt: new Date().getTime(),
                                message: annotationMessage // Set the annotation message dynamically
                            })
                        },
                    };
                    resolve(response);
                }, 2000);
            });
        };
        // Register save API handler with AdobeDC View object
        this.adobeDCView.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.SAVE_API,
            saveApiHandler,
            {}
        );
    }

    // Method to retrieve annotations from local storage
    retrieveAnnotations(documentId) {
        const savedData = JSON.parse(localStorage.getItem(`annotations${documentId}`)) || {};
        return savedData[documentId] || {};
    }

    // Method to register event handlers
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
