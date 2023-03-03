import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../common/useValidation";

function Addadmin(props) {
  // USER ADMIN PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    adminname: "",
    adminemail: "",
    adminpassword: "",
    companyname: "",
    admintype: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    adminname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Admin name is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Admin name is invalid",
    ],
    adminemail: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    adminpassword: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    companyname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    admintype: [
      (value) =>
        value === "" || value.trim() === "" ? "Admin type is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAminProfileUpdateClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
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
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <h5 className="text-center pt-2">Add Admin</h5>
          <form onSubmit={onAminProfileUpdateClick}>
            <div className="form-group mt-5">
              <label
                htmlFor="adminname"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Admin Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={
                  errors.adminname
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.adminname}
                onChange={onInputChange}
                id="adminname"
                name="adminname"
                placeholder="eg. Apple"
              />
              {/*----ERROR MESSAGE FOR Admin Name----*/}
              {errors.adminname && (
                <span
                  key={errors.adminname}
                  className="text-danger font-size-3"
                >
                  {errors.adminname}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="adminemail"
                className="font-size-4 text-black-2  line-height-reset"
              >
                E-mail <span className="text-danger">*</span> :
              </label>
              <input
                className={
                  errors.adminemail
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.adminemail}
                onChange={onInputChange}
                id="adminemail"
                name="adminemail"
                type={"email"}
              />
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.adminemail && (
                <span
                  key={errors.adminemail}
                  className="text-danger font-size-3"
                >
                  {errors.adminemail}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="adminpassword"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Password <span className="text-danger">*</span> :
              </label>
              <input
                type={"password"}
                className={
                  errors.adminpassword
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.adminpassword}
                onChange={onInputChange}
                id="adminpassword"
                name="adminpassword"
              />
              {/*----ERROR MESSAGE FOR ADMIN PASSWORD----*/}
              {errors.adminpassword && (
                <span
                  key={errors.adminpassword}
                  className="text-danger font-size-3"
                >
                  {errors.adminpassword}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="companyname"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Company Name <span className="text-danger">*</span> :
              </label>
              <input
                type={"text"}
                className={
                  errors.companyname
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.companyname}
                onChange={onInputChange}
                id="companyname"
                name="companyname"
              />
              {/*----ERROR MESSAGE FOR COMPANY NAME----*/}
              {errors.companyname && (
                <span
                  key={errors.companyname}
                  className="text-danger font-size-3"
                >
                  {errors.companyname}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="admintype"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Admin Type <span className="text-danger">*</span> :
              </label>
              <select
                type={"text"}
                className={
                  errors.admintype
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.admintype}
                onChange={onInputChange}
                id="admintype"
                name="admintype"
              >
                <option value={""}>select type</option>
                <option value={"manager"}>Manager</option>
                <option value={"subadmin"}>Sub admin</option>
                <option value={"admin"}>Admin</option>
                <option value={"superadmin"}>Super admin</option>
              </select>
              {/*----ERROR MESSAGE FOR ADMIN TYPE----*/}
              {errors.admintype && (
                <span
                  key={errors.admintype}
                  className="text-danger font-size-3"
                >
                  {errors.admintype}
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
        </div>
      </Modal>
    </>
  );
}

export default Addadmin;
