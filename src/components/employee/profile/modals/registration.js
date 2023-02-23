import React from "react";
import { Modal } from "react-bootstrap";

function Registration(props) {
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
            <h5 className="text-center pt-2">Registration</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Full_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  id="Full_Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id :
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Password :
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="Password"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Mobile_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  id="Mobile_Number"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Work_Status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Status :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Work_Status"
                    placeholder="Work Status"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Resume"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Resume :
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Resume"
                  id="Resume"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="More_details"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  More detail can be add as input as per resume :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="More details"
                  id="More_details"
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

export default Registration;
