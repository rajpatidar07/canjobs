import React, { useEffect/*, useRef */ } from 'react';
import ViewSDKClient from './ViewSDKClient.js';

const AdobePDFViewer = ({ url, data, userId, commentsList }) => {
    const annotationId = !commentsList || commentsList.length === 0 ? "" : commentsList[0].id
    let annotationData = !commentsList || commentsList.length === 0 ? "" : JSON.parse(commentsList[0].doctaskjson)
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            const previewFilePromise = viewSDKClient.previewFile("pdf-div", {
                showAnnotationTools: false, showLeftHandPanel: true, showPageControls: true, enableAnnotationAPIs: true, includePDFAnnotations: true,
                showDownloadPDF: true, showPrintPDF: true,
            }, url, data, userId, annotationId);
            const eventOptions = {
                listenOn: [
                    "ANNOTATION_ADDED", "ANNOTATION_UPDATED", "ANNOTATION_DELETED"
                ],
            }
            // const AdminDetails = {
            //     "id": localStorage.getItem("admin_id"),
            //     "name": localStorage.getItem("admin").charAt(0).toUpperCase() + localStorage.getItem("admin").slice(1),
            //     "type": "Person"
            // }
            previewFilePromise
                .then((adobeViewer) => {

                    adobeViewer.getAnnotationManager()
                        .then(annotationManager => {

                            if (annotationData.length === 0) {
                                console.log("No Annotation data")
                            }
                            else {
                                annotationManager.addAnnotations(annotationData)
                                .then(() => console.log("Success"))
                                .catch(error => console.log(error));
                            }


                            annotationManager.getAnnotations()
                                .then(result => {
                                    viewSDKClient.annots = result;
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                            annotationManager.registerEventListener(
                                function (event) {
                                    // console.log(event.type, event.data, event)
                                    if (event.type === 'ANNOTATION_ADDED') {
                                        // Include AdminDetails for annotations 
                                        const newAnnotation = event.data;
                                        // newAnnotation.creator = AdminDetails;
                                        viewSDKClient.annots = [...viewSDKClient.annots, newAnnotation];
                                    }
                                    else if (event.type === 'ANNOTATION_UPDATED') {
                                        viewSDKClient.annots = [...(viewSDKClient.annots.filter(a => a.id !== event.data.id)), event.data]
                                    } else if (event.type === 'ANNOTATION_DELETED') {
                                        viewSDKClient.annots = viewSDKClient.annots.filter(a => a.id !== event.data.id);
                                    }
                                },
                                eventOptions,
                            );


                        })
                        .catch(e => {
                            console.log(e);
                        });
                })
                .catch(e => {
                    console.log(e);
                });

            viewSDKClient.registerSaveApiHandler();
            viewSDKClient.registerGetUserProfileApiHandler()
        });
// eslint-disable-next-line
    }, [annotationId, annotationData]);
    return (
        <div style={{ height: "100vh" }}>
            <div id="pdf-div" className="full-window-div" style={{ height: "100vh" }}></div>
        </div>
    );
}

export default AdobePDFViewer;

