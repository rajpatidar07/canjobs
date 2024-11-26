import React, { /*useEffect,*/ useState } from "react";
import useValidation from "../../common/useValidation";
import { SendEmail } from "../../../api/api";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TextEditor from "../../common/TextEditor";
function SendMailForm({ email, setApiCall }) {
  const [loading, setLoading] = useState(false);
  const [fileBase, setFileBase] = useState("");
  const [fileNames, setFileNames] = useState([]);
  let AdminEmail = localStorage.getItem("admin_email");
  /*Render function to get the Response*/
  // useEffect(() => {
  // }, []);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    subject: "",
    description: "",
    email: email,
    adminemail: AdminEmail,
    bccemail: ""
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
            : /[^A-Za-z 0-9]/g.test(value)
              ? "Cannot use special character "
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

  /*On change fnction to upload bulk document in 1 array*/
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
  const handleBulkFileChange = async (event, id) => {
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

      // Continue with file validation and processing
      const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
      const maxSize = 1024 * 8000; // 8 MB

      const fileList = { ...fileBase };
      const fileNameList = [];
      let DocRealName;
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
        const encoded = await convertToBase64(file);
        const base64Name = encoded.base64;

        // Construct file object with base64 data
        const DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]
          }`;

        // Use DocRealName as the key for DocFile
        DocRealName = file.name;
        fileList[DocRealName] = DocFile;
        fileNameList.push(DocRealName);
      }
      // console.log(fileList, fileNameList);
      setFileBase(fileList);
      setFileNames(fileNameList);
      // Store the object of files
    }
  };
  //Function to Remove any attechment
  const handleRemoveFile = (fileName) => {
    const newFileBase = { ...fileBase };
    const newFileNames = fileNames.filter((name) => name !== fileName);
    delete newFileBase[fileName];
    setFileBase(newFileBase);
    setFileNames(newFileNames);
  };

  /*Function to sent email*/
  const onSendMailClick = async () => {
    // console.log(fileBase);
    if (validate()) {
      try {
        setLoading(true);
        let Response = await SendEmail(state, fileBase);
        setLoading(false);
        if (Response.message === "email sent successfully") {
          toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          // setFileBase("");
          setFileNames([]);
          setErrors("");
          setApiCall(true);
        }
        if (Response.message === "Failed !") {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
          // setFileBase("");
          setFileNames([]);
        }
        if (Response.message === "Fields must not be empty!") {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
          // setFileBase("");
          setFileNames([]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        // setFileBase("");
        setFileNames([]);
        setErrors("");
        setState(initialFormState);
      }
    }
  };
  // Update adminemail state to ensure multiple emails are comma-separated
  const handleAdminCCEmailChange = (e) => {
    const value = e.target.value;
    const emailArray = value.split(",").map((email) => email.trim()); // Split emails and trim whitespace

    setState((prevState) => ({
      ...prevState,
      adminemail: [AdminEmail, ...emailArray.filter((email) => email !== AdminEmail)], // Ensure AdminEmail is always first
    }));
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
                  page={"description"}// has same variable as description
                />
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
          <div className="mail-file-attachments">
            {fileNames.map((fileName) => (
              <div key={fileName} className="mail-file-attachment">
                <p>{fileName}</p>
                <button
                  type="button"
                  className="mail-remove-file"
                  onClick={() => handleRemoveFile(fileName)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="mb-2 col-12">
            <label className="btn btn-secondary ">
              <AiOutlineCloudUpload className="font-size-3 mr-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleBulkFileChange(e);
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
