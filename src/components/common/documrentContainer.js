import React, { useState } from 'react'
import { ListGroup, Form } from "react-bootstrap";
import { UploadDocument, GetEmployeeDocumentList, VarifyDocument } from "../../api/api"
import { toast } from 'react-toastify';
import FileViewer from "react-file-viewer"
import { useEffect } from 'react';
export default function DocumrentContainer(props) {
  const [docName, setDocName] = useState("")
  const [docData, setDocData] = useState([])
  const [docTypData, setDocTypData] = useState({})
  const [apiCall, setApiCall] = useState("")
  const [showMoreDocType, setShowMoreDocType] = useState(false)
  let encoded;

  /*Functo get Applicants Document */
  const GetDocument = async () => {
    // if (docName) {
    let response = await GetEmployeeDocumentList(props.employee_id)
    if (response.data.data === undefined || response.data.data === "" || response.data.data === null || response.data.data.length === 0) {
      setDocData([])
    } else {
      setDocData(response.data.data)
    }
    // }  
  }
  /*Render method */
  useEffect(() => {
    GetDocument()
    RenderNewDocFile()
    if (apiCall === true) {
      setApiCall(false)
    }
  }, [docName, apiCall])

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
      console.log("not matched")
      toast.error("Invalid document type. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
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
      let response = await UploadDocument(props.employee_id, docName, DocFile, id)
      if (response.data.message === "successfully") {
        toast.success("Document uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true)
      }
      if (response.data.message === "Invalid base64-encoded data !") {
        toast.error("Document type is not valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true)
      }
    }
  };

  /*Fuinction to render image */
  const RenderNewDocFile = () => {
    let version = docTypData.document_url + `?v=${new Date().getMinutes() +new Date().getSeconds()}`
    console.log(version)
    return <FileViewer
      fileType={docTypData.extension_type}
      filePath={version}
      errorComponent={() => <div>Error loading document</div>}
    />

  }
  /*Function to verify the applicants documents */
  const onVerifyDocuments = async (id, verify) => {
    let response = await VarifyDocument(id, verify)
    if (response.data.message === "successfully") {
      toast.success("Document Verify Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true)
    }
  }
  /*Type array */
  let DocTypeData = ["passport",
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
    "biometrics_validity_letter",
    "medical",
    "police_clearance",
    "refusal_letter"]

  // function isDocumentVerified(documentType, data) {
  //   const foundItem = docData.find((item) => item.type === documentType);
  //   // return foundItem ? foundItem.is_varify === "1" : false;
  //   return( 
  //     docData.map((item,index) => (
  //     <ListGroup.Item
  //       key={index}
  //       action
  //       active={docName === item.type}
  //       onClick={() => setDocTypData(item)}
  //     >
  //       {item.type} {item.is_varify === "1" ? <span><i className="fas fa-check"></i> Verified </span> : null}
  //     </ListGroup.Item>
  //   )))
  // }
  console.log(docTypData)
  return (
    <div className="container document_container bg-white p-7">
      <div className="row mb-11 ">
        <div className="col-4">
          <h5>Document List</h5>
          <ListGroup defaultActiveKey="#link1">
            {/* <ListGroup.Item action
              active={docName === "passport" ? true : false}
              onClick={() => setDocName("passport")}>
              Passport
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "drivers_license" ? true : false}
              onClick={() => setDocName("drivers_license")}>Driving License</ListGroup.Item>
            <ListGroup.Item action
              active={docName === "immigration_status" ? true : false}
              onClick={() => setDocName("immigration_status")}>
              Proof of current immigration status
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "lmia" ? true : false}
              onClick={() => setDocName("lmia")}>
              A copy of the Labour Market Impact Assessment (LMIA)
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "job_offer_letter" ? true : false}
              onClick={() => setDocName("job_offer_letter")}>
              A copy of your job offer from your prospective Canadian
              employer
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "provincial_nominee_letter" ? true : false}
              onClick={() => setDocName("provincial_nominee_letter")}>
              If you're a Provincial Nominee with an LMIA-exempt job offer
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "proof_of_funds" ? true : false}
              onClick={() => setDocName("proof_of_funds")}>
              Proof of funds
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "proof_of_employment" ? true : false}
              onClick={() => setDocName("proof_of_employment")}>
              Proof of employment - Proof of job requirements met.
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "marriage_certificate" ? true : false}
              onClick={() => setDocName("marriage_certificate")}>
              Photocopy of Marriage certificate
            </ListGroup.Item>
            <ListGroup.Item
              as={DropdownButton}
              title="Educational documents"
              variant="light"
              id="dropdown-basic"
              active={docName === "education_metric" || docName === "education_higher_secondary" || docName === "education_graduation" || docName === "education_post_graduation" ? true : false}
            >
              <Dropdown.Item
                onClick={() => setDocName("education_metric")}
              >
                10th Marksheet
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setDocName("education_higher_secondary")}
              >
                12th Marksheet
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setDocName("education_graduation")}
              >
                Graduation Marksheet
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setDocName("education_post_graduation")}
              >
                Post Graduation Marksheet
              </Dropdown.Item>
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "resume_or_cv" ? true : false}
              onClick={() => setDocName("resume_or_cv")}>
              Résumé or CV of your work and education history
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "ielts" ? true : false}
              onClick={() => setDocName("ielts")}>
              IELTS test
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "biometrics_validity_letter" ? true : false}
              onClick={() => setDocName("biometrics_validity_letter")}>
              validited Biometrics letter
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "medical" ? true : false}
              onClick={() => setDocName("medical")}>
              Medical certificate
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "police_clearance" ? true : false}
              onClick={() => setDocName("police_clearance")}>
              Police clearance letter
            </ListGroup.Item>
            <ListGroup.Item action
              active={docName === "refusal_letter" ? true : false}
              onClick={() => setDocName("refusal_letter")}>
              Any past refusals
            </ListGroup.Item> */}
            {(docData || []).map((item, index) => (
              <ListGroup.Item
                key={index}
                action
                active={docTypData.type === item.type}
                onClick={() => {
                  setDocTypData(item)
                  setDocName(item.type)
                }}
              >
                {item.type} {item.is_varify === "1" ? <span><i className="fas fa-check"></i> Verified </span> : null}
              </ListGroup.Item>
            ))}
            <ListGroup.Item >
              <button className='btn btn-primary w-100' onClick={() => setShowMoreDocType(true)}>Add New Documents</button>


            </ListGroup.Item>
          </ListGroup>


        </div>
        {docTypData ?
          <div className="col-7 p-5 bg-light rounded">
            <div className="doc_preview_box" >
              <div className='d-flex justify-content-between'>
                {showMoreDocType ?
                  <Form.Select className='form-control' value={docName} onChange={(e) => setDocName(e.target.value)}>
                    <option value={""}>Select document</option>
                    {(DocTypeData || []).map((item, index) => {
                      return (
                        <option value={item} key={index}>{item}</option>)
                    })}
                  </Form.Select> : null}
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
                    }>{docTypData.id ? "Update Document" : "Upload Document"}</button>
                </div>
                <div className=''>
                  <button className="btn btn-secondary"
                    disabled={docTypData.is_varify === "0" ? false : true}
                    onClick={() => onVerifyDocuments(docTypData.id, 1)}>
                    {docTypData.is_varify === "1" ? <span>Verifed <i className="fas fa-check fs-1 p-1 border border-white rounded-circle"></i></span> :
                      "Verify document"}
                  </button>
                </div>
              </div>
              {docTypData.id ?
                RenderNewDocFile()
                :
                <div className='text-center'>
                  <h2> No Documents </h2>
                </div>
              }
            </div>
          </div> : null}
      </div>
    </div>
  )
}
