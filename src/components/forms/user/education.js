import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import filterjson from "../../json/filterjson";
function Education(props) {
  /*----USER Education VALIDATION----*/
  const initialFormState = {
    qualification: "",
    university: "",
    course: "",
    specialization: "",
    location: "",
    passingyear: "",
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    qualification: [
      (value) =>
        value === null || value.trim() === ""
          ? "Qualification is required"
          : null,
    ],
    university: [
      (value) =>
        value === null || value.trim() === ""
          ? "University is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    course: [
      (value) =>
        value === null || value.trim() === "" ? "Course is required" : null,
    ],
    specialization: [
      (value) =>
        value === null || value.trim() === ""
          ? "Specialization is required"
          : null,
    ],
    location: [
      (value) =>
        value === null || value.trim() === "" ? "Location is required" : null,
    ],
    passingyear: [
      (value) =>
        value === "" || value === null ? "Passing Year is required" : null,
    ],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onEducationSubmitClick = (event) => {
    event.preventDefault();

    if (validate()) {
      // handle form submission
    }
  };
  // END USER Education VALIDATION

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
          <form onSubmit={onEducationSubmitClick}>
            <h5 className="text-center pt-2">Education Details</h5>
            <div className="row pt-5">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="qualification"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Qualification <span className="text-danger">*</span> :
                </label>
                <select
                  className={
                    errors.qualification
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  name="qualification"
                  id="qualification"
                  value={state.qualification}
                  onChange={onInputChange}
                >
                  <option value={""}>select Qualification</option>
                  <option value={"doctors"}>Doctors</option>
                  <option value={"masters"}>Masters</option>
                </select>
                {/*----ERROR MESSAGE FOR QUALIFICATION----*/}
                {errors.qualification && (
                  <span
                    key={errors.qualification}
                    className="text-danger font-size-3"
                  >
                    {errors.qualification}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="university"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  University/Institute <span className="text-danger">*</span> :
                </label>
                <input
                  maxLength={40}
                  type="text"
                  placeholder="University/Institute "
                  className={
                    errors.university
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  name="university"
                  id="university"
                  value={state.university}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR UNIVERSITY----*/}
                {errors.university && (
                  <span
                    key={errors.university}
                    className="text-danger font-size-3"
                  >
                    {errors.university}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="course"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Course <span className="text-danger">*</span> :
                </label>
                <select
                  className={
                    errors.course
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  name="course"
                  id="course"
                  value={state.course}
                  onChange={onInputChange}
                >
                  <option value={""}>select Course</option>
                  <option value={"mba"}>MBA</option>
                  <option value={""}>MBBS</option>
                  <option value={""}>CA</option>
                  <option value={""}>BA</option>
                  <option value={""}>MA</option>
                  <option value={""}>B.Tech</option>
                  <option value={""}>M.Tech</option>
                </select>
                {/*----ERROR MESSAGE FOR course----*/}
                {errors.course && (
                  <span key={errors.course} className="text-danger font-size-3">
                    {errors.course}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="specialization"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Specialization <span className="text-danger">*</span> :
                </label>
                <select
                  className={
                    errors.specialization
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  name="specialization"
                  id="specialization"
                  value={state.specialization}
                  onChange={onInputChange}
                >
                  <option value={""}>select Specialization</option>
                  <option value={"mba"}>MBA</option>
                  <option value={""}>MBBS</option>
                  <option value={""}>CA</option>
                  <option value={""}>BA</option>
                  <option value={""}>MA</option>
                  <option value={""}>B.Tech</option>
                  <option value={""}>M.Tech</option>
                </select>
                {/*----ERROR MESSAGE FOR SPECIALIZATION----*/}
                {errors.specialization && (
                  <span
                    key={errors.specialization}
                    className="text-danger font-size-3"
                  >
                    {errors.specialization}
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
                  Institute Location <span className="text-danger">*</span> :
                </label>
                <div className="position-relative">
                  <select
                    className={
                      errors.location
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    name="location"
                    id="location"
                    value={state.location}
                    onChange={onInputChange}
                  >
                    <option value={""}>select Location</option>
                    {(filterjson.location || []).map((data, i) => {
                      return (
                        <option value={data} key={i}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                  {/*----ERROR MESSAGE FOR LOCATION----*/}
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
              <div className="form-group col-md-6">
                <label
                  htmlFor="passingyear"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Passing Year <span className="text-danger">*</span> :
                </label>
                <input
                  type="number"
                  className={
                    errors.passingyear
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Passing Year"
                  id="passingyear"
                  name="passingyear"
                  value={state.passingyear}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR PASSING YEAR----*/}
                {errors.passingyear && (
                  <span
                    key={errors.passingyear}
                    className="text-danger font-size-3"
                  >
                    {errors.passingyear}
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

export default Education;
