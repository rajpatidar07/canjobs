import React from "react";
import { Modal } from "react-bootstrap";

function AddModal(props) {
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
            <h5 className="text-center pt-2">Add Employer</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="compny_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  id="compny_Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="vacancy"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  No. of vacancies :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="vacancy"
                  id="vacancy"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Location :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Location"
                  id="location"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Gender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Information status :
                </label>
                <select className="form-control">
                  <option value={""}>Select status</option>
                  <option value={""}>Complete</option>
                  <option value={""}>Incomplete</option>
                </select>
              </div>
            </div>
            <h5> Contact Person</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Number :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Maritial status"
                  id="number"
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

export default AddModal;
