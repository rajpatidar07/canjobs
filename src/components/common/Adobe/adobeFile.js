import React, { useEffect, useState /*, useRef */ } from "react";
import ViewSDKClient from "./ViewSDKClient.js";
import CommentSection from "./commentSection.js";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
// import $ from 'jquery';
const AdobePDFViewer = ({
  url,
  data,
  userId,
  commentsList,
  selectedMentionAdmin,
  DocUserType,
  adminList,
  setCommentsList,
  partnerList,
  userType,
  docsection,
  docTypeList,
  fileId,
  setDocSingleDate,
  setFileID,
  setConvertedDoc,
  getCommentsList,
  SetPdfDocUrl,
  openCommentBox,
  AnnoteId
}) => {
  let [openAnnotationBox, setOpenAnnotationBox] = useState(openCommentBox ? true : false);
  let [annotationDrawBox, setAnnotationDrawBox] = useState("");
  let [annotationId, setAnnotationId] = useState(AnnoteId);//"01PMN6UKUFRLIYUS2R5JGZAPLUMKPKPUW2");
  let [annotationData, setAnnotationData] = useState(commentsList.length !== 0 ? commentsList
    ?.map((item) => JSON.parse(item?.doctaskjson))
    ?.filter((item) => item !== "") : []);
  const [annotationManager, setAnnotationManager] = useState(null);
  const [adobeViewer, setAdobeViewer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(
    docTypeList?.findIndex((item) => item.id === fileId)
  );
  // Handler for Previous button
  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      //condition for not navigating to the folder or no file found
      if (docTypeList[newIndex] || !docTypeList[newIndex]?.folder) {
        setConvertedDoc("");
        setCurrentIndex(newIndex);
        setDocSingleDate(docTypeList[newIndex]);
        setFileID(docTypeList[newIndex].id);
        SetPdfDocUrl(docTypeList[newIndex]);
        setOpenAnnotationBox(false)
      }
    }
  };

  // Handler for Next button
  const handleNextClick = () => {
    if (currentIndex < docTypeList.length - 1) {
      const newIndex = currentIndex + 1;
      //condition for not navigating to the folder or no file found
      if (docTypeList[newIndex] || !docTypeList[newIndex]?.folder) {
        setConvertedDoc("");
        setCurrentIndex(newIndex);
        setDocSingleDate(docTypeList[newIndex]);
        setFileID(docTypeList[newIndex].id);
        SetPdfDocUrl(docTypeList[newIndex]);
        setOpenAnnotationBox(false)
      }
    }
  };
  useEffect(() => {
    // Compute AnoData when commentsList changes
    const AnoData = commentsList.length !== 0
      ? commentsList
        ?.map((item) => JSON.parse(item?.doctaskjson))
        ?.filter((item) => item !== "")
      : [];

    // Update the annotationData state
    setAnnotationData(AnoData);
  }, [commentsList]);
  // Optional: Update state if documents array changes
  // useEffect(() => {
  //   setDocSingleDate(docTypeList[currentIndex]);
  //   setFileID(docTypeList[currentIndex]?.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentIndex]);
  /*REnder document method */
  useEffect(() => {
    // if (!data?.name?.includes(1295)) {
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
          // showDownloadPDF: false, // Disable download
          // showPrintPDF: false,    // Disable print
        },
        url,
        data,
        userType
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
              console.log(annotationManager)
              setAnnotationManager(annotationManager);
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
                  setAnnotationDrawBox(
                    (annotationData).find((item) => item.id === event.data.id)
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
    // }
    //     let timer;
    //         timer = setTimeout(() => {
    //           console.log("call timeout===================");
    //           // const iframe = document.querySelector('#iframe-pdf-div'); // Use the actual id or selector of the iframe
    // // console.log("iframe===="+iframe);
    //           // Step 2: Access the document inside the iframe
    //           //  const iframeDocument = iframe.document;
    //           // console.log("iframeDoc=="+iframeDocument);
    //           // // Step 3: Select the li element using data-test-id
    //           // var dt = $("#iframe-pdf-div").attr("data-test-id");
    //           // console.log("dt==="+dt);
    //           // const element = iframe.querySelector('[data-test-id="qt-verb-comment-stickynote"]');
    //           // console.log("element==================="+element);

    //           var iframeContent = $('#iframe-pdf-div').contents();
    // console.log("iframeContent"+iframeContent);
    //           // Phir specific li element ko select karke hide kar dete hain
    //           console.log("======"+ JSON.stringify(iframeContent.find('li[data-test-id="qt-verb-comment-stickynote"]')));
    //           var elements = iframeContent.find('li[data-test-id="qt-verb-comment-stickynote"]');

    //           // Ab in elements pe koi bhi jQuery method apply kar sakte hain, jaise hide
    //           elements.css("display","none  !important");
    //           // // Step 4: Hide the element
    //           // if (element) {
    //           //     element.style.display = 'none';
    //           // }
    //         }, 10000);

    // Cleanup function to clear the timer if the component unmounts or myState changes
    // return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [url, commentsList, annotationData]);
  /*Render method to Highlight the annotation from clicking it */
  useEffect(() => {
    // if (!data?.name?.includes(1295)) {
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
                  .catch((error) =>
                    console.log("Error getting APIs:", error)
                  );
              })
              .catch((error) =>
                console.log("Error selecting annotation:", error)
              );
          }
        })
        .catch((error) => console.log("Error getting annotations:", error));
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annotationId, annotationManager, adobeViewer]);
  return (
    <div
      style={{ height: docsection ? "100vh" : "calc(100vh - 130px)" }}
      className="row m-0 position-relative"
    >
      {/*  data?.name.includes(1295) ?
           <>
              <div className="text-break">{data.name + url}</div>
              <iframe width={400} height={400} content="indication/pdf" src={newiframeurl} title={data?.name}></iframe>
             <object data={newiframeurl} width="300" height="200" content="indication/pdf"></object>
              <div
               dangerouslySetInnerHTML={{ __html: newiframeurl }} />
           </>
         : */}
      <div
        className={`${(userType === "admin" || userType === "agent") && openAnnotationBox
          ? "col-md-9 col-lg-9 col-sm-11"
          : "col-md-12 col-lg-12 col-sm-12"
          } full-window-div position-relative`}
        style={{
          maxHeight: docsection ? "100vh" : "calc(100vh - 130px)",
          // transition: "all .3s",
        }}
      >
        {docTypeList && <button
          className={`rounded-circle font-size-4
            ${!docTypeList[currentIndex - 1] ||
              docTypeList[currentIndex - 1]?.folder
              ? "btn-light"
              : "btn-primary"}
          `}
          onClick={handlePreviousClick}
          disabled={
            !docTypeList[currentIndex - 1] ||
              docTypeList[currentIndex - 1]?.folder
              ? true
              : false
          }
          style={{
            position: "absolute",
            top: "48%",
            left: 10,
            bottom: "auto",
            zIndex: 99,
            border: "none",
            lineHeight: 1,
            padding: 10,
            width: 45,
            height: 45,
          }}
        >
          <GrPrevious />
        </button>}
        {docTypeList && <button
          className={`rounded-circle font-size-4
          ${!docTypeList[currentIndex + 1] ||
              docTypeList[currentIndex + 1]?.folder
              ? "btn-light"
              : "btn-primary"}
        `}
          onClick={handleNextClick}
          disabled={
            !docTypeList[currentIndex + 1] ||
              docTypeList[currentIndex + 1]?.folder
              ? true
              : false
          }
          style={{
            position: "absolute",
            top: "48%",
            right: 10,
            bottom: "auto",
            zIndex: 99,
            border: "none",
            lineHeight: 1,
            padding: 10,
            width: 45,
            height: 45,
          }}
        >
          <GrNext />
        </button>}
        <div
          id="pdf-div"
          className={`${(userType === "admin" || userType === "agent") && openAnnotationBox
            ? "w-100"
            : "w-100"
            } full-window-div`}
          style={{
            height: docsection ? "100vh" : "calc(100vh - 130px)",
            // transition: "all .3s",
          }}
        ></div>
      </div>
      <Link
        to={""}
        onClick={() => {
          setOpenAnnotationBox(openAnnotationBox ? false : true);
          if (openAnnotationBox === false) {
            getCommentsList(data)
          }
        }}
        className={
          userType === "admin" || userType === "agent"
            ? "annotation-mobile-button"
            : "d-none"
        }
        data-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="sidebar"
        title="Comments"
      >
        <FaComments />
      </Link>
      {(userType === "admin" || userType === "agent") && (
        <CommentSection
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
          openAnnotationBox={openAnnotationBox}
          docsection
        />
      )}
    </div>
  );
};

export default AdobePDFViewer;
