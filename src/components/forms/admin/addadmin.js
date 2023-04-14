import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AdminDetails, AddAdmin } from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addadmin(props) {
  // let [adminDetails, setAdmindetails] = useState([]);
  let [already, setAlready] = useState("");
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
    setAlready("");
  };
  // USER ADMIN PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    admin_type: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    name: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Admin name is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Admin name can not have a number."
          : value.length < 2
          ? "Admin name should have 2 or more letters"
          : /[^a-zA-Z0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [
      (value) =>
        state.admin_id
          ? value === ""
          : value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    admin_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Admin type is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const {
    state,
    setState,
    setErrors,
    onInputChange,
    errors,
    validate,
  } = useValidation(initialFormState, validators);
  const AdminData = async () => {
    const userData = await AdminDetails(props.adminId);
    if (userData !== undefined || userData) {
      // setAdmindetails(userData.data[0]);
      setState(userData.data[0]);
    }
  };
  useEffect(() => {
    if (props.adminId === "0" || props.adminId === undefined) {
      setState(initialFormState);
    } else {
      AdminData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAminProfileUpdateClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      const responseData = await AddAdmin(state);
      if (responseData.message === "admin added successfully") {
        toast.success("Admin added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
      if (responseData.message === "admin updated successfully") {
        toast.success("Admin Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
      if (responseData.message === "Admin already exists") {
        setAlready("Admin already exists");
      }
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
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          {props.adminId === "0" ? (
            <h5 className="text-center pt-2">Add Admin</h5>
          ) : (
            <h5 className="text-center pt-2">Update Admin</h5>
          )}
          <form onSubmit={onAminProfileUpdateClick}>
            <div className="form-group mt-5">
              <label
                htmlFor="name"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Admin Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={
                  errors.name
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.name}
                onChange={onInputChange}
                id="name"
                name="name"
                placeholder="eg. Apple"
              />
              {/*----ERROR MESSAGE FOR Admin Name----*/}
              {errors.name && (
                <span key={errors.name} className="text-danger font-size-3">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2  line-height-reset"
              >
                E-mail <span className="text-danger">*</span> :
              </label>
              <input
                className={
                  errors.email
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.email}
                onChange={onInputChange}
                id="email"
                name="email"
                type={"email"}
                disabled={props.adminId === "0" ? false : true}
              />
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.email && (
                <span key={errors.email} className="text-danger font-size-3">
                  {errors.email}
                </span>
              )}
            </div>
            {state.admin_id ? null : (
              <div className="form-group ">
                <label
                  htmlFor="password"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Password <span className="text-danger">*</span> :
                </label>
                <input
                  type={"password"}
                  className={
                    errors.password
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.password}
                  onChange={onInputChange}
                  id="password"
                  name="password"
                />
                {/*----ERROR MESSAGE FOR ADMIN PASSWORD----*/}
                {errors.password && (
                  <span
                    key={errors.password}
                    className="text-danger font-size-3"
                  >
                    {errors.password}
                  </span>
                )}
              </div>
            )}
            {/* <div className="form-group ">
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
              /> */}
            {/*----ERROR MESSAGE FOR COMPANY NAME----*/}
            {/* {errors.companyname && (
                <span
                  key={errors.companyname}
                  className="text-danger font-size-3"
                >
                  {errors.companyname}
                </span>
              )}
            </div> */}
            <div className="form-group ">
              <label
                htmlFor="admin_type"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Admin Type <span className="text-danger">*</span> :
              </label>
              <select
                type={"text"}
                className={
                  errors.admin_type
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.admin_type}
                onChange={onInputChange}
                id="admin_type"
                name="admin_type"
                multiple={false}
              >
                <option value={""}>select type</option>
                <option value={"manager"}>Manager</option>
                <option value={"sub-admin"}>Sub admin</option>
                <option value={"admin"}>Admin</option>
                <option value={"super-admin"}>Super admin</option>
              </select>
              {/*----ERROR MESSAGE FOR ADMIN TYPE----*/}
              {errors.admin_type && (
                <span
                  key={errors.admin_type}
                  className="text-danger font-size-3"
                >
                  {errors.admin_type}
                </span>
              )}
            </div>
            <span className="text-danger font-size-3">{already}</span>
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
