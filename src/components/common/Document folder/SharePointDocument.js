import React, { useState, useEffect } from "react";
import {
  /*getSharePointFoldersList,*/ DeleteFolderOrDocument,
  getFolderBreadcrumb,
  AddSharePointFolders,
  getSharePointParticularFolders,
  AddSharePointDOcument,
  getallAdminData,
  GetCommentsAndAssign,
  GetDocConvertToken,
} from "../../../api/api";
import { Dropdown, Form } from "react-bootstrap";
import SAlert from "../../common/sweetAlert";
import { Link } from "react-router-dom";
import { IoMdArrowBack, IoMdClose, IoMdPersonAdd } from "react-icons/io";
import FolderList from "./FolderList";
import { toast } from "react-toastify";
// import DocSaveForm from "./DocSaveForm";
import Loader from "../loader";
import Breadcrumbs from "./Breadcrumb";
import EditDocNameFOrm from "./EditDocNameFOrm";
// import PreviewDocument from "./PreviewDocument";
// import PdfViewerComponent from "../../PdfViewerComponent";
import AdobePDFViewer from "../Adobe/adobeFile";
import { jsPDF } from "jspdf";
import MentionAdminInDoc from "../Adobe/MentionAdminInDoc";
// import { PDFDocument } from 'pdf-lib';

export default function SharePointDocument({
  emp_user_type,
  user_id,
  folderId,
  notification,
  docId,
  docTypePage,
}) {
  const [docTypeName, setDocTypeName] = useState("");
  const [newType, setNewType] = useState("");
  const [docFileBase, setDocFileBase] = useState("");
  const [folderID, setFolderID] = useState(folderId);
  const [apiCall, setApiCall] = useState(false);
  const [saveBtn, setSaveBtn] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [breadcrumbData, setBreadcrumbData] = useState("");
  const [docTypeList, setDocTypeList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showMentionAdminDropDown, setMentionAdminShowDropDown] =
    useState(false);
  const [selectedMentionAdmin, setSelectedMentionAdmin] = useState([]);
  const [editNameForm, setEditNameForm] = useState(false);
  const [docSingleDate, setDocSingleDate] = useState("");
  const [docPreview, setDocPreview] = useState(false);
  const [docLoder, setDocLoder] = useState(false);
  const [docBreadCrumbLoder, setBreadCrumbLoder] = useState(false);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const [adminList, setAdminList] = useState([]);
  const [taggedadmin, setTaggedAdmin] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [commentsRes, setCommentsRes] = useState();
  const [imgConRes, setImgConRes] = useState();
  const [convertedDoc, setConvertedDoc] = useState("");

  // Generate a list of comments from the state for image annotation
  const getCommentsList = async (data) => {
    if (data) {
      try {
        let res = await GetCommentsAndAssign(
          data.id, //docId,
          "", // adminid,
          "", // annotationStatus,
          "document"
        );
        if (res.data.status === (1 || "1")) {
          // setCommentsList(res.data.data.data.map(obj =>
          //   JSON.parse(obj.doctaskjson)
          // ));
          // if (
          //   data.file.mimeType === "application/pdf" ||
          //   data.file.mimeType === "image/jpeg" ||
          //   data.file.mimeType === "image/png" ||
          //   data.file.mimeType === "image/jpg"
          //   // docTypePage === "adobe"
          // ) {
          //   setCommentsList(res.data.data.data);
          // } else {
          //   setCommentsList(
          //     res.data.data.data.map((obj) => {
          //       const parsedObj = JSON.parse(obj.doctaskjson);
          //       if (parsedObj.hasOwnProperty("text")) {
          //         parsedObj.text = convertHtmlToText(parsedObj.text);
          //       }
          //       return parsedObj;
          //     })
          //   );
          // }
          setCommentsList(res.data.data.data);
          setCommentsRes(res.data.status);
          if (res.data.data.data[0]?.assined_to_user_id) {
            setMentionAdminShowDropDown(true);
          }
          // setImageAnnotations(res.data.data.data);
        } else if (res.data.message === "Task data not found") {
          setCommentsList([]);
        }
      } catch (err) {
        console.log(err);
        setCommentsList([]);
      }
      if (
        data.file.mimeType === "image/jpeg" ||
        data.file.mimeType === "image/png" ||
        data.file.mimeType === "image/jpg"
      ) {
        convertUrlToPDF(data["@microsoft.graph.downloadUrl"]);
      } else if (
        data.file.mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        convertToPDF(data);
      } else {
        setConvertedDoc(data["@microsoft.graph.downloadUrl"]);
      }
    } else {
      setCommentsList([]);
    }
  };
  // const documentID = "YOUR_DOCUMENT_ID"; // Replace YOUR_DOCUMENT_ID with the actual document ID
  const AdminData = async () => {
    try {
      const userData = await getallAdminData();
      if (userData.data.length === 0) {
        setAdminList([]);
      } else {
        // const filteredData = userData.data.filter(item => item.admin_type === "manager");
        setAdminList(userData.data);
        // setAdminList(userData.data.map(obj => ({
        //   name: obj.name,
        //   id: obj.admin_id,
        //   description: obj.email,
        //   displayName: obj.name
        // })))
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteData(e);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
    setEditNameForm(false);
  };
  const DocTypeData =
    emp_user_type === "employer"
      ? [
          "Business T2",
          "Recent PD7A",
          "Business T4",
          "Business Incorporation Certificate",
          "Employment Contract",
          "Schedule A",
          "Signed Job Offer",
          "PD7A of year",
          "T2 Schedule 100 and 125",
          "Certificate of incorporation",
          "Business license",
          "T4 summary of year",
          "Request for Exception from English Language Requirement for LMIA Application",
          "CPA Attestation Letter",
          "Representative Submission Letter",
        ]
      : [
          "passport",
          "drivers_license",
          "photograph",
          "immigration_status",
          "lmia",
          "job_offer_letter",
          "provincial_nominee_letter",
          "proof_of_funds",
          "proof_of_employment",
          "marriage_certificate",
          "education_metric",
          "education_higher_secondary",
          "education_graduation",
          "education_post_graduation",
          "resume_or_cv",
          "ielts",
          "medical",
          "police_clearance",
          "refusal_letter",
          "Employment Contract",
          "Reference Letters",
          "Client Info",
          "Representative Submission Letter",
          "Bank Statement",
        ];

  /*Function to call api to get all folders list of employees documnet from sharepoint */
  const AllShareType = async () => {
    setDocLoder(true);
    setBreadCrumbLoder(true);
    try {
      // if (folderID) {
      let res = await getSharePointParticularFolders(
        user_id,
        emp_user_type,
        // docId ? folderId :
        folderID
      );
      if (res.data.status === 1) {
        setDocPreview(false);
        setDocTypeList(res.data.data);
        setShowDropDown(false);
        setDocLoder(false);
        if (notification === "yes") {
          if (res.data.data.find((item) => item.id === docId)) {
            setDocPreview(true);
            setDocSingleDate(res.data.data.find((item) => item.id === docId));
            getCommentsList(res.data.data.find((item) => item.id === docId));
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          }
        }
        // setFolderID(res.data.data[0].parentReference.id)
      } else if (res.data.data === "No Documents Found") {
        setDocTypeList([]);
        setShowDropDown(false);
        setDocLoder(false);
      }
      // } else {
      //     let res = await getSharePointFoldersList(user_id, emp_user_type)
      //     if (res.data.status === 1) {
      //         setDocTypeList(res.data.data)
      //     }
      // }
    } catch (Err) {
      console.log(Err);
      setShowDropDown(false);
      setDocLoder(false);
    }
    /*Api for breadcrumb */
    try {
      let res = await getFolderBreadcrumb(folderID);
      setBreadcrumbData(res.data.data);
      setShowDropDown(false);
      setBreadCrumbLoder(false);
    } catch (err) {
      setBreadcrumbData([]);
      console.log(err);
      setShowDropDown(false);
      setBreadCrumbLoder(false);
    }
  };
  useEffect(() => {
    AllShareType();
    if (localStorage.getItem("userType") === "admin") {
      AdminData();
    }

    // if (notification === "yes") {
    //     setDocPreview(true)
    // }
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line
  }, [folderID, apiCall, docId]);
  /*On change fnction to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;
    {
      // Check the number of files selected
      if (files.length > 30) {
        toast.error("You can only upload a maximum of 30 files at a time", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return;
      }

      // Continue with file validation and processing
      const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
      const maxSize = 1024 * 8000; // 8 MB

      const filebseList = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Check file type
        const fileType = `.${file.name.split(".").pop()}`;
        if (!allowedTypes.includes(fileType.toLowerCase())) {
          toast.error(
            `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            }
          );
          return;
        }

        // Check file size
        if (file.size > maxSize) {
          toast.error(
            `Document size can't be more than 8 MB for file '${file.name}'`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            }
          );
          return;
        }

        // Read file as data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        //For drive uploade
        filebseList.push(file);
      }
      // Store the object of files
      setDocFileBase(filebseList);
      setSaveBtn(true);
      //   bulkUpload === "no" ? setDocName(DocRealName) : setDocName("");
    }
  };
  //Document Save Function
  const SaveBulkDocument = async () => {
    setLoadingBtn(true);
    setShowDropDown(false);
    try {
      let res = await AddSharePointDOcument(
        user_id,
        emp_user_type,
        folderID,
        docTypeName,
        docFileBase
      );
      if (res.data.message === "Document Upload") {
        toast.success(`Document Uploaded successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setLoadingBtn(false);
        setSaveBtn(false);
        setShowDropDown(false);
      }
    } catch (err) {
      console.log(err);
      setLoadingBtn(false);
      setSaveBtn(false);
      setShowDropDown(false);
    }
  };
  /*Had folder function */
  const handleDocTypeChange = async (selectedType) => {
    setDocTypeName(selectedType);
    setShowDropDown(false);
    if (selectedType === "other") {
      // If "other" is selected, clear newType
      setNewType("");
    } else {
      try {
        let res = await AddSharePointFolders(selectedType, folderID);
        if (
          res.data.data.name &&
          res.data.message === "Folder created successfully!"
        ) {
          toast.success(`Type Created successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true);
        } else if (res.data.data.error.message === "Name already exists") {
          toast.error(`Type Already exists`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      } catch (Err) {
        console.log(Err);
      }
    }
  };
  /*Type folder name function */
  const handleNewTypeChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setNewType(value);
  };
  /*To call Api to delete Folder or document */
  async function DeleteSharepointDocument(id, type) {
    try {
      const responseData = await DeleteFolderOrDocument(id, type);
      if (responseData.data.message === "Document deleted successfully!") {
        toast.error("Document deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        CancelDelete();
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*Function to convert the Image into pdf */
  const convertUrlToPDF = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin resource sharing (CORS) for the image
    img.src = imageUrl;
    img.onload = () => {
      const doc = new jsPDF();
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      let imgWidth, imgHeight;
      const imgAspectRatio = img.width / img.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      if (imgAspectRatio > pdfAspectRatio) {
        // Image is wider than the PDF page
        imgWidth = pdfWidth;
        imgHeight = imgWidth / imgAspectRatio;
      } else {
        // Image is taller than or equal to the PDF page
        imgHeight = pdfHeight;
        imgWidth = imgHeight * imgAspectRatio;
      }
      const xPosition = (pdfWidth - imgWidth) / 2;
      const yPosition = (pdfHeight - imgHeight) / 2;
      doc.addImage(img, "JPEG", xPosition, yPosition, imgWidth, imgHeight); // Set the image dimensions to fit the PDF page
      // Convert PDF to Blob
      const pdfBlob = doc.output("blob");
      // Convert PDF Blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setConvertedDoc(base64String);
        if (base64String) {
          setImgConRes("imageConverted");
        }
      };
      reader.readAsDataURL(pdfBlob);
    };
  };
  // Function to convert a docx to pdf
  const convertToPDF = async (data) => {
    try {
      let response = await GetDocConvertToken();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${response.data.data}`);
      myHeaders.append("Content-type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://graph.microsoft.com/v1.0${data.parentReference.path}/${data.name}:/content?format=pdf`,
        requestOptions
      )
        .then(function (resp) {
          return resp.blob();
        })
        .then(function (blob) {
          setConvertedDoc(window.URL.createObjectURL(blob));
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error downloading or parsing the file:", error);
    }

    return; // Return the base64 PDF data
  };
  return (
    <>
      {folderId ? (
        <div className="document_section">
          {docPreview ? (
            <div className="App-viewer">
              <div className="row m-0 bg-white document_preview_box h-100vh overflow-hidden">
                <div className={` p-2 col-md-12 col-lg-12 col-sm-12`}>
                  <div className="back_btn_div">
                    <Link
                      className="rounded-circle back-btn"
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        background: "#fff",
                        width: 30,
                        height: 30,
                        zIndex: 9999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none", // Added to remove underline from Link
                      }}
                      to=""
                      onClick={() => {
                        setDocSingleDate("");
                        setDocPreview(false);
                        setCommentsRes("");
                        setFolderID(docSingleDate.parentReference.id);
                        setConvertedDoc("");
                        setShowDropDown("");
                        setCommentsList("");
                        setMentionAdminShowDropDown(false);
                      }}
                    >
                      <IoMdArrowBack />
                    </Link>
                    {/* Mention admin code */}
                    {localStorage.getItem("userType") === "admin" && (
                      <div
                        className="mention_div"
                        style={{
                          position: "absolute",
                          top: 14,
                          right: "27%", // Changed to align with the right side
                          background: "#fff",
                          zIndex: 9999,
                          justifyContent: "center",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "#4b4b4b",
                          maxWidth: 200,
                        }}
                      >
                        <Link
                          className="rounded-circle add-person-btn" // Changed class name for clarity
                          to=""
                          title="Mention Admin"
                          style={{
                            color: "#333",
                            width: 24,
                            height: 24,
                            backgroundColor: "#eee",
                            textAlign: "center",
                            margin: "0 3px 3px 0",
                          }}
                          onClick={() => {
                            showMentionAdminDropDown === true
                              ? setMentionAdminShowDropDown(false)
                              : setMentionAdminShowDropDown(true);
                          }}
                        >
                          {showMentionAdminDropDown === false ? (
                            <IoMdPersonAdd />
                          ) : (
                            <IoMdClose />
                          )}
                        </Link>
                        {taggedadmin.map(
                          (user, index) =>
                            // <div
                            //   key={index}
                            //   className="badgebadge badge-pill badge-info"
                            //   style={{ fontSize: 12 }}
                            // >
                            //   {user.name}
                            //   <span className="d-none">
                            //     {user.email} {user.admin_id} {user.admin_type}
                            //   </span>
                            // </div>
                            user.profile_image === null ||
                            user.profile_image === "" ||
                            user.profile_image === undefined ? (
                              <span
                                className="rounded-circle"
                                data-toggle="tooltip"
                                data-placement="top"
                                style={{
                                  width: 24,
                                  height: 24,
                                  backgroundColor: "red",
                                  color: "#fff",
                                  textAlign: "center",
                                  cursor: "pointer",
                                  margin: "0 3px 3px 0",
                                }}
                                title={user.name}
                              >
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            ) : (
                              <img
                                className="rounded-circle"
                                data-toggle="tooltip"
                                data-placement="top"
                                title={user.name}
                                style={{
                                  width: 24,
                                  height: 24,
                                  cursor: "pointer",
                                  margin: "0 3px 3px 0",
                                }}
                                src={
                                  user.profile_image === null ||
                                  user.profile_image === "" ||
                                  user.profile_image === undefined
                                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                    : user.profile_image
                                }
                                alt={user.name}
                              />
                            )
                          // {user.name.charAt(0).toUpperCase()}
                        )}
                        {showMentionAdminDropDown === true ? (
                          <MentionAdminInDoc
                            adminList={adminList}
                            setMentionAdminShowDropDown={
                              setMentionAdminShowDropDown
                            }
                            selectedMentionAdmin={selectedMentionAdmin}
                            setSelectedMentionAdmin={setSelectedMentionAdmin}
                            commentsList={commentsList}
                            docPreview={docPreview}
                            userId={user_id}
                            data={docSingleDate}
                            setCommentsList={setCommentsList}
                            setTaggedAdmin={setTaggedAdmin}
                          />
                        ) : null}
                      </div>
                    )}
                  </div>

                  {
                    // docTypePage === "adobe"
                    (docSingleDate.file.mimeType === "application/pdf" ||
                      ((docSingleDate.file.mimeType === "image/jpeg" ||
                        docSingleDate.file.mimeType === "image/png" ||
                        docSingleDate.file.mimeType === "image/jpg") &&
                        imgConRes === "imageConverted") ||
                      docSingleDate.file.mimeType ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                    convertedDoc ? (
                      // <PreviewDocument
                      //   docData={docSingleDate}
                      //   docId={docId ? docId : folderID}
                      //   userId={user_id}
                      //   docFile={docSingleDate["@microsoft.graph.downloadUrl"]}
                      //   setDocPreview={setDocPreview}
                      //   setDocSingleDate={setDocSingleDate}
                      //   setFolderID={setFolderID}
                      //   commentsList={commentsList}
                      // />
                      commentsRes ? (
                        <AdobePDFViewer
                          url={convertedDoc}
                          data={docSingleDate}
                          userId={user_id}
                          commentsList={commentsList}
                          selectedMentionAdmin={selectedMentionAdmin}
                        />
                      ) : null
                    ) : (
                      <Loader />
                    )
                    // :
                    // commentsRes ? (
                    //   <PdfViewerComponent
                    //     document={docSingleDate["@microsoft.graph.downloadUrl"]}
                    //     adminDetailsFOrMention={adminList}
                    //     data={docSingleDate}
                    //     userId={user_id}
                    //     commentsList={commentsList}
                    //   />
                    // ) : null
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className={"document_container bg-white"}>
              <div className="row m-0 bg-white justify-content-between p-2">
                {/* Breadcrumbs */}
                {docBreadCrumbLoder ? (
                  <ul className="breadcrumb">
                    <li
                      className="breadcrumb-item "
                      style={{ padding: 5, margin: 0, borderRadius: 3 }}
                    >
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span>Loading...</span>
                    </li>
                  </ul>
                ) : (
                  <Breadcrumbs
                    data={breadcrumbData}
                    setFolderID={setFolderID}
                  />
                )}
                {/* Button to add folder or type and upload documents */}
                <div className="new_folder_create d-flex">
                  {docTypeName === "other" ? (
                    <>
                      <Form.Control
                        type="text"
                        value={newType}
                        placeholder="Enter new type"
                        height={34}
                        style={{ Height: 34 }}
                        onChange={handleNewTypeChange}
                        className="px-2"
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        style={{ maxHeight: 34, minWidth: "auto" }}
                        onClick={() => handleDocTypeChange(newType)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondry"
                        type="button"
                        style={{ maxHeight: 34, minWidth: "auto" }}
                        onClick={() => setDocTypeName("")}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        size={"sm"}
                        style={{ maxHeight: 34 }}
                        id="dropdown-basic"
                      >
                        + Add New Folder
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        style={{ height: "400px", overflowY: "scroll" }}
                      >
                        <Dropdown.Item
                          onClick={() => handleDocTypeChange("")}
                          key={-1}
                        >
                          Select Folder Name
                        </Dropdown.Item>
                        {DocTypeData.map((item, index) => (
                          <Dropdown.Item
                            onClick={() => handleDocTypeChange(item)}
                            key={index}
                            className="text-capitalize"
                          >
                            {item.replaceAll("_", " ")}
                          </Dropdown.Item>
                        ))}
                        <Dropdown.Item
                          onClick={() => handleDocTypeChange("other")}
                        >
                          Other
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="row m-0 bg-white px-2 pb-2 justify-content-center">
                {/* List of documents docTypeList */}
                {docLoder ? (
                  <div className="table-responsive main_table_div">
                    <Loader />
                  </div>
                ) : (
                  <FolderList
                    docTypeList={docTypeList}
                    setFolderID={setFolderID}
                    setDocTypeName={setDocTypeName}
                    folderID={folderID}
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    setDocSingleDate={setDocSingleDate}
                    setEditNameForm={setEditNameForm}
                    ShowDeleteAlert={ShowDeleteAlert}
                    setDocPreview={setDocPreview}
                    handleBulkFileChange={handleBulkFileChange}
                    saveBtn={saveBtn}
                    loadingBtn={loadingBtn}
                    SaveBulkDocument={SaveBulkDocument}
                    setSaveBtn={setSaveBtn}
                    setDocFileBase={setDocFileBase}
                    getCommentsList={getCommentsList}
                  />
                )}
              </div>
              {editNameForm && (
                <EditDocNameFOrm
                  userId={user_id}
                  name={docSingleDate.name}
                  docId={docSingleDate.id}
                  userType={emp_user_type}
                  show={editNameForm}
                  close={() => setEditNameForm(false)}
                  setApiCall={setApiCall}
                  EditNameType={docSingleDate.folder ? "folder" : "file"}
                />
              )}
              <SAlert
                show={deleteAlert}
                title={deleteData ? deleteData.name : ""}
                text="Are you Sure you want to delete !"
                onConfirm={() =>
                  DeleteSharepointDocument(
                    deleteData.id,
                    deleteData.folder ? "folder" : "document"
                  )
                }
                showCancelButton={true}
                onCancel={() => CancelDelete()}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="chat_box_container bg-white row m-0">
          <div className="chat-container d-flex justify-content-center align-items-center w-100">
            Update the user profile to get a folder
          </div>
        </div>
      )}
    </>
  );
}
