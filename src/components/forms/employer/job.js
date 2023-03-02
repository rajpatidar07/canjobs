import React from "react";
import { Modal } from "react-bootstrap";
import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
function AddJobModal(props) {
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
    jobtitle: "",
    experience: "",
    salary: "",
    location: "",
    industry: "",
    link: "",
    jobdesc: "",
    duties: "",
    requirment: "",
    department: "",
    jobtype: "",
    role: "",
    education: "",
    language: "",
    skills: "",
    employement: "",
    // jobscore: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    jobtitle: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Title is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    experience: [
      (value) =>
        value === ""
          ? "Experience is required"
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
    industry: [
      (value) =>
        value === ""
          ? "Industry Type is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    link: [
      (value) =>
        value === "" || value.trim() === "" ? "Link is required" : null,
    ],
    jobdesc: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Description is required"
          : null,
    ],
    duties: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Duties is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    requirment: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Requirment is required"
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
    jobtype: [
      (value) =>
        value === "" || value.trim() === "" ? "Job Type is required" : null,
    ],
    role: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Role/Category is required"
          : null,
    ],
    education: [
      (value) =>
        value === "" || value.trim() === "" ? "Education is required" : null,
    ],
    language: [
      (value) =>
        value === "" || value.trim() === "" ? "Language is required" : null,
    ],
    skills: [
      (value) =>
        value === "" || value.trim() === "" ? "Skills is required" : null,
    ],

    employement: [
      (value) =>
        value === "" || value.trim() === "" ? "Employement is required" : null,
    ],

    // jobscore: [],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // ADD JOBS SUBMIT BUTTON
  const onAddJobsClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
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
                  htmlFor="jobtitle"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job title <span className="text-danger"> *</span> :
                </label>
                <input
                  maxLength={30}
                  name="jobtitle"
                  value={state.jobtitle}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.jobtitle
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Job Title"
                  id="jobtitle"
                />
                {/*----ERROR MESSAGE FOR jobtitle----*/}
                {errors.jobtitle && (
                  <span
                    key={errors.jobtitle}
                    className="text-danger font-size-3"
                  >
                    {errors.jobtitle}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="experience"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Experience required <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="experience"
                    value={state.experience}
                    onChange={onInputChange}
                    className={
                      errors.experience
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Job Title"
                    id="experience"
                  >
                    <option value={""}>Select</option>
                    <option value={"0-1"}>0-1 year</option>
                    <option value={"1-3"}>1-3 year</option>
                    <option value={"3-5"}>3-5 year</option>
                    <option value={"5+"}>5+ year</option>
                  </select>
                  {/*----ERROR MESSAGE FOR experience----*/}
                  {errors.experience && (
                    <span
                      key={errors.experience}
                      className="text-danger font-size-3"
                    >
                      {errors.experience}
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
                <input
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
                />
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
                <input
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

              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="industry"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Industry Type <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="industry"
                    value={state.industry}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.industry
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Industry"
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="link"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Apply Link <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="link"
                    value={state.link}
                    onChange={onInputChange}
                    className={
                      errors.link
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply Link"
                    id="link"
                  />
                  {/*----ERROR MESSAGE FOR link----*/}
                  {errors.link && (
                    <span key={errors.link} className="text-danger font-size-3">
                      {errors.link}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* <h4 className="font-size-4 text-black-2  line-height-reset">
              Your Job Match Score :
            </h4>
            <div className="row d-flex">
              <div className="form-group col-md-3 col-6">
                <input
                  type="checkbox"
                  id="Early_Applicant"
                  placeholder=" Early Applicant "
                />
                <label
                  htmlFor="Early_Applicant"
                  className="font-size-4 text-black-2  line-height-reset ml-6 pt-5"
                >
                  Early Applicant
                </label>
              </div>
              <div className="form-group col-md-3 col-6">
                <input
                  type="checkbox"
                  id="Keyskills"
                  placeholder=" Keyskillse "
                />
                <label
                  htmlFor="Keyskills"
                  className="font-size-4 text-black-2  line-height-reset ml-6 pt-5"
                >
                  Keyskillse
                </label>
              </div>
              <div className="form-group col-md-3 col-6">
                <input type="checkbox" id="Location" placeholder=" Location " />
                <label
                  htmlFor="Location"
                  className="font-size-4 text-black-2  line-height-reset ml-6 pt-5"
                >
                  Location
                </label>
              </div>
              <div className="form-group col-md-3 col-6">
                <input
                  type="checkbox"
                  id="Work_Experienc"
                  placeholder=" Work Experienc "
                />
                <label
                  htmlFor="Work_Experienc"
                  className="font-size-4 text-black-2  line-height-reset ml-6 pt-5"
                >
                  Work Experienc
                </label>
              </div>
            </div> */}
            <div className="row">
              <div className="form-group col-md-12 px-0 pr-3">
                <label
                  htmlFor="jobdesc"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Job Description : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="12"
                    className={
                      errors.jobdesc
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      type={"classic"}
                      name={"jobdesc"}
                      id={"jobdesc"}
                      data={state.jobdesc}
                      value={state.jobdesc}
                      onChange={onInputChange}
                      initData="JOb Description"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.jobdesc && (
                    <span
                      key={errors.jobdesc}
                      className="text-danger font-size-3"
                    >
                      {errors.jobdesc}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 px-0 pr-3">
                <label
                  htmlFor="duties"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Your Duties : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="6"
                    className={
                      errors.duties
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      type={"classic"}
                      name={"duties"}
                      id={"duties"}
                      data={state.duties}
                      value={state.duties}
                      onChange={onInputChange}
                      initData="Employee Duties"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.duties && (
                    <span
                      key={errors.duties}
                      className="text-danger font-size-3"
                    >
                      {errors.duties}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6 px-0 pr-3">
                <label
                  htmlFor="requirment"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Requirment : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="6"
                    className={
                      errors.requirment
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      type={"classic"}
                      name={"requirment"}
                      id={"requirment"}
                      data={state.requirment}
                      value={state.requirment}
                      onChange={onInputChange}
                      initData="Add Requirement"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.requirment && (
                    <span
                      key={errors.requirment}
                      className="text-danger font-size-3"
                    >
                      {errors.requirment}
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
                  htmlFor="jobtype"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Type <span className="text-danger"> *</span> :
                </label>
                <div className={" position-relative"}>
                  <select
                    placeholder="Apply jobtype"
                    id="jobtype"
                    name="jobtype"
                    value={state.jobtype}
                    onChange={onInputChange}
                    className={
                      errors.jobtype
                        ? " form-control border border-danger rounded position-relative overflow-hidden"
                        : " form-control position-relative rounded overflow-hidden"
                    }
                  >
                    <option value={""}>Select</option>
                    <option value={"swap"}>Swap</option>
                    <option value={"other than swap"}>Other than swap</option>
                    <option value={"with swap"}>With swap</option>
                    <option value={"all"}>All</option>
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR jobtype----*/}
                {errors.jobtype && (
                  <span
                    key={errors.jobtype}
                    className="text-danger font-size-3"
                  >
                    {errors.jobtype}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="role"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Role/Category <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="role"
                    value={state.role}
                    onChange={onInputChange}
                    className={
                      errors.role
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply role"
                    id="role"
                  />
                  {/*----ERROR MESSAGE FOR role----*/}
                  {errors.role && (
                    <span key={errors.role} className="text-danger font-size-3">
                      {errors.role}
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
                        ? " form-control border border-danger rounded position-relative overflow-hidden"
                        : " form-control position-relative rounded overflow-hidden"
                    }
                    placeholder="Apply education"
                    id="education"
                  >
                    <option value={""}>Select</option>
                    <option value={"fresher"}>fresher</option>
                    <option value={"graduate"}>graduate</option>
                    <option value={"post graduate"}>post graduate</option>
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR jobtype----*/}
                {errors.jobtype && (
                  <span
                    key={errors.jobtype}
                    className="text-danger font-size-3"
                  >
                    {errors.jobtype}
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
                  htmlFor="skills"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Key skills <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="skills"
                    value={state.skills}
                    onChange={onInputChange}
                    className={
                      errors.skills
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply skills"
                    id="skills"
                  />
                  {/*----ERROR MESSAGE FOR skills----*/}
                  {errors.skills && (
                    <span
                      key={errors.skills}
                      className="text-danger font-size-3"
                    >
                      {errors.skills}
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
                  Employement <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <select
                    name="employement"
                    value={state.employement}
                    onChange={onInputChange}
                    className={
                      errors.employement
                        ? " form-control border border-danger rounded position-relative overflow-hidden"
                        : " form-control position-relative rounded overflow-hidden"
                    }
                    placeholder="Apply employement"
                    id="employement"
                  >
                    <option value={""}>Select</option>
                    <option value={"part time"}>part time</option>
                    <option value={"full time"}>full time</option>
                    <option value={"both"}>both</option>
                    <option value={"other"}>other</option>
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
