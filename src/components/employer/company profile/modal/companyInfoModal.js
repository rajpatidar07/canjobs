import React from "react";
import { Modal } from "react-bootstrap";

function CompanyInfo(props) {
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
            <h5 className="text-center pt-2">Company Info</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Company_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="company Name"
                  id="Company_Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="needs"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  To fulfill own hiring needs :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="needs"
                  id="needs"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="recruitment"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  As a recruitment consultant :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="recruitment"
                  id="recruitment"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Name_as_per_kyc"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company name (as per KYC documents) :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name as per kyc"
                  id="Name_as_per_kyc"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Your_designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Your designation :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Your_designation"
                    placeholder="Your designation"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Pin_code"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pin code :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pin code"
                  id="Pin_code"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Street_address"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Street address :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Street address"
                  id="Street_address"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="terms_&_condition"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Terms & condition :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="terms & condition"
                  id="terms_&_condition"
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

export default CompanyInfo;
