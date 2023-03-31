import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
import FilterJson from "./../../json/filterjson";
function AddJobModal(props) {
  console.log(props.jobData);
  const [Json, setJson] = useState(FilterJson);

  // CKEDITOR
  // ClassicEditor.defaultConfig = {
  //   toolbar: {
  //     items: [
  //       "heading",
  //       "|",
  //       "bold",
  //       "italic",
  //       "|",
  //       "bulletedList",
  //       "numberedList",
  //       "|",
  //       "insertTable",
  //       "|",
  //       "undo",
  //       "redo",
  //     ],
  //   },
  //   table: {
  //     contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  //   },
  //   language: "en",
  // };
  // ADD JOBS VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    job_title: "",
    experience_required: "",
    salary: "",
    location: "",
    industry_type: "",
    apply_link: "",
    job_description: "",
    your_duties: "",
    requirement: "",
    department: "",
    job_type: "",
    role_category: "",
    education: "",
    language: "",
    keyskill: "",
    employement: "",
    job_category_id: "",
    // jobscore: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    job_title: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Title is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    experience_required: [
      (value) =>
        value === ""
          ? "experience_required is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    salary: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Salary is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    location: [
      (value) =>
        value === "" || value.trim() === "" ? "Location is required" : null,
    ],
    industry_type: [
      (value) =>
        value === ""
          ? "industry_type Type is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    apply_link: [
      (value) =>
        value === "" || value.trim() === "" ? "apply_link is required" : null,
    ],
    job_description: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Description is required"
          : null,
    ],
    your_duties: [
      (value) =>
        value === "" || value.trim() === ""
          ? "your_duties is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    requirement: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job requirement is required"
          : null,
    ],
    department: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Department is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    job_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Job Type is required" : null,
    ],
    role_category: [
      (value) =>
        value === "" || value.trim() === ""
          ? "role_category/Category is required"
          : null,
    ],
    education: [
      (value) =>
        value === "" || value.trim() === "" ? "education is required" : null,
    ],
    language: [
      (value) =>
        value === "" || value.trim() === "" ? "language is required" : null,
    ],
    keyskill: [
      (value) =>
        value === "" || value.trim() === "" ? "keyskill is required" : null,
    ],

    employement: [
      (value) =>
        value === "" || value.trim() === "" ? "employement is required" : null,
    ],
    job_category_id: [
      (value) =>
        value === "" || value.trim() === "" ? "Job category is required" : null,
    ],
    // jobscore: [],
  };
  // CUSTOM VALIDATIONS IMPORT
  // eslint-disable-next-line no-unused-vars
  const { state, setState, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // ADD JOBS SUBMIT BUTTON
  const onAddJobsClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // console.log("JSON" + JSON.stringify(FilterJson.location))

  // END ADD JOBS VALIDATION
  return (
    <>
      <Modal
        show={props.show}
        size="xl"
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
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form onSubmit={onAddJobsClick}>
            <h5 className="text-center pt-2 mb-7">Add Jobs</h5>
            <div className="row pt-5">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_title"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Title <span className="text-danger"> *</span> :
                </label>
                <input
                  maxLength={30}
                  name="job_title"
                  value={state.job_title}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.job_title
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Job Title"
                  id="job_title"
                />
                {/*----ERROR MESSAGE FOR job_title----*/}
                {errors.job_title && (
                  <span
                    key={errors.job_title}
                    className="text-danger font-size-3"
                  >
                    {errors.job_title}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="experience_required"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Experience required <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="experience_required"
                    value={state.experience_required}
                    onChange={onInputChange}
                    className={
                      errors.experience_required
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Job Title"
                    id="experience_required"
                  >
                    {(FilterJson.experience || []).map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                  {/*----ERROR MESSAGE FOR experience_required----*/}
                  {errors.experience_required && (
                    <span
                      key={errors.experience_required}
                      className="text-danger font-size-3"
                    >
                      {errors.experience_required}
                    </span>
                  )}
                </div>
              </div>{" "}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="salary"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Salary <span className="text-danger"> *</span> :
                </label>
                <select
                  maxLength={9}
                  name="salary"
                  value={state.salary}
                  onChange={onInputChange}
                  type="number"
                  className={
                    errors.salary
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Salary"
                  id="salary"
                >
                  {(FilterJson.salary || []).map((salary) => (
                    <option key={salary} value={salary}>
                      {salary}
                    </option>
                  ))}
                </select>
                {/*----ERROR MESSAGE FOR salary----*/}
                {errors.salary && (
                  <span key={errors.salary} className="text-danger font-size-3">
                    {errors.salary}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Location <span className="text-danger"> *</span> :
                </label>
                <select
                  maxLength={50}
                  name="location"
                  value={state.location}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.location
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Location"
                  id="location"
                >
                  {(FilterJson.location || []).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
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

              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="industry_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Industry Type <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    maxLength={30}
                    name="industry_type"
                    value={state.industry_type}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.industry_type
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="industry_type"
                    id="industry_type"
                  >
                    {(FilterJson.industry || []).map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {/*----ERROR MESSAGE FOR industry_type----*/}
                  {errors.industry_type && (
                    <span
                      key={errors.industry_type}
                      className="text-danger font-size-3"
                    >
                      {errors.industry_type}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="apply_link"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Apply Link <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="apply_link"
                    value={state.apply_link}
                    onChange={onInputChange}
                    className={
                      errors.apply_link
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply apply_link"
                    id="apply_link"
                  />
                  {/*----ERROR MESSAGE FOR apply_link----*/}
                  {errors.apply_link && (
                    <span
                      key={errors.apply_link}
                      className="text-danger font-size-3"
                    >
                      {errors.apply_link}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-12 px-0 pr-3">
                <label
                  htmlFor="job_description"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Job Description : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="12"
                    className={
                      errors.job_description
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      type={"classic"}
                      name="job_description"
                      row={6}
                      id={"job_description"}
                      data={state.job_description}
                      value={state.job_description}
                      onChange={onInputChange}
                      initData="Job Description"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.job_description && (
                    <span
                      key={errors.job_description}
                      className="text-danger font-size-3"
                    >
                      {errors.job_description}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 px-0 pr-3">
                <label
                  htmlFor="your_duties"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Your Duties : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="6"
                    className={
                      errors.your_duties
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      type={"classic"}
                      name="your_duties"
                      id={"your_duties"}
                      data={state.your_duties}
                      value={state.your_duties}
                      onChange={onInputChange}
                      initData="your duties"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.your_duties && (
                    <span
                      key={errors.your_duties}
                      className="text-danger font-size-3"
                    >
                      {errors.your_duties}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6 px-0 pr-3">
                <label
                  htmlFor="requirement"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Requirement : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="6"
                    className={
                      errors.requirement
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      type={"classic"}
                      name="requirement"
                      id={"requirement"}
                      data={state.requirement}
                      value={state.requirement}
                      onChange={onInputChange}
                      initData="Add Requirement"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.requirement && (
                    <span
                      key={errors.requirement}
                      className="text-danger font-size-3"
                    >
                      {errors.requirement}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="department"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Department <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="department"
                    value={state.department}
                    onChange={onInputChange}
                    className={
                      errors.department
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply department"
                    id="department"
                  />
                  {/*----ERROR MESSAGE FOR department----*/}
                  {errors.department && (
                    <span
                      key={errors.department}
                      className="text-danger font-size-3"
                    >
                      {errors.department}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Type <span className="text-danger"> *</span> :
                </label>
                <div className={" position-relative"}>
                  <select
                    placeholder="Apply job_type"
                    id="job_type"
                    name="job_type"
                    value={state.job_type}
                    onChange={onInputChange}
                    className={
                      errors.job_type
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                  >
                    {(FilterJson.job_type || []).map((job_type) => (
                      <option key={job_type} value={job_type}>
                        {job_type}
                      </option>
                    ))}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_type----*/}
                {errors.job_type && (
                  <span
                    key={errors.job_type}
                    className="text-danger font-size-3"
                  >
                    {errors.job_type}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="role_category"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Role Category <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="role_category"
                    value={state.role_category}
                    onChange={onInputChange}
                    className={
                      errors.role_category
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply role_category"
                    id="role_category"
                  />
                  {/*----ERROR MESSAGE FOR role_category----*/}
                  {errors.role_category && (
                    <span
                      key={errors.role_category}
                      className="text-danger font-size-3"
                    >
                      {errors.role_category}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="education"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Education <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="education"
                    value={state.education}
                    onChange={onInputChange}
                    className={
                      errors.education
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply education"
                    id="education"
                  >
                    {(FilterJson.education || []).map((education) => (
                      <option key={education} value={education}>
                        {education}
                      </option>
                    ))}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_type----*/}
                {errors.job_type && (
                  <span
                    key={errors.job_type}
                    className="text-danger font-size-3"
                  >
                    {errors.job_type}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="language"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Language <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="language"
                    value={state.language}
                    onChange={onInputChange}
                    className={
                      errors.language
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply language"
                    id="language"
                  />
                  {/*----ERROR MESSAGE FOR language----*/}
                  {errors.language && (
                    <span
                      key={errors.language}
                      className="text-danger font-size-3"
                    >
                      {errors.language}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="keyskill"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Key Skill <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="keyskill"
                    value={state.keyskill}
                    onChange={onInputChange}
                    className={
                      errors.keyskill
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply keyskill"
                    id="keyskill"
                  />
                  {/*----ERROR MESSAGE FOR keyskill----*/}
                  {errors.keyskill && (
                    <span
                      key={errors.keyskill}
                      className="text-danger font-size-3"
                    >
                      {errors.keyskill}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="employement"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  employement <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="employement"
                    value={state.employement}
                    onChange={onInputChange}
                    className={
                      errors.employement
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply employement"
                    id="employement"
                  >
                    {(FilterJson.employement || []).map((employement) => (
                      <option key={employement} value={employement}>
                        {employement}
                      </option>
                    ))}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR employement----*/}
                {errors.employement && (
                  <span
                    key={errors.employement}
                    className="text-danger font-size-3"
                  >
                    {errors.employement}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_category_id"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Category <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="job_category_id"
                    value={state.job_category_id}
                    onChange={onInputChange}
                    className={
                      errors.job_category_id
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply job_category_id"
                    id="job_category_id"
                  >
                    <option value={""}>Select</option>
                    <option value={"Hospitality"}>Hospitality</option>
                    <option value={"Driver"}>Driver</option>
                    <option value={"Mechanic"}>Mechanic</option>
                    <option value={"other"}>other</option>
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_category_id----*/}
                {errors.job_category_id && (
                  <span
                    key={errors.job_category_id}
                    className="text-danger font-size-3"
                  >
                    {errors.job_category_id}
                  </span>
                )}
              </div>{" "}
            </div>

            <div className="form-group text-center">
              <button className="btn btn-primary btn-small w-25 rounded-5 text-uppercase">
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

export default AddJobModal;
