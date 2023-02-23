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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form>
            <h5 className="text-center pt-2">Account detail</h5>
            <div className="form-group">
              <label
                htmlFor="Username"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Username :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Username Name"
                id="Username"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                E-mail :
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
                htmlFor="Role"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Role :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Role "
                id="Role"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Reporting_Manager"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Reporting Manager :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Reporting Manager"
                id="Reporting_Manager"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="mobile"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Mobile Number :
              </label>
              <div className="position-relative">
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter mobile number"
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

export default AccountDetails;
