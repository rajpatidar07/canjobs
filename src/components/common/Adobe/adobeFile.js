// import React, { useEffect } from 'react';
// // import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import ViewSDKClient from './ViewSDKClient.js';
// import annotationLits from './annotationLits.js';
// const AdobePDFViewer = ({ url, data }) => {
//     const [state/*, setState*/] = React.useState({
//         isDataLoaded: true, menuLink: url
//         , hasFile: url
//     });
//     // console.log(url)
//     // useEffect(() => {
//     // axios.get(`${process.env.REACT_APP_BASE_URL}/get_menu`)
//     // .then(response => setState({isDataLoaded: true, hasFile: response.data.has_file, menuLink: response.data.menu_link}))
//     // .catch(error => alert(error.message))
//     // }, []);
//     const loadPDF = () => {
//         // const viewSDKClient = new ViewSDKClient();
//         // viewSDKClient.ready().then(() => {
//         // viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false,
//         // showDownloadPDF: false, showPrintPDF: false}, state.menuLink,data);
//         // });
//         const viewSDKClient = new ViewSDKClient();
//         viewSDKClient.ready().then(() => {
//             /* Invoke file preview */
//             /* By default the embed mode will be Full Window */
//             const previewFilePromise = viewSDKClient.previewFile("pdf-div", {
//                 showAnnotationTools: true, showLeftHandPanel: false, showPageControls: false, enableAnnotationAPIs: true, includePDFAnnotations: false,
//                 enableFormFilling: true, showDownloadPDF: false, showPrintPDF: false
//             }, state.menuLink, data);
//             previewFilePromise
//                 .then((adobeViewer) => {
//                     adobeViewer.getAnnotationManager()
//                         .then(annotationManager => {
//                             annotationManager.getAnnotations(F)
//                                 .then(result => {
//                                     console.log("GET all annotations", result);
//                                 })
//                                 .catch(e => {
//                                     console.log(e);
//                                 });
//                         })
//                         .catch(e => {
//                             console.log(e);
//                         });
//                 })
//                 .catch(e => {
//                     console.log(e);
//                 });
//             //TODO: access the annotations inside the saveapi handler
//             viewSDKClient.registerSaveApiHandler();
//             // viewSDKClient.registerGetUserProfileApiHandler();
//         });
//     }
//     useEffect(() => {
//         loadPDF()
//     }, []);

//     return (
//         <div style={{ height: "100vh" }}>
//             {
//                 state.isDataLoaded ?
//                     <div style={{ height: "100vh" }}>
//                         {
//                             state.hasFile ?
//                                 <>
//                                     <div id="pdf-div" className="full-window-div" onDocumentLoad={loadPDF()} style={{ height: "100vh" }}></div>
//                                 </>
//                                 :
//                                 <div style={{ height: "100vh" }}>
//                                     <p className='text dashboard' id="no-file">Sorry, no file at this link</p>
//                                 </div>
//                         }
//                     </div>
//                     :
//                     <div className='cp' >
//                         <CircularProgress style={{ color: '#ffc107' }} />
//                     </div>
//             }
//         </div>
//     );
// }
// export default AdobePDFViewer;
import React, { useState, useEffect/*, useRef */ } from 'react';
import ViewSDKClient from './ViewSDKClient.js';
import { GetCommentsAndAssign } from '../../../api/api.js';

const AdobePDFViewer = ({ url, data, userId }) => {
    // const [commentsList, setCommentsList] = useState([])
    const [annotationId, setAnnotationId] = useState()
    
    // Generate a list of comments from the state for image annotation
    const getCommentsList = async () => {
        if (data.id) {
            try {
                let res = await GetCommentsAndAssign(
                    data.id,//docId,
                    "",
                    "",
                    "document"
                );
                if (res.data.status === (1 || "1")) {
                    console.log(JSON.parse(res.data.data.data[0].doctaskjson)[0],"ooo",res.data.data.data[0])
                    // setCommentsList(JSON.parse(res.data.data.data[0].doctaskjson));
                    setAnnotationId(res.data.data.data[0].id)
                } else if (res.data.message === "Task data not found") {
                    // setCommentsList([]);
                }
            } catch (err) {
                console.log(err);
                // setCommentsList([]);
            }
        } else {
            // setCommentsList([]);
        }
    };
console.log(annotationId)
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            const previewFilePromise = viewSDKClient.previewFile("pdf-div", {
                showAnnotationTools: false, showLeftHandPanel: true, showPageControls: true, enableAnnotationAPIs: true, includePDFAnnotations: true,
                showDownloadPDF: true, showPrintPDF: true,
            }, url, data, userId,annotationId);
            const eventOptions = { 
                listenOn: [
                    "ANNOTATION_ADDED"//, "ANNOTATION_UPDATED", "ANNOTATION_DELETED"
                ],
            }
            const AdminDetails= {
                "id": localStorage.getItem("admin_id"),
                "name": localStorage.getItem("admin"),
                "type": localStorage.getItem("admin_type")
            }
            const list_of_annotations = [{
                "@context": [
                    "https://www.w3.org/ns/anno.jsonld",
                    "https://comments.acrobat.com/ns/anno.jsonld"
                ],
                "id": "03a0ac01-a90d-89af-48h7-5b898bbf8b0",
                "type": "Annotation",
                "motivation": "commenting",
                "bodyValue": "ggggggggggg",
                "target": {
                    "source": "01PMN6UKRPYDNIKLEM4ZH3PRQNQAJY62LM",
                    "selector": {
                        "node": {
                            "index": 0
                        },
                        "opacity": 0.4,
                        "subtype": "note",
                        "boundingBox": [
                            577.510237777789,
                            823.510237777789,
                            596.0399780273438,
                            842.0399780273438
                        ],
                        "strokeColor": "#F8D147",
                        "type": "AdobeAnnoSelector"
                    }
                },
                "creator": {
                    "id": "Guest",
                    "name": "Guest",
                    "type": "Person"
                },
                "created": "2024-04-19T06:34:21Z",
                "modified": "2024-04-19T06:34:21Z"
            }, {
                "@context": [
                    "https://www.w3.org/ns/anno.jsonld",
                    "https://comments.acrobat.com/ns/anno.jsonld"
                ],
                "id": "a08d8d62-1cc8-8c47-1bh8-2beafaaea88",
                "type": "Annotation",
                "motivation": "commenting",
                "bodyValue": "hello\n😀\n",
                "target": {
                    "source": "01PMN6UKRPYDNIKLEM4ZH3PRQNQAJY62LM",
                    "selector": {
                        "node": {
                            "index": 0
                        },
                        "opacity": 0.4,
                        "subtype": "note",
                        "boundingBox": [
                            577.510237777789,
                            823.510237777789,
                            596.0399780273438,
                            842.0399780273438
                        ],
                        "strokeColor": "#F8D147",
                        "type": "AdobeAnnoSelector"
                    }
                },
                "creator": {
                    "id": "012",
                    "name": "Aashi",
                    "type": "Person"
                },
                "created": "2024-04-19T07:03:57Z",
                "modified": "2024-04-19T07:03:57Z"
            }
                ,
            {
                "@context": [
                    "https://www.w3.org/ns/anno.jsonld",
                    "https://comments.acrobat.com/ns/anno.jsonld"
                ],
                "id": "e18fb584-af8f-8ef7-dch8-9b79e8a3b83",
                "type": "Annotation",
                "motivation": "commenting",
                "bodyValue": "Hello guys.........",
                "target": {
                    "source": "01PMN6UKRPYDNIKLEM4ZH3PRQNQAJY62LM",
                    "selector": {
                        "node": {
                            "index": 0
                        },
                        "opacity": 0.4,
                        "subtype": "note",
                        "boundingBox": [
                            74.11896099821891,
                            740.1264066547927,
                            89.56041120618119,
                            758.6561469043475
                        ],
                        "strokeColor": "#F8D147",
                        "type": "AdobeAnnoSelector"
                    }
                },
                "creator": {
                    "id": "Guest",
                    "name": "Guest",
                    "type": "Person"
                },
                "created": "2024-04-19T10:55:08Z",
                "modified": "2024-04-19T10:55:08Z"
            },
            {
                "@context": [
                    "https://www.w3.org/ns/anno.jsonld",
                    "https://comments.acrobat.com/ns/anno.jsonld"
                ],
                "id": "d787bc5a-91b1-882d-cehd-aaa99999a9d",
                "type": "Annotation",
                "motivation": "replying",
                "bodyValue": "fffffffff",
                "target": {
                    "source": "03a0ac01-a90d-89af-48h7-5b898bbf8b0"
                },
                "creator": {
                    "id": "Guest",
                    "name": "Guest",
                    "type": "Person"
                },
                "created": "2024-04-19T10:55:36Z",
                "modified": "2024-04-19T10:55:36Z"
            },
            {
                "@context": [
                    "https://www.w3.org/ns/anno.jsonld",
                    "https://comments.acrobat.com/ns/anno.jsonld"
                ],
                "id": "78b5ac0d-2768-8c77-28h1-9829bbb2aac",
                "type": "Annotation",
                "motivation": "replying",
                "bodyValue": "hii",
                "target": {
                    "source": "e18fb584-af8f-8ef7-dch8-9b79e8a3b83"
                },
                "creator": {
                    "id": "Guest",
                    "name": "Guest",
                    "type": "Person"
                },
                "created": "2024-04-19T10:55:53Z",
                "modified": "2024-04-19T10:55:53Z"
            }

            ];
            previewFilePromise
                .then((adobeViewer) => {

                    adobeViewer.getAnnotationManager()
                        .then(annotationManager => {

                            annotationManager.addAnnotations(list_of_annotations)
                                .then(() => console.log("Success"))
                                .catch(error => console.log(error));


                            annotationManager.getAnnotations()
                                .then(result => {
                                    viewSDKClient.annots = result;
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                                annotationManager.registerEventListener(
                                    function (event) {
                                        console.log(event.type, event.data,event)
                                        if (event.type === 'ANNOTATION_ADDED') {
                                            // Include AdminDetails for new annotations only
                                            const newAnnotation = event.data;
                                            const isMatch = list_of_annotations.some(anno => anno.id === newAnnotation.id);
                                            if (!isMatch) {
                                                newAnnotation.creator = AdminDetails;
                                                viewSDKClient.annots = [...viewSDKClient.annots, newAnnotation];
                                                viewSDKClient.newannots = [...viewSDKClient.newannots, newAnnotation];
                                            }
                                        } 
                                        // else if (event.type === 'ANNOTATION_UPDATED') {
                                        //     viewSDKClient.annots = [...(viewSDKClient.annots.filter(a => a.id !== event.data.id)), event.data]
                                        // } else if (event.type === 'ANNOTATION_DELETED') {
                                        //     viewSDKClient.annots = viewSDKClient.annots.filter(a => a.id !== event.data.id);
                                        // }
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
        });
        getCommentsList()
    }, [annotationId]);


    return (
        <div style={{ height: "100vh" }}>
            <div id="pdf-div" className="full-window-div" style={{ height: "100vh" }}></div>
        </div>
    );
}

export default AdobePDFViewer;

