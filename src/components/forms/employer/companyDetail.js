import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
function CompanyDetails(props) {
  // COMPANY DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companytype: "",
    phoneno: "",
    otherphoneno: "",
    industry: "",
    contactperson: "",
    alias: "",
    contactdesignation: "",
    website: "",
    vacancy: "",
    classified: "",
    faxno: "",
    tanno: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companytype: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Comapny name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    phoneno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Phone no is required"
          : value.length !== 10
          ? "Phone no should be of 10 digits"
          : null,
    ],
    otherphoneno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Phone no is required"
          : value.length !== 10
          ? "Phone no should be of 10 digits"
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
    contactperson: [
      (value) =>
        value === "" || value.trim() === "" ? "Contact name is required" : null,
    ],
    alias: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Alias is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    contactdesignation: [
      (value) =>
        value === ""
          ? "Designation is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    website: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Website Url is required"
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
    classified: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Profile Classified is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    faxno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Fax no is required"
          : value.length !== 10
          ? "Fax no should be of 10 digits"
          : null,
    ],
    tanno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Tan no is required"
          : value.length !== 10
          ? "Tan no should be of 10 digits"
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
            <h5 className="text-center pt-2">Company Details</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="companytype"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Type :
                </label>
                <input
                  type="text"
                  maxLength={20}
                  name="companytype"
                  value={state.companytype}
                  onChange={onInputChange}
                  className={
                    errors.companytype
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Company Name"
                  id="companytype"
                />
                {/*----ERROR MESSAGE FOR companytype----*/}
                {errors.companytype && (
                  <span
                    key={errors.companytype}
                    className="text-danger font-size-3"
                  >
                    {errors.companytype}
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
                  Contact Person<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="Contact Person "
                  maxLength={20}
                  name="contactperson"
                  value={state.contactperson}
                  onChange={onInputChange}
                  className={
                    errors.contactperson
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="contactperson"
                />
                {/*----ERROR MESSAGE FOR contactperson----*/}
                {errors.contactperson && (
                  <span
                    key={errors.contactperson}
                    className="text-danger font-size-3"
                  >
                    {errors.contactperson}
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
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="contactdesignation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact Person's Designation :
                </label>
                <input
                  type="text"
                  maxLength={20}
                  name="contactdesignation"
                  value={state.contactdesignation}
                  onChange={onInputChange}
                  className={
                    errors.contactdesignation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="contactdesignation"
                />
                {/*----ERROR MESSAGE FOR contactdesignation----*/}
                {errors.contactdesignation && (
                  <span
                    key={errors.contactdesignation}
                    className="text-danger font-size-3"
                  >
                    {errors.contactdesignation}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="website"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Website URL :
                </label>
                <input
                  type="text"
                  maxLength={20}
                  name="website"
                  value={state.website}
                  onChange={onInputChange}
                  className={
                    errors.website
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="website"
                />
                {/*----ERROR MESSAGE FOR website----*/}
                {errors.website && (
                  <span
                    key={errors.website}
                    className="text-danger font-size-3"
                  >
                    {errors.website}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="vacancy"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Profile for Hot Vacancies :
                </label>
                <input
                  type="text"
                  placeholder="Profile for Hot Vacancies"
                  maxLength={20}
                  name="vacancy"
                  value={state.vacancy}
                  onChange={onInputChange}
                  className={
                    errors.vacancy
                      ? "form-control border border-danger"
                      : "form-control"
                  }
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
              <div className="form-group col-md-6">
                <label
                  htmlFor="classified"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Profile for Classifieds :
                </label>
                <input
                  type="text"
                  placeholder="Profile for Classifieds"
                  maxLength={20}
                  name="classified"
                  value={state.classified}
                  onChange={onInputChange}
                  className={
                    errors.classified
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="classified"
                />
                {/*----ERROR MESSAGE FOR classified----*/}
                {errors.classified && (
                  <span
                    key={errors.classified}
                    className="text-danger font-size-3"
                  >
                    {errors.classified}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="phoneno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Phone Number 1<span className="text-danger"> *</span> :
                </label>
                <input
                  type="number"
                  maxLength={20}
                  name="phoneno"
                  value={state.phoneno}
                  onChange={onInputChange}
                  className={
                    errors.phoneno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="phoneno"
                />
                {/*----ERROR MESSAGE FOR phoneno----*/}
                {errors.phoneno && (
                  <span
                    key={errors.phoneno}
                    className="text-danger font-size-3"
                  >
                    {errors.phoneno}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="otherphoneno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Phone Number 2 :
                </label>
                <input
                  type="number"
                  placeholder="Phone Number 2"
                  name="otherphoneno"
                  value={state.otherphoneno}
                  onChange={onInputChange}
                  className={
                    errors.otherphoneno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="otherphoneno"
                />
                {/*----ERROR MESSAGE FOR otherphoneno----*/}
                {errors.otherphoneno && (
                  <span
                    key={errors.otherphoneno}
                    className="text-danger font-size-3"
                  >
                    {errors.otherphoneno}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="faxno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Fax Number :
                </label>
                <input
                  type="text"
                  placeholder="Fax Number"
                  name="faxno"
                  value={state.faxno}
                  onChange={onInputChange}
                  className={
                    errors.faxno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="faxno"
                />
                {/*----ERROR MESSAGE FOR faxno----*/}
                {errors.faxno && (
                  <span key={errors.faxno} className="text-danger font-size-3">
                    {errors.faxno}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="tanno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  TAN Number :
                </label>
                <input
                  type="text"
                  placeholder="TAN Number"
                  name="tanno"
                  value={state.tanno}
                  onChange={onInputChange}
                  className={
                    errors.tanno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="tanno"
                />
                {/*----ERROR MESSAGE FOR tanno----*/}
                {errors.tanno && (
                  <span key={errors.tanno} className="text-danger font-size-3">
                    {errors.tanno}
                  </span>
                )}
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
