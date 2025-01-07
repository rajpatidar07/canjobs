import React, { useState } from "react";
import useValidation from "./useValidation";
import { Modal } from "react-bootstrap";
import { ChangePasswordApi } from "../../api/api"
import { toast } from "react-toastify";
import PasswordInput from "./PasswordInput"
const ChangePassword = (props) => {
  let [loading, setLoading] = useState(false)
  // USER CHANGE PASSWORD VALIDATION

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    password: "",
    new_password: "",
    conf_password: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    password: [
      (value) =>
        value === "" || value.trim() === "" ? "Old password is required" : null,
    ],
    new_password: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
            value
          )
            ? null
            : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    conf_password: [
      (value) => (value ? null : "Confirm Password is required"),
      (value) =>
        value === state.new_password
          ? null
          : "Confirm Password must be Same as Password",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, setState, setErrors, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER CHANGE PASSWORD SUBMIT BUTTON
  const onUserChangePassClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true)
      try {
        let Response = await ChangePasswordApi(state)
        if (Response.message === "Wrong password") {
          setErrors({ ...errors, password: "Wrong current Password" })
          setLoading(false)
        }
        if (Response.message === "Password updated successfully") {
          toast.success("Password updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          close()
        }
      }
      catch (err) {
        console.log(err)
        setLoading(false);
      }
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
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-10">
          {/* CHANGE PASSWORD FORM */}
          <form onSubmit={(e) => onUserChangePassClick(e)}>
            <h5 className="text-center pb-8"> Change Password</h5>
            {/* FORM FIELDS */}
            <div className="form-group">
              <label
                htmlFor="password"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Old Password
              </label>
              <div className="position-relative">
                <PasswordInput
                  name="password"
                  value={state.password}
                  onChange={onInputChange}
                  className={
                    errors.password
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Enter password"
                  id="password"
                />
                {/*----ERROR MESSAGE FOR PASSWORD----*/}
                {errors.password && (
                  <span>
                    {errors.password.map((error, i) => (
                      <span key={i} className="text-danger font-size-3">
                        {error}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="new_password"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Password
              </label>
              <div className="position-relative">
                <PasswordInput
                  name="new_password"
                  value={state.new_password}
                  onChange={onInputChange}
                  className={
                    errors.new_password
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Enter password"
                  id="new_password"
                />
                {/*----ERROR MESSAGE FOR new_password----*/}
                {errors.new_password && (
                  <span>
                    {errors.new_password.map((error, i) => (
                      <span key={i} className="text-danger font-size-3">
                        {error}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="conf_password"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Confirm Password
              </label>
              <div className="position-relative">
                <PasswordInput
                  name="conf_password"
                  value={state.conf_password}
                  onChange={onInputChange}
                  className={
                    errors.conf_password
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Enter password"
                  id="conf_password"
                />
                {/*----ERROR MESSAGE FOR conf_password----*/}
                {errors.conf_password && (
                  <span>
                    {errors.conf_password.map((error, i) => (
                      <span key={i} className="text-danger font-size-3">
                        {error}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
            {/* END FORM FIELDS  */}
            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="submit"
                >
                  Submit
                </button>
              )}

            </div>
          </form>
        </div>
      </Modal>
      {/* END CHANGE PASSWORD FORM */}
    </>
  );
};

export default ChangePassword;
