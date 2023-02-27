import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function EmployementDetails(props) {
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2">Add Employment</h5>
            <div className="row pt-5">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Company"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tell us your company name"
                  id="Company"
                />
              </div>{" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Designation<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tell us your designation / job role"
                  id="Designation
"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Company_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company location <span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tell us your employer location"
                  id="Company_Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry <span className="text-danger">*</span> :
                </label>
                <div className="position-relative">
                  <select className="form-control">
                    <option value={""}>
                      Select the industry your company belongs to
                    </option>
                    <option value={""}>Accounting & Auditing</option>
                    <option value={""}>Call center / BPO</option>
                    <option value={""}>Banking finance</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Functional Area <span className="text-danger">*</span>:
                </label>
                <div className="position-relative">
                  <select className="form-control">
                    <option value={""}>
                      Select the department you work in
                    </option>
                    <option value={""}>
                      Fresh graduates / Management Traninee /Intern
                    </option>
                    <option value={""}>Engineering </option>
                    <option value={""}>Adminstration</option>
                  </select>
                </div>
                <div className="col mt-2">
                  <input
                    type="checkbox"
                    id="Current_working"
                    className="pt-5 mt-5"
                  />
                  <label
                    htmlFor="Current_working"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-4 mt-5 pt-3"
                  >
                    I Currently work here
                  </label>
                </div>
              </div>{" "}
            </div>

            <div>
              <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                Work level<span className="text-danger">*</span> :
              </label>
              <div className="row font-size-3">
                <Link to={""}>
                  <span className="text-dark rounded-pill mb-2 border mx-2 p-3">
                    Studen/Intern
                  </span>
                </Link>
                <Link to={""}>
                  <span className="text-dark rounded-pill mb-2 border mx-2 p-3">
                    Entry level
                  </span>
                </Link>
                <Link to={""}>
                  <span className="text-dark rounded-pill mb-2 border mx-2 p-3">
                    Non Managerial level
                  </span>
                </Link>
                <Link to={""}>
                  <span className="text-dark rounded-pill mb-2 border mx-2 p-3">
                    Managerial level
                  </span>
                </Link>
                <Link to={""}>
                  <span className="text-dark rounded-pill mb-2 border mx-2 p-3">
                    Senior Mangement(AVP ,VP , GM)
                  </span>
                </Link>
                <Link to={""}>
                  <span className="text-dark rounded-pill mb-2 border mx-2 p-3">
                    Top Management (CEO , CFO , Director)
                  </span>
                </Link>
              </div>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-primary btn-small w-25 rounded-5 text-uppercase">
                Submit
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default EmployementDetails;
