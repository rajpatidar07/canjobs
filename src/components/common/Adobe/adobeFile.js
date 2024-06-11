import React, { useEffect, useState /*, useRef */ } from "react";
import ViewSDKClient from "./ViewSDKClient.js";
import CommentSection from "./commentSection.js";
const AdobePDFViewer = ({
  url,
  data,
  userId,
  commentsList,
  selectedMentionAdmin,
  DocUserType,
  adminList,
  setCommentsList,
  partnerList
}) => {
  let [annotationDrawBox, setAnnotationDrawBox] = useState("");
  let [annotationId, setAnnotationId] = useState("");
  let [annotationData, setAnnotationData] = useState(
    commentsList.map((item) => JSON.parse(item.doctaskjson)) || ""
  );
  const [annotationManager, setAnnotationManager] = useState(null);
  const [adobeViewer, setAdobeViewer] = useState(null);
  // const annotationId ="1a94b3cc-c5a0-8bda-8bh6-8a7b78aa996"
  // !commentsList || commentsList.length === 0 ? "" : commentsList[0].id;

  /*REnder document method */
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
          includePDFAnnotations: false,
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
          setAdobeViewer(adobeViewer);
          adobeViewer
            .getAnnotationManager()
            .then((annotationManager) => {
              setAnnotationManager(annotationManager);
              if (annotationData.length === 0) {
              } else {
                // console.log(annotationManager)
                annotationManager
                  .addAnnotations(annotationData)
                //   .then(() => 
                //     console.log("Success")
                // )
                //   .catch((error) => console.log(error));
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
                  setAnnotationDrawBox(
                    annotationData.find((item) => item.id === event.data.id)
                      ? ""
                      : event.data
                  );
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

            })
            .catch((e) => {
              console.log("Error getting Annotation Manager:", e);
            });

        })
        .catch((e) => {
          console.log("Error in previewFilePromise:", e);
        });
      // viewSDKClient.registerSaveApiHandler(userId, annotationId, DocUserType);
      viewSDKClient.registerGetUserProfileApiHandler();
    });

    // eslint-disable-next-line
  }, [url]);
  /*Render method to Highlight the annotation from clicking it */
  useEffect(() => {
    if (annotationId && annotationManager && adobeViewer) {
      annotationManager
        .getAnnotations()
        .then((annotations) => {
          const annotation = annotations.find((a) => a.id === annotationId);
          if (annotation) {
            annotationManager
              .selectAnnotation(annotationId)
              .then(() => {
                adobeViewer
                  .getAPIs()
                  .then((apis) => {
                    if (apis && apis.pdfView) {
                      const { location } = annotation;
                      apis.pdfView.scrollTo(location.pageNumber, {
                        left: location.left,
                        top: location.top,
                      });
                    }
                  })
                  .catch((error) => console.log("Error getting APIs:", error));
              })
              .catch((error) =>
                console.log("Error selecting annotation:", error)
              );
          }
        })
        .catch((error) => console.log("Error getting annotations:", error));
    }
  }, [annotationId, annotationManager, adobeViewer]);

  return (
    <div style={{ height: "calc(100vh - 130px)" }} className="row m-0">
      <div
        id="pdf-div"
        className={`${localStorage.getItem("userType") === "admin" ||
          localStorage.getItem("userType") === "agent"
          ? "col-md-8 col-lg-8 col-sm-9"
          : "col-md-12 col-lg-12 col-sm-12"
          } full-window-div`}
        style={{ maxHeight: "calc(100vh - 130px)" }}
      ></div>
      {
        (localStorage.getItem("userType") === "admin" ||
          localStorage.getItem("userType") === "agent")
        && <CommentSection
          docData={data}
          allAdmin={adminList}
          partnerList={partnerList}
          userId={userId}
          commentsList={commentsList}
          annotationDrawBox={annotationDrawBox}
          setAnnotationDrawBox={setAnnotationDrawBox}
          annotationId={annotationId}
          DocUserType={DocUserType}
          setAnnotationId={setAnnotationId}
          setAnnotationData={setAnnotationData}
          setCommentsList={setCommentsList}
        />
        }
    </div>
  );
};

export default AdobePDFViewer;
