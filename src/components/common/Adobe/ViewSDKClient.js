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
    previewFile(divId, viewerConfig, url) {
        const config = {
            clientId: "d9b36f468d7a4e4e8b275f13728f1132",
        };

        if (divId) {
            config.divId = divId;
        }
        this.adobeDCView = new window.AdobeDC.View(config);
        // Add annotation UI configuration to the viewerConfig
        viewerConfig = {
            ...viewerConfig,
            annotationUIConfig: {
                enableAnnotationAPIs: true, // Enable annotation APIs
                enableAnnotationPanel: true, // Show annotation panel
            },
        }
        const previewFilePromise = this.adobeDCView.previewFile({
            content: {
                location: {
                    url: url,
                },
            },
            metaData: {
                fileName: "Menu.pdf",
                id: "6d07d124-ac85-43b3-a867-36930f502ac6",
            }
        }, viewerConfig);
        return previewFilePromise;
    }
    previewFileUsingFilePromise(divId, filePromise, fileName) {
        this.adobeDCView = new window.AdobeDC.View({
            clientId: "d9b36f468d7a4e4e8b275f13728f1132",
            divId,
        });
        this.adobeDCView.previewFile({
            content: {
                promise: filePromise,
            },
            metaData: {
                fileName: fileName
            }
        }, {});
    }
    registerSaveApiHandler() {
        const saveApiHandler = (metaData, content, options) => {
            console.log(metaData, content, options);
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