import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddJobCategory } from "../../../api/api";
function AddCategory(props) {
  console.log(props.jobCategoryData);
  // USER CATEGORY VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    category_name: "",
    category_type: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    category_name: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    category_type: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category Type is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate, setState } = useValidation(
    initialFormState,
    validators
  );
  // USER CATEGORY SUBMIT BUTTON
  async function onAdminCategoryClick(event) {
    event.preventDefault();
    if (validate()) {
      console.log(state);
      const responseData = await AddJobCategory(state);
      console.log(responseData);
    }
  }

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
          <form onSubmit={onAdminCategoryClick}>
            <h5 className="text-center pt-2">Add Category</h5>
            <div className="form-group mt-5">
              <label
                htmlFor="category_name"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Category Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={
                  errors.category_name
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.category_name}
                onChange={onInputChange}
                placeholder="Category Name"
                id="category_name"
                name="category_name"
              />
              {/*----ERROR MESSAGE FOR CATEGORY----*/}
              {errors.category_name && (
                <span
                  key={errors.category_name}
                  className="text-danger font-size-3"
                >
                  {errors.category_name}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="category_type"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Category Type <span className="text-danger">*</span> :
              </label>
              <select
                name="category_type"
                className={
                  errors.category_type
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.category_type}
                onChange={onInputChange}
                id="category_type"
              >
                <option value={""}>select category</option>
                <option value={"category01"}>category01</option>
                <option value={"category02"}>category02</option>
                <option value={"category03"}>category03</option>
                <option value={"category04"}>category04</option>
                <option value={"category05"}>category05</option>
              </select>
              {/*----ERROR MESSAGE FOR CATEGORY TYPE----*/}
              {errors.category_type && (
                <span
                  key={errors.category_type}
                  className="text-danger font-size-3"
                >
                  {errors.category_type}
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
