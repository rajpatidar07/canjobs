import React, { useEffect /*, useRef */ } from "react";
import ViewSDKClient from "./ViewSDKClient.js";
const AdobePDFViewer = ({
  url,
  data,
  userId,
  commentsList,
  selectedMentionAdmin,
  DocUserType
}) => {
  const annotationId =
    !commentsList || commentsList.length === 0 ? "" : commentsList[0].id;
  let annotationData =
    !commentsList || commentsList.length === 0
      ? ""
      : JSON.parse(commentsList[0].doctaskjson);
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
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });

      viewSDKClient.registerSaveApiHandler(userId, annotationId,DocUserType);
      viewSDKClient.registerGetUserProfileApiHandler();
    });
    // eslint-disable-next-line
  }, [annotationId,url]);
  return (
    <div style={{ height: "calc(100vh - 130px)" }}>
      <div
        id="pdf-div"
        className="full-window-div"
        style={{ maxHeight: "calc(100vh - 130px)" }}
      ></div>
    </div>
  );
};

export default AdobePDFViewer;
