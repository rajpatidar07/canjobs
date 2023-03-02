import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import useValidation from "../common/useValidation";

function Profile() {
  // USER ADMIN PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    adminname: "",
    adminemail: "",
    adminpassword: "",
    location: "",
    admintype: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    adminname: [
      (value) =>
        value === "" || value.trim() === "" ? "Admin type is required" : null,
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
    location: [
      (value) =>
        value === "" || value.trim() === ""
          ? "location is required"
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
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <div className="dashboard-main-container mt-24" id="dashboard-body">
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-8">
                    Update Profile
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-1 pb-13">
                    <div className="upload-file mb-16 text-center">
                      {/* <!-- <img id="imgPrime" src="" alt="uploaded image placeholder" /> --> */}
                      {/* <!-- <input type="file" id="upfile"> --> */}
                    </div>
                    <form onSubmit={onAminProfileUpdateClick}>
                      <fieldset>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="adminname"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className={
                                  errors.adminname
                                    ? "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4 border border-danger"
                                    : "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                                }
                                value={state.adminname}
                                onChange={onInputChange}
                                id="adminname"
                                name="adminname"
                                placeholder="eg. Apple"
                              />
                              {errors.adminname && (
                                <span
                                  key={errors.adminname}
                                  className="text-danger font-size-3"
                                >
                                  {errors.adminname}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="adminemail"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                E-mail
                              </label>
                              <input
                                type="email"
                                placeholder="Email12@gmail.com"
                                className={
                                  errors.adminemail
                                    ? "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4 border border-danger"
                                    : "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                                }
                                value={state.adminemail}
                                onChange={onInputChange}
                                id="adminemail"
                                name="adminemail"
                              />
                              {errors.adminemail && (
                                <span
                                  key={errors.adminemail}
                                  className="text-danger font-size-3"
                                >
                                  {errors.adminemail}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-8">
                          <div className="col-lg-6 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="adminpassword"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className={
                                  errors.adminpassword
                                    ? "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4 border border-danger"
                                    : "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                                }
                                value={state.adminpassword}
                                onChange={onInputChange}
                                id="adminpassword"
                                name="adminpassword"
                              />
                              {errors.adminpassword && (
                                <span
                                  key={errors.adminpassword}
                                  className="text-danger font-size-3"
                                >
                                  {errors.adminpassword}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="location"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Location
                              </label>
                              <input
                                type="text"
                                placeholder="Premises"
                                className={
                                  errors.location
                                    ? "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4 border border-danger"
                                    : "form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                                }
                                value={state.location}
                                onChange={onInputChange}
                                id="location"
                                name="location"
                              />
                              {errors.location && (
                                <span
                                  key={errors.location}
                                  className="text-danger font-size-3"
                                >
                                  {errors.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="admintype"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Admin Type
                              </label>
                              <div className="position-relative">
                                <select
                                  className={
                                    errors.admintype
                                      ? "form-control col-6 border border-danger"
                                      : "form-control col-6"
                                  }
                                  value={state.admintype}
                                  onChange={onInputChange}
                                  name="admintype"
                                  id="admintype"
                                >
                                  <option value={""}>select type</option>
                                  <option value={"manager"}>Manager</option>
                                  <option value={"subadmin"}>Sub admin</option>
                                  <option value={"admin"}>Admin</option>
                                  <option value={"superadmin"}>
                                    Super admin
                                  </option>
                                </select>
                                {errors.admintype && (
                                  <span
                                    key={errors.admintype}
                                    className="text-danger font-size-3"
                                  >
                                    {errors.admintype}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group text-center">
                          <button
                            className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </fieldset>{" "}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
