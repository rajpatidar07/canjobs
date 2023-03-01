import moment from "moment/moment";
import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { CKEditor } from "ckeditor4-react";

function PersonalDetails(props) {
  // USER PERSONAL DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    userfullname: "",
    useremail: "",
    usermobileno: "",
    userdesc: "",
    userdob: "",
    usergender: "",
    maritialstatus: "",
    nationality: "",
    currentlocation: "",
    currentcountry: "",
    langauages: "",
    religion: "",
    interest: "",
    experience: "",
    workpermit: "",
    otherworkpermit: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    userfullname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    useremail: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    usermobileno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "MobileNo. is required"
          : value.length !== 10
          ? "Mobile no should be of 10 digits"
          : null,
    ],
    userdesc: [
      (value) =>
        value === ""
          ? "Description is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character"
          : null,
    ],
    userdob: [(value) => (value ? null : "Dob is required")],
    usergender: [
      (value) =>
        value === "" || value.trim() === "" ? "Gender is required" : null,
    ],
    maritialstatus: [(value) => (value === "" ? "Status is required" : null)],
    nationality: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Nationality is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    currentlocation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Location is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    currentcountry: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Country is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    langauages: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Language is required"
          : (value.length = 5
              ? "Language should not be more than 5"
              : /[^A-Za-z 0-9]/g.test(value)
              ? "Cannot use special character "
              : null),
    ],
    religion: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Religion is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    interest: [
      (value) =>
        value === ""
          ? "Interest is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    experience: [(value) => (value === "" ? "Experience is required" : null)],
    workpermit: [(value) => (value === "" ? "Work Permit is required" : null)],
    otherworkpermit: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Other Permit is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
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
            <h5 className="text-center pt-2 mb-7">Personal Details</h5>
            {/* FIRST LINE */}
            <div className="row pt-5">
              {" "}
              <div className="form-group col-md-4">
                <label
                  htmlFor="userfullname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
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
                {/*----ERROR MESSAGE FOR name----*/}
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
                  Email Id : <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={30}
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
                {/*----ERROR MESSAGE FOR EMAIL----*/}
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
                  Mobile Number : <span className="text-danger">*</span>
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
                {/*----ERROR MESSAGE FOR MOBILENO----*/}
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
            {/* DECRIBE YOUSELF */}
            <div className="row">
              <div className="form-group col-md-12">
                <label
                  htmlFor="userdesc"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Description : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="12"
                    className={
                      errors.userdesc
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      // data={emailText}
                      // initData={emailText}
                      type={"classic"}
                      name={"userdesc"}
                      id={"userdesc"}
                      data={state.userdesc}
                      value={state.userdesc}
                      onChange={onInputChange}
                      initData="Describe Yourself"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.userdesc && (
                    <span
                      key={errors.userdesc}
                      className="text-danger font-size-3"
                    >
                      {errors.userdesc}
                    </span>
                  )}
                </div>
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
                  Date Of Birth : <span className="text-danger">*</span>
                </label>
                <input
                  max={moment().format("YYYY-MM-DD")}
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
                {/*----ERROR MESSAGE FOR DOB----*/}
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
                  Gender : <span className="text-danger">*</span>
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
                {/*----ERROR MESSAGE FOR GENDER----*/}
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
                  Maritial status : <span className="text-danger">*</span>
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
                {/*----ERROR MESSAGE FOR MARITAL STATUS----*/}
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
                  Nationality / Citizenship :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
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
                {/*----ERROR MESSAGE FOR NATIONALITY----*/}
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
                  Current Location : <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
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
                {/*----ERROR MESSAGE FOR LOCATION----*/}
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
                  Currently Located Country :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.currentcountry
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Currently Located Country"
                  id="currentcountry"
                  name="currentcountry"
                  value={state.currentcountry}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR COUNTRY----*/}
                {errors.currentcountry && (
                  <span
                    key={errors.currentcountry}
                    className="text-danger font-size-3"
                  >
                    {errors.currentcountry}
                  </span>
                )}
              </div>
            </div>
            {/* FOURTH LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="langauages"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Languages Known (Max 3) :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  placeholder="Languages Known (Max 3)"
                  className={
                    errors.langauages
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="langauages"
                  name="langauages"
                  value={state.langauages}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR LANGUAGE----*/}
                {errors.langauages && (
                  <span
                    key={errors.langauages}
                    className="text-danger font-size-3"
                  >
                    {errors.langauages}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="religion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Religion : <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.religion
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Religion"
                  id="religion"
                  name="religion"
                  value={state.religion}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR RELIGION----*/}
                {errors.religion && (
                  <span
                    key={errors.religion}
                    className="text-danger font-size-3"
                  >
                    {errors.religion}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Interested In : <span className="text-danger">*</span>
                </label>
                <select
                  className={
                    errors.langauages
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="interest"
                  name="interest"
                  value={state.interest}
                  onChange={onInputChange}
                >
                  <option value={""}>Select</option>
                  <option value={"swap"}>Swap</option>
                  <option value={"parttime"}>Part-time</option>
                  <option value={"all"}>All</option>
                </select>
                {/*----ERROR MESSAGE FOR INTEREST----*/}
                {errors.interest && (
                  <span
                    key={errors.interest}
                    className="text-danger font-size-3"
                  >
                    {errors.interest}
                  </span>
                )}
              </div>
            </div>
            {/* WORDK PERMIT LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="experience"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Experience : <span className="text-danger">*</span>
                </label>
                <select
                  name="experience"
                  value={state.experience}
                  onChange={onInputChange}
                  className={
                    errors.experience
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="experience"
                >
                  <option value={""}>Select Experience</option>
                  <option value={"0-1"}>0-1 year</option>
                  <option value={"1-3"}>1-3 year</option>
                  <option value={"3-5"}>3-5 year</option>
                  <option value={"5+"}>5+ year</option>
                </select>
                {/*----ERROR MESSAGE FOR EXPERIENCE----*/}
                {errors.experience && (
                  <span
                    key={errors.experience}
                    className="text-danger font-size-3"
                  >
                    {errors.experience}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="workpermit"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit of Canada : <span className="text-danger">*</span>
                </label>
                <select
                  name="workpermit"
                  value={state.workpermit}
                  onChange={onInputChange}
                  className={
                    errors.workpermit
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="workpermit"
                >
                  <option value={""}>Select </option>
                  <option value={"no"}>No</option>
                  <option value={"yes"}>Yes</option>
                </select>
                {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
                {errors.workpermit && (
                  <span
                    key={errors.workpermit}
                    className="text-danger font-size-3"
                  >
                    {errors.workpermit}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="otherpermit"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit of Other Country :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.otherworkpermit
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Permit of Other Country"
                  id="otherworkpermit"
                  name="otherworkpermit"
                  value={state.otherworkpermit}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR OTHER COUNTRY PERMIT----*/}
                {errors.otherworkpermit && (
                  <span
                    key={errors.otherworkpermit}
                    className="text-danger font-size-3"
                  >
                    {errors.otherworkpermit}
                  </span>
                )}
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
