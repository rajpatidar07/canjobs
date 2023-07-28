import React, { useState } from "react";
import { ListGroup, DropdownButton, Dropdown } from "react-bootstrap";
import {
  UploadAndVarifyDocument,
  GetEmployeeDocumentList,
} from "../../api/api";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import { useEffect } from "react";
export default function DocumrentContainer(props) {
  const [docName, setDocName] = useState("");
  const [docData, setDocData] = useState([]);
  const [apiCall, setApiCall] = useState("");
  let encoded;
  /*Functo get Applicants Document */
  const GetDocument = async () => {
    if (docName) {
      let response = await GetEmployeeDocumentList(props.employee_id, docName);
      if (
        response.data.data === undefined ||
        response.data.data === "" ||
        response.data.data === null
      ) {
        setDocData([]);
      } else {
        setDocData(response.data.data);
      }
      // console.log(response.data.data)
    }
  };
  /*Render method */
  useEffect(() => {
    GetDocument();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [docName, apiCall]);

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
    const reader = new FileReader();
    // Read the file as a data URL
    reader.readAsDataURL(file);
    encoded = await convertToBase64(file);
    let base64Name = encoded.base64;
    // console.log("employee_id",props.employee_id,
    // "document =>", base64Name,
    // "Type =>" , docName)
    let DocFile =
      "data:/" +
      base64Name.split(";")[0].split("/")[1] +
      ";" +
      base64Name.split(";")[1];
    let response = await UploadAndVarifyDocument(
      props.employee_id,
      docName,
      DocFile,
      id
    );
    if (response.data.message === "successfully") {
      toast.success("Document uploaded Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true);
    }
    if (response.message === "Invalid base64-encoded data !") {
      toast.error("Document type is not valid", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true);
    }
  };
  return (
    <div className="container document_container bg-white p-7">
      <div className="row mb-11 ">
        <div className={docName ? "col-3" : "col-12"}>
          <h5>Document List</h5>
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item
              action
              active={docName === "passport" ? true : false}
              onClick={() => setDocName("passport")}
            >
              Passport
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "drivers_license" ? true : false}
              onClick={() => setDocName("drivers_license")}
            >
              Driving License
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "immigration_status" ? true : false}
              onClick={() => setDocName("immigration_status")}
            >
              Proof of current immigration status
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "lmia" ? true : false}
              onClick={() => setDocName("lmia")}
            >
              A copy of the Labour Market Impact Assessment (LMIA)
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "job_offer_letter" ? true : false}
              onClick={() => setDocName("job_offer_letter")}
            >
              A copy of your job offer from your prospective Canadian employer
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "provincial_nominee_letter" ? true : false}
              onClick={() => setDocName("provincial_nominee_letter")}
            >
              If you're a Provincial Nominee with an LMIA-exempt job offer
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "proof_of_funds" ? true : false}
              onClick={() => setDocName("proof_of_funds")}
            >
              Proof of funds
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "proof_of_employment" ? true : false}
              onClick={() => setDocName("proof_of_employment")}
            >
              Proof of employment - Proof of job requirements met.
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "marriage_certificate" ? true : false}
              onClick={() => setDocName("marriage_certificate")}
            >
              Photocopy of Marriage certificate
            </ListGroup.Item>
            <ListGroup.Item
              as={DropdownButton}
              title="Educational documents"
              variant="light"
              id="dropdown-basic"
              active={
                docName ===
                ("education_metric" ||
                  "education_higher_secondary" ||
                  "education_graduation" ||
                  "education_post_graduation")
                  ? true
                  : false
              }
            >
              <Dropdown.Item onSelect={() => setDocName("education_metric")}>
                10th Marksheet
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => setDocName("education_higher_secondary")}
              >
                12th Marksheet
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => setDocName("education_graduation")}
              >
                Graduation Marksheet
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => setDocName("education_post_graduation")}
              >
                Post Graduation Marksheet
              </Dropdown.Item>
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "resume_or_cv" ? true : false}
              onClick={() => setDocName("resume_or_cv")}
            >
              Résumé or CV of your work and education history
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "ielts" ? true : false}
              onClick={() => setDocName("ielts")}
            >
              IELTS test
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "biometrics_validity_letter" ? true : false}
              onClick={() => setDocName("biometrics_validity_letter")}
            >
              validited Biometrics letter
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "medical" ? true : false}
              onClick={() => setDocName("medical")}
            >
              Medical certificate
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "police_clearance" ? true : false}
              onClick={() => setDocName("police_clearance")}
            >
              Police clearance letter
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={docName === "refusal_letter" ? true : false}
              onClick={() => setDocName("refusal_letter")}
            >
              Any past refusals
            </ListGroup.Item>
          </ListGroup>
        </div>
        {docName ? (
          <div className="col-9 p-5 bg-light rounded">
            {docData.length === 0 ? (
              <div className="doc_preview_box">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  {" "}
                  Update Document
                </button>
              </div>
            ) : (
              (docData || []).map((Item, index) => {
                return (
                  <div className="doc_preview_box" key={index}>
                    <div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, Item.id)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                      >
                        {" "}
                        Update Document
                      </button>
                    </div>
                    {console.log("url =>", Item.document_url)}
                    <FileViewer
                      fileType={Item.extension_type}
                      filePath={Item.document_url}
                      errorComponent={() => <div>Error loading document</div>}
                    />
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
