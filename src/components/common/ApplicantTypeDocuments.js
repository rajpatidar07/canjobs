import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { AddSharePointDOcument, AddSharePointFolders, DeleteFolderOrDocument, getallAdminData, GetCommentsAndAssign, getFolderBreadcrumb, getSharePointParticularFolders } from '../../api/api';
import convertUrlToPDF from './Common function/convertUrlToPdf';
import convertWordToPDF from './Common function/ConvertWordToPdf';
import { Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import AdobePDFViewer from './Adobe/adobeFile';
import Breadcrumbs from "./Document folder/Breadcrumb"
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
    docNoteData: {},
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
    setState((prev) => ({
      ...prev, docFileBase: filebseList
    }))
    setState((prev) => ({
      ...prev, saveBtn: true
    }))
  };
  const handleSort = (column) =>
    setState((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "DESC" ? "ASC" : "DESC",
      columnName: column
    }));
  const handleNewTypeChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setState((prev) => ({
      ...prev, newType: value
    }));
  };
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
        let data = await response.text()
        return data;
      })
      .then((text) => {
        setState((prev) => ({
          ...prev, noteText: text
        }))
        if (isOpen) {
          setState((prev) => ({
            ...prev, openNoteForm: true
          }))
        }
      })
      .catch((error) => console.error("Error fetching the file:", error));
  }
  /*Had folder function */
  const handleDocTypeChange = async (selectedType) => {
    setState((prev) => ({
      ...prev, docTypeName: selectedType, showDropDown: false
    }))
    if (selectedType === "other") {
      // If "other" is selected, clear newType
      setState((prev) => ({
        ...prev, newType: ""
      }));
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
          setState((prev) => ({
            ...prev, apiCall: true
          }))
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
    if (!data) return setState((prev) => ({
      ...prev, commentsList: []
    }));

    try {
      localStorage.setItem("mentionAdmin", "");
      const res = await GetCommentsAndAssign(data.id, "", "", "document");

      if (res.data.status === 1) {
        setState((prev) => ({
          ...prev, commentsList: res.data.data.data
        }));
        if (res.data.data.data.some((item) => JSON.parse(item?.doctaskjson))) {
          fetchAdminData();
        }
      } else {
        setState((prev) => ({
          ...prev, commentsList: []
        }));
      }
    } catch (err) {
      console.error(err);
      setState((prev) => ({
        ...prev, commentsList: []
      }));
    }
  };

  const handleDocumentConversion = async (data) => {
    const mimeType = data.file.mimeType;
    const downloadUrl = data["@microsoft.graph.downloadUrl"];
    if (["image/jpeg", "image/png", "image/jpg"].includes(mimeType)) {
      let res = await convertUrlToPDF(downloadUrl);
      setState((prev) => ({
        ...prev, convertedDoc: res
      }));
      //  if (state.base64String) {
      setState((prev) => ({
        ...prev, imgConRes: "imageConverted"
      }));
      // }
    } else if (
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      let res = await convertWordToPDF(data);
      setState((prev) => ({
        ...prev, convertedDoc: res
      }));
    } else if (mimeType === "text/plain") {
      GetNoteText(data, true);
    } else if (mimeType === "application/pdf") {
      setState((prev) => ({
        ...prev, convertedDoc: downloadUrl
      }));
    } else {
      window.open(data.webUrl);
      setState((prev) => ({
        ...prev, convertedDoc: "", docPreview: false
      }));
    }
  };


  const showDeleteAlert = (data) =>
    setState((prev) => ({
      ...prev, deleteData: data, deleteAlert: true
    }));

  const cancelDelete = () =>
    setState((prev) => ({
      ...prev, deleteAlert: false, editNameForm: false
    }));

  // Fetch all sharepoint documents
  const fetchAllShareType = async () => {
    try {
      setState((prev) => ({
        ...prev, docLoader: true
      }));
      const res = await getSharePointParticularFolders(
        props?.user_id, props?.emp_user_type, props?.docId ? props?.folderId : state?.folderID,
        state?.columnName, state?.sortOrder, state?.recordsPerPage,
        state?.pageNo, props?.docId || ""
      );
      if (res.data.status === 1) {
        // console.log("first", res.data.data)
        setState((prev) => ({
          ...prev,
          docTypeList: res.data.data,
          totalData: res.data.total_rows,
          showDropDown: false,
          docLoader: false,
          docNoteData: res.data.notes ? res.data.notes : {},
        })
        );

        if (props?.notification === "yes") {
          const currentDoc = res.data.data.find((item) => item.id === state?.fileID ? state?.fileID : props?.docId);
          if (currentDoc) {
            setState({
              ...state,
              docPreview: true,
              docSingleDate: currentDoc,
              fileID: currentDoc.id,
            });
            handleDocumentConversion(currentDoc);
            getCommentsList(currentDoc);
            fetchAdminData();
          } else {
            toast.error("This document is no longer available.", { position: "top-right", autoClose: 1000 });
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
        ...prev, docBreadCrumbLoader: true
      }));
      let res = await getFolderBreadcrumb(state.folderID);
      if (res.data.status === (1 || "1")) {
        setState((prev) => ({
          ...prev, breadcrumbData: res.data.data, docBreadCrumbLoader: false, showDropDown: false
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
          ...prev, docBreadCrumbLoader: false, showDropDown: false, breadcrumbData: []
        }));
      }
    } catch (err) {
      console.log(err);
      setState((prev) => ({
        ...prev, docBreadCrumbLoader: false, showDropDown: false, breadcrumbData: []
      }));
    }
  };
  useEffect(() => {
    fetchAllShareType();

    if (state.apiCall) {
      setState((prev) => ({
        ...prev, apiCall: false
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.apiCall, state.folderID]);

  useEffect(() => {
    if (props.folderId !== state.folderID) {
      setState((prev) => ({
        ...prev, folderID: props.folderId
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.folderId]);

  // console.log("Checking folderID change: New:", props.folderId, "Old:", state.folderID, "data =>", state.docTypeList);
  //Document Save Function
  const SaveBulkDocument = async () => {
    setState((prev) => ({
      ...prev, loadingBtn: true, showDropDown: false
    }))
    try {
      let res = await AddSharePointDOcument(
        props?.user_id || "",
        props?.emp_user_type || "",
        state?.folderID,
        state?.docTypeName || "",
        state?.docFileBase || ""
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
        setState((prev) => ({
          ...prev, apiCall: true
          , convertedDoc: ""
          , showDropDown: false
          , noteText: ""
        }))
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
                        // getCommentsList(state.docSingleDate.id); 
                        setState((prev) => ({
                          ...prev, docSingleDate: "", docPreview: false, folderId: state?.docSingleDate.parentReference.id, convertedDoc: "", showDropDown: "", commentsList: [], taggedAdmin: [],
                        }))
                      }}>
                        <IoMdArrowBack /> <span style={{ fontSize: 18 }}>Back to Folder</span>
                      </Link>
                    </div>
                    {console.log(state?.docSingleDate.parentReference.id, "pppppppppppppppppppppp", state?.docSingleDate)}
                    {(state.docSingleDate.file.mimeType === "application/pdf" ||
                      ((state.docSingleDate.file.mimeType === "image/jpeg" ||
                        state.docSingleDate.file.mimeType === "image/png" ||
                        state.docSingleDate.file.mimeType === "image/jpg") &&
                        state.imgConRes === "imageConverted") ||
                      state.docSingleDate.file.mimeType ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                      (state.convertedDoc && state.docSingleDate.file.mimeType !==
                        "text/plain")
                      ? (
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
                          setFileID={(fileID) => setState((prevState) => ({ ...prevState, fileID }))}
                          setConvertedDoc={(convertedDoc) => setState((prevState) => ({ ...prevState, convertedDoc }))}
                          setCommentsList={(commentsList) => setState((prevState) => ({ ...prevState, commentsList }))}
                          setDocSingleDate={(docSingleDate) => setState((prevState) => ({ ...prevState, docSingleDate }))}
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
                        <button className="btn btn-sm btn-secondary" type="button" style={{ maxHeight: 34 }} onClick={() => setState((prev) => ({
                          ...prev, newType: ""
                        }))}>Cancel</button>
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
                    <DocumentsNotes
                      user_id={props?.user_id}
                      emp_user_type={props?.emp_user_type}
                      folderID={state?.folderID}
                      docTypeName={state?.docTypeName}
                      show={state?.openNoteForm}
                      convertedDoc={state?.noteText}
                      docSingleDate={state?.docNoteData}
                      setApiCall={(apiCall) => setState((prevState) => ({ ...prevState, apiCall }))}
                      setOpenNoteForm={(openNoteForm) => setState((prevState) => ({ ...prevState, openNoteForm }))}
                      setConvertedDoc={(noteText) => setState((prevState) => ({ ...prevState, noteText }))}
                    />

                    <button className="btn btn-primary mx-2 d-none" style={{ maxHeight: 34 }} onClick={() => {
                      setState((prev) => ({
                        ...prev, openNoteForm: true
                      }))
                      if (state.docNoteData.length !== 0 && state.docNoteData) {
                        setState((prev) => ({
                          ...prev, docNoteData: state?.docNoteData
                        }))
                        GetNoteText(state.docNoteData, true);
                      }
                    }}>{state.docNoteData.length !== 0 ? "Open Note" : "Add Note"}</button>
                  </div>
                </div>
                <div className="row m-0 bg-white px-2 pb-2">
                  {state.docLoader ? <div className="table-responsive main_table_div"><Loader /></div> :
                    <FolderList
                      docTypeList={state?.docTypeList}
                      folderID={state?.folderID}
                      showDropDown={state?.showDropDown}
                      saveBtn={state?.saveBtn}
                      loadingBtn={state?.loadingBtn}
                      docPreview={state?.docPreview}
                      docFileBase={state?.docFileBase}
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
                      nPages={props?.nPages}
                      ShowDeleteAlert={showDeleteAlert}
                      handleSort={handleSort}
                      handleBulkFileChange={handleBulkFileChange}
                      SaveBulkDocument={SaveBulkDocument}
                      AdminData={fetchAdminData}
                      SetPdfDocUrl={handleDocumentConversion}
                      setFileID={(fileID) => setState((prevState) => ({ ...prevState, fileID }))}
                      setFolderID={(folderID) => setState((prevState) => ({ ...prevState, folderID }))}
                      setDocTypeName={(docTypeName) => setState((prevState) => ({ ...prevState, docTypeName }))}
                      setShowDropDown={(showDropDown) => setState((prevState) => ({ ...prevState, showDropDown }))}
                      setDocSingleDate={(docSingleDate) => setState((prevState) => ({ ...prevState, docSingleDate }))}
                      setEditNameForm={(editNameForm) => setState((prevState) => ({ ...prevState, editNameForm }))}
                      setDocPreview={(docPreview) => setState((prevState) => ({ ...prevState, docPreview }))}
                      setSaveBtn={(saveBtn) => setState((prevState) => ({ ...prevState, saveBtn }))}
                      setDocFileBase={(docFileBase) => setState((prevState) => ({ ...prevState, docFileBase }))}
                      setCommentsList={(commentsList) => setState((prevState) => ({ ...prevState, commentsList }))}
                      setPageNo={(pageNo) => setState((prevState) => ({ ...prevState, pageNo }))}
                      setOpenNoteForm={(openNoteForm) => setState((prevState) => ({ ...prevState, openNoteForm }))}
                      setRecordsPerPage={(recordsPerPage) => setState((prevState) => ({ ...prevState, recordsPerPage }))}
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
