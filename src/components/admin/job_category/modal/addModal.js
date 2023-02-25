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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form>
            <h5 className="text-center pt-2">Add Category</h5>
            <div className="form-group">
              <label
                htmlFor="category_name"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                id="category_name"
              />
            </div>
            <div className="form-group ">
              <label
                htmlFor="Category_type"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Category Type :
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Category Type"
                id="Category_type"
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

export default AddModal;
