import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  AddSharePointDOcument,
  DeleteFolderOrDocument,
  getallAdminData,
  GetCommentsAndAssign,
  getFolderBreadcrumb,
  GetSharePointData,
  getSharePointParticularFolders,
} from "../../api/api";
import convertUrlToPDF from "./Common function/convertUrlToPdf";
import convertWordToPDF from "./Common function/ConvertWordToPdf";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import AdobePDFViewer from "./Adobe/adobeFile";
import Breadcrumbs from "./Document folder/Breadcrumb";
import DocumentsNotes from "./Document folder/DocumentsNotes";
import Loader from "./loader";
import FolderList from "./Document folder/FolderList";
import EditDocNameForm from "./Document folder/EditDocNameFOrm";
import SAlert from "./sweetAlert";
// import ExcelToPdfConverter from "./Common function/ExcelToPdfConverter";
import AddFolderModal from "./Document folder/AddFolderModal";
import ConvertPPT from "./Common function/ConvertPPT";
// import ConvertAnyFileToPdf from "./Common function/ConvertAnyFileTopdf";
// import ConvertAnyFileToPdf from "./Common function/ConvertAnyFileTopdf";
// import convertPPTtoPDF from "./Common function/PpttoPdf";
export default function ApplicantTypeDocuments(props) {
  const [docFileBase, setDocFileBase] = useState([]);
  let [openFolderModal, setOPenFolderModal] = useState(false);

  let location = useLocation();
  const [state, setState] = useState({
    docTypeName: "",
    openNoteForm: false,
    newType: "",
    // docFileBase: [],
    folderID: props?.folderId,
    fileID: "",
    apiCall: false,
    saveBtn: false,
    loadingBtn: false,
    breadcrumbData: "",
    docTypeList: [],
    showDropDown: false,
    showMentionAdminDropDown: false,
    selectedMentionAdmin: [],
    editNameForm: false,
    docSingleDate: "",
    docPreview: false,
    docLoader: false,
    docBreadCrumbLoader: false,
    deleteAlert: false,
    deleteData: null,
    adminList: [],
    partnerList: [],
    taggedAdmin: [],
    commentsList: [],
    imgConRes: null,
    convertedDoc: "",
    noteText: "",
    docNoteData: {},
    totalData: "",
    pageNo: 1,
    recordsPerPage: 10,
    columnName: "lastModifiedDateTime",
    sortOrder: "DESC",
    uploadProgress: 0
  });

  /*On change function to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;

    // Limit to 15 files
    if (files.length > 15) {
      toast.error("You can only upload a maximum of 15 files at a time", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const maxSize = 1024 * 8000; // 8 MB
    const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

    // Start with existing files or initialize
    const existingFiles = Array.isArray(docFileBase) ? [...docFileBase] : [];
    const newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const lastDotIndex = file.name.lastIndexOf(".");
      let fileName = file.name.substring(0, lastDotIndex).replace(/\.+/g, "");
      const fileExtension = file.name.substring(lastDotIndex + 1);
      const finalFileName = `${fileName}.${fileExtension}`;

      const updatedFile = new File([file], finalFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });

      // Validate file type
      const fileType = `.${fileExtension.toLowerCase()}`;
      if (!allowedTypes.includes(fileType)) {
        toast.error(
          `Invalid document type for file '${finalFileName}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Validate file size
      if (updatedFile.size > maxSize) {
        toast.error(
          `Document size can't be more than 8 MB for file '${finalFileName}'`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Prevent duplicates
      const isDuplicate = existingFiles.some(f => f.name === finalFileName) || newFiles.some(f => f.name === finalFileName);
      if (!isDuplicate) {
        newFiles.push(updatedFile);
      }
    }

    const updatedFiles = [...existingFiles, ...newFiles];

    // Save states
    setDocFileBase(updatedFiles); // List of files
    setState((prev) => ({
      ...prev,
      saveBtn: true,
    }));
  };
  const handleSort = (column) => {
    setState((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "DESC" ? "ASC" : "DESC",
      columnName: column,
    }));
  }

  const fetchAdminData = async () => {
    try {
      const userData = await getallAdminData();
      setState((prev) => ({
        ...prev,
        adminList: userData.data.length ? userData.data : [],
      }));

      // if (window.location.pathname === `/${props?.user_id}`) {
      //   const partnerData = await GetAgent();
      //   const newPartnerList = partnerData.data.data.filter(
      //     (item) => item.id === props?.partnerId
      //   );
      //   setState((prev) => ({
      //     ...prev, partnerList: newPartnerList
      //   }));
      // }
    } catch (err) {
      console.error(err);
    }
  };
  /*Function to convert data  */
  const GetNoteText = (data, isOpen) => {
    fetch(data["@microsoft.graph.downloadUrl"])
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the file");
        }
        let data = await response.text();
        return data;
      })
      .then((text) => {
        setState((prev) => ({
          ...prev,
          noteText: text,
        }));
        if (isOpen) {
          setState((prev) => ({
            ...prev,
            openNoteForm: true,
          }));
        }
      })
      .catch((error) => console.error("Error fetching the file:", error));
  };

  const getCommentsList = async (data) => {
    if (!data)
      return setState((prev) => ({
        ...prev,
        commentsList: [],
      }));

    try {
      localStorage.setItem("mentionAdmin", "");
      const res = await GetCommentsAndAssign(data.id, "", "", "document");

      if (res.data.status === 1) {
        setState((prev) => ({
          ...prev,
          commentsList: res.data.data.data,
        }));
        if (res.data.data.data.some((item) => JSON.parse(item?.doctaskjson))) {
          fetchAdminData();
        }
      } else {
        setState((prev) => ({
          ...prev,
          commentsList: [],
        }));
      }
    } catch (err) {
      console.error(err);
      setState((prev) => ({
        ...prev,
        commentsList: [],
      }));
    }
  };

  const handleDocumentConversion = async (data) => {
    const mimeType = data?.file?.mimeType;
    const downloadUrl = data["@microsoft.graph.downloadUrl"];
    if (["image/jpeg", "image/png", "image/jpg"].includes(mimeType)) {
      let res = await convertUrlToPDF(downloadUrl);
      setState((prev) => ({
        ...prev,
        convertedDoc: res,
      }));
      //  if (state.base64String) {
      setState((prev) => ({
        ...prev,
        imgConRes: "imageConverted",
      }));
      // }
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      let res = await convertWordToPDF(data);
      // console.log(res)s
      if (res) {
        setState((prev) => ({
          ...prev,
          convertedDoc: res,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          convertedDoc: "",
          docPreview: false,
        }));
      }
    } else if (mimeType === "text/plain") {
      GetNoteText(data, true);
    } else if (mimeType === "application/pdf") {
      setState((prev) => ({
        ...prev,
        convertedDoc: downloadUrl,
      }));
    } else
      if (
        data.file.mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || data.file.mimeType === "application/vnd.ms-powerpoint"
        // || data.file.mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        let res = await ConvertPPT(data)
        if (res) {
          setState((prev) => ({
            ...prev,
            convertedDoc: res,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            convertedDoc: "",
            docPreview: false,
          }));
        }
      }
      // else if (
      //   data.file.mimeType ===
      //   "application/vnd.ms-excel"
      // ) {
      //   if (data["@microsoft.graph.downloadUrl"]) {
      //     try {
      //       let res = await ConvertAnyFileToPdf(
      //         data
      //       );
      //       // console.log(res);
      //       setState((prev) => ({
      //         ...prev,
      //         convertedDoc: `data:application/pdf;base64,${res}`,
      //       }));
      //     } catch (error) {
      //       console.error("Error converting Excel to PDF:", error);
      //       setState((prev) => ({
      //         ...prev,
      //         convertedDoc: "",
      //         docPreview: false,
      //       }));
      //     }
      //   }
      // }
      else {
        // console.log(data, "other")
        window.open(data.webUrl);
        setState((prev) => ({
          ...prev,
          convertedDoc: "",
          docPreview: false,
        }));
        // convertPPTtoPDF(data["@microsoft.graph.downloadUrl"])
        //   let res = await ConvertAnyFileToPdf(data)
        //   console.log(res)
        //   setState((prev) => ({
        //     ...prev,
        //     convertedDoc: `data:application/pdf;base64,${res}`,
        //   }));
      }
  };

  const showDeleteAlert = (data) =>
    setState((prev) => ({
      ...prev,
      deleteData: data,
      deleteAlert: true,
    }));

  const cancelDelete = () =>
    setState((prev) => ({
      ...prev,
      deleteAlert: false,
      editNameForm: false,
    }));

  // Fetch all sharepoint documents
  const fetchAllShareType = async () => {
    try {
      setState((prev) => ({
        ...prev,
        docLoader: true,
      }));
      const res = await getSharePointParticularFolders(
        props?.user_id,
        props?.emp_user_type,
        props?.docId ? props?.folderId : state?.folderID,
        state?.columnName,
        state?.sortOrder,
        state?.recordsPerPage,
        state?.pageNo,
        props?.docId || ""
      );
      if (
        res.data.data === "Lifetime validation failed, the token is expired."
      ) {
        try {
          let response = await GetSharePointData();
          if (response.status === 1 || "1") {
            setState({ ...state, apiCall: true });
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (res.data.status === 1) {
        // console.log("first", res.data.data)
        setState((prev) => ({
          ...prev,
          docTypeList: res.data.data,
          totalData: res.data.total_rows,
          showDropDown: false,
          docLoader: false,
          docNoteData: res.data.notes ? res.data.notes : {},
        }));
        if (props?.notification === "yes") {
          const currentDoc = res.data.data.find((item) =>
            item.id === state?.fileID ? state?.fileID : props?.docId
          );
          if (currentDoc) {
            setState({
              ...state,
              docPreview: true,
              docSingleDate: currentDoc,
              fileID: currentDoc.id,
            });
            // console.log(currentDoc);
            handleDocumentConversion(currentDoc);
            getCommentsList(currentDoc);
            fetchAdminData();
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            localStorage.setItem("navigation_url", "");
          } else {
            toast.error("This document is no longer available.", {
              position: "top-right",
              autoClose: 1000,
            });
          }
        }
      } else {
        // console.log("ppppp", state?.docTypeList)
        setState((prev) => ({
          ...prev,
          docTypeList: [],
          totalData: 0,
          showDropDown: false,
          docLoader: false,
          docNoteData: [],
        }));
      }
    } catch (err) {
      console.error(err);
      // console.log("ooooooo", state?.docTypeList)
      setState((prev) => ({
        ...prev,
        docTypeList: [],
        totalData: 0,
        showDropDown: false,
        docLoader: false,
        docNoteData: [],
      }));
    }
    try {
      setState((prev) => ({
        ...prev,
        docBreadCrumbLoader: true,
      }));
      let res = await getFolderBreadcrumb(state.folderID);
      if (res.data.status === (1 || "1")) {
        setState((prev) => ({
          ...prev,
          breadcrumbData: res.data.data,
          docBreadCrumbLoader: false,
          showDropDown: false,
        }));
        /*Api calling to changes employee_id or employer_id  to as per the user name */
        // if (
        //   res.data.data[0].name === `${emp_user_type}_${user_id}` ||
        //   res.data.data[0].name !== `${user_name}_${user_id}`
        // ) {
        //   try {
        //     // let MainFolderNameRes =
        //     await ChangeFolderNameSharpoint(
        //       user_id,
        //       emp_user_type,
        //       `${user_name}_${user_id}`,
        //       res.data.data[0].id
        //     );
        //   } catch (Err) {
        //     console.log(Err);
        //   }
        // }
      } else {
        setState((prev) => ({
          ...prev,
          docBreadCrumbLoader: false,
          showDropDown: false,
          breadcrumbData: [],
        }));
      }
    } catch (err) {
      console.log(err);
      setState((prev) => ({
        ...prev,
        docBreadCrumbLoader: false,
        showDropDown: false,
        breadcrumbData: [],
      }));
    }
  };

  const nPages = Math.ceil(state.totalData / state?.recordsPerPage);

  useEffect(() => {
    fetchAllShareType();
    // console.log(state.folderID, "oooooo")
    if (state.apiCall) {
      setState((prev) => ({
        ...prev,
        apiCall: false,
      }));
    }
    if (props.folderApiCall === true) {
      props.setFolderApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.columnName, state.sortOrder, props.folderApiCall, state.apiCall, state.folderID, state.pageNo, state.recordsPerPage, props.notification === "yes" ? location.key : null]);

  useEffect(() => {
    if (props.folderId !== state.folderID || props?.notification === "yes") {
      setState((prev) => ({
        ...prev,
        folderID: props.folderId,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.folderId]);

  // console.log("Checking folderID change: New:", props.folderId, "Old:", state.folderID, "data =>", state.docTypeList);
  //Document Save Function
  const SaveBulkDocument = async () => {
    setState((prev) => ({
      ...prev,
      loadingBtn: true,
      showDropDown: false,
      uploadProgress: 0
    }));

    // Simulate loading progress up to 90%
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 90) {
          clearInterval(interval);
        }
        setState((prev) => ({
          ...prev,
          uploadProgress: progress
        }));
      }, 100);
      return interval;
    };

    const intervalId = simulateProgress();

    try {
      const res = await AddSharePointDOcument(
        props?.user_id || "",
        props?.emp_user_type || "",
        state?.folderID,
        state?.docTypeName || "",
        docFileBase || [],
        0//is_private 0 will visible to all
      );

      clearInterval(intervalId);

      if (res.data.message === "Document Upload") {
        toast.success(`Document Uploaded successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState((prev) => ({
          ...prev,
          apiCall: true,
          loadingBtn: false,
          saveBtn: false,
          showDropDown: false,
          taggedAdmin: false,
          uploadProgress: 100
        }));
        setDocFileBase([]);
      } else if (res.data.message === "Failed" && res.data.data === "No Token Found") {
        toast.warning(`No token found, but handled gracefully.`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState((prev) => ({
          ...prev,
          apiCall: true,
          loadingBtn: false,
          saveBtn: false,
          showDropDown: false,
          taggedAdmin: false,
          uploadProgress: 100
        }));
        setDocFileBase([]);
      } else {
        toast.error(`Something went wrong`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState((prev) => ({
          ...prev,
          loadingBtn: false,
          saveBtn: false,
          showDropDown: false,
          taggedAdmin: false
        }));
      }
    } catch (err) {
      console.log(err);
      toast.error(`Upload failed`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setState((prev) => ({
        ...prev,
        loadingBtn: false,
        saveBtn: false,
        showDropDown: false,
        taggedAdmin: false
      }));
    }
  };



  /*To call Api to delete Folder or document */
  async function DeleteSharepointDocument(id, type) {
    try {
      const responseData = await DeleteFolderOrDocument(
        id,
        type,
        props?.emp_user_type,
        props?.user_id
      );
      if (responseData.data.message === "Document deleted successfully!") {
        toast.error("Document deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        cancelDelete();
        setState((prev) => ({
          ...prev,
          apiCall: true,
          convertedDoc: "",
          showDropDown: false,
          noteText: "",
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(state.folderID, props)
  return (
    <div>
      <>
        {state.folderID ? (
          <div className="document_section">
            {state.docPreview &&
              state?.docSingleDate?.file?.mimeType !== "text/plain" ? (
              <div
                className="App-viewer document_preview_full_screen"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999,
                }}
              >
                <div
                  className="row m-0 bg-white document_preview_box overflow-hidden"
                  style={{ height: "100vh" }}
                >
                  <div className="px-2 col-12">
                    <div className="back_btn_div">
                      <Link
                        className="rounded back-btn px-3"
                        style={{
                          position: "absolute",
                          top: 5,
                          left: 5,
                          background: "#fff",
                          height: 35,
                          fontSize: 24,
                          zIndex: 99,
                          display: "flex",
                          justifyContent: "center",
                          boxShadow: "0 0 4px #ccc",
                          alignItems: "center",
                          textDecoration: "none",
                        }}
                        to=""
                        onClick={() => {
                          // getCommentsList(state.docSingleDate.id);
                          setState((prev) => ({
                            ...prev,
                            docSingleDate: "",
                            docPreview: false,
                            folderID: state?.docSingleDate.parentReference.id,
                            convertedDoc: "",
                            showDropDown: "",
                            commentsList: [],
                            taggedAdmin: [],
                            apiCall: true,
                          }));
                          // fetchAllShareType();
                        }}
                      >
                        <IoMdArrowBack />{" "}
                        <span style={{ fontSize: 18 }}>Back to Folder</span>
                      </Link>
                    </div>
                    {
                      // (
                      // state?.docSingleDate?.file?.mimeType ===
                      // "application/pdf" ||
                      // ((state?.docSingleDate?.file?.mimeType === "image/jpeg" ||
                      //   state?.docSingleDate?.file?.mimeType === "image/png" ||
                      //   state?.docSingleDate?.file?.mimeType === "image/jpg") &&
                      //   state.imgConRes === "imageConverted") ||
                      // state?.docSingleDate?.file?.mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                      // state?.docSingleDate?.file?.mimeType ===
                      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                      state.convertedDoc &&
                        state?.docSingleDate?.file?.mimeType !== "text/plain" ? (
                        <AdobePDFViewer
                          url={state.convertedDoc}
                          data={state.docSingleDate}
                          userId={props?.user_id}
                          commentsList={state.commentsList}
                          selectedMentionAdmin={state.selectedMentionAdmin}
                          DocUserType={props?.emp_user_type}
                          adminList={state.adminList}
                          partnerList={state.partnerList}
                          docsection={true}
                          getCommentsList={getCommentsList}
                          docTypeList={state.docTypeList}
                          fileId={state.fileID}
                          userType={localStorage.getItem("userType")}
                          openCommentBox={props?.docId ? true : false}
                          AdminData={fetchAdminData}
                          setFileID={(fileID) =>
                            setState((prevState) => ({ ...prevState, fileID }))
                          }
                          setConvertedDoc={(convertedDoc) =>
                            setState((prevState) => ({
                              ...prevState,
                              convertedDoc,
                            }))
                          }
                          setCommentsList={(commentsList) =>
                            setState((prevState) => ({
                              ...prevState,
                              commentsList,
                            }))
                          }
                          setDocSingleDate={(docSingleDate) =>
                            setState((prevState) => ({
                              ...prevState,
                              docSingleDate,
                            }))
                          }
                          SetPdfDocUrl={handleDocumentConversion}
                          AnnoteId={props?.AnnoteId}
                          docTaskId={props?.docTaskId}
                        />
                      ) : (
                        state?.docSingleDate?.file?.mimeType !== "text/plain" && (
                          <Loader />
                        )
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="document_container bg-white">
                <div className="row m-0 bg-white justify-content-between p-2">
                  {state.docBreadCrumbLoader ? (
                    <ul className="breadcrumb">
                      <li
                        className="breadcrumb-item"
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
                      data={state.breadcrumbData}
                      setFolderID={(folderID) =>
                        setState((prevState) => ({ ...prevState, folderID }))
                      }
                    />
                  )}
                  <div className="new_folder_create d-flex">
                    {openFolderModal && (
                      <AddFolderModal
                        emp_user_type={props.emp_user_type}
                        user_id={props.user_id}
                        folderId={state.folderID}
                        close={() => setOPenFolderModal(false)}
                        show={openFolderModal}
                        setFolderApiCall={props.setFolderApiCall}
                      />
                    )}

                    <div>
                      <button
                        className="btn-sm btn-secondary"
                        onClick={() => setOPenFolderModal(true)}
                      >
                        + + Folder Sign
                      </button>
                    </div>

                    <DocumentsNotes
                      user_id={props?.user_id}
                      emp_user_type={props?.emp_user_type}
                      folderID={state?.folderID}
                      docTypeName={state?.docTypeName}
                      show={state?.openNoteForm}
                      convertedDoc={state?.noteText}
                      docSingleDate={state?.docNoteData}
                      setApiCall={(apiCall) =>
                        setState((prevState) => ({ ...prevState, apiCall }))
                      }
                      setOpenNoteForm={(openNoteForm) =>
                        setState((prevState) => ({
                          ...prevState,
                          openNoteForm,
                        }))
                      }
                      setConvertedDoc={(noteText) =>
                        setState((prevState) => ({ ...prevState, noteText }))
                      }
                    />

                    <button
                      className="btn btn-primary mx-2 d-none"
                      style={{ maxHeight: 34 }}
                      onClick={() => {
                        setState((prev) => ({
                          // ...prev, openNoteForm: true
                        }));
                        if (
                          state.docNoteData.length !== 0 &&
                          state.docNoteData
                        ) {
                          setState((prev) => ({
                            ...prev,
                            docNoteData: state?.docNoteData,
                          }));
                          GetNoteText(state.docNoteData, true);
                        }
                      }}
                    >
                      {state.docNoteData.length !== 0
                        ? "Open Note"
                        : "Add Note"}
                    </button>
                  </div>
                </div>
                <div className="row m-0 bg-white px-2 pb-2">
                  {state.docLoader ? (
                    <div className="table-responsive main_table_div">
                      <Loader />
                    </div>
                  ) : (
                    <FolderList
                      docTypeList={state?.docTypeList}
                      folderID={state?.folderID}
                      showDropDown={state?.showDropDown}
                      saveBtn={state?.saveBtn}
                      loadingBtn={state?.loadingBtn}
                      docPreview={state?.docPreview}
                      docFileBase={docFileBase}
                      pageNo={state?.pageNo}
                      totalData={state?.totalData}
                      recordsPerPage={state?.recordsPerPage}
                      userId={props?.user_id}
                      DocUserType={props?.emp_user_type}
                      userType={localStorage.getItem("userType")}
                      adminList={state?.adminList}
                      partnerList={state?.partnerList}
                      commentsList={state?.commentsList}
                      docsection={true}
                      getCommentsList={getCommentsList}
                      partnerId={props?.partnerId}
                      nPages={nPages}
                      ShowDeleteAlert={showDeleteAlert}
                      handleSort={handleSort}
                      handleBulkFileChange={handleBulkFileChange}
                      SaveBulkDocument={SaveBulkDocument}
                      AdminData={fetchAdminData}
                      SetPdfDocUrl={handleDocumentConversion}
                      setFileID={(fileID) =>
                        setState((prevState) => ({ ...prevState, fileID }))
                      }
                      setFolderID={(folderID) =>
                        setState((prevState) => ({ ...prevState, folderID }))
                      }
                      setDocTypeName={(docTypeName) =>
                        setState((prevState) => ({ ...prevState, docTypeName }))
                      }
                      setShowDropDown={(showDropDown) =>
                        setState((prevState) => ({
                          ...prevState,
                          showDropDown,
                        }))
                      }
                      setDocSingleDate={(docSingleDate) =>
                        setState((prevState) => ({
                          ...prevState,
                          docSingleDate,
                        }))
                      }
                      setEditNameForm={(editNameForm) =>
                        setState((prevState) => ({
                          ...prevState,
                          editNameForm,
                        }))
                      }
                      setDocPreview={(docPreview) =>
                        setState((prevState) => ({ ...prevState, docPreview }))
                      }
                      setSaveBtn={(saveBtn) =>
                        setState((prevState) => ({ ...prevState, saveBtn }))
                      }
                      setDocFileBase={setDocFileBase}
                      setCommentsList={(commentsList) =>
                        setState((prevState) => ({
                          ...prevState,
                          commentsList,
                        }))
                      }
                      setPageNo={(pageNo) =>
                        setState((prevState) => ({ ...prevState, pageNo }))
                      }
                      setOpenNoteForm={(openNoteForm) =>
                        setState((prevState) => ({
                          ...prevState,
                          openNoteForm,
                        }))
                      }
                      setRecordsPerPage={(recordsPerPage) =>
                        setState((prevState) => ({
                          ...prevState,
                          recordsPerPage,
                        }))
                      }
                      uploadProgress={state.uploadProgress}
                    />
                  )}
                </div>
                {state.editNameForm && (
                  <EditDocNameForm
                    {...{
                      userId: props?.user_id,
                      name: state?.docSingleDate?.name || "", // Ensure it doesn't break if `docSingleDate` is undefined
                      docId: state?.docSingleDate?.id || "",
                      userType: props?.emp_user_type,
                      show: state?.editNameForm,
                      close: () =>
                        setState((prevState) => ({
                          ...prevState,
                          editNameForm: false,
                        })), // Update state properly
                      setApiCall: (apiCall) =>
                        setState((prevState) => ({ ...prevState, apiCall })),
                      EditNameType: state?.docSingleDate?.folder
                        ? "folder"
                        : "file", // Safeguard against undefined `docSingleDate`
                    }}
                  />
                )}
                <SAlert
                  show={state?.deleteAlert}
                  title={state?.deleteData?.name}
                  onCancel={cancelDelete}
                  text="Are you Sure you want to delete !"
                  onConfirm={() =>
                    DeleteSharepointDocument(
                      state?.deleteData?.id,
                      state?.deleteData?.folder ? "folder" : "document"
                    )
                  }
                  showCancelButton={true}
                />
              </div>
            )}
          </div>
        ) : null}
      </>
    </div>
  );
}
