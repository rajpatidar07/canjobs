import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { CKEditor } from "ckeditor4-react";

function CompanyDetails(props) {
  // COMPANY DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyname: "",
    industry: "",
    corporation: "",
    alias: "",
    startdate: "",
    members: "",
    url: "",
    companydesc: "",
    vacancy: "",
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
    industry: [
      (value) =>
        value === ""
          ? "Industry is required"
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

    // alias: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "Alias is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : null,
    // ],
    startdate: [
      (value) =>
        value === "" || value.trim() === "" ? "Start Date is required" : null,
    ],
    members: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company Size is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    vacancy: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Vacancy is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    companydesc: [
      (value) =>
        value === ""
          ? "Company Description is required"
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
  // COMPANY DETAIL SUBMIT BUTTON
  const onCompanyDetailClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END COMPANY DETAIL VALIDATION
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
          <form onSubmit={onCompanyDetailClick}>
            <h5 className="text-center pt-2 mb-7">Company Details</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="companyname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Name (as per Kyc) :
                </label>
                <input
                  type="text"
                  maxLength={20}
                  name="companyname"
                  value={state.companyname}
                  onChange={onInputChange}
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
                  htmlFor="industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="Industry"
                  maxLength={20}
                  name="industry"
                  value={state.industry}
                  onChange={onInputChange}
                  className={
                    errors.industry
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="industry"
                />
                {/*----ERROR MESSAGE FOR industry----*/}
                {errors.industry && (
                  <span
                    key={errors.industry}
                    className="text-danger font-size-3"
                  >
                    {errors.industry}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="contactperson"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Corporation<span className="text-danger"> *</span> :
                </label>
                <select
                  type="text"
                  placeholder="Contact Person "
                  maxLength={20}
                  name="corporation"
                  value={state.corporation}
                  onChange={onInputChange}
                  className={
                    errors.corporation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="corporation"
                >
                  <option value={""}>Select</option>
                  <option value={"b2b3"}>B2B3</option>
                </select>
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
                  htmlFor="alias"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Alias :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Alias"
                    maxLength={20}
                    name="alias"
                    value={state.alias}
                    onChange={onInputChange}
                    className={
                      errors.alias
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="alias"
                  />
                  {/*----ERROR MESSAGE FOR alias----*/}
                  {errors.alias && (
                    <span
                      key={errors.alias}
                      className="text-danger font-size-3"
                    >
                      {errors.alias}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
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
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="url"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Website URL :
                </label>
                <input
                  type="text"
                  placeholder="Website Url"
                  maxLength={40}
                  name="url"
                  value={state.url}
                  onChange={onInputChange}
                  className={
                    errors.url
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="url"
                />
                {/*----ERROR MESSAGE FOR url----*/}
                {errors.url && (
                  <span key={errors.url} className="text-danger font-size-3">
                    {errors.url}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="vacancy"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Vacancy FOr Post :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="vacancy"
                    value={state.vacancy}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.vacancy
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Vacancy For Post"
                    id="vacancy"
                  />
                  {/*----ERROR MESSAGE FOR vacancy----*/}
                  {errors.vacancy && (
                    <span
                      key={errors.vacancy}
                      className="text-danger font-size-3"
                    >
                      {errors.vacancy}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-12">
                <label
                  htmlFor="companydesc"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  About : <span className="text-danger">*</span>
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
                      type={"classic"}
                      name={"companydesc"}
                      id={"companydesc"}
                      data={state.companydesc}
                      value={state.companydesc}
                      onChange={onInputChange}
                      initData="About Company"
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

            <div className="form-group mb-8">
              <button
                className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
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

export default CompanyDetails;
