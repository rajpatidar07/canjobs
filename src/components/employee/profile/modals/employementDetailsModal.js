import React from "react";
import { Modal } from "react-bootstrap";

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
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Current_employment"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Is this your current employment ?
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=" Is this your current employment ?"
                  id="Current_employment"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Employment_Type"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Employment Type:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employment Type"
                  id="Employment_Type"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Current_Company_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Company Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Current Company Name"
                  id="Current_Company_Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Current_Designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Designation :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Current Designation"
                  id="Current_Designation"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Joining_Date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Joining Date :
                </label>
                <div className="position-relative">
                  <input
                    type="date"
                    className="form-control"
                    id="Joining_Date"
                    placeholder="Joining Date"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Job_Profile"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Job Profile :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Profile"
                  id="Job_Profile"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Notice_Period"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Notice Period :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Notice Period"
                  id="Notice_Period"
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

export default EmployementDetails;
