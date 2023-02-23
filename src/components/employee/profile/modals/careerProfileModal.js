import React from "react";
import { Modal } from "react-bootstrap";

function CareerProfile(props) {
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
            <h5 className="text-center pt-2">Career Profile</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Current_Industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Industry
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Current Industry"
                  id="Current_Industry"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Department"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Department :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department "
                  id="Department"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Role_Category"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Role Category :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Role Category"
                  id="Role_Category"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="job_Role"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Job Role :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Role"
                  id="job_Role"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Desired_Job_Type"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Job Type :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Desired_Job_Type"
                    placeholder="Job Type"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Preferred_Shift"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Preferred Shift :
                </label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Preferred Shift"
                  id="Preferred_Shift"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Preferred_Work_Location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Preferred Work Location (Max 10) :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Preferred Work Location"
                  id="Preferred_Work_Location"
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

export default CareerProfile;
