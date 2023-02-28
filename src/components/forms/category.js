import React from "react";
import { Modal } from "react-bootstrap";

function AddCategory(props) {
  return (
    <>
      <Modal
        show={props.show}
        size="md"
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
            <div className="form-group mt-5">
              <label
                htmlFor="category_name"
                className="font-size-4 text-black-2  line-height-reset"
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
                className="font-size-4 text-black-2  line-height-reset"
              >
                Category Type :
              </label>
              <select className="form-control">
                <option value={""}>select category</option>
                <option value={""}>category01</option>
                <option value={""}>category02</option>
                <option value={""}>category03</option>
                <option value={""}>category04</option>
                <option value={""}>category05</option>
              </select>
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

export default AddCategory;
