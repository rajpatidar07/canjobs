import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function EmployementDetails(props) {
  // USER CARRER PROFILE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyname: "",
    designation: "",
    companylocation: "",
    industry: "",
    funarea: "",
    userdoj: "",
    userdol: "",
    worklevel: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companyname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    designation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Designation is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    companylocation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "location is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    industry: [(value) => (value ? null : "Industry is required")],
    funarea: [(value) => (value ? null : "Area is required")],
    userdoj: [
      (value) =>
        value === "" || value.trim() === "" ? "Start Date is required" : null,
    ],
    userdol: [(value) => (value === "" ? "End Date is required" : null)],
    worklevel: [
      (value) =>
        value === "" || value.trim() === "" ? "Work Level is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // USER CARRER PROFILE SUBMIT BUTTON
  const onCarrerProfileClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER CARRER PROFILE VALIDATION
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
          <form onSubmit={onCarrerProfileClick}>
            <h5 className="text-center pt-2 mb-7">Add Employment</h5>
            <div className="row pt-5">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Company"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company<span className="text-danger">*</span>:
                </label>
                <input
                  maxLength={30}
                  type="text"
                  placeholder="Tell us your company name"
                  name="companyname"
                  value={state.companyname}
                  onChange={onInputChange}
                  className={
                    errors.companyname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="companyname"
                />
                {/*----ERROR MESSAGE FOR NAME----*/}
                {errors.companyname && (
                  <span
                    key={errors.companyname}
                    className="text-danger font-size-3"
                  >
                    {errors.companyname}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Designation<span className="text-danger">*</span>:
                </label>
                <input
                  maxLength={30}
                  type="text"
                  placeholder="Tell us your designation / job role"
                  name="designation"
                  value={state.designation}
                  onChange={onInputChange}
                  className={
                    errors.designation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="designation"
                />
                {/*----ERROR MESSAGE FOR DESIGNATION----*/}
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
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="companylocation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company location <span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Tell us your employer location"
                  name="companylocation"
                  value={state.companylocation}
                  onChange={onInputChange}
                  className={
                    errors.companylocation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="companylocation"
                />
                {/*----ERROR MESSAGE FOR LOCATION----*/}
                {errors.companylocation && (
                  <span
                    key={errors.companylocation}
                    className="text-danger font-size-3"
                  >
                    {errors.companylocation}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry <span className="text-danger">*</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="industry"
                    value={state.industry}
                    onChange={onInputChange}
                    className={
                      errors.industry
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="industry"
                  >
                    <option value={""}>
                      Select the industry your company belongs to
                    </option>
                    <option value={"accounting"}>Accounting & Auditing</option>
                    <option value={"call"}>Call center / BPO</option>
                    <option value={"bank"}>Banking finance</option>
                  </select>
                  {/*----ERROR MESSAGE FOR INDUSTRY----*/}
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
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  htmlFor="funarea"
                >
                  Functional Area <span className="text-danger">*</span>:
                </label>
                <div className="position-relative">
                  <select
                    name="funarea"
                    value={state.funarea}
                    onChange={onInputChange}
                    className={
                      errors.funarea
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="funarea"
                  >
                    <option value={""}>
                      Select the department you work in
                    </option>
                    <option value={"fresh graduate"}>
                      Fresh graduates / Management Traninee
                    </option>
                    <option value={"intern"}>Intern</option>
                    <option value={"engineering"}>Engineering </option>
                    <option value={"adminstration"}>Adminstration</option>
                  </select>
                  {/*----ERROR MESSAGE FOR AREA----*/}
                  {errors.funarea && (
                    <span
                      key={errors.funarea}
                      className="text-danger font-size-3"
                    >
                      {errors.funarea}
                    </span>
                  )}
                </div>
              </div>{" "}
              <div className="form-group col-md-6">
                <label
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  htmlFor="worklevel"
                >
                  Work level<span className="text-danger">*</span> :
                </label>
                <select
                  name="worklevel"
                  value={state.worklevel}
                  onChange={onInputChange}
                  className={
                    errors.worklevel
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="worklevel"
                >
                  <option value={""}>Select the department you work in</option>
                  <option value={"fresh graduate"}>
                    Fresh graduates / Management Traninee
                  </option>
                  <option value={"intern"}>Intern</option>
                  <option value={"entry level"}> Entry level </option>
                  <option value={" nonmanagerial level"}>
                    {" "}
                    Non Managerial level
                  </option>
                  <option value={" managerial level"}> Managerial level</option>
                  <option value={"senior management"}>
                    {" "}
                    Senior Mangement(AVP ,VP , GM)
                  </option>
                  <option value={"top management"}>
                    {" "}
                    Top Management (CEO , CFO , Director)
                  </option>
                </select>
                {/*----ERROR MESSAGE FOR LEVEL----*/}
                {errors.worklevel && (
                  <span
                    key={errors.worklevel}
                    className="text-danger font-size-3"
                  >
                    {errors.worklevel}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="userdoj"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Start Date : <span className="text-danger">*</span>
                </label>
                <input
                  max={moment().format("YYYY-MM-DD")}
                  type="date"
                  placeholder="Date Of Joining "
                  name="userdoj"
                  value={state.userdoj}
                  onChange={onInputChange}
                  className={
                    errors.userdoj
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="userdoj"
                />
                {/*----ERROR MESSAGE FOR START DATE----*/}
                {errors.userdoj && (
                  <span
                    key={errors.userdoj}
                    className="text-danger font-size-3"
                  >
                    {errors.userdoj}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="userdol"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  End Date : <span className="text-danger">*</span>
                </label>
                <input
                  min={state.userdoj}
                  type="date"
                  placeholder="Date Of Leaving "
                  name="userdol"
                  value={state.userdol}
                  onChange={onInputChange}
                  className={
                    errors.userdol
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="userdol"
                />
                {/*----ERROR MESSAGE FOR ENDDATE----*/}
                {errors.userdol && (
                  <span
                    key={errors.userdol}
                    className="text-danger font-size-3"
                  >
                    {errors.userdol}
                  </span>
                )}
              </div>
              <div className="col-md-6 my-auto ">
                <input
                  type="checkbox"
                  name="userdol"
                  value={moment().format("YYYY-MM-DD")}
                  onChange={onInputChange}
                  className={errors.userdol ? "border border-danger" : ""}
                  id="userdol"
                />
                <label
                  htmlFor="userdol"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-4"
                >
                  I Currently work here
                </label>
                {/*----ERROR MESSAGE FOR ENDDATE----*/}
                {errors.userdol && (
                  <span
                    key={errors.userdol}
                    className="text-danger font-size-3"
                  >
                    {errors.userdol}
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

export default EmployementDetails;
