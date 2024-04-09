import React, { useState, useEffect } from "react";
import {
  /*getSharePointFoldersList,*/ DeleteFolderOrDocument,
  getFolderBreadcrumb,
  AddSharePointFolders,
  getSharePointParticularFolders,
  AddSharePointDOcument,
} from "../../../api/api";
import { Dropdown, Form } from "react-bootstrap";
import SAlert from "../../common/sweetAlert";
// import { Link } from 'react-router-dom';
// import { GrLinkPrevious } from "react-icons/gr";
import FolderList from "./FolderList";
import { toast } from "react-toastify";
import DocSaveForm from "./DocSaveForm";
import Breadcrumbs from "./Breadcrumb";
import EditDocNameFOrm from "./EditDocNameFOrm";
import PreviewDocument from "./PreviewDocument";
export default function SharePointDocument({
  emp_user_type,
  user_id,
  folderId,
  notification,
  docId,
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
  const [editNameForm, setEditNameForm] = useState(false);
  const [docSingleDate, setDocSingleDate] = useState("");
  const [docPreview, setDocPreview] = useState(false);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState();
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
    try {
      // if (folderID) {
      let res = await getSharePointParticularFolders(
        user_id,
        emp_user_type,
        docId ? folderId : folderID
      );
      if (res.data.status === 1) {
        setDocPreview(false);
        setDocTypeList(res.data.data);
        setShowDropDown(false);
        if (notification === "yes") {
          if (res.data.data.find((item) => item.id === docId)) {
            setDocPreview(true);
            setDocSingleDate(res.data.data.find((item) => item.id === docId));
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          }
        }
        // setFolderID(res.data.data[0].parentReference.id)
      } else if (res.data.data === "No Documents Found") {
        setDocTypeList([]);
        setShowDropDown(false);
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
    }
    /*Api for breadcrumb */
    try {
      let res = await getFolderBreadcrumb(folderID);
      setBreadcrumbData(res.data.data);
      setShowDropDown(false);
    } catch (err) {
      setBreadcrumbData([]);
      console.log(err);
      setShowDropDown(false);
    }
  };
  useEffect(() => {
    AllShareType();
    // if (notification === "yes") {
    //     setDocPreview(true)
    // }
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [folderID, apiCall, docId, folderId]);
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
        if (res.data.message === "Folder created successfully!") {
          toast.success(`Type Created successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true);
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
  return (
    <div className="document_section">
      {docPreview ? (
        <PreviewDocument
          docData={docSingleDate}
          docId={docId ? docId : folderID}
          userId={user_id}
          docFile={docSingleDate["@microsoft.graph.downloadUrl"]}
          setDocPreview={setDocPreview}
          setDocSingleDate={setDocSingleDate}
          setFolderID={setFolderID}
        />
      ) : (
        <div className={"document_container bg-white"}>
          <div className="row m-0 bg-white justify-content-between p-2">
            {/* Breadcrumbs */}
            {breadcrumbData && (
              <Breadcrumbs data={breadcrumbData} setFolderID={setFolderID} />
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
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    type="button"
                    style={{ maxHeight: 34, minWidth: "auto" }}
                    onClick={() => handleDocTypeChange(newType)}
                  >
                    Save
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
                    <Dropdown.Item onClick={() => handleDocTypeChange("other")}>
                      Other
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="row m-0 bg-white px-2 pb-2 justify-content-center">
            {/* List of documents docTypeList */}
            {docTypeList && (
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
  );
}
