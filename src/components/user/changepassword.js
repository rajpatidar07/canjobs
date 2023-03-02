import React from "react";
import { Link } from "react-router-dom";
import useValidation from "../common/useValidation";
import { Modal } from "react-bootstrap";

const ChangePassword = (props) => {
  // USER CHANGE PASSWORD VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    oldpassword: [
      (value) =>
        value === "" || value.trim() === "" ? "Old password is required" : null,
    ],
    newpassword: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    confirmpassword: [
      (value) => (value ? null : "Confirm Password is required"),
      (value) =>
        value === state.newpassword
          ? null
          : "Confirm Password must be Same as Password",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER CHANGE PASSWORD SUBMIT BUTTON
  const onUserChangePassClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER CHANGE PASSWORD VALIDATION

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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-15">
          {/* CHANGE PASSWORD FORM */}
          <form onSubmit={onUserChangePassClick}>
            {/* FORM FIELDS */}
            <div className="form-group">
              <label
                htmlFor="oldpassword"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Old Password
              </label>
              <input
                name="oldpassword"
                value={state.oldpassword}
                onChange={onInputChange}
                type="password"
                className={
                  errors.oldpassword
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="oldpassword"
                placeholder="Enter old password"
              />
              {/* ERROR MSG FOR OLD PASSWORD */}
              {errors.oldpassword && (
                <span
                  key={errors.oldpassword}
                  className="text-danger font-size-3"
                >
                  {errors.oldpassword}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="newpassword"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Password
              </label>
              <div className="position-relative">
                <input
                  name="newpassword"
                  value={state.newpassword}
                  onChange={onInputChange}
                  type="password"
                  className={
                    errors.newpassword
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="newpassword"
                  placeholder="Enter password"
                />
                {/* ERROR MSG FOR PASSWORD */}
                {errors.newpassword && (
                  <span
                    key={errors.newpassword}
                    className="text-danger font-size-3"
                  >
                    {errors.newpassword}
                  </span>
                )}
                {/* <Link
                          to="/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password2"
                        ></Link> */}
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="confirmpassword"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Confirm Password
              </label>
              <div className="position-relative">
                <input
                  name="confirmpassword"
                  value={state.confirmpassword}
                  onChange={onInputChange}
                  type="password"
                  className={
                    errors.confirmpassword
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="confirmpassword"
                  placeholder="Enter new password"
                />
                {errors.confirmpassword && (
                  <span
                    key={errors.confirmpassword}
                    className="text-danger font-size-3"
                  >
                    {errors.confirmpassword}
                  </span>
                )}
                {/* <Link
                          to="/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password23"
                        ></Link> */}
              </div>
            </div>
            {/* END FORM FIELDS  */}
            <div className="form-group text-center">
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* END CHANGE PASSWORD FORM */}
    </>
  );
};

export default ChangePassword;
