import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function PersonalDetails(props) {
  // USER PERSONAL DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    userfullname: "",
    useremail: "",
    usermobileno: "",
    userdob: "",
    usergender: "",
    maritialstatus: "",
    nationality: "",
    currentlocation: "",
    currentcountry: "",
    langauages: "",
    religion: "",
    swap: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    useremail: [
      (value) =>
        value === "" || value.trim() === "" ? "Name is required" : null,
    ],
    useremail: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    userpassword: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    confirmpassword: [
      (value) => (value ? null : "Confirm Password is required"),
      (value) =>
        value === state.userpassword
          ? null
          : "Confirm Password must be Same as Password",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // USER PERSONAL DETAIL SUBMIT BUTTON
  const onUserPersonalDetailClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER PERSONAL DETAIL VALIDATION
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
          <form onSubmit={onUserPersonalDetailClick}>
            <h5 className="text-center pt-2">Personal Details</h5>
            {/* FIRST LINE */}
            <div className="row pt-5">
              {" "}
              <div className="form-group col-md-4">
                <label
                  htmlFor="userfullname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name:
                </label>
                <input
                  name="userfullname"
                  value={state.userfullname}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.userfullname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Full Name"
                  id="userfullname"
                />
                {errors.userfullname && (
                  <span
                    key={errors.userfullname}
                    className="text-danger font-size-3"
                  >
                    {errors.userfullname}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="useremail"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id :
                </label>
                <input
                  type="email"
                  name="useremail"
                  value={state.useremail}
                  onChange={onInputChange}
                  className={
                    errors.useremail
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="useremail"
                  placeholder="email"
                />
                {errors.useremail && (
                  <span
                    key={errors.useremail}
                    className="text-danger font-size-3"
                  >
                    {errors.useremail}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="usermobileno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number :
                </label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  name="usermobileno"
                  value={state.usermobileno}
                  onChange={onInputChange}
                  className={
                    errors.usermobileno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="usermobileno"
                />
                {errors.usermobileno && (
                  <span
                    key={errors.usermobileno}
                    className="text-danger font-size-3"
                  >
                    {errors.usermobileno}
                  </span>
                )}
              </div>
            </div>
            {/* SECOND LINE */}
            <div className="row">
              {" "}
              <div className="form-group col-md-4">
                <label
                  htmlFor="userdob"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date Of Birth :
                </label>
                <input
                  type="date"
                  placeholder="Date Of Birth "
                  name="userdob"
                  value={state.userdob}
                  onChange={onInputChange}
                  className={
                    errors.userdob
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="userdob"
                />
                {errors.userdob && (
                  <span
                    key={errors.userdob}
                    className="text-danger font-size-3"
                  >
                    {errors.userdob}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="usergender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Gender :
                </label>
                <select
                  name="usergender"
                  value={state.usergender}
                  onChange={onInputChange}
                  className={
                    errors.usergender
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="usergender"
                >
                  <option value={""}>Select Gender</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </select>
                {errors.usergender && (
                  <span
                    key={errors.usergender}
                    className="text-danger font-size-3"
                  >
                    {errors.usergender}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="maritialstatus"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Maritial status :
                </label>{" "}
                <select
                  name="maritialstatus"
                  value={state.maritialstatus}
                  onChange={onInputChange}
                  className={
                    errors.maritialstatus
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="maritialstatus"
                >
                  <option value={""}>Select Status</option>
                  <option value={"single"}>Single</option>
                  <option value={"married"}>Married</option>
                </select>
                {errors.maritialstatus && (
                  <span
                    key={errors.maritialstatus}
                    className="text-danger font-size-3"
                  >
                    {errors.maritialstatus}
                  </span>
                )}
              </div>
            </div>
            {/* THIRD LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="nationality"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Nationality / Citizenship :
                </label>
                <input
                  type="text"
                  placeholder="Nationality / Citizenship"
                  name="nationality"
                  value={state.nationality}
                  onChange={onInputChange}
                  className={
                    errors.nationality
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="nationality"
                />
                {errors.nationality && (
                  <span
                    key={errors.nationality}
                    className="text-danger font-size-3"
                  >
                    {errors.nationality}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="currentlocation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Location :
                </label>
                <input
                  type="text"
                  placeholder="Current Location"
                  name="currentlocation"
                  value={state.currentlocation}
                  onChange={onInputChange}
                  className={
                    errors.currentlocation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="currentlocation"
                />
                {errors.currentlocation && (
                  <span
                    key={errors.currentlocation}
                    className="text-danger font-size-3"
                  >
                    {errors.currentlocation}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="currentcountry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Currently Located Country :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Currently Located Country"
                  id="currentcountry"
                  name="currentcountry"
                  value={state.currentcountry}
                  onChange={onInputChange}
                />
              </div>
            </div>
            {/* FOURTH LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="langauages"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Languages Known (Max 3) :
                </label>
                <input
                  type="text"
                  placeholder="Languages Known (Max 3)"
                  className="form-control"
                  id="langauages"
                  name="langauages"
                  value={state.langauages}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="religion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Religion :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Religion"
                  id="religion"
                  name="religion"
                  value={state.religion}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Swap :
                </label>
                <select
                  className="form-control"
                  id="swap"
                  name="swap"
                  value={state.swap}
                  onChange={onInputChange}
                >
                  <option value={""}>Select</option>
                  <option value={"swap"}>Swap</option>
                  <option value={"parttime"}>Part-time</option>
                  <option value={"all"}>All</option>
                </select>
              </div>
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

export default PersonalDetails;
