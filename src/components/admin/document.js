import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Doc1 from "../../media/doc1.jpg";
import Doc2 from "../../media/pdf.pdf";
function Document() {
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
                <ListGroup.Item action active>
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
                {/* <img src={Doc2} alt="" className="img-fluid" /> */}
                <embed src={Doc2} width="800px" height="2100px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;
