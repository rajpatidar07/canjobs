import React from "react";
import { Modal } from "react-bootstrap";

function WorkSample(props) {
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
            <h5 className="text-center pt-2"> Add Online Profile </h5>{" "}
            <div className="form-group">
              <label
                htmlFor="Work_Title"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Work Title :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Work Title"
                id="Work_Title"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="URL"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                URL :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="URL"
                id="URL"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Duration_From"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Duration From :
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Duration From"
                id="Duration_From"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Duration_to"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Duration to :
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Duration to"
                id="Duration_to"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Description"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Description :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                id="Description"
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

export default WorkSample;
