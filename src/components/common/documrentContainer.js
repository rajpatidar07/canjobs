import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import {
  UploadDocument,
  GetEmployeeDocumentList,
  VarifyDocument,
} from "../../api/api";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import { useEffect } from "react";
export default function DocumrentContainer(props) {
  const [docName, setDocName] = useState("")
  const [docData, setDocData] = useState([])
  const [docTypData, setDocTypData] = useState("")
  const [apiCall, setApiCall] = useState("")
  const [docFile, setDocFile] = useState("")
  const [docFileBase, setDocFileBase] = useState("")
  const [docFileExt, setDocFileExt] = useState("")
  const [docId, setDocId] = useState("")
  const [showMoreDocType, setShowMoreDocType] = useState(false)
  const [showSaveDoc, setShowSaveDoc] = useState(false)
  let encoded;

  /*Functo get Applicants Document */
  const GetDocument = async () => {
    let response = await GetEmployeeDocumentList(props.employee_id)
    if (response.data.data === undefined || response.data.data === "" || response.data.data === null || response.data.data.length === 0) {
      setDocData([])
    } else {
      setDocData(response.data.data)
      // eslint-disable-next-line
      if (docTypData === undefined || docTypData === "undefined" || docTypData === "" && docName === "") {
        setDocTypData(response.data.data[0])
        setDocFile(response.data.data[0].document_url + `?v=${new Date().getMinutes() + new Date().getSeconds()}`)
      }

      else if (showMoreDocType === false && response.data.data.find((item) => item.type === docName)) {
        if (response.data.data.find((item) => item.type === docName).type === docName) {
          setDocTypData(response.data.data.find((item) => item.type === docName))

          setDocFile(response.data.data.find((item) => item.type === docName).document_url + `?v=${new Date().getMinutes() + new Date().getSeconds()}`)
        }
      }
    }
  }

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
      console.log("not matched");
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
      let DocFile =
          `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]}`
      setDocFile(base64Name)
      setDocFileExt(fileType.slice(1))
      setDocFileBase(DocFile)
      setShowSaveDoc(true)
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
  const SaveDocument =async () => {
    let response = await UploadDocument(props.employee_id,/*docName === "" ? docData[0].type : */docName, docFileBase, docId)
    console.log(response)
    if (response.data.message === "inserted successfully") {
      toast.success("Document uploaded Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setShowMoreDocType(false)
      setDocName(docName)
      setDocFileBase("")
      setDocFileExt("")
      setShowSaveDoc(false)
      setApiCall(true)
    }
    if (response.data.message === "updated successfully") {
      toast.success("Document Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setShowMoreDocType(false)
      setApiCall(true)
      // console.log(docData.find((item)=>item.type === docName))
      setDocTypData(docData.find((item) => item.type === docName))
      setDocFile(docData.find((item) => item.type === docName).document_url + `?v=${new Date().getMinutes() + new Date().getSeconds()}`)
    }
    if (response.data.message === "Invalid base64-encoded data !") {
      toast.error("Document type is not valid", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true)
    }
  }
  /*Fuinction to render image */
  const RenderNewDocFile = () => {
    return <FileViewer
      fileType={docFileExt ? docFileExt :
        docTypData.extension_type === "vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" : docTypData.extension_type}
      filePath={docFile}
      errorComponent={() => <div>Error loading document</div>}
    />
  }

  /*Function to verify the applicants documents */
  const onVerifyDocuments = async (id, verify) => {
    let response = await VarifyDocument(id, verify);
    if (response.data.message === "successfully") {
      toast.success("Document Verify Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true);
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
    GetDocument()
    RenderNewDocFile()
    if (apiCall === true) {
      setApiCall(false)
    }
  }, [docName, apiCall, docFile])

  return (
    <div className="container document_container bg-white p-7">
      <div className="row mb-11 ">
        <div className="col-4">
          <h5>Document List</h5>
          {/* Documents type list */}
          <ListGroup defaultActiveKey="#link1">
            {(docData || []).map((item, index) =>
            (
              <ListGroup.Item
                key={index}
                action
                active={docTypData.type === item.type || (showMoreDocType === false && item.type === docName)}
                onClick={() => {
                  setShowMoreDocType(false)
                  setDocTypData(item)
                  setDocName(item.type)
                  setDocId(item.id)
                  setDocFile(item.document_url + `?v=${new Date().getMinutes() + new Date().getSeconds()}`)
                }}
              >
                {item.type === "passport" ? "Passport"
                  :
                  item.type === "drivers_license" ? "Driving License"
                    :
                    item.type === "immigration_status" ? "Current Immigration Status"
                      :
                      item.type === "lmia" ? "Lmia"
                        :
                        item.type === "job_offer_letter" ? "Job Offer"
                          :
                          item.type === "provincial_nominee_letter" ? "Provincial Nominee"
                            :
                            item.type === "proof_of_funds" ? "Funds"
                              :
                              item.type === "proof_of_employment" ? "Employment"
                                :
                                item.type === "marriage_certificate" ? "Marriage Certificate"
                                  :
                                  item.type === "education_metric" ? "Education Metric (10Th marksheet)"
                                    :
                                    item.type === "education_higher_secondary" ? "Education Higher Secondary (12Th marksheet)"
                                      :
                                      item.type === "education_graduation" ? "Education Graduation (UG marksheet)"
                                        :
                                        item.type === "education_post_graduation" ? "Education Post Graduation (PG marksheet)"
                                          :
                                          item.type === "resume_or_cv" ? "Resumne"
                                            :
                                            item.type === "ielts" ? "IELTS"
                                              :
                                              item.type === "medical" ? "Medical Certificate"
                                                :
                                                item.type === "police_clearance" ? "Police Clearance Certificate"
                                                  :
                                                  item.type === "refusal_letter" ? "Refusal Letter"
                                                    :
                                                    item.type === "photograph" ? "Photograph"
                                                      :
                                                      null
                }
                {item.is_varify === "1" ? <span><i className="fas fa-check"></i> Verified </span> : null}
              </ListGroup.Item>
            ))}
            <ListGroup.Item >
              <button className='btn btn-primary w-100' onClick={() => {
                setShowMoreDocType(true)
                setDocTypData("")
              }}>Add New Documents</button>
            </ListGroup.Item>
          </ListGroup>
        </div>
        {docTypData ?
          // Code to update document
          (
            <div className="col-7 p-5 bg-light rounded">
              <div className="doc_preview_box" >
                <div className='d-flex justify-content-between'>
                  {showMoreDocType ?
                    <Form.Select
                      className='form-control'
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}>
                      <option value={""}>Select document</option>
                      {(DocTypeData || []).map((item, index) => {
                        return (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        );
                      })}
                    </Form.Select> :
                    null}
                  <div className=''>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, docTypData.id)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }>
                      {docTypData.id ? "Update Document" : "Upload Document"}
                    </button>
                  </div>
                  {showSaveDoc ?
                    <div className="">
                      <button onClick={SaveDocument}>Save Document</button>
                    </div>
                    : null}
                  <div className="">
                    <button
                      className="btn btn-secondary"
                      disabled={docTypData.is_varify === "0" ? false : true}
                      onClick={() => onVerifyDocuments(docTypData.id, 1)}>
                      {docTypData.is_varify === "1" ?
                        <span>Verifed <i className="fas fa-check fs-1 p-1 border border-white rounded-circle"></i>
                        </span> :
                        "Verify document"}
                    </button>
                  </div>
                </div>
                {docTypData.id ?
                  <RenderNewDocFile />
                  :
                  <div className='text-center'>
                    <h2> No Documents </h2>
                  </div>
                }
              </div>
            </div>
          ) :
          // Code to Upload new document
          <>
            {showMoreDocType ?
              <div className="d-flex justify-content-between">
                <Form.Select className='form-control' value={docName} onChange={(e) => setDocName(e.target.value)}>
                  <option value={""}>Select document</option>
                  {(DocTypeData || []).map((item, index) => {
                    return (
                      <option value={item} key={index}>{item}</option>)
                  })}
                </Form.Select>
                <div className=''>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, docTypData.id)}
                  />
                  <button className="btn btn-primary"
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }>Upload Document</button>
                </div>
              </div> :
              null}
          </>}
      </div>
    </div>
  );
}
