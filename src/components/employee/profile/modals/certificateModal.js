import React from "react";
import { Modal } from "react-bootstrap";

function Certificate(props) {
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
            <h5 className="text-center pt-2">Add Certification </h5>{" "}
            <div className="form-group">
              <label
                htmlFor="Certification_Name"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Certification Name :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Certification Name"
                id="Certification_Name"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Certification_Completion_ID"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Certification Completion ID :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Certification Completion ID"
                id="Certification_Completion_ID"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Certification_URL"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Certification URL :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Certification URL"
                id="Certification_URL"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Certification_Validity"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Certification Validity :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Certification Validity"
                id="Certification_Validity"
              />
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

export default Certificate;
