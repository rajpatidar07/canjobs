import React from "react";
import { Modal } from "react-bootstrap";

function EducationDetails(props) {
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
            <h5 className="text-center pt-2">Education Details</h5>
            <div className="row pt-5">
              {" "}
              <div className="form-group col-md-6">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Qualification <span className="text-danger">*</span> :
                </label>
                <select className="form-control" id="Qualification">
                  <option value={""}>select Qualification</option>
                  <option value={""}>Doctors</option>
                  <option value={""}>Masters</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="University_Institute"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  University/Institute <span className="text-danger">*</span> :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="University/Institute "
                  id="University_Institute"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Course"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Course <span className="text-danger">*</span> :
                </label>
                <select className="form-control" id="Qualification">
                  <option value={""}>select Course</option>
                  <option value={""}>MBA</option>
                  <option value={""}>MBBS</option>
                  <option value={""}>CA</option>
                  <option value={""}>BA</option>
                  <option value={""}>MA</option>
                  <option value={""}>B.Tech</option>
                  <option value={""}>M.Tech</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Specialization"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Specialization <span className="text-danger">*</span> :
                </label>
                <select className="form-control" id="Qualification">
                  <option value={""}>select Specialization</option>
                  <option value={""}>MBA</option>
                  <option value={""}>MBBS</option>
                  <option value={""}>CA</option>
                  <option value={""}>BA</option>
                  <option value={""}>MA</option>
                  <option value={""}>B.Tech</option>
                  <option value={""}>M.Tech</option>
                </select>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Institute_Location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Institute Location <span className="text-danger">*</span> :
                </label>
                <div className="position-relative">
                  <select className="form-control" id="Qualification">
                    <option value={""}>select Location</option>
                    <option value={""}>India</option>
                    <option value={""}>Pakistan</option>
                    <option value={""}>U.S.A</option>
                    <option value={""}>U.K</option>
                    <option value={""}>Dubai</option>
                    <option value={""}>Canada</option>
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Passing_Year"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Passing Year <span className="text-danger">*</span> :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Passing Year"
                  id="Passing_Year"
                />
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

export default EducationDetails;
