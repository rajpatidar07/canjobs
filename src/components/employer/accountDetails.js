import React from "react";
import { Modal } from "react-bootstrap";

function AccountDetails(props) {
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
        <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
          <form action="https://finestwp.co/">
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
                id="email"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Password
              </label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
                <a
                  href="#"
                  className="show-password pos-abs-cr fas mr-6 text-black-2"
                  data-show-pass="password"
                ></a>
              </div>
            </div>
            <div className="form-group d-flex flex-wrap justify-content-between">
              <label
                htmlFor="terms-check"
                className="gr-check-input d-flex  mr-3"
              >
                <input className="d-none" type="checkbox" id="terms-check" />
                <span className="checkbox mr-5"></span>
                <span className="font-size-3 mb-0 line-height-reset mb-1 d-block">
                  Remember password
                </span>
              </label>
              <a href="#" className="font-size-3 text-dodger line-height-reset">
                Forget Password
              </a>
            </div>
            <div className="form-group mb-8">
              <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                Log in{" "}
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default AccountDetails;
