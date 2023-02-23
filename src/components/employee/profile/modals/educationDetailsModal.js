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
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Education"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Education :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Education"
                  id="Education"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="University_Institute"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  University/Institute :
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
                  Course :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course"
                  id="Course"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Specialization"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Specialization :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Specialization"
                  id="Specialization"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Course_Type"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Course Type :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Course_Type"
                    placeholder="Course Type"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Course duration"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Course duration :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Course duration"
                  id="Course duration"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Grading_System"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Grading System :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Grading System"
                  id="Grading_System"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Expected_Salary"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Expected Salary :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Expected Salary"
                  id="Expected_Salary"
                />
              </div>
            </div>
            <div className="form-group mb-8">
              <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
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
