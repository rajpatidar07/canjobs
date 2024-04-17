// import React, { useEffect } from 'react';
// // import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import ViewSDKClient from './ViewSDKClient.js';
// const AdobePDFViewer = ({url,data}) => {
// const [state/*, setState*/] = React.useState({isDataLoaded: true, menuLink: url
// , hasFile: url
// });
// // console.log(url)
// // useEffect(() => {
// // axios.get(`${process.env.REACT_APP_BASE_URL}/get_menu`)
// // .then(response => setState({isDataLoaded: true, hasFile: response.data.has_file, menuLink: response.data.menu_link}))
// // .catch(error => alert(error.message))
// // }, []);
// const loadPDF = () => {
// // const viewSDKClient = new ViewSDKClient();
// // viewSDKClient.ready().then(() => {
// // viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false,
// // showDownloadPDF: false, showPrintPDF: false}, state.menuLink,data);
// // });
// const viewSDKClient = new ViewSDKClient();
//     viewSDKClient.ready().then(() => {
//         /* Invoke file preview */
//         /* By default the embed mode will be Full Window */
//         const previewFilePromise = viewSDKClient.previewFile("pdf-div", { showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false,
//             showDownloadPDF: false, showPrintPDF: false}, state.menuLink,data);
//         previewFilePromise
//             .then((adobeViewer) => {
//                 adobeViewer.getAnnotationManager()
//                     .then(annotationManager => {
//                         annotationManager.getAnnotations()
//                             .then(result => {
//                                 console.log("GET all annotations", result);
//                             })
//                             .catch(e => {
//                                 console.log(e);
//                             });
//                     })
//                     .catch(e => {
//                         console.log(e);
//                     });
//             })
//             .catch(e => {
//                 console.log(e);
//             });
// //TODO: access the annotations inside the saveapi handler
//         viewSDKClient.registerSaveApiHandler();
//         // viewSDKClient.registerGetUserProfileApiHandler();
//     });
// }
// useEffect(() => {
//     loadPDF()
// }, []);

// return (
// <div style={{height:"100vh"}}>
// {
// state.isDataLoaded ?
// <div style={{height:"100vh"}}>
// {
// state.hasFile ?
// <>
// <div id="pdf-div" className="full-window-div" onDocumentLoad={loadPDF()} style={{height:"100vh"}}></div>
// </>
// :
// <div style={{height:"100vh"}}>
// <p className='text dashboard' id="no-file">Sorry, no file at this link</p>
// </div>
// }
// </div>
// :
// <div className='cp' >
// <CircularProgress  style={{color: '#ffc107'}} />
// </div>
// }
// </div>
// );
// }
// export default AdobePDFViewer;
import React, { useEffect, useRef } from 'react';
import ViewSDKClient from './ViewSDKClient.js';
import { GetAdobeToken } from '../../../api/api.js';

const AdobePDFViewer = ({ url, data }) => {

    useEffect(() => {
        let Token = async () => {
            try {
                let res = await GetAdobeToken("d9e8b7bcb61b42b6a387bfa9cf16a75b")
                console.log(res)
            } catch (err) { console.log(err) }
        }
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            const previewFilePromise = viewSDKClient.previewFile("pdf-div", {
                showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false, enableAnnotationAPIs: true, includePDFAnnotations: true,
                showDownloadPDF: false, showPrintPDF: false
            }, url, data);
            const eventOptions = {
                listenOn: [
                    "ANNOTATION_ADDED", "ANNOTATION_UPDATED", "ANNOTATION_DELETED"
                ]
            }
            const filter = {
                annotationIds: ["8a8ea969-d860-8dc3-5chb-29d9cbb1b84", "079d66a4-5ec2-4703-ae9d-30ccbb1aa84c", "eb46d1a9-e9c3-4e81-a6f4-ce5ba7a905e9", "40ac898a-5426-8f2a-57h8-d80b89ab9b2"]

            }

            previewFilePromise
                .then((adobeViewer) => {

                    adobeViewer.getAnnotationManager()
                        .then(annotationManager => {
                            annotationManager.getAnnotations(filter)
                                .then(result => {
                                    console.log("GET all annotations", result);
                                    viewSDKClient.annots = result;
                                    console.log('viewSDKClient.annots in init');
                                    console.log(viewSDKClient.annots);
                                })
                                .catch(e => {
                                    console.log(e);
                                });

                            annotationManager.registerEventListener(
                                function (event) {
                                    console.log(event.type, event.data)
                                    if (event.type === 'ANNOTATION_ADDED') {
                                        viewSDKClient.annots = [...viewSDKClient.annots, event.data];
                                    } else if (event.type === 'ANNOTATION_UPDATED') {
                                        viewSDKClient.annots = [...(viewSDKClient.annots.filter(a => a.id !== event.data.id)), event.data]
                                    } else if (event.type === 'ANNOTATION_DELETED') {
                                        viewSDKClient.annots = viewSDKClient.annots.filter(a => a.id !== event.data.id);
                                    }
                                },
                                eventOptions
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
            // viewSDKClient.registerGetUserProfileApiHandler();
        });
        Token()
    }, []);


    return (
        <div style={{ height: "100vh" }}>
            <div id="pdf-div" className="full-window-div" style={{ height: "100vh" }}></div>
        </div>
    );
}

export default AdobePDFViewer;
