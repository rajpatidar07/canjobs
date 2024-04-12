import React/*, { useState, useEffect, useRef }*/ from "react";
// import { Link } from "react-router-dom";
// import CommentBox from "../CommentBox";
// import {
//   getallAdminData,
//   GetReplyCommit,
//   ADocAnnotation,
//   UpdateDocuentcommentAssign,
//   SendReplyCommit,
//   GetCommentsAndAssign,
//   // GetSharePointDocUrl
// } from "../../../api/api";
// import LazyLoad from "react-lazy-load";
// import { toast } from "react-toastify";
// import FileViewer from "react-file-viewer";
// // import Verified from "../../media/verified.png";
// import { MdAddComment } from "react-icons/md";
// import { RxCrossCircled } from "react-icons/rx";
// import { FaFlag } from "react-icons/fa";
// import { IoMdArrowBack } from "react-icons/io";
// import { usePdf } from 'react-pdf-js';
import AdobePDFViewer from "../Adobe/adobeFile";
export default function PreviewDocument({
  // setFolderID,
  docData,
  // docId,
  // userId,
  docFile,
  // setDocPreview,
  // setDocSingleDate,
}) {
  // let admin_id = localStorage.getItem("admin_id");
  // let user_type = localStorage.getItem("userType");
  // let docFileExt = docData.file.mimeType.split("/")[1];
  // // const [loading, setLoading] = useState(false)
  // const [commenAapiCall, setCommentApiCall] = useState("");
  // const [imageAnnotations, setImageAnnotations] = useState([]);
  // const [comments, setComments] = useState("");
  // const [replyComment, setReplyComment] = useState("");
  // const [commentsList, setCommentsList] = useState([]);
  // const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  // const [isAnnotationMode, setAnnotationMode] = useState(false);
  // let [allAdmin, setAllAdmin] = useState([]);
  // let [adminid, setAdminId] = useState();
  // const [selectedAdmin, setSelectedAdmin] = useState("");
  // const [selectedAdminReply, setSelectedAdminReplye] = useState("");
  // const [addCommentFlag, setAddCommentFlag] = useState(false);
  // const [filteredEmails, setFilteredEmails] = useState([]);
  // const fileViewerRef = useRef(null);
  // let [annotationStatus, setAnnotationStatus] = useState();
  // let [replyCommentClick, setReplyCommentClick] = useState();
  // const [commentsReplyList, setCommentsReplyList] = useState([]);
  // // const [actualDocFile, setActualDocFile] = useState("");
  // //USeEffect foe commet list
  // useEffect(() => {
  //   setSelectedAnnotation(null);
  //   getCommentsList();
  //   AdminData()
  //   // GetDocUrl()
  //   setFolderID("")
  //   if (commenAapiCall === true) {
  //     setCommentApiCall(false);
  //   }
  // }, [docId, commenAapiCall, adminid, annotationStatus]);
  // /*Function to get document url */
  // // const GetDocUrl = async () => {
  // //   try {
  // //     let res = await GetSharePointDocUrl(docData.id);
  // //     console.log(res.data.data.getUrl);
  // //     setActualDocFile(res.data.data.getUrl)
  // //     setActualDocFile(res.data.data.getUrl + "&withCredentials=true")
  // //   } catch (err) {
  // //     console.log(err)
  // //     setActualDocFile()
  // //   }
  // // }
  // /*Function to get admin list */
  // const AdminData = async () => {
  //   try {
  //     const userData = await getallAdminData();
  //     if (userData.data.length === 0) {
  //       setAllAdmin([]);
  //     } else {
  //       // const filteredData = userData.data.filter(item => item.admin_type === "manager");
  //       setAllAdmin(userData.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // /*onchange Function to set email or any other comment  */
  // const handleInputChange = (event, type) => {
  //   const inputValue = event.target.value;
  //   // Update the input value
  //   if (type === "reply") {
  //     setReplyComment(inputValue);
  //   } else {
  //     setComments(inputValue);
  //   }

  //   let lastChar = inputValue.slice(-1);
  //   const atIndex = inputValue.indexOf("@");

  //   if (lastChar === "@" || inputValue.includes("@")) {
  //     AdminData();
  //     if (allAdmin) {
  //       // Filter admin emails based on input
  //       let filteredAdminEmails = allAdmin.filter(
  //         (admin) =>
  //           admin.email.toLowerCase().includes(
  //             String(inputValue)
  //               .substring(atIndex + 1)
  //               .toLowerCase()
  //           ) ||
  //           admin.name.toLowerCase().includes(
  //             String(inputValue)
  //               .substring(atIndex + 1)
  //               .toLowerCase()
  //           )
  //       );

  //       // Update the filtered emails
  //       setFilteredEmails(filteredAdminEmails);
  //     }
  //   } else {
  //     setFilteredEmails([]);
  //   }
  // };
  // /*Function to get the email to assign */
  // const handleEmailClick = (email, type) => {
  //   // Set the selected admin and update the input value
  //   if (type === "reply") {
  //     setSelectedAdminReplye((prevValue) => prevValue + email + ",");
  //     setReplyComment((prevValue) => `${prevValue} ${email} `);
  //   } else {
  //     setSelectedAdmin((prevValue) => prevValue + email + ",");
  //     setComments((prevValue) => `${prevValue} ${email} `);
  //   }
  //   setFilteredEmails([]);
  // };
  // /*Function to get the email to input on hover */
  // const handleEmailMouseOver = (email, type) => {
  //   // Highlight the email on mouseover
  //   if (type === "reply") {
  //     setSelectedAdminReplye(email);
  //   } else {
  //     setSelectedAdmin(email);
  //   }
  // };
  // // Handle click event on the FileViewer to capture annotations
  // const handleFileViewerClick = (e) => {
  //   if (isAnnotationMode) {
  //     const rect = fileViewerRef.current.getBoundingClientRect();
  //     const x_axis = e.clientX - rect.left;
  //     const y_axis = e.clientY - rect.top;
  //     handleFlagClick({ x_axis, y_axis });
  //     setImageAnnotations([...imageAnnotations, { x_axis, y_axis }]);
  //     setAddCommentFlag(true);
  //   }
  // };

  // // Handle flag click to select the annotation and toggle the form visibility for image annotation
  // const handleFlagClick = (annotation) => {
  //   setSelectedAnnotation(annotation);
  // };
  // // Generate a list of comments from the state for image annotation
  // const getCommentsList = async () => {
  //   if (docData.id) {
  //     try {
  //       let res = await GetCommentsAndAssign(
  //         docData.id,//docId,
  //         adminid,
  //         annotationStatus,
  //         "document"
  //       );
  //       if (res.data.status === (1 || "1")) {
  //         setCommentsList(res.data.data.data);
  //         setImageAnnotations(res.data.data.data);
  //       } else if (res.data.message === "Task data not found") {
  //         setCommentsList([]);
  //         setImageAnnotations([]);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setCommentsList([]);
  //       setImageAnnotations([]);
  //     }
  //   } else {
  //     setCommentsList([]);
  //     setImageAnnotations([]);
  //   }
  // };

  // // Generate a list of comments reply
  // const getCommentsReplyList = async () => {
  //   if (docData.id) {
  //     try {
  //       let res = await GetReplyCommit(docData.id, adminid, annotationStatus);
  //       if (res.data.status === (1 || "1")) {
  //         setCommentsReplyList(res.data.data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setCommentsReplyList([]);
  //     }
  //   } else {
  //     setCommentsReplyList([]);
  //   }
  // };

  // /*Major api's for annotations */
  // // Function to add annotation based on conditions
  // const addAnnotation = async (annotation) => {
  //   setAddCommentFlag(false);
  //   // Retrieve data from local storage

  //   const subject = "";
  //   const comment = comments; ///\S+@\S+\.\S+/.test(comments) ? "" : comments;
  //   let DocId = docData.id//docId;
  //   //   ? docId
  //   //   : docData.find((item) => item.type === docName).id;
  //   let sender = allAdmin.find((item) => item.admin_id === admin_id)
  //     ? allAdmin.find((item) => item.admin_id === admin_id).name
  //     : "";
  //   let senderEmail = allAdmin.find((item) => item.admin_id === admin_id)
  //     ? allAdmin.find((item) => item.admin_id === admin_id).email
  //     : "";
  //   const AdminType = localStorage.getItem("admin_type");
  //   // Variables for mentionaing admins
  //   const email = selectedAdmin || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
  //   let assignedAdminName = allAdmin.filter((item) =>
  //     selectedAdmin.includes(item.email)
  //   )
  //     ? allAdmin
  //       .filter((item) => selectedAdmin.includes(item.email))
  //       .map((admin) => admin.name)
  //       .join(",")
  //     : "";
  //   const assignedUserId = allAdmin.filter((item) =>
  //     selectedAdmin.includes(item.email)
  //   )
  //     ? allAdmin
  //       .filter((item) => selectedAdmin.includes(item.email))
  //       .map((admin) => admin.admin_id)
  //       .join(",")
  //     : "";
  //   const assignedUserType = "admin";
  //   // allAdmin.filter((item) =>
  //   //   selectedAdmin.includes(item.email)
  //   // )
  //   //   ? allAdmin
  //   //     .filter((item) => selectedAdmin.includes(item.email))
  //   //     .map((admin) => admin.admin_type)
  //   //     .join(",")
  //   //   : "";
  //   // Send data to the API
  //   if ((comment === "" && email === "") ||
  //     (comment.includes("@") && !/\S+@\S+\.\S+/.test(comment))) {
  //     toast.error("Comment or email cannot be empty!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 2000,
  //     });
  //   } else {
  //     try {
  //       let res = await ADocAnnotation(
  //         admin_id,
  //         DocId,
  //         assignedUserId,
  //         email,
  //         subject,
  //         comment,
  //         annotation.x_axis,
  //         annotation.y_axis,
  //         "document",
  //         AdminType, //sender type
  //         sender, //sender name,
  //         assignedAdminName, //assigned Admin or user Name,
  //         "", //follow up status(for notes only)
  //         "", //Next follow up date(for notes only)
  //         assignedUserType, //Assign user type,
  //         "", //Document url(for notes only)
  //         senderEmail, //Sender email
  //         userId, //employee id,
  //         "", //assigned_by_id
  //         docData.parentReference.id // document parent code
  //       );
  //       if (res.data.message === "task inserted successfully!") {
  //         toast.success("Comment uploaded Successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         setSelectedAnnotation(null);
  //         setComments("");
  //         setCommentApiCall(true);
  //         setSelectedAdmin("");
  //         setAnnotationMode(!isAnnotationMode);
  //         setFilteredEmails([]);
  //         // setNotificationApiCall(true);
  //         localStorage.setItem("callNotification", true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       if (err.response.data.message === "required fields cannot be blank") {
  //         toast.error(" Please try again later.", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         setSelectedAnnotation(null);
  //         setComments("");
  //         setSelectedAdmin("");
  //         setCommentApiCall(true);
  //         setAnnotationMode(!isAnnotationMode);
  //         setAddCommentFlag();
  //         setFilteredEmails([]);
  //       }
  //     }
  //   }
  //   // Update state to include the new annotation
  //   // setImageAnnotations([...imageAnnotations, { x, y }]);
  // };
  // /* Function to update comment and assign */
  // const OnHandleUpdateComment = async (originalData) => {
  //   let updatedData;
  //   //Condtion to update x and y axis on documet update
  //   if (originalData === (docData[0] === docData ? docData.id : docId)) {
  //     updatedData = { doc_id: originalData, x_axis: 0, y_axis: 0 };
  //   } else {
  //     updatedData = { ...originalData };
  //     updatedData.status = originalData.status === "1" ? "0" : "1";
  //   }
  //   try {
  //     // Call the API with the updated data
  //     let res = await UpdateDocuentcommentAssign(updatedData);
  //     if (res.message === "Task updated successfully!") {
  //       toast.success("Task completed Successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setSelectedAnnotation(null);
  //       setComments("");
  //       setCommentApiCall(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // /*Function to delete document comments*/
  // // const OnDeleteComment = async (docId) => {
  // //   try {
  // //     let res = await DeleteCommentsAndAssign(docId);
  // //     console.log(res);
  // //   } catch (err) {
  // //     console.log(err);
  // //   }
  // // };
  // /*Function to set the color code to the background of the user name */
  // const determineBackgroundColor = (commentItem) => {
  //   const colorClasses = [
  //     "bg-primary-opacity-7",
  //     "bg-warning-opacity-7",
  //     "bg-orange-opacity-6",
  //     "bg-info-opacity-7",
  //     "bg-secondary-opacity-7",
  //     "bg-danger-opacity-6",
  //     "bg-info-opacity-visible",
  //   ];

  //   const assignedUserId = commentItem.assigned_to_user_id;

  //   // Create a mapping dynamically based on assignedUserId
  //   const userColorMap = {};

  //   // Check if assignedUserId is present in the mapping
  //   if (assignedUserId && userColorMap.hasOwnProperty(assignedUserId)) {
  //     return userColorMap[assignedUserId];
  //   }

  //   // If not found in the mapping, use the colorClasses logic
  //   const id = commentItem.id;
  //   const hashCode = (str) => {
  //     let hash = 0;
  //     for (let i = 0; i < str.length; i++) {
  //       const char = str.charCodeAt(i);
  //       hash = (hash << 5) - hash + char;
  //     }
  //     return hash;
  //   };

  //   const hash = Math.abs(hashCode(id.toString()));
  //   const index = hash % colorClasses.length;

  //   return colorClasses[index];
  // };
  // /*Function to reply for the comment */
  // const ReplyAnnotation = async (data) => {
  //   // let emailrejex = /\S+@\S+\.\S+/;
  //   // let id = emailrejex.test(selectedAdminReply)
  //   //   ? allAdmin.find((item) => item.email === selectedAdminReply).admin_id
  //   //   : data.assined_to_user_id;
  //   // let adminType = emailrejex.test(selectedAdminReply)
  //   //   ? allAdmin.find((item) => item.email === selectedAdminReply).admin_type
  //   //   : "admin";
  //   let sender = allAdmin.find((item) => item.admin_id === admin_id)
  //     ? allAdmin.find((item) => item.admin_id === admin_id).name
  //     : "";
  //   let senderId = allAdmin.find((item) => item.admin_id === admin_id)
  //     ? allAdmin.find((item) => item.admin_id === admin_id).admin_id
  //     : "";
  //   let senderEmail = allAdmin.find((item) => item.admin_id === admin_id)
  //     ? allAdmin.find((item) => item.admin_id === admin_id).email
  //     : "";
  //   let senderType = allAdmin.find((item) => item.admin_id === admin_id)
  //     ? allAdmin.find((item) => item.admin_id === admin_id).admin_type
  //     : "";
  //   // let assignedAdminName = allAdmin.find(
  //   //   (item) => item.email === selectedAdminReply
  //   // )
  //   //   ? allAdmin.find((item) => item.email === selectedAdminReply).name
  //   //   : "";
  //   // Variables for mentioning admins
  //   const email = selectedAdminReply || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
  //   let assignedAdminName = allAdmin.filter((item) =>
  //     selectedAdminReply.includes(item.email)
  //   )
  //     ? allAdmin
  //       .filter((item) => selectedAdminReply.includes(item.email))
  //       .map((admin) => admin.name)
  //       .join(",")
  //     : "";
  //   const assignedUserId = allAdmin.filter((item) =>
  //     selectedAdminReply.includes(item.email)
  //   )
  //     ? allAdmin
  //       .filter((item) => selectedAdminReply.includes(item.email))
  //       .map((admin) => admin.admin_id)
  //       .join(",")
  //     : "";
  //   const AdminType = //localStorage.getItem("admin_type");
  //     allAdmin.filter((item) => selectedAdminReply.includes(item.email))
  //       ? allAdmin
  //         .filter((item) => selectedAdminReply.includes(item.email))
  //         .map((admin) => admin.admin_type)
  //         .join(",")
  //       : "";
  //   if (replyComment === "" && email === "") {
  //     toast.error("Comment or email cannot be empty!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //   } else {
  //     try {
  //       let res = await SendReplyCommit(
  //         data,
  //         email,
  //         replyComment,
  //         assignedUserId,
  //         AdminType,
  //         sender,
  //         assignedAdminName,
  //         "document",
  //         senderId,
  //         senderEmail,
  //         senderType,
  //         userId //Userid
  //       );
  //       if (res.data.message === "message sent successfully!") {
  //         toast.success("Replied Successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         // setNotificationApiCall(true);
  //         localStorage.setItem("callNotification", true);
  //         setReplyComment("");
  //         getCommentsReplyList();
  //         setSelectedAdminReplye("");
  //         setFilteredEmails([]);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setSelectedAdminReplye("");
  //       setFilteredEmails([]);
  //     }
  //   }
  // };
  // /*PDF canvas code */
  // const canvasEl = useRef(null);
  // const [page, setPage] = useState(1);
  // const [pages, setPages] = useState(null);
  // if (docFileExt === "pdf") {
  //   // eslint-disable-next-line
  //   const [loading, numPages] = usePdf({
  //     canvasEl,
  //     file: docFile,
  //     page,

  //   });
  //   useEffect(() => {
  //     setPages(numPages);
  //   }, [numPages]);

  // }
  // /*FUnction to render pagination for pdf document */
  // const renderPagination = (page, pages) => {
  //   if (!pages) {
  //     return null;
  //   }
  //   let previousButton = <span className="previous" onClick={() => setPage(page - 1)}>
  //     <Link to=""><i className="fa fa-arrow-left"></i> Previous</Link>
  //   </span>;
  //   if (page === 1) {
  //     previousButton = <span className="previous disabled">
  //       <Link to=""><i className="fa fa-arrow-left"></i> Previous</Link>
  //     </span>;
  //   }
  //   let nextButton = <span className="next" onClick={() => setPage(page + 1)}>
  //     <Link to="">Next <i className="fa fa-arrow-right"></i></Link>
  //   </span>;
  //   if (page === pages) {
  //     nextButton = <span className="next disabled">
  //       <Link to="">Next <i className="fa fa-arrow-right"></i></Link>
  //     </span>;
  //   }
  //   return (
  //     <nav>
  //       <p className="pager row text-center d-flex justify-content-between">
  //         {previousButton}
  //         {nextButton}
  //       </p>
  //     </nav>
  //   );
  // }

  return (
    <AdobePDFViewer
      url={docFile} data={docData}/>
    // <div className="row m-0 bg-white document_preview_box h-100vh overflow-hidden">
    //   <div
    //     className={`${user_type === "admin"
    //       ? "col-md-8 col-lg-8 col-sm-9"
    //       : "col-md-12 col-lg-12 col-sm-12"
    //       } p-2 bg-dark`}
    //   >
    //     <div className="back_btn_div">
    //       <Link
    //         className="rounded-circle"
    //         style={{
    //           position: "absolute",
    //           top: 5,
    //           left: 5,
    //           background: "#fff",
    //           width: 30,
    //           height: 30,
    //           zIndex: 9999,
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //         to=""
    //         onClick={() => {
    //           setDocSingleDate("");
    //           setDocPreview(false);
    //           setFolderID(docData.parentReference.id);
    //         }}
    //       >
    //         <IoMdArrowBack />
    //       </Link>
    //     </div>
    //     {
    //       // loading === true ? (
    //       //     <Loader />
    //       // ) :
    //       docFile ? (
    //         <div>
    //           <div
    //             id="annotation-container"
    //             style={{
    //               position: "relative",
    //               width: "100%",
    //             }}
    //           >
    //             <div
    //               className="d-flex justify-content-center position-relative"
    //               style={{
    //                 height: "calc(100vh - 150px)",
    //                 overflowY: "auto",
    //               }}
    //             >
    //               {/* <RenderNewDocFile /> */}
    //               <React.Fragment>
    //                 {docFile ? (
    //                   <>
    //                     <div
    //                       className="w-100"
    //                       ref={fileViewerRef}
    //                       onClick={handleFileViewerClick}
    //                     >

    //                       <LazyLoad
    //                         height={"100%"}
    //                         offsetVertical={"100%"}
    //                         debounce={false}
    //                       >
    //                         {docData &&
    //                           (docData.name &&
    //                             docData.name.toLowerCase().includes("imm") ? (
    //                             <iframe
    //                               src={docFile}
    //                               style={{
    //                                 height: "calc(100vh - 200px)",
    //                                 overflowY: "auto",
    //                               }}
    //                               width={"100%"}
    //                               title={docData.name}
    //                             ></iframe>
    //                           ) : (
    //                             <>
    //                               {docFileExt === "pdf" ?
    //                                 <div className="col">
    //                                   <canvas ref={canvasEl} />
    //                                   <div>
    //                                     {renderPagination(page, pages)}
    //                                   </div>
    //                                 </div>
    //                                 : <FileViewer
    //                                   key={docData.id}
    //                                   fileType={
    //                                     docFileExt ===
    //                                       "vnd.openxmlformats-officedocument.wordprocessingml.document"
    //                                       ? "docx"
    //                                       : docFileExt
    //                                   }
    //                                   filePath={`${docFile}&bytes=0-1023`}
    //                                   errorComponent={() => (
    //                                     <div>Error loading document</div>
    //                                   )}
    //                                   onError={(error) =>
    //                                     console.error(
    //                                       "Error loading document:",
    //                                       error
    //                                     )
    //                                   }
    //                                 />}

    //                             </>
    //                           ))}
    //                       </LazyLoad>
    //                     </div>
    //                   </>
    //                 ) : (
    //                   <div className="text-center mt-5">No document found</div>
    //                 )}
    //               </React.Fragment>
    //               <Link
    //                 to=""
    //                 className={` ${user_type === "admin"
    //                   ? `btn-sm mt-7 doc_btn ${isAnnotationMode ? "btn-primary " : "btn-secondary"
    //                   }`
    //                   : "d-none"
    //                   }`}
    //                 style={{
    //                   position: "absolute",
    //                   top: "10&",
    //                   right: "0",
    //                   zIndex: "99",
    //                 }}
    //                 onClick={() => {
    //                   setAnnotationMode(!isAnnotationMode);
    //                   setComments("");
    //                   setReplyCommentClick();
    //                   setAddCommentFlag(false);
    //                   //condition if the pdf is of imm
    //                   if (
    //                     docData.name &&
    //                     !isAnnotationMode &&
    //                     docData.name.toLowerCase().includes("imm")
    //                   ) {
    //                     handleFlagClick({ x_axis: 1, y_axis: 1 });
    //                   } else setSelectedAnnotation(null);
    //                 }}
    //               >
    //                 {isAnnotationMode ? <RxCrossCircled /> : <MdAddComment />}
    //               </Link>
    //             </div>
    //             {/* Transparent overlay for capturing click events */}
    //             {docFile && user_type === "admin" && (
    //               <>
    //                 {isAnnotationMode && (
    //                   <div
    //                     style={{
    //                       position: "absolute",
    //                       top: 0,
    //                       left: 0,
    //                       width: "100%",
    //                       height: "100%",
    //                       pointerEvents: "none",
    //                     }}
    //                   />
    //                 )}

    //                 {imageAnnotations.map((annotation, index) => (
    //                   <div
    //                     key={index}
    //                     style={{
    //                       position: "absolute",
    //                       left: annotation.x_axis - 5,
    //                       top: annotation.y_axis - 5,
    //                       cursor: "pointer",
    //                     }}
    //                     onClick={() => handleFlagClick(annotation)}
    //                   >
    //                     <FaFlag
    //                       className=""
    //                       style={{
    //                         color:
    //                           selectedAnnotation &&
    //                             selectedAnnotation.x_axis === annotation.x_axis &&
    //                             selectedAnnotation.y_axis === annotation.y_axis
    //                             ? "blue"
    //                             : annotation.status === "1"
    //                               ? "green"
    //                               : "red",
    //                         display:
    //                           annotation.status === "1" ? "none" : "block",
    //                       }}
    //                     />
    //                   </div>
    //                 ))}
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="text-center mt-5">No document found</div>
    //       )
    //     }
    //   </div>
    //   <div className="col-md-4 col-lg-4 col-sm-3 px-2 py-2 comments_and_replies">
    //     {docFile &&
    //       user_type === "admin" &&
    //       selectedAnnotation && //condition for imm pdf
    //       (docData.name && docData.name.toLowerCase().includes("imm")
    //         ? replyCommentClick === undefined ||
    //         replyCommentClick === "" ||
    //         replyCommentClick === null
    //         : addCommentFlag === true) ? (
    //       <div
    //         style={
    //           {
    //             // position: "absolute",
    //             // left: selectedAnnotation.x_axis + 10,
    //             // top: selectedAnnotation.y_axis + 20,
    //             // zIndex: 1,
    //           }
    //         }
    //         className="pt-0 pb-5"
    //       >
    //         <form
    //           className="comment-form"
    //           onSubmit={(e) => {
    //             e.preventDefault();
    //             addAnnotation(selectedAnnotation);
    //           }}
    //         >
    //           <div className="comment-input-container m-0 mb-2">
    //             <label className="m-0">
    //               <b> Add Annotation:</b>
    //             </label>
    //             <input
    //               type="text"
    //               value={comments || ""}
    //               onChange={handleInputChange}
    //               placeholder="Comments or add others with @"
    //               className="comment-input"
    //             />
    //             {filteredEmails.length > 0 && (
    //               <ul className="email-suggestions">
    //                 {filteredEmails.map((email) => (
    //                   <li
    //                     key={email.email}
    //                     onClick={() => handleEmailClick(email.email)}
    //                     onMouseOver={() => handleEmailMouseOver(email.email)}
    //                     className="email-suggestion-item"
    //                   >
    //                     <strong>{email.name}</strong>
    //                   </li>
    //                 ))}
    //               </ul>
    //             )}
    //           </div>
    //           <div className="button-container mx-0">
    //             <button
    //               type="submit"
    //               // onClick={(e) => {
    //               //   e.preventDefault();
    //               //   addAnnotation(selectedAnnotation);

    //               // }}
    //               className="btn-sm btn-primary save-comment-btn"
    //             >
    //               Save Comment
    //             </button>
    //             <button
    //               className="btn-sm btn-light cancel-btn"
    //               onClick={() => {
    //                 setAddCommentFlag();
    //                 setSelectedAnnotation(null);
    //                 setComments("");
    //                 setAnnotationMode(!isAnnotationMode);
    //                 setFilteredEmails([]);
    //               }}
    //             >
    //               Cancel
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     ) : null}
    //     {/* Comment box */}
    //     {user_type === "admin" ? (
    //       <CommentBox
    //         commentsReplyList={commentsReplyList}
    //         docData={docData}
    //         adminid={adminid}
    //         setAdminId={setAdminId}
    //         allAdmin={allAdmin}
    //         annotationStatus={annotationStatus}
    //         setAnnotationStatus={setAnnotationStatus}
    //         commentsList={commentsList}
    //         selectedAnnotation={selectedAnnotation}
    //         setSelectedAnnotation={setSelectedAnnotation}
    //         OnHandleUpdateComment={OnHandleUpdateComment}
    //         determineBackgroundColor={determineBackgroundColor}
    //         setReplyCommentClick={setReplyCommentClick}
    //         replyCommentClick={replyCommentClick}
    //         replyComment={replyComment}
    //         handleInputChange={handleInputChange}
    //         filteredEmails={filteredEmails}
    //         handleEmailClick={handleEmailClick}
    //         handleEmailMouseOver={handleEmailMouseOver}
    //         ReplyAnnotation={ReplyAnnotation}
    //         getCommentsReplyList={getCommentsReplyList}
    //         setAddCommentFlag={setAddCommentFlag}
    //         setFilteredEmails={setFilteredEmails}
    //         docTypData={docData}
    //       // setHide={setHide}
    //       />
    //     ) : null}
    //   </div>
    // </div>
  );
}
