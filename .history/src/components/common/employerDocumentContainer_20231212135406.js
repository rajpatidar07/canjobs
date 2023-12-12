import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import {
  UploadEmployerDocument,
  GetEmployerDocumentList,
  VarifyEmployerDocument,
  ADocAnnotation,
  GetCommentsAndAssign,
  getallAdminData,
  UpdateDocuentcommentAssign,
  DeleteCommentsAndAssign,
  DeleteDocument,
} from "../../api/api";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import Verified from "../../media/verified.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
/*Annotation */
import { FaFlag } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { FaReplyAll } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

export default function EmployerDocumrentContainer(props) {
  const [otherDoc, setOtherDoc] = useState(false);
  const [docName, setDocName] = useState("");
  const [docData, setDocData] = useState([]);
  const [docTypData, setDocTypData] = useState("");
  const [apiCall, setApiCall] = useState("");
  const [docFile, setDocFile] = useState("");
  const [docFileBase, setDocFileBase] = useState("");
  const [docFileExt, setDocFileExt] = useState("");
  const [docId, setDocId] = useState("");
  const [showMoreDocType, setShowMoreDocType] = useState(false);
  const [showSaveDoc, setShowSaveDoc] = useState(false);
  const [hide, setHide] = useState(false);
  let encoded;
  let user_type = localStorage.getItem("userType");
  let admin_id = localStorage.getItem("admin_id");
  /**
   * Annotation   */
  // Annotation State
  const [imageAnnotations, setImageAnnotations] = useState([]);
  const [comments, setComments] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);
  let [allAdmin, setAllAdmin] = useState([]);
  let [adminid, setAdminId] = useState();
  const [addCommentFlag, setAddCommentFlag] = useState(false);
  let [annotationStatus, setAnnotationStatus] = useState();
  const [filteredEmails, setFilteredEmails] = useState([]);
  const fileViewerRef = useRef(null);
  let [replyCommentClick, setReplyCommentClick] = useState();
  /*Function to get admin list */
  const AdminData = async () => {
    try {
      const userData = await getallAdminData();
      if (userData.data.length === 0) {
        setAllAdmin([]);
      } else {
        // const filteredData = userData.data.filter(item => item.admin_type === "manager");
        setAllAdmin(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*onchange Function to set email or any other comment  */
  const handleInputChange = (event, type) => {
    const value = event.target.value;
    if (value.startsWith("@")) {
      // Filter admin emails based on input
      const filteredAdminEmails = allAdmin.filter((admin) => {
        // Check if admin and admin.email are defined
        if (admin && admin.email) {
          // Convert both to lowercase and check for inclusion
          return admin.email
            .toLowerCase()
            .includes(value.slice(1).toLowerCase());
        }
        return false; // Handle the case where admin or admin.email is undefined
      });

      // Update the filtered emails
      setFilteredEmails(filteredAdminEmails);
    } else {
      // Reset filtered emails if input doesn't start with '@'
      setFilteredEmails([]);
    }

    // Update the input value
    if (type === "reply") {
      setReplyComment(value);
    } else {
      setComments(value);
    }
  };
  /*Function to get the email to assign */
  const handleEmailClick = (email, type) => {
    // Set the selected email as the input value
    if (type === "reply") {
      setReplyComment(email);
    } else {
      setComments(email);
    }
    // Clear the filtered emails
    setFilteredEmails([]);
  };
  /*Function to get the email to input on hover */
  const handleEmailMouseOver = (email, type) => {
    // Highlight the email on mouseover
    if (type === "reply") {
      setReplyComment(email);
    } else {
      setComments(email);
    }
  };
  // Handle click event on the FileViewer to capture annotations
  const handleFileViewerClick = (e) => {
    if (isAnnotationMode) {
      const rect = fileViewerRef.current.getBoundingClientRect();
      const x_axis = e.clientX - rect.left;
      const y_axis = e.clientY - rect.top;
      handleFlagClick({ x_axis, y_axis });
      setImageAnnotations([...imageAnnotations, { x_axis, y_axis }]);
      setAddCommentFlag(true);
    }
  };

  // Handle flag click to select the annotation and toggle the form visibility for image annotation
  const handleFlagClick = (annotation) => {
    // if (
    //   selectedAnnotation &&
    //   selectedAnnotation.x === annotation.x &&
    //   selectedAnnotation.y === annotation.y
    // ) {
    //   setSelectedAnnotation(null);
    // } else {
    setSelectedAnnotation(annotation);
    // }
  };

  // Generate a list of comments from the state for image annotation
  const getCommentsList = async () => {
    if (docId) {
      try {
        let res = await GetCommentsAndAssign(docId, adminid, annotationStatus);
        if (res.data.status === (1 || "1")) {
          setCommentsList(res.data.data);
          setImageAnnotations(res.data.data);
        }
      } catch (err) {
        console.log(err);
        setCommentsList([]);
        setImageAnnotations([]);
      }
    } else {
      setCommentsList([]);
      setImageAnnotations([]);
    }
  };

  /*Annotaton functionalites close */
  /*Functo get Applicants Document */
  const GetDocument = async () => {
    try {
      let response = await GetEmployerDocumentList(props.employer_id);
      if (
        response.data.data === undefined ||
        response.data.data === "" ||
        response.data.data === null ||
        response.data.data.length === 0
      ) {
        setDocData([]);
      } else {
        setDocData(response.data.data);
        // eslint-disable-next-line
        if (
          docTypData === undefined ||
          docTypData === "undefined" ||
          (docTypData === "" && docName === "" && otherDoc === false)
        ) {
          setDocTypData(response.data.data[0]);
          setDocFile(
            response.data.data[0].document_url +
              `?v=${new Date().getMinutes() + new Date().getSeconds()}`
          );
          setDocId(response.data.data[0].id);
          setDocName(response.data.data[0].type);
        } else if (
          showMoreDocType === false &&
          response.data.data.find((item) => item.type === docName)
        ) {
          if (
            response.data.data.find((item) => item.type === docName).type ===
            docName
          ) {
            setDocTypData(
              response.data.data.find((item) => item.type === docName)
            );

            setDocFile(
              response.data.data.find((item) => item.type === docName)
                .document_url +
                `?v=${new Date().getMinutes() + new Date().getSeconds()}`
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /*Onchange function of Logo */
  const handleFileChange = async (event, id) => {
    const file = event.target.files[0];
    // console.log("employer_id",props.employer_id,
    // "document =>", base64Name,
    // "Type =>" , docName)
    if (!file) {
      toast.error("No file selected", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    // Check file type
    const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const fileType = `.${file.name.split(".").pop()}`;
    if (!allowedTypes.includes(fileType.toLowerCase())) {
      // console.log("not matched");
      toast.error(
        "Invalid document type. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        }
      );
      return;
    }
    // Check file size
    else if (file.size > 1024 * 4000) {
      toast.error("Document size can't be more than 4 mb", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    } else {
      const reader = new FileReader();
      // Read the file as a data URL
      reader.readAsDataURL(file);
      encoded = await convertToBase64(file);
      let base64Name = encoded.base64;
      let DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${
        base64Name.split(";")[1]
      }`;
      setDocFile(base64Name);
      setDocFileExt(fileType.slice(1));
      setDocFileBase(DocFile);
      setShowSaveDoc(true);
    }
  };

  /*Function to save document */
  const SaveDocument = async () => {
    try {
      let response = await UploadEmployerDocument(
        props.employer_id,
        docData[0] === docTypData ? docTypData.type : docName,
        docFileBase,
        docData[0] === docTypData ? docTypData.id : docId
      );
      if (response.data.message === "inserted successfully") {
        toast.success("Document uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setShowMoreDocType(false);
        setOtherDoc(false);
        setDocName(docName);
        setDocFileBase("");
        setDocFileExt("");
        setDocId("");
        setShowSaveDoc(false);
        setApiCall(true);
        setHide(false);
      }
      if (response.data.message === "updated successfully") {
        toast.success("Document Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        if (commentsList.length > 0) {
          OnDeleteComment(docData[0] === docTypData ? docTypData.id : docId);
        }
        setShowMoreDocType(false);
        setApiCall(true);
        setHide(false);
        setDocTypData(
          docData.find(
            (item) =>
              item.type ===
              (docData[0] === docTypData ? docTypData.type : docName)
          )
        );
        setDocFile(
          docData.find(
            (item) =>
              item.type ===
              (docData[0] === docTypData ? docTypData.type : docName)
          ).document_url +
            `?v=${new Date().getMinutes() + new Date().getSeconds()}`
        );
      }
      if (response.data.message === "fields must not be empty !") {
        toast.error("Document type is requried", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setHide(false);
      }
      if (response.data.message === "Invalid base64-encoded data !") {
        toast.error("Document type is not valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setHide(false);
      }
    } catch (err) {
      console.log(err);
      setHide(false);
    }
  };

  /*Fuinction to render image */
  const RenderNewDocFile = () => {
    return (
      <React.Fragment>
        {docFile ? (
          <>
            <Link
              className={` ${
                hide === false && docFile && docName && user_type === "admin"
                  ? `btn-sm mt-7 ${
                      isAnnotationMode ? "btn-primary" : "btn-secondary"
                    }`
                  : "d-none"
              }`}
              style={{
                position: "fixed",
                bottom: "285px",
                right: "24%",
                zIndex: "99",
              }}
              onClick={() => {
                setAnnotationMode(!isAnnotationMode);
                setComments("");
              }}
            >
              {isAnnotationMode ? <RxCrossCircled /> : <MdAddComment />}
            </Link>

            <div
              className="w-100"
              ref={fileViewerRef}
              onClick={handleFileViewerClick}
            >
              <FileViewer
                key={docTypData.id}
                fileType={
                  docFileExt
                    ? docFileExt
                    : docTypData.extension_type ===
                      "vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ? "docx"
                    : docTypData.extension_type
                }
                filePath={docFile}
                errorComponent={() => <div>Error loading document</div>}
              />
            </div>
          </>
        ) : (
          <div className="text-center mt-5">No document found</div>
        )}
      </React.Fragment>
    );
  };

  /*Function to replace select box text */
  const textReplaceFunction = (e) => {
    let new_text = e.replaceAll("_", " ");
    return new_text;
  };
  /*Function to verify the applicants documents */
  const onVerifyDocuments = async (id, verify) => {
    try {
      let response = await VarifyEmployerDocument(id, verify);
      if (response.data.message === "successfully") {
        toast.success("Document Verify Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Type array */
  let DocTypeData = [
    "Business T2",
    "Recent PD7A",
    "Business T4",
    "Business Incorporation Certificate",
    "Schedule A",
    "Provincial Business Certificate",
    "Representative Submission Letter",
    "Employment Contract",
    "Offer of Employment",
    "LMIA Summary",
    "LMIA Decision Letter",
    // "passport",
    // "drivers_license",
    // "photograph",
    // "immigration_status",
    // "lmia",
    // "job_offer_letter",
    // "provincial_nominee_letter",
    // "proof_of_funds",
    // "proof_of_employment",
    // "marriage_certificate",
    // "education_metric",
    // "education_higher_secondary",
    // "education_graduation",
    // "education_post_graduation",
    // "resume_or_cv",
    // "ielts",
    // "medical",
    // "police_clearance",
    // "refusal_letter",
  ];

  /*Render method */
  useEffect(() => {
    GetDocument();
    RenderNewDocFile();
    setSelectedAnnotation(null);
    getCommentsList();
    AdminData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [docName, apiCall, isAnnotationMode, docId, adminid, annotationStatus]);

  /*Function to change document type */
  const handleDocTypeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "other") {
      setOtherDoc(true);
      setShowMoreDocType(false);
      setDocTypData("");
      setDocId("");
      setDocName("");
    } else {
      setOtherDoc(false);
      setDocName(selectedValue);
    }
  };

  /*Function to download Document */
  const DownloadDocument = async () => {
    const response = await fetch(docFile);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = docFile + docFileExt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };

  /*Function to Print Document  */
  const PrintDocument = () => {
    const printWindow = window.open("", "_blank");
    const content = `
      <html>
        <head>
          <title>Print Document</title>
        </head>
        <body>
          <embed src="${docFile}" width="100%" height="100%">
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };
  /*Function to delete document  */
  const OnDeleteDoc = async (id) => {
    try {
      let res = await DeleteDocument(id, "employer");
      if (res.data.message === "document deleted successfully!") {
        toast.success("Document deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDocFile("");
        setDocId("");
        setDocData("");
        setDocTypData("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*annnotations main api */
  // Function to add annotation based on conditions
  const addAnnotation = async (annotation) => {
    // Retrieve data from local storage
    const assignedUserId = allAdmin.find((item) => item.email === comments)
      ? allAdmin.find((item) => item.email === comments).admin_id
      : admin_id;
    const email = /\S+@\S+\.\S+/.test(comments) ? comments : "";
    const subject = "";
    const comment = /\S+@\S+\.\S+/.test(comments) ? "" : comments;
    let DocId = docId
      ? docId
      : docData.find((item) => item.type === docName).id;
    // Send data to the API
    try {
      let res = await ADocAnnotation(
        admin_id,
        DocId,
        assignedUserId,
        email,
        subject,
        comment,
        annotation.x_axis,
        annotation.y_axis,
        "employer"
      );
      if (res.data.message === "task inserted successfully!") {
        toast.success("Comment uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAnnotation(null);
        setComments("");
        setApiCall(true);
        setAnnotationMode(!isAnnotationMode);
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "required fields cannot be blank") {
        toast.error(" Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAnnotation(null);
        setComments("");
        setApiCall(true);
        setAnnotationMode(!isAnnotationMode);
        setAddCommentFlag();
      }
    }
    // Update state to include the new annotation
    // setImageAnnotations([...imageAnnotations, { x, y }]);
  };
  /* Function to update comment and assign */
  const OnHandleUpdateComment = async (originalData) => {
    try {
      // Clone the original data to avoid modifying the original object
      const updatedData = { ...originalData };

      // Update the 'status' property in the cloned data
      updatedData.status = "1"; // Replace 'newStatus' with the desired value

      // Call the API with the updated data
      let res = await UpdateDocuentcommentAssign(updatedData);
      if (res.message === "Task updated successfully!") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAnnotation(null);
        setComments("");
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to delete document comments*/
  const OnDeleteComment = async (docId) => {
    try {
      let res = await DeleteCommentsAndAssign(docId);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to set the color code to the background of the user name */
  const determineBackgroundColor = (commentItem) => {
    const colorClasses = [
      "bg-primary-opacity-7",
      "bg-color-warning-opacity-7",
      "bg-orange-opacity-6",
      "bg-info-opacity-7",
      "bg-secondary-opacity-7",
      "bg-danger-opacity-6",
      "bg-info-opacity-visible",
    ];

    const assignedUserId = commentItem.assigned_to_user_id;

    // Create a mapping dynamically based on assignedUserId
    const userColorMap = {};

    // Check if assignedUserId is present in the mapping
    if (assignedUserId && userColorMap.hasOwnProperty(assignedUserId)) {
      return userColorMap[assignedUserId];
    }

    // If not found in the mapping, use the colorClasses logic
    const id = commentItem.id;
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return hash;
    };

    const hash = Math.abs(hashCode(id.toString()));
    const index = hash % colorClasses.length;

    return colorClasses[index];
  };
  /*Function to reply for the comment */
  const ReplyAnnotation = async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={
        // props.page === "company_profile"
        //
        "document_container bg-white py-7 mb-10"
        // : "container document_container bg-white p-5 mb-10"
      }
    >
      <div className="row m-0">
        <div className="col-md-3 p-0 border-right">
          <h5 className="pl-5 pt-5 d-flex justify-content-between align-items-center">
            Document List
          </h5>
          {/* Documents type list */}
          <table className="table font-size-3">
            <thead>
              <tr>
                <th className="p-3" scope="col">
                  Document
                </th>
                <th className="p-3" scope="col">
                  Added By
                </th>
                <th className="p-3" scope="col">
                  Date
                </th>
                <th className="p-3" scope="col">
                  Verified
                </th>
                <th className="p-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {docData.length === 0 ? (
                <tr>
                  <th className="bg-white text-center" colSpan={5}>
                    No Data Found
                  </th>
                </tr>
              ) : (
                (docData || []).map((item, index) => (
                  <tr
                    key={index}
                    action
                    // active={
                    //   docTypData.type === item.type ||
                    //   (showMoreDocType === false && item.type === docName)
                    // }
                    active={item.type === docName}
                    onClick={() => {
                      setShowMoreDocType(false);
                      setDocTypData(item);
                      setDocName(item.type);
                      setDocId(item.id);
                      setOtherDoc(false);
                      setHide(false);
                      setShowSaveDoc(false);
                      setAnnotationMode(!isAnnotationMode);
                      setDocFile(
                        item.document_url +
                          `?v=${
                            new Date().getMinutes() + new Date().getSeconds()
                          }`
                      );
                    }}
                    className={
                      item.type === docName
                        ? "text-capitalize bg-primary text-white"
                        : "text-capitalize"
                    }
                  >
                    <td className="p-3"> {textReplaceFunction(item.type)}</td>
                    <td className="p-3">
                      {item.updated_by_name
                        ? item.updated_by_name
                        : item.created_by_name}
                    </td>
                    <td className="p-3">
                      {moment(item.updated_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-3">
                      {item.is_varify === "1"
                        ? // <span className="verified_doc">
                          //   <img className="w-100" src={Verified} alt="" />
                          // </span>
                          "Yes"
                        : "No"}
                    </td>
                    <td className="p-3">
                      <Link onClick={() => OnDeleteDoc(item.id)}>
                        <CiTrash
                          style={{
                            color: item.type === docName ? "white" : "black",
                            fontSize: "25px",
                          }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* <ListGroup defaultActiveKey="#link1">
        {(docData || []).map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            // active={
            //   docTypData.type === item.type ||
            //   (showMoreDocType === false && item.type === docName)
            // }
            active={item.type === docName}
            onClick={() => {
              setShowMoreDocType(false);
              setDocTypData(item);
              setDocName(item.type);
              setDocId(item.id);
              setOtherDoc(false);
              setHide(false);
              setShowSaveDoc(false);
              setDocFile(
                item.document_url +
                  `?v=${new Date().getMinutes() + new Date().getSeconds()}`
              );
            }}
            className="text-capitalize"
          >
            {textReplaceFunction(item.type)}
            {item.is_varify === "1" ? (
              <span className="verified_doc">
                <img className="w-100" src={Verified} alt="" />
              </span>
            ) : null}
          </ListGroup.Item>
        ))}
        <ListGroup.Item
          className={
            user_type === "company" || user_type === "admin"
              ? "bg-secondary text-white"
              : "d-none"
          }
          onClick={() => {
            setShowMoreDocType(true);
            setDocTypData("");
            setDocId("");
            setOtherDoc(false);
            setDocFile("");
            setHide(false);
            setShowSaveDoc(false);
          }}
        >
          <b>+ Add New Documents</b>
        </ListGroup.Item>
      </ListGroup> */}
        </div>
        <div className="col-md-6">
          <div className="row px-0 pt-0 pb-5 doc_upload_row m-0">
            {showMoreDocType ? (
              <div className="doc_upload_col">
                <Form.Select
                  className="form-control select_document_type"
                  value={docName}
                  onChange={(e) => handleDocTypeChange(e)}
                >
                  <option value={""}>Select document</option>
                  {(DocTypeData || []).map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {textReplaceFunction(item)}
                      </option>
                    );
                  })}
                  <option value={"other"}>Other</option>
                </Form.Select>
              </div>
            ) : (
              <button
                className={
                  user_type === "company" || user_type === "admin"
                    ? "btn btn-secondary btn-sm text-white mr-0"
                    : "d-none"
                }
                onClick={() => {
                  setShowMoreDocType(true);
                  setDocTypData("");
                  setDocId("");
                  setOtherDoc(false);
                  setDocFile("");
                  setHide(false);
                  setShowSaveDoc(false);
                }}
              >
                + Add New Documents
              </button>
            )}
            {otherDoc === true ? (
              <div className="doc_upload_col">
                <input
                  className="form-control"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="Document Name"
                />
              </div>
            ) : null}
            <div className="">
              <label className="btn btn-light">
                <AiOutlineCloudUpload className="font-size-3 mr-2" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleFileChange(e, docTypData.id);
                    setHide(true);
                  }}
                />
                {docTypData.id
                  ? "Update Current Document"
                  : "Upload New Document"}
              </label>
            </div>
            {showSaveDoc ? (
              <div className="doc_upload_col">
                <button className="btn btn-primary" onClick={SaveDocument}>
                  Save Document
                </button>
              </div>
            ) : null}
            {hide === true ? (
              <div className="doc_upload_col">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    setHide(false);
                    setApiCall(true);
                    setShowSaveDoc(false);
                    setDocFile("");
                    setDocFileExt("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
          <div className="doc_preview_box p-5 bg-light rounded position-relative">
            {/* {docTypData ? ( */}
            <div className="doc_action_div">
              {hide === false && docTypData && user_type === "admin" ? (
                <div className="doc_upload_col">
                  {docTypData.is_varify === "1" ? (
                    <img className="verified_doc_img" src={Verified} alt="" />
                  ) : (
                    <button
                      className="btn btn-info"
                      disabled={docTypData.is_varify === "0" ? false : true}
                      onClick={() => onVerifyDocuments(docTypData.id, 1)}
                    >
                      Verify document
                    </button>
                  )}
                </div>
              ) : null}
              {hide === false && docFile && docName && user_type === "admin" ? (
                <div className="doc_upload_col flex-end">
                  <button
                    className="p-1 rounded-3 btn-warning mx-3 w-auto"
                    onClick={PrintDocument}
                    title="Print Document"
                  >
                    <i className="fa fa-print" aria-hidden="true"></i>
                  </button>
                  <button
                    className="p-1 rounded-3 btn-info w-auto"
                    onClick={DownloadDocument}
                    title="Download Document"
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </div>
              ) : null}
            </div>
            {/* Annotation */}
            {docFile ? (
              <div>
                <div
                  id="annotation-container"
                  style={{
                    position: "relative",
                    overflow: "scroll",
                    width: "100%",
                    height: "100vh",
                  }}
                >
                  <div className="d-flex justify-content-center">
                    <RenderNewDocFile />
                  </div>
                  {/* Transparent overlay for capturing click events */}
                  {!hide && docFile && docName && user_type === "admin" && (
                    <>
                      {isAnnotationMode && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {imageAnnotations.map((annotation, index) => (
                        <div
                          key={index}
                          style={{
                            position: "absolute",
                            left: annotation.x_axis - 5,
                            top: annotation.y_axis - 5,
                            cursor: "pointer",
                          }}
                          onClick={() => handleFlagClick(annotation)}
                        >
                          <FaFlag
                            className=""
                            style={{
                              color:
                                selectedAnnotation &&
                                selectedAnnotation.x_axis ===
                                  annotation.x_axis &&
                                selectedAnnotation.y_axis === annotation.y_axis
                                  ? "blue"
                                  : annotation.status === "1"
                                  ? "lightgreen"
                                  : "red",
                              // color: "white",
                            }}
                          />
                        </div>
                      ))}

                      {selectedAnnotation && addCommentFlag === true && (
                        <div
                          style={{
                            position: "absolute",
                            left: selectedAnnotation.x_axis + 10,
                            top: selectedAnnotation.y_axis + 20,
                            zIndex: 1,
                          }}
                        >
                          <form className="comment-form">
                            <div className="comment-input-container">
                              <input
                                type="text"
                                value={comments || ""}
                                onChange={handleInputChange}
                                placeholder="Comments or add others with @"
                                className="rounded-pill comment-input"
                              />
                              {filteredEmails.length > 0 && (
                                <ul className="email-suggestions">
                                  {filteredEmails.map((email) => (
                                    <li
                                      key={email.email}
                                      onClick={() =>
                                        handleEmailClick(email.email)
                                      }
                                      onMouseOver={() =>
                                        handleEmailMouseOver(email.email)
                                      }
                                      className="email-suggestion-item"
                                    >
                                      <strong>{email.name}</strong>{" "}
                                      {email.email}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className="button-container mx-4">
                              <button
                                type="button"
                                onClick={() => {
                                  addAnnotation(selectedAnnotation);
                                  setAddCommentFlag(false);
                                }}
                                className="btn-sm btn-primary rounded-pill save-comment-btn"
                              >
                                Save Comment
                              </button>
                              <button
                                className="btn-sm btn-info rounded-pill cancel-btn"
                                onClick={() => {
                                  setAddCommentFlag();
                                  setSelectedAnnotation(null);
                                  setComments("");
                                  setAnnotationMode(!isAnnotationMode);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center mt-5">No document found</div>
            )}
            {/* Annotation Close */}
            {/* ) : (
          <div className="text-center">
            <h2> No Documents </h2>
          </div>
        )} */}
          </div>
        </div>
        <div className="col-md-3 p-0 border-left">
          <div
            style={
              docData.length === 0 ? { display: "none" } : { marginTop: "20px" }
            }
          >
            <div className="row">
              <div className={"col mx-2 form_group"}>
                <p className="input_label">Filter by Admin:</p>
                <div className="select_div">
                  <select
                    name="admin"
                    value={adminid}
                    id="admin"
                    onChange={(e) => {
                      setAdminId(e.target.value);
                    }}
                    className="text-capitalize form-control"
                  >
                    <option value={""}>Select Admin</option>
                    {(allAdmin || []).map((data) => {
                      return (
                        <option value={data.admin_id} key={data.id}>
                          {data.name} {data.email}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className={"col mx-2 form_group"}>
                <p className="input_label">Filter by Status:</p>
                <div className="select_div">
                  <select
                    name="status"
                    value={annotationStatus}
                    id="status"
                    onChange={(e) => {
                      setAnnotationStatus(e.target.value);
                    }}
                    className="text-capitalize form-control"
                  >
                    <option value={""}>Select Status</option>
                    <option value={"1"}>Done </option>
                    <option value={"0"}>Pending</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-column h-100vh"
              style={{ overflowY: "scroll" }}
            >
              {commentsList.length === 0 ? (
                <div className="text-center mt-5">
                  <h5>No comments</h5>
                </div>
              ) : (
                (commentsList || []).map((commentItem, index) => (
                  <div
                    className={`card m-2 ${
                      selectedAnnotation &&
                      selectedAnnotation.x_axis === commentItem.x_axis &&
                      selectedAnnotation.y_axis === commentItem.y_axis
                        ? "highlighted-comment"
                        : ""
                    }`}
                    style={{
                      backgroundColor: "#edf2fa",
                      color: "white",
                    }}
                    onClick={() =>
                      setSelectedAnnotation({
                        x_axis: commentItem.x_axis,
                        y_axis: commentItem.y_axis,
                      })
                    }
                    key={index}
                  >
                    <p className="d-flex flex-row-reverse mt-2 mx-3">
                      <span
                        style={{
                          cursor: "pointer",
                          margin: "2px",
                          color: commentItem.status === "0" ? "blue" : "white",
                          borderRadius: "40px",
                          border:
                            commentItem.status === "0" ? "solid 1px blue" : "",
                          padding: "1px 5px",
                          backgroundColor:
                            commentItem.status === "1" && "lightgreen",
                        }}
                        onClick={
                          commentItem.status === "0"
                            ? (e) => {
                                OnHandleUpdateComment(commentItem);
                              }
                            : null
                        }
                      >
                        &#x2713; {/* Checkmark symbol */}
                      </span>
                    </p>
                    <div className="card-body">
                      <div className="text-dark h4">
                        <span
                          className={`rounded-circle text-capitalize px-2 mx-2 text-white ${determineBackgroundColor(
                            commentItem
                          )}`}
                        >
                          {commentItem.assined_to_user_id
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.assined_to_user_id
                              )
                              ? allAdmin
                                  .find(
                                    (item) =>
                                      item.admin_id ===
                                      commentItem.assined_to_user_id
                                  )
                                  .name.charAt(0)
                              : ""
                            : ""}
                        </span>
                        {commentItem.assined_to_user_id
                          ? allAdmin.find(
                              (item) =>
                                item.admin_id === commentItem.assined_to_user_id
                            )
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.assined_to_user_id
                              ).name
                            : ""
                          : ""}
                        <br />
                        <span className="text-gray-400 h6 mx-8">
                          {moment(commentItem.created_on).format("HH:mm D MMM")}
                        </span>
                      </div>

                      {commentItem.subject_description && (
                        <h5 className="card-title text-break">
                          {commentItem.subject_description}
                        </h5>
                      )}
                      {commentItem.assigned_to && (
                        <div
                          style={{
                            borderRadius: "15px",
                            padding: "5px 10px",
                            margin: "5px 0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            className="text-break"
                            to={`mailto:${commentItem.assigned_to}`}
                            style={{ marginLeft: "5px" }}
                          >
                            {`@${commentItem.assigned_to}`}
                          </Link>
                        </div>
                      )}
                    </div>
                    {replyCommentClick === commentItem.id ? (
                      <form className="comment-form x-auto flex-start">
                        <div className="comment-input-container">
                          <input
                            type="text"
                            value={replyComment || ""}
                            onChange={(e) => handleInputChange(e, "reply")}
                            placeholder="Comments or add others with @"
                            className="rounded-pill comment-input"
                          />
                          {filteredEmails.length > 0 && (
                            <ul className="email-suggestions">
                              {filteredEmails.map((email) => (
                                <li
                                  key={email}
                                  onClick={() => handleEmailClick(email.email)}
                                  onMouseOver={() =>
                                    handleEmailMouseOver(email.email, "reply")
                                  }
                                  className="email-suggestion-item"
                                >
                                  <strong>{email.name}</strong> {email.email}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="button-container mb-3">
                          <button
                            type="button"
                            onClick={() => {
                              ReplyAnnotation(commentItem);
                            }}
                            className="btn-sm btn-primary rounded-pill save-comment-btn"
                          >
                            Reply Comment
                          </button>
                          <button
                            className="btn-sm btn-info rounded-pill cancel-btn"
                            onClick={() => setReplyCommentClick()}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <Link
                        onClick={() => setReplyCommentClick(commentItem.id)}
                      >
                        <FaReplyAll />
                      </Link>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
