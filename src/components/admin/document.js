import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Doc1 from "../../media/doc1.jpg";
import Doc2 from "../../media/pdf.pdf";
import Doc4 from "../../media/Hello.docx"
import FileViewer from "react-file-viewer";
import { Link, useLocation } from "react-router-dom"
function Document() {
  const [docName, setDocName] = useState("")
  const [docFile, setDocFile] = useState("")
  const [docFileError, setdocError] = useState("")
let encoded;
  let location = useLocation()

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
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // reader.onload = (event) => {
    //   const doc = new Image();
    //   doc.onload = () => {
    //     if ((file.size > 1024 * 100) === true) {
    //       setdocError("Document size can't be more then 100 kb");
    //     } else {
    //       setdocError("");
    //       setDocFile(event.target.result);
    //     }
    //   };
    //   doc.src = event.target.result;
    // };

    // Read the file as a data URL
    reader.readAsDataURL(file);
    encoded = await convertToBase64(file);
    let base64Name = encoded.base64;
    setDocFile(base64Name);
  };
  console.log("document =>",docFile)
  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   // Do something with the selected file, like uploading or processing it
  //   console.log("Selected file:", selectedFile.name);
  // }
  // const files = [
  //   { path: Doc1, type: "jpg" },
  //   { path: Doc2, type: "pdf" },
  //   { path: Doc4, type: "docx" },
  // ];
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"Document Upload & Verification"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Document Upload & Verification"} />
      <div
        className={"dashboard-main-container mt-25 mt-lg-22"}
        id="documentBody"
      >
        <div className="container document_container bg-white p-7">
          <div className="row mb-11 ">
            <div className="col-3">
              <h5>Document List</h5>
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action active onClick={() => setDocName("passport")}>
                  Passport
                </ListGroup.Item>
                <ListGroup.Item action>Driving License</ListGroup.Item>
                <ListGroup.Item action>
                  Proof of current immigration status
                </ListGroup.Item>
                <ListGroup.Item action>
                  A copy of the Labour Market Impact Assessment (LMIA)
                </ListGroup.Item>
                <ListGroup.Item action>
                  A copy of your job offer from your prospective Canadian
                  employer
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-9 p-5 bg-light rounded">
              <div className="doc_preview_box">
                <div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button className="btn btn-primary"
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }>Upload</button>
                </div>
                {/* <img src={Doc3} alt="" className="img-fluid" /> */}
                {/* <embed src={Doc4} width="800px" height="2100px" /> */}
                {/* {(files || []).map((item, index) => {
                  return (
                    <FileViewer
                      fileType={item.type}
                      filePath={item.path}
                      errorComponent={() => <div>Error loading document</div>}
                      key={index}
                    />
                  )
                })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;
