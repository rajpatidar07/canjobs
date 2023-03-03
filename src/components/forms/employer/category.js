import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function AddCategory(props) {
  // USER CATEGORY VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    categoryname: "",
    categorytype: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    categoryname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    categorytype: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category Type is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // USER CATEGORY SUBMIT BUTTON
  const onUserCategoryClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER PERSONAL DETAIL VALIDATION

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
          <form onSubmit={onUserCategoryClick}>
            <h5 className="text-center pt-2">Add Category</h5>
            <div className="form-group mt-5">
              <label
                htmlFor="categoryname"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Category Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={
                  errors.categoryname
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.categoryname}
                onChange={onInputChange}
                placeholder="Category Name"
                id="categoryname"
                name="categoryname"
              />
              {/*----ERROR MESSAGE FOR CATEGORY----*/}
              {errors.categoryname && (
                <span
                  key={errors.categoryname}
                  className="text-danger font-size-3"
                >
                  {errors.categoryname}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="categorytype"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Category Type <span className="text-danger">*</span> :
              </label>
              <select
                name="categorytype"
                className={
                  errors.categorytype
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.categorytype}
                onChange={onInputChange}
                id="categorytype"
              >
                <option value={""}>select category</option>
                <option value={"category01"}>category01</option>
                <option value={"category02"}>category02</option>
                <option value={"category03"}>category03</option>
                <option value={"category04"}>category04</option>
                <option value={"category05"}>category05</option>
              </select>
              {/*----ERROR MESSAGE FOR CATEGORY TYPE----*/}
              {errors.categorytype && (
                <span
                  key={errors.categorytype}
                  className="text-danger font-size-3"
                >
                  {errors.categorytype}
                </span>
              )}
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
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
