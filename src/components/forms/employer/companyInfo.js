import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { CKEditor } from "ckeditor4-react";
function Company(props) {
  // COMPANY PERSONAL INFO VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyname: "",
    pincode: "",
    companydesc: "",
    companyneeds: "",
    members: "",
    kycname: "",
    designation: "",
    location: "",
    terms: "",
    corporation: "",
    startdate: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companyname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Comapny name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    pincode: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Pincode is required"
          : value.length > 10 || value.length < 10
          ? "Mobile no should be of 10 digits"
          : null,
    ],
    companydesc: [
      (value) =>
        value === ""
          ? "Description is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    companyneeds: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Hiring Needs is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    members: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company Size is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    kycname: [
      (value) =>
        value === ""
          ? "Kyc company name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    designation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Nationality is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    location: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Address is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    terms: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Terms and condition is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    corporation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Corporation type is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    startdate: [
      (value) =>
        value === "" || value.trim() === "" ? "Religion is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // COMPANY PERSONAL INFO SUBMIT BUTTON
  const onCompanyPersonalInfoClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END COMPANY PERSONAL INFO VALIDATION
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
          <form onSubmit={onCompanyPersonalInfoClick}>
            <h5 className="text-center pt-2 mb-7">Company Info</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="companyname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Name :
                </label>
                <input
                  maxLength={20}
                  name="companyname"
                  value={state.companyname}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.companyname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Company Name"
                  id="companyname"
                />
                {/*----ERROR MESSAGE FOR companyname----*/}
                {errors.companyname && (
                  <span
                    key={errors.companyname}
                    className="text-danger font-size-3"
                  >
                    {errors.companyname}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="companyneeds"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  To fulfill own hiring needs :
                </label>
                <input
                  maxLength={30}
                  name="companyneeds"
                  value={state.companyneeds}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.companyneeds
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Company Needs"
                  id="companyneeds"
                />
                {/*----ERROR MESSAGE FOR companyneeds----*/}
                {errors.companyneeds && (
                  <span
                    key={errors.companyneeds}
                    className="text-danger font-size-3"
                  >
                    {errors.companyneeds}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <label
                  htmlFor="companydesc"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Description : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="12"
                    className={
                      errors.companydesc
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      // data={emailText}
                      // initData={emailText}
                      type={"classic"}
                      name={"companydesc"}
                      id={"companydesc"}
                      data={state.companydesc}
                      value={state.companydesc}
                      onChange={onInputChange}
                      initData="Describe Yourself"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.companydesc && (
                    <span
                      key={errors.companydesc}
                      className="text-danger font-size-3"
                    >
                      {errors.companydesc}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="corporation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Corporation Type :
                </label>
                <input
                  maxLength={30}
                  name="corporation"
                  value={state.corporation}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.corporation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Type Of COrporation"
                  id="corporation"
                />
                {/*----ERROR MESSAGE FOR corporation----*/}
                {errors.corporation && (
                  <span
                    key={errors.corporation}
                    className="text-danger font-size-3"
                  >
                    {errors.corporation}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="kycname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company name (as per KYC documents) :
                </label>
                <input
                  maxLength={30}
                  name="kycname"
                  value={state.kycname}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.kycname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Name_as_per_kyc"
                  id="kycname"
                />
                {/*----ERROR MESSAGE FOR kycname----*/}
                {errors.kycname && (
                  <span
                    key={errors.kycname}
                    className="text-danger font-size-3"
                  >
                    {errors.kycname}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Your designation :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="designation"
                    value={state.designation}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.designation
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Designation"
                    id="designation"
                  />
                  {/*----ERROR MESSAGE FOR designation----*/}
                  {errors.designation && (
                    <span
                      key={errors.designation}
                      className="text-danger font-size-3"
                    >
                      {errors.designation}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="pincode"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pin code :
                </label>
                <input
                  name="pincode"
                  value={state.pincode}
                  onChange={onInputChange}
                  type="number"
                  className={
                    errors.pincode
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Pincode"
                  id="pincode"
                />
                {/*----ERROR MESSAGE FOR pincode----*/}
                {errors.pincode && (
                  <span
                    key={errors.pincode}
                    className="text-danger font-size-3"
                  >
                    {errors.pincode}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Street address :
                </label>
                <input
                  maxLength={60}
                  type="text"
                  name="location"
                  value={state.location}
                  onChange={onInputChange}
                  className={
                    errors.location
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="location"
                  id="location"
                />
                {/*----ERROR MESSAGE FOR location----*/}
                {errors.location && (
                  <span
                    key={errors.location}
                    className="text-danger font-size-3"
                  >
                    {errors.location}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="startdate"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Start Date :
                </label>

                <input
                  max={moment().format("YYYY-MM-DD")}
                  type="date"
                  name="startdate"
                  value={state.startdate}
                  onChange={onInputChange}
                  className={
                    errors.startdate
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="startdate"
                  id="startdate"
                />
                {/*----ERROR MESSAGE FOR startdate----*/}
                {errors.startdate && (
                  <span
                    key={errors.startdate}
                    className="text-danger font-size-3"
                  >
                    {errors.startdate}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="members"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Size :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="members"
                    value={state.members}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.members
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="members"
                    id="members"
                  />
                  {/*----ERROR MESSAGE FOR members----*/}
                  {errors.members && (
                    <span
                      key={errors.members}
                      className="text-danger font-size-3"
                    >
                      {errors.members}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="terms"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Terms & condition :
                </label>
                <textarea
                  placeholder="Terms & condition"
                  name="startdate"
                  value={state.terms}
                  onChange={onInputChange}
                  className={
                    errors.terms
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="terms"
                />
                {/*----ERROR MESSAGE FOR terms----*/}
                {errors.terms && (
                  <span key={errors.terms} className="text-danger font-size-3">
                    {errors.terms}
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

export default Company;
