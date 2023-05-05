import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
import FilterJson from "./../../json/filterjson";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GetJob,
  AddJob,
  getAllJobsCategory,
  getAllEmployer,
} from "../../../api/api";

function AddJobModal(props) {
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  const company_id = localStorage.getItem("company_id");
  const user_type = localStorage.getItem("userType");

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
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
    // role_category:  "",
    education: "",
    language: "",
    keyskill: "",
    employement: "",
    job_category_id: "",
    company_id: user_type === "company" ? company_id : "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    job_title: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Title is required"
          : value.length < 2
          ? "Job Title should have 2 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Job Title can not have a number."
          : "",
    ],
    experience_required: [
      (value) => (value === "" ? "Experienceis required" : null),
    ],
    salary: [
      (value) =>
        value === "" || value.trim() === "" ? "Salary is required" : null,
    ],
    location: [
      (value) =>
        value === "" || value.trim() === "" ? "Location is required" : null,
    ],
    industry_type: [
      (value) =>
        value === ""
          ? "Industry type Type is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    apply_link: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Apply link is required"
          : !/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(
              value
            )
          ? "Write the correct link"
          : value.length < 3
          ? "Apply link  should have 3 or more letters"
          : null,
    ],
    job_description: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Description is required"
          : value.length < 3
          ? "Job Description  should have 3 or more letters"
          : null,
    ],
    your_duties: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Your duties is required"
          : value.length < 2
          ? "Duties  should have 2 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Duties can not have a number."
          : "",
    ],
    requirement: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job requirement is required"
          : value.length < 2
          ? "Requirement  should have 2 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Requirement can not have a number."
          : "",
    ],
    department: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Department is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "Department  should have 2 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Department can not have a number."
          : "",
    ],
    job_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Job Type is required" : null,
    ],
    // role_category: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "role_category/Category is required"
    //       : null,
    // ],
    education: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Education is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Education can not have a number."
          : "",
    ],
    language: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Language is required"
          : value.length < 3
          ? "Language  should have 3 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Language can not have a number."
          : "",
    ],
    keyskill: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Skill is required"
          : value.length < 3
          ? "Skill  should have 3 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Skill can not have a number."
          : "",
    ],

    employement: [
      (value) =>
        value === "" || value.trim() === "" ? "employement is required" : null,
    ],
    job_category_id: [
      (value) =>
        value === "" || value.trim() === "" ? "Job category is required" : null,
    ],
    company_id: [
      (value) =>
        value === "" || value.trim() === "" ? "Company is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  // eslint-disable-next-line no-unused-vars
  const {
    state,
    setErrors,
    setState,
    onInputChange,
    errors,
    validate,
  } = useValidation(initialFormState, validators);
  // API CALL
  const JobData = async () => {
    let userData = await GetJob(props.jobdata);
    if (
      props.jobdata === undefined ||
      props.jobdata === "0" ||
      props.jobdata.length === 0 ||
      state === undefined ||
      userData.data.data.length === 0
    ) {
      setState(initialFormState);
    } else {
      setState(userData.data.data[0]);
    }
    // console.log(userData.data.data[0]);
  };
  /* Function to get the job category data*/
  const CategoryData = async () => {
    const userData = await getAllJobsCategory();
    if (userData.data.length === 0) {
      setCategory([]);
    } else {
      setCategory(userData.data);
    }
  };

  /* Function to get Employer data*/
  const CompnayData = async () => {
    const userData = await getAllEmployer();
    if (userData.data.length === 0) {
      setCompany([]);
    } else {
      setCompany(userData.data);
    }
  };
  useEffect(() => {
    if (user_type === "admin" && props.admin === "admin") {
      CompnayData();
    }
    if (token) {
      CategoryData();
    }
    if (
      props.jobdata === "0" ||
      props.jobdata === undefined ||
      props.jobdata.length === 0 ||
      state === undefined
    ) {
      setState(initialFormState);
    } else {
      JobData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  // ADD JOBS SUBMIT BUTTON
  const onAddJobsClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (validate()) {
      let responseData = await AddJob(state);
      if (responseData.message === "job data inserted successfully") {
        toast.success("Job Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        return close();
      }
      if (responseData.message === "job data updated successfully") {
        toast.success("Job Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        return close();
      }
    } else {
      setLoading(false);
    }
  };

  // //// console.log(("JSON" + JSON.stringify(FilterJson.location))

  // END ADD JOBS VALIDATION
  /*Category type array to filter*/
  const CategoryType = category.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category_name === thing.category_name)
  );
  /*Category type array to filter*/
  const Company = company.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.company_name === thing.company_name)
  );
  // console.log(props.jobdata);
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
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form onSubmit={onAddJobsClick}>
            {props.jobdata === "0" ? (
              <h5 className="text-center pt-2 mb-7">Add Jobs</h5>
            ) : (
              <h5 className="text-center pt-2 mb-7">Update Jobs</h5>
            )}

            <div className="row pt-5">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_title"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Title:<span className="text-danger"> *</span>
                </label>
                <input
                  maxLength={30}
                  name="job_title"
                  value={state.job_title || ""}
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
                  <span className="text-danger font-size-3">
                    {errors.job_title}
                  </span>
                )}
              </div>
              {user_type === "admin" ? (
                <div className="form-group col-md-4 px-0 pr-3">
                  <label
                    htmlFor="job_category_id"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Company:<span className="text-danger"> *</span>
                  </label>
                  <div className="position-relative">
                    <select
                      name="company_id"
                      value={state.company_id || ""}
                      onChange={onInputChange}
                      className={
                        errors.company_id
                          ? " form-control border border-danger position-relative overflow-hidden"
                          : " form-control position-relative overflow-hidden"
                      }
                      placeholder="company name"
                      id="company_id"
                    >
                      <option value={""}>Select Company</option>
                      {(Company || []).map((com) =>
                        com.company_name === null ? null : (
                          <option key={com.company_id} value={com.company_id}>
                            {com.company_name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  {/*----ERROR MESSAGE FOR COMPANY----*/}
                  {errors.company_id && (
                    <span
                      key={errors.company_id}
                      className="text-danger font-size-3"
                    >
                      {errors.company_id}
                    </span>
                  )}
                </div>
              ) : null}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_category_id"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Category:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="job_category_id"
                    value={state.job_category_id || ""}
                    onChange={onInputChange}
                    className={
                      errors.job_category_id
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Job category"
                    id="job_category_id"
                  >
                    <option value={""}>Select Category</option>
                    {(CategoryType || []).map((cat) =>
                      cat.category_name === null ? null : (
                        <option
                          key={cat.job_category_id}
                          value={cat.job_category_id}
                        >
                          {cat.category_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_category_id----*/}
                {errors.job_category_id && (
                  <span className="text-danger font-size-3">
                    {errors.job_category_id}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="industry_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Industry Type:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="industry_type"
                    value={state.industry_type || ""}
                    onChange={onInputChange}
                    className={
                      errors.industry_type
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="industry_type"
                  >
                    <option value={""}>Select industry</option>
                    {(FilterJson.industry || []).map((industry, i) => (
                      <option key={i} value={industry}>
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
                  htmlFor="experience_required"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Experience required:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="experience_required"
                    value={state.experience_required || ""}
                    onChange={onInputChange}
                    className={
                      errors.experience_required
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Experience"
                    id="experience_required"
                  >
                    <option value={""}>Select Experience</option>
                    {(FilterJson.experience || []).map((exp, i) => (
                      <option key={i} value={exp}>
                        {exp}
                        {exp === "Fresher" || exp === "Other" ? "" : "Years"}
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
                  Salary:<span className="text-danger"> *</span>
                </label>
                <select
                  maxLength={9}
                  name="salary"
                  value={state.salary || ""}
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
                  <option value={""}>Select salary</option>
                  {(FilterJson.salary || []).map((salary, i) => (
                    <option key={i} value={salary}>
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Location:<span className="text-danger"> *</span>
                </label>
                <select
                  maxLength={50}
                  name="location"
                  value={state.location || ""}
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
                  <option value={""}>Select location</option>
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
                  htmlFor="apply_link"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Apply Link:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="apply_link"
                    value={state.apply_link || ""}
                    onChange={onInputChange}
                    className={
                      errors.apply_link
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply link"
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
                  Job Description: <span className="text-danger">*</span>
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
                    {/* <CKEditor
                      type={"classic"}
                      name="job_description"
                      row={6}
                      id={"job_description"}
                      data={state.job_description}
                      value={state.job_description}
  ||""                    onChange={onInputChange}
                      initData="Job Description"
                    /> */}
                    <textarea
                      maxLength={500}
                      placeholder="Job Description"
                      name="job_description"
                      value={state.job_description || ""}
                      onChange={onInputChange}
                      className={
                        errors.job_description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="job_description"
                    ></textarea>
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
                  Your Duties: <span className="text-danger">*</span>
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
                    {/* <CKEditor
                      type={"classic"}
                      name="your_duties"
                      id={"your_duties"}
                      data={state.your_duties}
                      value={state.your_duties}
                   onChange={onInputChange}
                      initData="your duties"
                    /> */}
                    <textarea
                      maxLength={100}
                      placeholder="Your Duties"
                      name="your_duties"
                      value={state.your_duties || ""}
                      onChange={onInputChange}
                      className={
                        errors.your_duties
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="your_duties"
                    ></textarea>
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
                  Requirement: <span className="text-danger">*</span>
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
                    {/* <CKEditor
                      type={"classic"}
                      name="requirement"
                      id={"requirement"}
                      data={state.requirement}
                      value={state.requirement}
                      onChange={onInputChange}
                      initData="Add Requirement"
                    /> */}
                    <textarea
                      maxLength={30}
                      placeholder="Requirements"
                      name="requirement"
                      value={state.requirement || ""}
                      onChange={onInputChange}
                      className={
                        errors.requirement
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="requirement"
                    ></textarea>
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
                  Department:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="department"
                    value={state.department || ""}
                    onChange={onInputChange}
                    className={
                      errors.department
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Department"
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
                  Job Type:<span className="text-danger"> *</span>
                </label>
                <div className={" position-relative"}>
                  <select
                    placeholder="Apply job_type"
                    id="job_type"
                    name="job_type"
                    value={state.job_type || ""}
                    onChange={onInputChange}
                    className={
                      errors.job_type
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                  >
                    <option value={""}>Select job type</option>
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
              </div>
              {/* <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="role_category"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Role Category:<span className="text-danger"> *</span>
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
              {/* {errors.role_category && (
                    <span
                      key={errors.role_category}
                      className="text-danger font-size-3"
                    >
                      {errors.role_category}
                    </span>
                  )}
                </div>
              </div> */}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="education"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Education:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="education"
                    value={state.education || ""}
                    onChange={onInputChange}
                    className={
                      errors.education
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply education"
                    id="education"
                  >
                    <option value={""}>Select education</option>
                    {(FilterJson.education || []).map((education, i) => (
                      <option key={i} value={education}>
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
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="language"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Language:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="language"
                    value={state.language || ""}
                    onChange={onInputChange}
                    className={
                      errors.language
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Language"
                    id="language"
                  >
                    <option value={""}>Select Language</option>
                    {(FilterJson.Language || []).map((Language, i) => (
                      <option key={i} value={Language}>
                        {Language}
                      </option>
                    ))}
                  </select>
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
                  Key Skill:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={30}
                    name="keyskill"
                    value={state.keyskill || ""}
                    onChange={onInputChange}
                    className={
                      errors.keyskill
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Skill"
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="employement"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Employement:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="employement"
                    value={state.employement || ""}
                    onChange={onInputChange}
                    className={
                      errors.employement
                        ? " form-control border border-danger position-relative overflow-hidden"
                        : " form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply employement"
                    id="employement"
                  >
                    <option value={""}>Select employement</option>
                    {(FilterJson.employement || []).map((employement, i) => (
                      <option key={i} value={employement}>
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
              </div>
            </div>

            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </button>
              ) : (
                <button className="btn btn-primary btn-small w-25 rounded-5 text-uppercase">
                  Submit
                </button>
              )}
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default AddJobModal;
