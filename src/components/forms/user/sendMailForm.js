import React, { useEffect, useState } from "react";
import useValidation from "../../common/useValidation";
import { AddAdmin, SendEmail, SaveDraftOutlookEmail, GetDraftOutlookEmail, DeleteDraftOutlookEmail, GetPreviewAttchmentEmail } from "../../../api/api";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
// import TextEditor from "../../common/TextEditor";
import { Link } from "react-router-dom"
import { LiaFileSignatureSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import SignatureTextEditor from "../../SignatureTextEditor";
import SAlert from "../../common/sweetAlert";
import AttachmentPreviewModal from "./AttachmentPreviewModal";


function SendMailForm({ email, setApiCall }) {
  const [loading, setLoading] = useState(false);
  const [fileBase, setFileBase] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [viewFile, setViewFile] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState(null); // Temporary URL for iframe
  let adminSignature = localStorage.getItem("admin_signature");
  let adminSignatureText = localStorage.getItem("admin_signature_text");
  const [signatureImage, setSignatureImage] = useState(adminSignature || null);
  let AdminEmail = localStorage.getItem("admin_email");
  let AdminId = localStorage.getItem("admin_id");
  let userrType = localStorage.getItem("userType");
  // --- NEW DRAFT STATE ---
  const [drafts, setDrafts] = useState([]);
  const [selectedDraftId, setSelectedDraftId] = useState(null);
  const [draftLoading, setDraftLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState();
  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const syntheticEvent = { target: { files: e.dataTransfer.files } };
      await AddAttachmentChange(syntheticEvent);
      e.dataTransfer.clearData();
    }
  };

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    subject: "",
    description: "",
    sender_id: AdminId,
    email: email,
    adminemail: "",
    bccemail: "",
    signature: signatureImage || "",
    signature_text: adminSignatureText || ""
  };

  /*Validation */
  let validators = {
    subject: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Subject is required"
          // : /[-]?\d+(\.\d+)?/.test(value)
          //   ? "Subject can not have a number."
          : value.length < 2
            ? "Subject should have 2 or more letters"
            // : /[^A-Za-z 0-9]/g.test(value)
            //   ? "Cannot use special character "
            : "",
    ],
    description: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Description is required"
          : // : /[-]?\d+(\.\d+)?/.test(value)
          // ? "Description can not have a number."
          value.length < 5
            ? "Description should have 2 or more letters"
            : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            "",
    ],
    // adminemail: [
    //   (value) => value && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value) ? "Invalid CC Email format" : "",

    // ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  /*On change function to upload bulk document in 1 array*/
  // const handleBulkFileChange = async (event) => {
  //   const files = event.target.files;

  //   // Check the number of files selected
  //   if (files.length > 15) {
  //     toast.error("You can only upload a maximum of 15 files at a time", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     return;
  //   }

  //   // Continue with file validation and processing
  //   const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
  //   const maxSize = 1024 * 10000; // 10 MB

  //   const newFileBase = { ...fileBase };
  //   const newFileNames = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];

  //     // Check file type
  //     const fileType = `.${file.name.split(".").pop()}`;
  //     if (!allowedTypes.includes(fileType.toLowerCase())) {
  //       toast.error(
  //         `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
  //         {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         }
  //       );
  //       return;
  //     }

  //     // Check file size
  //     if (file.size > maxSize) {
  //       toast.error(
  //         `Document size can't be more than 8 MB for file '${file.name}'`,
  //         {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         }
  //       );
  //       return;
  //     }

  //     // Read file as data URL
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64Data = reader.result;
  //       const base64Name = file.name.replace(/ /g, "_");
  //       newFileBase[base64Name] = base64Data;
  //       newFileNames.push(base64Name);
  //       setFileBase(newFileBase);
  //       setFileNames(newFileNames);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  /*Function to convert file to base64 */
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.addEventListener("load", () => {
  //       resolve({ base64: fileReader.result });
  //     });
  //     fileReader.readAsDataURL(file);
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  /* Function to add files in bulk*/
  const AddAttachmentChange = async (event) => {
    const files = event.target.files;
    {
      // Check the number of files selected
      if (files.length > 15) {
        toast.error("You can only upload a maximum of 15 files at a time", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return;
      }

      const maxSize = 1024 * 8000; // 8 MB
      const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

      // Start with existing files array or empty
      const existingFiles = Array.isArray(fileBase) ? [...fileBase] : [];
      const newFiles = [];

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

        // Check if file already exists by name
        if (!existingFiles.some(f => f.name === file.name) && !newFiles.some(f => f.name === file.name)) {
          newFiles.push(file);
        }
      }

      // Append new files to existing files
      const updatedFiles = [...existingFiles, ...newFiles];
      setFileBase(updatedFiles);
      setFileNames(updatedFiles.map(f => f.name));
    }
  };

  //Function to Remove any attachments
  const handleRemoveFile = (fileName) => {
    const newFileBase = { ...fileBase };
    const newFileNames = fileNames.filter((name) => name !== fileName);
    delete newFileBase[fileName];
    setFileBase(newFileBase);
    setFileNames(newFileNames);
  };


  /*Function to sent email*/
  const onSendMailClick = async () => {
    // console.log(state.signature);
    if (validate()) {
      if (state.signature_text || signatureImage) {
        let data = {
          admin_id: localStorage.getItem("admin_id"),
          signature: state.signature_text,
          signature_image: signatureImage
        }
        // Combine text and image into one base64 image
        const responseData = await AddAdmin(data);
        if (responseData.message === "admin updated successfully") {
          localStorage.setItem("admin_signature", signatureImage)
          localStorage.setItem("admin_signature_text", state.signature_text)
        }
      }
      try {
        setLoading(true);
        let payload = { ...state };
        if (signatureImage) {
          payload.signatureImage = signatureImage;
        }

        let Response = await SendEmail(payload, fileBase);
        setLoading(false);
        if (Response.message === "email sent successfully") {
          toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          if (selectedDraftId) {
            DeleteDraftOutlookEmail(selectedDraftId)
            fetchDrafts()
          }
          setSelectedDraftId()
          setLoading(false);
          setState({ ...state, ...initialFormState, signature_text: state.signature_text });
          setFileNames([]);
          setErrors("");
          setApiCall(true);
          setFileBase("");
          setFileNames([]);
        }
        if (Response.message === "Failed !") {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setSignatureImage(null);
          setErrors("");
          setFileNames([]);
          setFileBase("");
          setFileNames([]);
        }
        if (Response.message === "Fields must not be empty!") {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setSignatureImage(null);
          setErrors("");
          setFileNames([]);
          setFileBase("");
          setFileNames([]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setSignatureImage(null);
        setFileNames([]);
        setErrors("");
        setState(initialFormState);
        setFileBase("");
        setFileNames([]);
      }
    }
  };

  // Update adminemail state to ensure multiple emails are comma-separated
  const handleAdminCCEmailChange = (e) => {
    const value = e.target.value;
    const emailArray = value.split(",").map((email) => email.trim()); // Split emails and trim whitespace

    if (userrType === "admin") {
      setState((prevState) => ({
        ...prevState,
        adminemail: [AdminEmail, ...emailArray.filter((email) => email !== AdminEmail)], // Ensure AdminEmail is always first
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        adminemail: emailArray, // Ensure AdminEmail is always first
      }))
    }
  };
  // Update adminemail state to ensure multiple emails are comma-separated
  const handleAdminBBEmailChange = (e) => {
    const value = e.target.value;
    const emailArray = value.split(",").map((email) => email.trim()); // Split emails and trim whitespace

    setState((prevState) => ({
      ...prevState,
      bccemail: [...emailArray], // Ensure AdminEmail is always first
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
        setState({ ...state, signature: reader.result })
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("signatureImageInput").click();
  };

  // --- DRAFT FUNCTIONALITY START ---

  // Fetch drafts on component mount
  useEffect(() => {
    fetchDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AdminId]);

  const fetchDrafts = async () => {
    if (!AdminId) return;
    try {
      setDraftLoading(true);
      // Fetch drafts for the current recipient email
      const response = await GetDraftOutlookEmail(email);
      setDraftLoading(false);

      if (response.data && response.status === 1) {
        // Assuming response.data.value is an object with drafts and body
        setDrafts(response.data.value || []);
      } else {
        setDrafts([]);
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
      setDraftLoading(false);
      setDrafts([]);
    }
  };

  /* Function to load a selected draft */
  const onLoadDraft = async (draft) => {
    // Convert comma-separated string back to array if needed, or just set the string for the input field
    const ccEmails = draft.cc_email ? draft.cc_email.split(',').map(e => e.trim()).filter(e => e) : [];
    const bccEmails = draft.bcc_email ? draft.bcc_email.split(',').map(e => e.trim()).filter(e => e) : [];

    setState({
      ...state,
      subject: draft.subject,
      description: draft.body.content,
      adminemail: ccEmails.join(', '),
      bccemail: bccEmails.join(', '),
      // Keep existing signature data
    });

    setSelectedDraftId(draft.id);
    // *** 1. HANDLE DRAFT ATTACHMENTS (New Logic) ***
    if (draft.hasAttachments === true) {
      try {
        const Res = await GetPreviewAttchmentEmail("DRAFT", draft.id);
        // console.log(Res.data.value);

        // const newFileBase = [];
        // const newFileNames = [];

        if (Res?.data?.value?.length > 0) {
          const existingFiles = Array.isArray(fileBase) ? [...fileBase] : [];
          const newFiles = [];

          for (const att of Res.data.value) {
            if (att.name && att.contentBytes) {
              // Convert Base64 to Blob
              const byteCharacters = atob(att.contentBytes);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray]);

              // Create File object
              const file = new File([blob], att.name, {
                type: blob.type || "application/octet-stream",
              });

              // Avoid duplicates based on name
              if (!existingFiles.some(f => f.name === file.name)) {
                newFiles.push(file);
              }
            }
          }

          // Merge files
          const updatedFiles = [...existingFiles, ...newFiles];
          setFileBase(updatedFiles);
          setFileNames(updatedFiles.map(f => f.name));

          // console.log("Updated Files:", updatedFiles); // ✅ shows File objects
        }


      } catch (error) {
        console.error("Error fetching attachments:", error);
        setFileBase([]);
        setFileNames([]);
      }
    } else {
      // Clear any existing attachments if the loaded draft has none
      setFileBase([]);
      setFileNames([]);
    }


    toast.info(`Draft loaded: ${draft.subject.substring(0, 30)}${draft.subject.length > 30 ? '...' : ''}`, { autoClose: 1500 });
  };


  /* Function to save email as a draft (now includes draft_id for update) */
  const onSaveDraftClick = async () => {
    if (!AdminId || !state.email) {
      toast.error("Cannot save draft without sender or recipient email.");
      return;
    }
    try {
      setDraftLoading(true);

      const ccString = state.adminemail || "";
      const bccString = state.bccemail || "";

      let payload = {
        to: state.email,
        subject: state.subject || "",
        body: state.description || "",
        cc_email: ccString,
        bcc_email: bccString,
        sender_id: AdminId,
        // *** 4. PASS DRAFT ID ON UPDATE (Already done, just confirming) ***
        message_id: selectedDraftId, // This is null for a new draft, or the ID for an update
      };

      // Note: Attachments (fileBase) are NOT sent to the Save Draft API based on the original request's payload, 
      // only included in SendEmail. Keep this in mind if you need to update your API logic.

      let Response = await SaveDraftOutlookEmail(payload, fileBase);
      setDraftLoading(false);

      if (Response.message === "Success" || Response.message === "Draft updated successfully" || Response.message === "Draft saved successfully" || Response.message === "Draft created successfully") {
        toast.success(selectedDraftId ? "Draft updated successfully!" : "Draft saved successfully!", { autoClose: 1500 });
        // After saving, refresh the list to see the update
        fetchDrafts();
        // If it was a new save, update the selected ID in case the user wants to update it again
        if (!selectedDraftId && Response.data && Response.data.id) {
          setSelectedDraftId(Response.data.id);
        }
      } else {
        toast.error("Failed to save draft.");
      }
    } catch (err) {
      console.error(err);
      setDraftLoading(false);
      toast.error("An error occurred while saving the draft.");
    }
  };

  /* Function to delete a draft */
  const onDeleteDraft = async (draftId) => {
    try {
      setDraftLoading(true);
      // ** You must ensure DeleteDraftOutlookEmail is defined and imported **
      const Response = await DeleteDraftOutlookEmail(draftId);
      setDraftLoading(false);

      if (Response.message.includes("success") || Response.status === 1) {
        toast.success("Draft deleted successfully!", { autoClose: 1500 });
        fetchDrafts(); // Refresh the list
        setDeleteAlert(false)
        // If the deleted draft was the one currently loaded, clear the form.
        if (selectedDraftId === draftId) {
          setState(initialFormState);
          setFileBase([]);
          setFileNames([]);
          setSelectedDraftId(null);
        }
      } else {
        toast.error("Failed to delete draft.");
        setDeleteAlert(false)
      }
    } catch (err) {
      console.error(err);
      setDraftLoading(false);
      toast.error("An error occurred while deleting the draft.");
      setDeleteAlert(false)
    }
  };

  // Function to handle file preview (UPDATED)
  const handlePreviewFile = async (file) => {
    if (!file) return;

    // 1. Clean up any previous temporary URL
    if (previewFileUrl) {
      URL.revokeObjectURL(previewFileUrl);
    }

    // 2. Create a temporary URL for the file object in the browser's memory
    const tempUrl = URL.createObjectURL(file);

    // 3. Set the state
    setPreviewFile(file);
    setPreviewFileUrl(tempUrl);
    setViewFile(true); // Open the modal
  };

  // Cleanup function for when the modal closes (NEW)
  const handleCloseViewFile = () => {
    if (previewFileUrl) {
      URL.revokeObjectURL(previewFileUrl); // Clean up the temporary URL
    }
    setViewFile(false);
    setPreviewFile(null);
    setPreviewFileUrl(null);
  };

  // --- DRAFT FUNCTIONALITY END ---
  return (
    <div>
      <div className="row pt-1">
        {/* --- SAVED DRAFTS DISPLAY (UPDATED) ---  */}
        {drafts.length > 0 && (
          <div className="mb-3 col-12">
            <label className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-1">
              Drafts:
              {draftLoading && <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>}
            </label>
            <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
              {drafts.map((draft) => (
                <div key={draft.id} className="position-relative text-break p-1" style={{ maxWidth: '300px', minHeight: '40px' }}>
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedDraftId === draft.id ? 'btn-success' : 'btn-outline-secondary'} w-100`}
                    onClick={() => onLoadDraft(draft)}
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    title={draft.subject}
                    disabled={draftLoading}
                  >
                    {draft.subject ? draft.subject.substring(0, 25) : 'No Subject'}
                    {draft.subject && draft.subject.length > 25 ? '...' : ''}
                  </button>
                  {/* *** 2. DELETE DRAFT BUTTON (Updated to cross in top-right corner) ***  */}
                  <Link
                    type="button"
                    className="position-absolute"
                    style={{
                      top: '-5px',
                      right: '-2px',
                      background: '#fbf4f4',
                      border: 'none',
                      color: '#dc3545',
                      padding: '0',
                      fontSize: '16px',
                      borderRadius: "50%"
                    }}
                    onClick={(e) => {
                      e.preventDefault(); setDeleteAlert(true);
                      setDeleteData(draft)
                    }}
                    title="Delete Draft"
                    disabled={draftLoading}
                  >
                    <IoMdClose />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <form>
        <div className="row pt-1">
          <div className="mb-2 col-12">
            <label
              htmlFor="subject"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Subject: <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                maxLength={100}
                name="subject"
                value={state.subject || ""}
                onChange={onInputChange}
                type="text"
                className={
                  errors.subject
                    ? "form-control border border-danger"
                    : "form-control"
                }
                placeholder="subject"
                id="subject"
              />
            </div>
            {/*----ERROR MESSAGE FOR name----*/}
            {errors.subject && (
              <span key={errors.subject} className="text-danger font-size-3">
                {errors.subject}
              </span>
            )}
          </div>
          <div className="mb-2 col-12">
            <label htmlFor="adminemail" className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0">
              CC Email:
            </label>
            <input
              maxLength={100}
              name="adminemail"
              value={state.adminemail || ""}
              onChange={handleAdminCCEmailChange} // Handle change
              type="email"
              className={errors.adminemail ? "form-control border border-danger" : "form-control"}
              placeholder="CC Email"
              id="adminemail"
            />
            {errors.adminemail && <span key={errors.adminemail} className="text-danger font-size-3">{errors.adminemail}</span>}
          </div>
          {/* New BCC Email Field */}
          <div className="mb-2 col-12">
            <label
              htmlFor="bccemail"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              BCC Email:
            </label>
            <input
              maxLength={100}
              name="bccemail"
              value={state.bccemail || ""}
              onChange={handleAdminBBEmailChange}
              type="email"
              className={errors.bccemail ? "form-control border border-danger" : "form-control"}
              placeholder="BCC Email"
              id="bccemail"
            />
            {errors.bccemail && (
              <span key={errors.bccemail} className="text-danger font-size-3">
                {errors.bccemail}
              </span>
            )}
          </div>
          <div className="mb-2 col-12">
            <label
              htmlFor="description"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Description: <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <div
                className={
                  errors.description
                    ? "border border-danger rounded overflow-hidden"
                    : "border rounded overflow-hidden"
                }
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  minHeight: "100px",
                  padding: "10px",
                  border: isDragging ? "2px dashed #007bff" : "2px dashed #ccc",
                  borderRadius: "5px",
                  backgroundColor: isDragging ? "#e9f5ff" : "transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <SignatureTextEditor
                  name="description"
                  state={state.description || ""}
                  setState={setState}
                  placeholder="Enter description  here"
                  id="description"
                />
                {/* <TextEditor
                  state={state}
                  setState={setState}
                  adminSignature={adminSignature}
                  page={"mail"}// has same variable as description
                /> */}
                <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                  Drag and drop files here or click "Attach Files" button to upload attachments.
                </div>
              </div>
              {/*----ERROR MESSAGE FOR DESRIPTION----*/}
              {errors.description && (
                <span
                  key={errors.description}
                  className="text-danger font-size-3"
                >
                  {errors.description}
                </span>
              )}
            </div>
          </div>
          <div className="mb-2 col-12">
            <label
              htmlFor="signature_text"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Signature Text:
            </label>
            <SignatureTextEditor
              name="signature_text"
              state={state.signature_text || ""}
              setState={setState}
              placeholder="Enter signature text here"
              id="signature_text"
            />
            {/* <textarea
              name="signature_text"
              value={state.signature_text || ""}
              onChange={onInputChange}
              rows={4}
              className="form-control"
              placeholder="Enter Signature text here"
              id="signature_text"
            /> */}
          </div>
          <div className="mb-2 col-12">
            <label className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0">
              Signature Image:
            </label>

            {signatureImage ? (
              <div className="mb-2">
                <img
                  src={signatureImage}
                  alt="Signature"
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
                <Link
                  className="btn btn-link p-0 mt-1"
                  onClick={triggerFileInput}
                >
                  Change Signature Image
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  type="button"
                  className="text-dark display-2"
                  onClick={triggerFileInput}
                >
                  <LiaFileSignatureSolid />
                </Link>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              id="signatureImageInput"
              onChange={handleImageChange}
              className="form-control d-none"
            />
          </div>
          <div className="mail-file-attachments">
            {fileNames.map((fileName) => (
              <div key={fileName} className="mail-file-attachment">
                <p><Link className="" onClick={() => handlePreviewFile(fileBase.find(f => f.name === fileName))}>{fileName}</Link></p>
                <button
                  type="button"
                  className="mail-remove-file"
                  onClick={() => handleRemoveFile(fileName)}
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
          <div className="mb-2 col-12">
            <label
              className="btn btn-secondary"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.border = "2px dashed #007bff";
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.border = "";
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.border = "";
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const syntheticEvent = { target: { files: e.dataTransfer.files } };
                  await AddAttachmentChange(syntheticEvent);
                  e.dataTransfer.clearData();
                }
              }}
            >
              <AiOutlineCloudUpload className="font-size-3 mr-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => {
                  AddAttachmentChange(e);
                }}
                placeholder="Attach file"
                multiple
              />
              Attach Files
            </label>
          </div>
          <div className="mb-2 col-12 d-flex justify-content-between">
            {/* Submit Button */}
            <div className="w-50 pr-1">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-100 rounded-5 text-uppercase "
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Sending...</span>
                </button>
              ) : (
                <button
                  onClick={(e) => onSendMailClick(e)}
                  className="btn btn-primary btn-small rounded-5 text-uppercase w-100"
                  type="button"
                >
                  Send
                </button>
              )}
            </div>
            {/* Save Draft Button */}
            <div className="w-50 pl-1">
              {draftLoading === true ? (
                <button
                  className="btn btn-info btn-small w-100 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Saving...</span>
                </button>
              ) : (
                <button
                  onClick={(e) => { e.preventDefault(); onSaveDraftClick(); }}
                  className="btn btn-info btn-small rounded-5 text-uppercase w-100"
                  type="button"
                >
                  {selectedDraftId ? "Update Draft" : "Save Draft"}
                </button>
              )}
            </div>
          </div>
        </div>
        <SAlert
          show={deleteAlert}
          title={deleteData?.subject}
          text="Are you Sure you want to delete !"
          onConfirm={() => onDeleteDraft(deleteData?.id)}
          showCancelButton={true}
          onCancel={() => setDeleteAlert(false)}
        />
      </form>

      {/* File Preview Modal */}
      <AttachmentPreviewModal
        show={viewFile}
        onHide={() => handleCloseViewFile()} // Use the new cleanup function
        file={previewFile}
        fileUrl={previewFileUrl}
      />
    </div>
  );
}
export default SendMailForm;
