import React, { useEffect, useState/*, useRef */ } from "react";
import ViewSDKClient from "./ViewSDKClient.js";
import CommentSection from "./commentSection.js";
const AdobePDFViewer = ({
  url,
  data,
  userId,
  commentsList,
  selectedMentionAdmin,
  DocUserType,
  adminList }) => {
  let [annotationDrawBox, setAnnotationDrawBox] = useState("")
  // const annotationId ="1a94b3cc-c5a0-8bda-8bh6-8a7b78aa996"
    // !commentsList || commentsList.length === 0 ? "" : commentsList[0].id;
  let annotationData =
    !commentsList || commentsList.length === 0
      ? ""
      : commentsList.map((item) => JSON.parse(item.doctaskjson))
  useEffect(() => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      const previewFilePromise = viewSDKClient.previewFile(
        "pdf-div",
        {
          showAnnotationTools: false,
          showLeftHandPanel: true,
          showPageControls: true,
          enableAnnotationAPIs: true,
          includePDFAnnotations: true,
          showDownloadPDF: true,
          showPrintPDF: true,
        },
        url,
        data,
        selectedMentionAdmin
      );
      const eventOptions = {
        listenOn: [
          "ANNOTATION_ADDED",
          "ANNOTATION_UPDATED",
          "ANNOTATION_DELETED",

        ],
      };
      // const AdminDetails = {
      //     "id": localStorage.getItem("admin_id"),
      //     "name": localStorage.getItem("admin").charAt(0).toUpperCase() + localStorage.getItem("admin").slice(1),
      //     "type": "Person"
      // }
      previewFilePromise
        .then((adobeViewer) => {
          adobeViewer
            .getAnnotationManager()
            .then((annotationManager) => {
              if (annotationData.length === 0) {
              } else {
                annotationManager
                  .addAnnotations(annotationData)
                  .then(() => console.log("Success"))
                  .catch((error) => console.log(error));
              }

              annotationManager
                .getAnnotations()
                .then((result) => {
                  viewSDKClient.annots = result;
                })
                .catch((e) => {
                  console.log(e);
                });
              annotationManager.registerEventListener(function (event) {
                if (event.type === "ANNOTATION_ADDED") {
                  // Include AdminDetails for annotations
                  const newAnnotation = event.data;
                  // newAnnotation.creator = AdminDetails;
                  viewSDKClient.annots = [
                    ...viewSDKClient.annots,
                    newAnnotation,
                  ];
                  setAnnotationDrawBox(annotationData.find((item) => item.id === event.data.id) ? "" : event.data)
                } else if (event.type === "ANNOTATION_UPDATED") {
                  viewSDKClient.annots = [
                    ...viewSDKClient.annots.filter(
                      (a) => a.id !== event.data.id
                    ),
                    event.data,
                  ];
                } else if (event.type === "ANNOTATION_DELETED") {
                  viewSDKClient.annots = viewSDKClient.annots.filter(
                    (a) => a.id !== event.data.id
                  );
                }
              }, eventOptions);
               // Add the new functionality here
               if (annotationDrawBox) {
                console.log("IN the function =>", annotationDrawBox)

                annotationManager.selectAnnotation(annotationDrawBox)
                  .then(() => console.log("Annotation selected successfully"))
                  .catch(error => console.log(error));
              }

              // Highlight and focus on a specific annotation
              const highlightAndFocusAnnotation = (annotationId) => {
                console.log("while calling =>",annotationId)
                annotationManager
                  .getAnnotations()
                  .then((annotations) => {
                    const annotation = annotations.find((a) => a.id === annotationDrawBox);
                    console.log(annotations.find((a) => a.id),annotationId)
                    if (annotation) {
                      // Highlight the annotation
                      annotation.color = [1, 0, 0]; // Change color to red (RGB)

                      annotationManager
                        .updateAnnotation(annotation)
                        .then(() => {
                          // Ensure APIs are available before calling scrollTo
                          adobeViewer.getAPIs().then((apis) => {
                            if (apis && apis.pdfView) {
                              const { location } = annotation;
                              apis.pdfView.scrollTo(location.pageNumber, {
                                left: location.left,
                                top: location.top,
                              });
                            } else {
                              console.log("PDF view APIs are not available");
                            }
                          }).catch((error) => {
                            console.log("Error getting APIs:", error);
                          });
                        })
                        .catch((error) => console.log("Error updating annotation:", error));
                    }
                  })
                  .catch((error) => console.log("Error getting annotations:", error));
              };

              // Call the function with the desired annotation ID
              highlightAndFocusAnnotation(annotationDrawBox);
            })
            .catch((e) => {
              console.log("Error getting Annotation Manager:", e);
            });
        })
        .catch((e) => {
          console.log("Error in previewFilePromise:", e);
        });
      viewSDKClient.registerSaveApiHandler(userId, annotationDrawBox, DocUserType);
      viewSDKClient.registerGetUserProfileApiHandler();
    });
    // eslint-disable-next-line
  }, [annotationDrawBox, url]);
  return (
    <div style={{ height: "calc(100vh - 130px)" }} className="row">
      <div
        id="pdf-div"
        className={`${localStorage.getItem("userType") === "admin" || localStorage.getItem("userType") === "agent"
          ? "col-md-8 col-lg-8 col-sm-9"
          : "col-md-12 col-lg-12 col-sm-12"
          } full-window-div`}
        style={{ maxHeight: "calc(100vh - 130px)" }}
      ></div>
      <CommentSection
        docData={data}
        allAdmin={adminList}
        userId={userId}
        commentsList={commentsList}
        annotationDrawBox={annotationDrawBox}
        DocUserType={DocUserType}
        setAnnotationDrawBox={setAnnotationDrawBox}
      />
    </div>
  );
};

export default AdobePDFViewer;
