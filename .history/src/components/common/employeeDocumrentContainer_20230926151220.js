import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import {
  UploadDocument,
  GetEmployeeDocumentList,
  VarifyDocument,
} from "../../api/api";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import { useEffect } from "react";
import Verified from "../../media/verified.png";
export default function DocumrentContainer(props) {
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
  const fileInputRef = useRef(null);
  /*Functo get Applicants Document */
  const GetDocument = async () => {
    try {
      let response = await GetEmployeeDocumentList(props.employee_id);
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
    // console.log("employee_id",props.employee_id,
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
    else if (file.size > 1024 * 5000) {
      toast.error("Document size can't be more than 5 mb", {
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
      // if (window.confirm("Are you sure you want to upload this document?")) {
      //   let DocFile =
      //     `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]}`
      //   //Api to upload document
      //   let response = await UploadDocument(props.employee_id, docName, DocFile, id)
      //   if (response.data.message === "inserted successfully") {
      //     toast.success("Document uploaded Successfully", {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 1000,
      //     });
      //     setShowMoreDocType(false)
      //     setDocName(docName)
      //     setApiCall(true)
      //   }
      //   if (response.data.message === "updated successfully") {
      //     toast.success("Document Updated Successfully", {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 1000,
      //     });
      //     setShowMoreDocType(false)
      //     setApiCall(true)
      //     // console.log(docData.find((item)=>item.type === docName))
      //     setDocTypData(docData.find((item) => item.type === docName))
      //     setDocFile(docData.find((item) => item.type === docName).document_url + `?v=${new Date().getMinutes() + new Date().getSeconds()}`)
      //   }
      //   if (response.data.message === "Invalid base64-encoded data !") {
      //     toast.error("Document type is not valid", {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 1000,
      //     });
      //     setApiCall(true)
      //   }
      // } else {
      //   toast.error("Document update denied.", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 1000,
      //   });
      //   setApiCall(true);
      // }
    }
  };

  /*Function to save document */
  const SaveDocument = async () => {
    try {
      let response = await UploadDocument(
        props.employee_id,
        docData[0] === docTypData ? docTypData.type : docName,
        docFileBase,
        docData[0] === docTypData ? docTypData.id : docId
      );
      if (response.data.message === "inserted successfully") {
        toast.success("Document uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        // console.log(docName);
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
        setShowMoreDocType(false);
        setApiCall(true);
        setHide(false);
        // console.log(docData.find((item)=>item.type === docName))
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
    // console.log(docFile, "???????");
    return (
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
    );
  };
  const textReplaceFunction = (e) => {
    let new_text = e.replaceAll("_", " ");
    return new_text;
  };
  /*Function to verify the applicants documents */
  const onVerifyDocuments = async (id, verify) => {
    try {
      let response = await VarifyDocument(id, verify);
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
  ];

  /*Render method */
  useEffect(() => {
    GetDocument();
    RenderNewDocFile();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [docName, apiCall]);

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
  return (
    <div className="container-fluid document_container bg-white py-7 px-0">
      <div className="row m-0">
        <div className="col-md-4 p-0 border-right">
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
              </tr>
            </thead>
            <tbody>
              {docData.length === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  <th className="bg-white">No Data Found</th>
                  <th className="bg-white"></th>
                </tr>
              ) : (
                (docData || []).map((item, index) => (
                  <tr
                    key={index}
                    action
                    active={item.type === docName}
                    className={
                      item.type === docName
                        ? "text-capitalize bg-primary text-white"
                        : "text-capitalize"
                    }
                    onClick={() => {
                      setShowMoreDocType(false);
                      setDocTypData(item);
                      setHide(false);
                      setDocName(item.type);
                      setDocId(item.id);
                      setOtherDoc(false);
                      setShowSaveDoc(false);
                      setDocFile(
                        item.document_url +
                          `?v=${
                            new Date().getMinutes() + new Date().getSeconds()
                          }`
                      );
                    }}
                  >
                    <td className="p-3"> {textReplaceFunction(item.type)}</td>
                    <td className="p-3">
                      {item.updated_by_name
                        ? item.updated_by_name
                        : item.created_by_name}
                    </td>
                    <td className="p-3">{item.updated_at}</td>
                    <td className="p-3">
                      {item.is_varify === "1"
                        ? // <span className="verified_doc">
                          //   <img className="w-100" src={Verified} alt="" />
                          // </span>
                          "Yes"
                        : "No"}
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
                className="text-capitalize"
                active={item.type === docName}
                onClick={() => {
                  setShowMoreDocType(false);
                  setDocTypData(item);
                  setHide(false);
                  setDocName(item.type);
                  setDocId(item.id);
                  setOtherDoc(false);
                  setShowSaveDoc(false);
                  setDocFile(
                    item.document_url +
                      `?v=${new Date().getMinutes() + new Date().getSeconds()}`
                  );
                }}
              >
                {textReplaceFunction(item.type)}
                {item.is_varify === "1" ? (
                  <span className="verified_doc">
                    <img className="w-100" src={Verified} alt="" />
                  </span>
                ) : null}
              </ListGroup.Item>
            ))}
          </ListGroup> */}
        </div>
        <div className="col-md-8">
          <div className="row p-5 doc_upload_row  d-flex">
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
                        {/* {item}/ */}
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
                  user_type === "user" || user_type === "admin"
                    ? "btn btn-secondary"
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
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                id="EmployeeDoc"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e, docTypData.id)}
              />
              <button
                className={
                  (user_type === "user" && (showMoreDocType || otherDoc)) ||
                  user_type === "admin"
                    ? "btn btn-light"
                    : "d-none"
                }
                onClick={() => {
                  fileInputRef.current.click();
                  // document.querySelector('input[type="file"]').click();
                  setHide(true);
                }}
                htmlFor="EmployeeDoc"
              >
                {docTypData.id
                  ? "Update Current Document"
                  : "Upload New Document"}
              </button>
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
          <div className="doc_preview_box  p-5 bg-light rounded position-relative">
            <div className="doc_action_div">
              {hide === false && docTypData && user_type === "admin" ? (
                <div className="doc_upload_col">
                  {docTypData.is_varify === "1" ? (
                    <img className="verified_doc_img" src={Verified} alt="" />
                  ) : (
                    <button
                      className="p-1 rounded-3 btn-info mx-3 w-auto"
                      disabled={docTypData.is_varify === "0" ? false : true}
                      onClick={() => onVerifyDocuments(docTypData.id, 1)}
                    >
                      Verify document
                    </button>
                  )}
                </div>
              ) : null}
              {hide === false && docFile && user_type === "admin" ? (
                <div className="doc_upload_col flex-end">
                  <button
                    className="p-1 rounded-3 btn-warning mx-3 w-auto"
                    onClick={PrintDocument}
                    title="Print Document"
                  >
                    <i className="fa fa-print" aria-hidden="true"></i>
                  </button>
                  <button
                    className="p-1 rounded-3 btn-info mx-3 w-auto"
                    onClick={DownloadDocument}
                    title="Download Document"
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </div>
              ) : null}
            </div>
            {/* {docTypData ? ( */}
            <RenderNewDocFile />
            {/* ) : (
              <div className="text-center">
              <h2> No Documents </h2>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}