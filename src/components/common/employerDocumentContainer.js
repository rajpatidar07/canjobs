import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import {
  UploadEmployerDocument,
  GetEmployerDocumentList,
  VarifyEmployerDocument,
} from "../../api/api";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import { useEffect } from "react";
import Verified from "../../media/verified.png";
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
  let user_type = localStorage.getItem("userType")
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
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
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
      let DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]
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
        // console.log(docName);
        setShowMoreDocType(false);
        setOtherDoc(false);
        setDocName(docName);
        setDocFileBase("");
        setDocFileExt("");
        setDocId("");
        setShowSaveDoc(false);
        setApiCall(true);
        setHide(false)
      }
      if (response.data.message === "updated successfully") {
        toast.success("Document Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setShowMoreDocType(false);
        setApiCall(true);
        setHide(false)
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
      if (response.data.message === "Invalid base64-encoded data !") {
        toast.error("Document type is not valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setHide(false)
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setHide(false)
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
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
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

  /*Function to change document type */
  const handleDocTypeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "other") {
      setOtherDoc(true);
      setShowMoreDocType(false);
      setDocTypData("");
      setDocId("");
      setDocName("")
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

    const link = document.createElement('a');
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
    const printWindow = window.open('', '_blank');
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
    <div className="container document_container bg-white p-7 mb-10">
      <div className="row mb-11 ">
        <div className="col-12 col-md-4">
          <h5>Document List</h5>
          {/* Documents type list */}
          <ListGroup defaultActiveKey="#link1">
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
                  setOtherDoc(false)
                  setHide(false)
                  setShowSaveDoc(false)
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
              className={user_type === "company" || user_type === "admin" ? "bg-secondary text-white" : "d-none"}
              onClick={() => {
                setShowMoreDocType(true);
                setDocTypData("");
                setDocId("");
                setOtherDoc(false);
                setDocFile("")
                setHide(false)
                setShowSaveDoc(false)
              }}
            >
              <b>+ Add New Documents</b>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="col-12 col-md-8">
          <div className="row p-5 doc_upload_row">
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
                  <option value={"other"}>Other
                  </option>
                </Form.Select>
              </div>
            ) : null}
            {otherDoc === true ?
              <div className="doc_upload_col">
                <input className="form-control" value={docName} onChange={(e) => setDocName(e.target.value)}
                  placeholder="Docuent Name" />
              </div> : null}
            <div className="">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, docTypData.id)}
              />
              <button
                className={(user_type === "company" && showMoreDocType) || user_type === "admin" ? "btn btn-light" : "d-none"}
                onClick={() => {
                  document.querySelector('input[type="file"]').click()
                  setHide(true)
                }
                }
              >
                {docTypData.id ? "Update Document" : "Upload Document"}
              </button>
            </div>
            {showSaveDoc ? (
              <div className="doc_upload_col">
                <button className="btn btn-primary" onClick={SaveDocument}>
                  Save Document
                </button>
              </div>
            ) : null}
            {hide === false && docTypData && user_type === "admin" ? (
              <div className="doc_upload_col">
                {docTypData.is_varify === "1" ? (
                  <img className="verified_doc_img" src={Verified} alt="" />
                ) : (
                  <button
                    className="btn btn-secondary"
                    disabled={docTypData.is_varify === "0" ? false : true}
                    onClick={() => onVerifyDocuments(docTypData.id, 1)}
                  >
                    Verify document
                  </button>
                )}
              </div>
            ) : null}
            {hide === false && docFile && user_type === "admin" ? 
            <div className="doc_upload_col flex-end">
              <button className="btn btn-gray mx-3" onClick={PrintDocument}
                title="Print Document">
                <i className="fa fa-print" aria-hidden="true"></i>
              </button>
              <button className="btn btn-regent"
                onClick={DownloadDocument} title="Download Document">
                <i className="fa fa-download" aria-hidden="true"></i>
              </button>
            </div> : null}
            {hide === true
              ? <div className="doc_upload_col">
                <button className="btn btn-dark text-white" onClick={() => {
                  setHide(false)
                  setApiCall(true)
                  setShowSaveDoc(false)
                  setDocFile("")
                  setDocFileExt("")
                }}>
                  Cancel
                </button>
              </div> : null}
          </div>
          <div className="doc_preview_box  p-5 bg-light rounded">

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
