import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { AddSharePointDOcument, AddSharePointFolders, DeleteFolderOrDocument, GetAgent, getallAdminData, GetCommentsAndAssign, getFolderBreadcrumb, getSharePointParticularFolders } from '../../api/api';
import convertUrlToPDF from './Common function/convertUrlToPdf';
import convertWordToPDF from './Common function/ConvertWordToPdf';
import { Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import AdobePDFViewer from './Adobe/adobeFile';
import { Breadcrumbs } from '@material-ui/core';
import DocumentsNotes from './Document folder/DocumentsNotes';
import Loader from './loader';
import FolderList from './Document folder/FolderList';
import EditDocNameForm from './Document folder/EditDocNameFOrm';
import SAlert from './sweetAlert';
export default function ApplicantTypeDocuments(props) {
  const [state, setState] = useState({
    docTypeName: "",
    openNoteForm: false,
    newType: "",
    docFileBase: "",
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
    docNoteData: [],
    totalData: "",
    pageNo: 1,
    recordsPerPage: 10,
    columnName: "id",
    sortOrder: "DESC",
  });
  const DocTypeData =
    props?.emp_user_type === "employer"
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
  /*On change fnction to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;

    // Check the number of files selected
    if (files.length > 30) {
      toast.error("You can only upload a maximum of 30 files at a time", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const maxSize = 1024 * 8000; // 8 MB

    const filebseList = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      // Extract the filename and extension
      const lastDotIndex = file.name.lastIndexOf(".");
      let fileName = file.name.substring(0, lastDotIndex); // Get the name part before the last dot
      const fileExtension = file.name.substring(lastDotIndex + 1); // Get the extension part after the last dot

      // Remove all extra dots in the fileName part
      fileName = fileName.replace(/\.+/g, ""); // Remove any extra dots

      const finalFileName = `${fileName}.${fileExtension}`; // Form the new file name

      // Create a new File object with the updated name, preserving the file's content and metadata
      const updatedFile = new File([file], finalFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });

      // Check file type
      const fileType = `.${fileExtension.toLowerCase()}`;
      if (!allowedTypes.includes(fileType)) {
        toast.error(
          `Invalid document type for file '${updatedFile.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Check file size
      if (updatedFile.size > maxSize) {
        toast.error(
          `Document size can't be more than 8 MB for file '${updatedFile.name}'`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Read file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(updatedFile);

      // Add the updated file to the file list
      filebseList.push(updatedFile);
    }

    // Store the object of files
    setState({ ...state, docFileBase: filebseList })
    setState({ ...state, saveBtn: true })
  };
  const handleSort = (column) =>
    setState((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "DESC" ? "ASC" : "DESC",
      columnName: column
    }));
  const handleNewTypeChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setState({ ...state, newType: value });
  };
  const fetchAdminData = async () => {
    try {
      const userData = await getallAdminData();
      setState((prev) => ({
        ...prev,
        adminList: userData.data.length ? userData.data : [],
      }));

      if (window.location.pathname === `/${props?.user_id}`) {
        const partnerData = await GetAgent();
        const newPartnerList = partnerData.data.data.filter(
          (item) => item.id === props?.partnerId
        );
        setState({ ...state, partnerList: newPartnerList });
      }
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
        let data = await response.text()
        return data;
      })
      .then((text) => {
        setState({ ...state, noteText: text })
        /*Open the note form when admin click it from the docs list else not open from this function */
        if (isOpen) {
          setState({ ...state, openNoteForm: true })
        }
      })
      .catch((error) => console.error("Error fetching the file:", error));
  }
  /*Had folder function */
  const handleDocTypeChange = async (selectedType) => {
    setState({ ...state, docTypeName: selectedType, showDropDown: false })
    if (selectedType === "other") {
      // If "other" is selected, clear newType
      setState({ ...state, newType: "" });
    } else {
      try {
        let res = await AddSharePointFolders(selectedType, state?.folderID);
        if (
          res.data.data.name &&
          res.data.message === "Folder created successfully!"
        ) {
          toast.success(`Type Created successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setState({ ...state, apiCall: true })
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
  const getCommentsList = async (data) => {
    if (!data) return setState({ ...state, commentsList: [] });

    try {
      localStorage.setItem("mentionAdmin", "");
      const res = await GetCommentsAndAssign(data.id, "", "", "document");

      if (res.data.status === 1) {
        setState({ ...state, commentsList: res.data.data.data });
        if (res.data.data.data.some((item) => JSON.parse(item?.doctaskjson))) {
          fetchAdminData();
        }
      } else {
        setState({ ...state, commentsList: [] });
      }
    } catch (err) {
      console.error(err);
      setState({ ...state, commentsList: [] });
    }
  };

  const handleDocumentConversion = (data) => {
    const mimeType = data.file.mimeType;
    const downloadUrl = data["@microsoft.graph.downloadUrl"];

    if (["image/jpeg", "image/png", "image/jpg"].includes(mimeType)) {
      let res = convertUrlToPDF(downloadUrl);
      setState({ ...state, convertedDoc: res });
      //  if (state.base64String) {
      setState({ ...state, imgConRes: "imageConverted" });
      // }
    } else if (
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      let res = convertWordToPDF(data);
      setState({ ...state, convertedDoc: res });
    } else if (mimeType === "text/plain") {
      fetchNoteText(downloadUrl, true);
    } else if (mimeType === "application/pdf") {
      setState({ ...state, convertedDoc: downloadUrl });
    } else {
      window.open(data.webUrl);
      setState({ ...state, convertedDoc: "", docPreview: false });
    }
  };

  const fetchNoteText = (url, isOpen) => {
    fetch(url)
      .then((res) => res.ok ? res.text() : Promise.reject("Failed to fetch"))
      .then((text) =>
        setState({ ...state, noteText: text, openNoteForm: isOpen })
      )
      .catch((err) => console.error("Error fetching file:", err));
  };

  const showDeleteAlert = (data) =>
    setState({ ...state, deleteData: data, deleteAlert: true });

  const cancelDelete = () =>
    setState({ ...state, deleteAlert: false, editNameForm: false });

  // Fetch all sharepoint documents
  const fetchAllShareType = async () => {

    try {
      setState({ ...state, docLoader: true });
      const res = await getSharePointParticularFolders(
        props?.user_id, props?.emp_user_type, props?.docId ? props?.folderId : state?.folderID,
        state?.columnName, state?.sortOrder, state?.recordsPerPage,
        state?.pageNo, props?.docId || ""
      );
      if (res.data.status === 1) {
        console.log("first", res.data.data)
        setState({
          ...state,
          docTypeList: res.data.data,
          totalData: res.data.total_rows,
          showDropDown: false,
          docLoader: false,
          docNoteData: res.data.notes.length ? res.data.notes : [],
        });

        if (props?.notification === "yes") {
          const currentDoc = res.data.data.find((item) => item.id === state?.fileID);
          if (currentDoc) {
            setState({
              ...state,
              docPreview: true,
              docSingleDate: currentDoc,
              fileID: currentDoc.id,
            });
            handleDocumentConversion(currentDoc);
            getCommentsList(currentDoc);
          } else {
            toast.error("This document is no longer available.", { position: "top-right", autoClose: 1000 });
          }
        }
      } else {
        console.log("ppppp", state?.docTypeList)
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
      console.log("ooooooo", state?.docTypeList)
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
      setState({ ...state, docBreadCrumbLoader: true });
      let res = await getFolderBreadcrumb(state.folderID);
      if (res.data.status === (1 || "1")) {
        setState({ ...state, breadcrumbData: res.data.data, docBreadCrumbLoader: false, showDropDown: false });
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
        setState({ ...state, docBreadCrumbLoader: false, showDropDown: false, breadcrumbData: [] });
      }
    } catch (err) {
      console.log(err);
      setState({ ...state, docBreadCrumbLoader: false, showDropDown: false, breadcrumbData: [] });
    }
  };
  useEffect(() => {
    fetchAllShareType();

    if (state.apiCall) {
      setState({ ...state, apiCall: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.apiCall, state.folderID]);

  useEffect(() => {
    if (props.folderId !== state.folderID) {
      setState({ ...state, folderID: props.folderId });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.folderId]);

  // useEffect(() => {
  //   fetchAllShareType();
  //   if (state.apiCall === true) {
  //     setState({ ...state, apiCall: false })
  //   }
  //   // eslint-disable-next-line
  // }, [state.folderID, props.folderId, state?.apiCall, props?.docId, state?.fileID, state?.pageNo, state?.columnName, state?.sortOrder, state?.recordsPerPage]);
  console.log("Checking folderID change: New:", props.folderId, "Old:", state.folderID,"data =>",state.docTypeList);
  // useEffect(() => {
  //   console.log("Inside the useEffect Checking folderID change: New:", props.folderId, "Old:", state.folderID);

  //   if (props.folderId !== state.folderID) {
  //     setState((prevState) => {
  //       console.log("Updating folderID to:", props.folderId);
  //       return { ...prevState, folderID: props.folderId };
  //     });
  //   }
  // }, [props.folderId, state.folderID]); 



  //Document Save Function
  const SaveBulkDocument = async () => {
    setState({ ...state, loadingBtn: true, showDropDown: false })
    try {
      let res = await AddSharePointDOcument(
        props?.user_id,
        props?.emp_user_type,
        props?.folderID,
        state?.docTypeName,
        state?.docFileBase
      );
      if (res.data.message === "Document Upload") {
        toast.success(`Document Uploaded successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState((prev) => ({
          ...prev, apiCall: true, loadingBtn: false
          , saveBtn: false
          , showDropDown: false
          , taggedAdmin: false
          , docFileBase: false
        }))
      }
      // console.log(res.data)
      if (res.data.message === "Failed" && res.data.data === "No Token Found") {
        toast.success(`Document Uploaded successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState((prev) => ({
          ...prev, apiCall: true, loadingBtn: false
          , saveBtn: false
          , showDropDown: false
          , taggedAdmin: false
          , docFileBase: false
        }))
      }
    } catch (err) {
      console.log(err);
      setState((prev) => ({
        ...prev, apiCall: true, loadingBtn: false
        , saveBtn: false
        , showDropDown: false
        , taggedAdmin: false
      }))
    }

  };
  /*To call Api to delete Folder or document */
  async function DeleteSharepointDocument(id, type) {
    try {
      const responseData = await DeleteFolderOrDocument(id, type, props?.emp_user_type, props?.user_id);
      if (responseData.data.message === "Document deleted successfully!") {
        toast.error("Document deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        cancelDelete()
        setState({ ...state, apiCall: true })
        setState({ ...state, taggedAdmin: [] })
        setState({ ...state, convertedDoc: "" })
        setState({ ...state, noteText: "" })
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <>
        {state.folderID ? (
          <div className="document_section">
            {state.docPreview && state?.docSingleDate.file.mimeType !== "text/plain" ? (
              <div className="App-viewer document_preview_full_screen" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
                <div className="row m-0 bg-white document_preview_box overflow-hidden" style={{ height: "100vh" }}>
                  <div className="px-2 col-12">
                    <div className="back_btn_div">
                      <Link className="rounded back-btn px-3" style={{ position: "absolute", top: 5, left: 5, background: "#fff", height: 35, fontSize: 24, zIndex: 99, display: "flex", justifyContent: "center", boxShadow: "0 0 4px #ccc", alignItems: "center", textDecoration: "none" }} to="" onClick={() => {
                        getCommentsList(state.docSingleDate.id); // Ensure comments reload correctly
                        setState({ ...state, docSingleDate: "", docPreview: false, folderId: state?.docSingleDate.parentReference.id, convertedDoc: "", showDropDown: "", commentsList: [], taggedAdmin: [], })
                      }}>
                        <IoMdArrowBack /> <span style={{ fontSize: 18 }}>Back to Folder</span>
                      </Link>
                    </div>
                    {(["application/pdf", "image/jpeg", "image/png", "image/jpg", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(state.docSingleDate.file.mimeType) && state?.imgConRes === "imageConverted" && state?.convertedDoc) ? (
                      <AdobePDFViewer
                        url={state.convertedDoc}
                        data={state.docSingleDate}
                        userId={props?.userId}
                        commentsList={state.commentsList}
                        selectedMentionAdmin={state.selectedMentionAdmin}
                        DocUserType={props?.emp_user_type}
                        adminList={state.adminList}
                        partnerList={state.partnerList}
                        docsection={true}
                        docTypeList={state.docTypeList}
                        fileId={state.fileID}
                        userType={localStorage.getItem("userType")}
                        openCommentBox={props?.docId ? true : false}
                        AdminData={fetchAdminData}
                        setFileID={(id) => setState((prevState) => ({ ...prevState, fileId: id }))}
                        setConvertedDoc={(doc) => setState((prevState) => ({ ...prevState, convertedDoc: doc }))}
                        setCommentsList={(comments) => setState((prevState) => ({ ...prevState, commentsList: comments }))}
                        setDocSingleDate={(docDate) => setState((prevState) => ({ ...prevState, docSingleDate: docDate }))}
                        SetPdfDocUrl={handleDocumentConversion}
                        AnnoteId={props?.AnnoteId}
                        docTaskId={props?.docTaskId}
                      />

                    ) : (state.docSingleDate.file.mimeType !== "text/plain" && <Loader />)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="document_container bg-white">
                <div className="row m-0 bg-white justify-content-between p-2">
                  {state.docBreadCrumbLoader ? (
                    <ul className="breadcrumb"><li className="breadcrumb-item" style={{ padding: 5, margin: 0, borderRadius: 3 }}><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span><span>Loading...</span></li></ul>
                  ) : (
                    <Breadcrumbs
                      data={state.breadcrumbData}
                      setFolderID={(folderID) => setState((prevState) => ({ ...prevState, folderID }))}
                    />

                  )}
                  <div className="new_folder_create d-flex">
                    {state.docTypeName === "other" ? (
                      <>
                        <Form.Control type="text" value={state.newType} placeholder="Enter new type" height={34} className="px-2" onChange={handleNewTypeChange} />
                        <button className="btn btn-sm btn-primary" type="button" style={{ maxHeight: 34 }} onClick={() => handleDocTypeChange(state.newType)}>Save</button>
                        <button className="btn btn-sm btn-secondary" type="button" style={{ maxHeight: 34 }} onClick={() => setState({ ...state, newType: "" })}>Cancel</button>
                      </>
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle variant="secondary" size="sm" style={{ maxHeight: 34 }} id="dropdown-basic">+ Add New Folder</Dropdown.Toggle>
                        <Dropdown.Menu style={{ height: "400px", overflowY: "scroll" }}>
                          <Dropdown.Item onClick={() => handleDocTypeChange("")}>Select Folder Name</Dropdown.Item>
                          {DocTypeData.map((item, index) => <Dropdown.Item key={index} className="text-capitalize" onClick={() => handleDocTypeChange(item)}>{item.replaceAll("_", " ")}</Dropdown.Item>)}
                          <Dropdown.Item onClick={() => handleDocTypeChange("other")}>Other</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {props?.openNoteForm && <DocumentsNotes
                      {...{
                        user_id: props?.userId,
                        emp_user_type: props?.emp_user_type,
                        folderID: state?.folderID,
                        docTypeName: state?.docTypeName,
                        setApiCall: (apiStatus) => setState((prevState) => ({ ...prevState, apiCall: apiStatus })),
                        setOpenNoteForm: (open) => setState((prevState) => ({ ...prevState, openNoteForm: open })),
                        show: state?.openNoteForm,
                        convertedDoc: state?.noteText,
                        docSingleDate: state?.docNoteData,
                        setConvertedDoc: (text) => setState((prevState) => ({ ...prevState, noteText: text })),
                      }}
                    />
                    }
                    <button className="btn btn-primary mx-2" style={{ maxHeight: 34 }} onClick={() => {
                      setState({ ...state, openNoteForm: true })
                      if (state.docNoteData) {
                        setState({ ...state, docNoteData: state?.docNoteData })
                        GetNoteText(state.docNoteData, true);
                      }
                    }}>{state.docNoteData.length !== 0 ? "Open Note" : "Add Note"}</button>
                  </div>
                </div>
                <div className="row m-0 bg-white px-2 pb-2">
                  {state.docLoader ? <div className="table-responsive main_table_div"><Loader /></div> : <FolderList
                    {...{
                      docTypeList: state?.docTypeList,
                      setFolderID: (folderID) => setState((prevState) => ({ ...prevState, folderID })),
                      setFileID: (fileID) => setState((prevState) => ({ ...prevState, fileID })),
                      setDocTypeName: (docTypeName) => setState((prevState) => ({ ...prevState, docTypeName })),
                      folderID: state?.folderID,
                      showDropDown: state?.showDropDown,
                      setShowDropDown: (showDropDown) => setState((prevState) => ({ ...prevState, showDropDown })),
                      setDocSingleDate: (docSingleDate) => setState((prevState) => ({ ...prevState, docSingleDate })),
                      setEditNameForm: (editNameForm) => setState((prevState) => ({ ...prevState, editNameForm })),
                      ShowDeleteAlert: showDeleteAlert,
                      setDocPreview: (docPreview) => setState((prevState) => ({ ...prevState, docPreview })),
                      handleBulkFileChange,
                      saveBtn: state?.saveBtn,
                      loadingBtn: state?.loadingBtn,
                      SaveBulkDocument,
                      setSaveBtn: (saveBtn) => setState((prevState) => ({ ...prevState, saveBtn })),
                      setDocFileBase: (docFileBase) => setState((prevState) => ({ ...prevState, docFileBase })),
                      SetPdfDocUrl: handleDocumentConversion,
                      emp_user_type: props?.emp_user_type,
                      user_id: props?.user_id,
                      userType: localStorage.getItem("userType"),
                      adminList: state?.adminList,
                      partnerList: state?.partnerList,
                      userId: props?.user_i,
                      commentsList: state?.commentsList,
                      DocUserType: props?.emp_user_type,
                      docsection: true,
                      getCommentsList,
                      setCommentsList: (commentsList) => setState((prevState) => ({ ...prevState, commentsList })),
                      partnerId: props?.partnerId,
                      handleSort,
                      setPageNo: (pageNo) => setState((prevState) => ({ ...prevState, pageNo })),
                      nPages: props?.nPages,
                      totalData: state?.totalData,
                      pageNo: state?.pageNo,
                      docFileBase: state?.docFileBase,
                      setOpenNoteForm: (openNoteForm) => setState((prevState) => ({ ...prevState, openNoteForm })),
                      AdminData: fetchAdminData,
                      setRecordsPerPage: (recordsPerPage) => setState((prevState) => ({ ...prevState, recordsPerPage })),
                      recordsPerPage: state?.recordsPerPage,
                    }}
                  />
                  }
                </div>
                {state.editNameForm && <EditDocNameForm
                  {...{
                    userId: props?.user_id,
                    name: state?.docSingleDate?.name || "", // Ensure it doesn't break if `docSingleDate` is undefined
                    docId: state?.docSingleDate?.id || "",
                    userType: props?.emp_user_type,
                    show: state?.editNameForm,
                    close: () => setState((prevState) => ({ ...prevState, editNameForm: false })), // Update state properly
                    setApiCall: (apiCall) => setState((prevState) => ({ ...prevState, apiCall })),
                    EditNameType: state?.docSingleDate?.folder ? "folder" : "file", // Safeguard against undefined `docSingleDate`
                  }}
                />
                }
                <SAlert show={state?.deleteAlert} title={state?.deleteData?.name} onCancel={cancelDelete}
                  text="Are you Sure you want to delete !"
                  onConfirm={() =>
                    DeleteSharepointDocument(
                      state?.deleteData?.id,
                      state?.deleteData?.folder ? "folder" : "document"
                    )
                  }
                  showCancelButton={true} />
              </div>
            )}
          </div>
        ) : null}
      </>

    </div>
  )

}
