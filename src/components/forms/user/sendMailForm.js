import React, { /*useEffect,*/ useState } from "react";
import useValidation from "../../common/useValidation";
import { AddAdmin, SendEmail } from "../../../api/api";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TextEditor from "../../common/TextEditor";
import { Link } from "react-router-dom"
import { LiaFileSignatureSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
function SendMailForm({ email, setApiCall }) {
  const [loading, setLoading] = useState(false);
  const [fileBase, setFileBase] = useState("");
  const [fileNames, setFileNames] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  let adminSignature = localStorage.getItem("admin_signature");
  let adminSignatureText = localStorage.getItem("admin_signature_text");
  const [signatureImage, setSignatureImage] = useState(adminSignature || null);
  let AdminEmail = localStorage.getItem("admin_email");
  let AdminId = localStorage.getItem("admin_id");
  let userrType = localStorage.getItem("userType");

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

  /* Function to add files in bulk*/
  const AddAttachmentChange = async (event, id) => {
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

      // Read files as base64 and update fileBase state
      const fileBaseData = {};
      for (const file of updatedFiles) {
        const encoded = await convertToBase64(file);
        fileBaseData[file.name] = encoded.base64;
      }
console.log(updatedFiles)
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
  return (
    <div>
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
                {/* <textarea
                  name="description"
                  value={state.description}
                  onChange={onInputChange}
                  rows={8}
                  style={{ height: "140px" }}
                  className={
                    errors.description
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="description"
                  placeholder="Add Note here"
                ></textarea> */}
                <TextEditor
                  state={state}
                  setState={setState}
                  adminSignature={adminSignature}
                  page={"mail"}// has same variable as description
                />
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
            <textarea
              name="signature_text"
              value={state.signature_text || ""}
              onChange={onInputChange}
              rows={4}
              className="form-control"
              placeholder="Enter Signature text here"
              id="signature_text"
            />
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
                <p>{fileName}</p>
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
          <div className="mb-2 col-12 text-center">
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
                <span className="sr-only">Loading...</span>
              </button>
            ) : (
              <button
                onClick={(e) => onSendMailClick(e)}
                className="btn btn-primary btn-small rounded-5 text-uppercase w-100"
                type="button"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default SendMailForm;
