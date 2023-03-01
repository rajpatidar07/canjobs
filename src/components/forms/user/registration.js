import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../../common/useValidation";

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
            <div className="row pt-5">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Full_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name<span className="text-danger">*</span>:
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
                  Email Id <span className="text-danger">*</span>:
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
                  Password <span className="text-danger">*</span>:
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
                  Mobile Number<span className="text-danger">*</span> :
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
              <div className="form-group col-md-6">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset ">
                  What is your experience level?
                  <span className="text-danger">*</span>
                </label>
                <div className="row font-size-3 mt-5">
                  <Link to={""}>
                    <span className="text-dark rounded-pill mb-1 border mx-2 p-3">
                      I have work experience
                    </span>
                  </Link>
                  <Link to={""}>
                    <span className="text-dark rounded-pill mb-1 border mx-2 p-3">
                      I am fresher
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Resume"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Resume <span className="text-danger">*</span>:
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Resume"
                  id="Resume"
                />
              </div>
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
            <div className="col">
              <input type="checkbox" id="t&r" className="text-black-2 pt-5" />
              <label
                htmlFor="t&r"
                className="font-size-3 
                line-height-reset text-black-2 mx-5 pt-3"
              >
                I agree to Terms And Conditions & Privacy Policy governing the
                use of Naukrigulf.com
              </label>
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

export default Registration;
