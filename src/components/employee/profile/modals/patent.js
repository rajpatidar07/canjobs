import React from "react";
import { Modal } from "react-bootstrap";

function Patent(props) {
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
            <h5 className="text-center pt-2">Add Patent </h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Patent_Title"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Patent Title :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Patent Title"
                  id="Patent_Title"
                />
              </div>
              <div className="form-group col-md-6">
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
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Patent_Office"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Patent Office :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Patent Office"
                  id="Patent_Office"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Status :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Status"
                  id="Status"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Application Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Application Number :
                </label>
                <div className="position-relative">
                  <input
                    type="number"
                    className="form-control"
                    id="Application_Number"
                    placeholder="Application Number"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Issue_Date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Issue Date :
                </label>
                <input
                  type="dae"
                  className="form-control"
                  placeholder="Issue Date"
                  id="Issue_Date"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
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

export default Patent;
