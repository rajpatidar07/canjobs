import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
import FilterJson from "./../../json/filterjson";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetJob, AddJob, getAllEmployer, GetFilter, GetLocationByType } from "../../../api/api";
import { useLocation } from "react-router-dom";
// import TextEditor from "../../common/TextEditor";
import SelectBox from "../../common/Common function/SelectBox";
import SignatureTextEditor from "../../SignatureTextEditor";
// import FroalaEditor from "react-froala-wysiwyg";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/js/plugins.pkgd.min.js";
// import Select from "react-select";
function AddJobModal(props) {
  const [company, setCompany] = useState([]);
  const [states, seStates] = useState([]);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  const company_id =
    props.jobdata === "0"
      ? ""
      : props.company_id
        ? props.company_id
        : localStorage.getItem("company_id");
  let location = useLocation();
  const user_type = localStorage.getItem("userType");
  let [Json, setJson] = useState([]);

  /*Function to get the jSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setJson([]);
      } else {
        setJson(Json.data.data);
      }
      setJson(Json.data.data);
    } catch (err) {
      console.log(err);
    }
    try {
      let StateRes = await GetLocationByType("state");
      seStates(StateRes.data)
    } catch (err) {
      console.log(err)
    };
  }


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
    is_featured: "",
    company_id: company_id ? company_id : "",
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
    // location: [
    //   (value) =>
    //     value === "" || value.trim() === "" ? "Location is required" : null,
    // ],
    apply_link: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Apply link is required"
          : !/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)|([^\s@]+@[^\s@]+\.[^\s@]+)/gi.test(
            value
          )
            ? "Write the correct link or email"
            : value.length < 3
              ? "Apply link should have 3 or more letters"
              : null,
    ],
    job_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Job Type is required" : null,
    ],
    role_category: [
      (value) =>
        value === ""
          ? "No of vacancies is required"
          : null,
    ],
    job_category_id: [
      (value) =>
        value === "" ? "Job category is required" : null,
    ],
    company_id: [(value) => (value === "" ? "Client is required" : null)],
    // salary: [
    //   (value) =>
    //     !/^\d*\.?\d*$/.test(value) ?  "Salary can not have a characters":"",
    // ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state = {}, setErrors, setState, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const JobData = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  /* Function to get Employer data*/
  const CompanyData = async () => {
    try {
      const userData = await getAllEmployer();
      if (userData.data.length === 0) {
        setCompany([]);
      } else {
        setCompany(userData.data);
        // if (Array.isArray(userData.data)) {
        //   const options = userData.data.map((option) => ({
        //     value: option.company_id,
        //     label: option.company_name,
        //   }));
        //   setCompany(options);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user_type === "admin" && props.admin === "admin") {
      CompanyData();
    }
    if (token) {
      JsonData();
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
    // eslint-disable-next-line
  }, [props]);
  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  // ADD JOBS SUBMIT BUTTON
  const onAddJobsClick = async (event) => {
    event.preventDefault();
    setState({
      ...state, employement: Company.find(
        (item) => item?.company_id === state?.company_id
      )?.franchise
    })
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddJob(state);
        if (responseData.message === "job data inserted successfully") {
          toast.success("Job Added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.job_page) {
            props.setDetailApiCall(true);
          }
          return close();
        }
        if (responseData.message === "Failed to insert job data") {
          toast.error("No Manger found", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.job_page) {
            props.setDetailApiCall(true);
          }
          return close();
        }

        if (responseData.message === "job data updated successfully") {
          toast.success("Job Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.job_page) {
            props.setDetailApiCall(true);
          }
          return close();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // END ADD JOBS VALIDATION
  /*Company type array to filter*/
  const Company = company.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.company_name === thing.company_name)
  );
  /*Function to set data to the search job by country */
  // const onSelectChange = (option) => {
  //   setState({ ...state, company_id: option.value });
  // };
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
        <div className="bg-white rounded h-100 px-md-11 px-6 pt-7 overflow-y-hidden">
          <form onSubmit={onAddJobsClick}>
            {props.jobdata === "0" || location.pathname === "/adminclient" ? (
              <h5 className="text-center pt-2 mb-7">Add Jobs</h5>
            ) : (
              <h5 className="text-center pt-2 mb-7">Update Jobs</h5>
            )}

            <div className="row ">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_title"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Title:<span className="text-danger"> *</span>
                </label>
                <input
                  maxLength={300}
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
              {user_type !== "admin" ||
                location.pathname === "/adminclient" ||
                location.pathname === "/dashboard" ? null : (
                <div className="form-group col-md-4 px-0 pr-3">
                  <label
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Client:<span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <div className={errors.company_id ? "border border-danger rounded" : ""}>
                      <SelectBox
                        Width={"yes"}
                        options={(Company || [])
                          .filter((com) => com.company_name !== null)
                          .map((com) => ({
                            value: com.company_id,
                            label: com.company_name,
                          }))}
                        type="company_id"
                        selectedValue={state.company_id || ""}
                        onChange={(e) => {
                          onInputChange({
                            target: {
                              name: "company_id",
                              value: e ? e.value : "",
                            },
                          });
                        }}
                      />
                    </div>

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

                  {/* <div
                   className={"form-group col-md-4 d-flex"}
                   style={{ position: "relative" }}
                 >
                   <label
                     htmlFor="reffer_by"
                     className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                   >
                     Company:<span className="text-danger"> *</span>
                   </label>
                   <Select
                     options={"" || company}
                     name="company_id"
                     id="company_id"
                     onChange={onSelectChange}
                     className={
                       errors.company_id
                         ? "form-control border border-danger px-0 pt-4 "
                         : "form-control px-0 pt-4 border-0"
                     }
                   /> */}
                </div>
              )}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="employement"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Operating Name:
                </label>
                <div className="position-relative">
                  <input
                    name="employement"
                    value={Company.find(
                      (item) => item?.company_id === state?.company_id
                    )?.franchise || ""}
                    onChange={onInputChange}
                    className={
                      errors.employement
                        ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                        : "text-capitalize form-control position-relative overflow-hidden"
                    }
                    disabled
                    placeholder="Operating Name"
                    id="employement"
                  />
                  {/* <option value={""}>Select Employment</option>
                    {(FilterJson.employement || []).map((employement, i) => (
                      <option key={i} value={employement}>
                        {employement}
                      </option>
                    ))}
                  </select> */}
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_category_id"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Category :<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <div className={errors.job_category_id ? "border border-danger rounded" : ""}>
                    <SelectBox
                      Width={"yes"}
                      options={(Json.Category || [])
                        .filter((cat) => cat.value !== null)
                        .map((cat) => ({
                          value: cat.id,
                          label: cat.value,
                        }))}
                      type="job_category_id"
                      selectedValue={parseInt(state.job_category_id) || ""}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "job_category_id",
                            value: e ? e.value : "",
                          },
                        });
                      }}
                    />
                  </div>

                </div>
                {/*----ERROR MESSAGE FOR job_category_id----*/}
                {errors.job_category_id && (
                  <span className="text-danger font-size-3">
                    {errors.job_category_id}
                  </span>
                )}
              </div>
              {/* <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="industry_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Industry Type:
                </label>
                <div className="position-relative">
                  <select
                    name="industry_type"
                    value={state.industry_type || ""}
                    onChange={onInputChange}
                    className={
                      errors.industry_type
                        ? "text-capitalize form-control border border-danger"
                        : "text-capitalize form-control"
                    }
                    id="industry_type"
                  >
                    <option value={""}>Select industry</option>
                    {(Json.Industry || []).map((industry) => (
                      <option key={industry.id} value={industry.value}>
                        {industry.value}
                      </option>
                    ))}
                  </select>
                  ----ERROR MESSAGE FOR industry_type----
                  {errors.industry_type && (
                    <span
                      key={errors.industry_type}
                      className="text-danger font-size-3"
                    >
                      {errors.industry_type}
                    </span>
                  )}
                </div>
              </div> */}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="experience_required"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Experience Required:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <div className={errors.experience_required ? "border border-danger rounded" : ""}>
                    <SelectBox
                      Width={"yes"}
                      options={(FilterJson.experience || []).map((exp, i) => ({
                        value: exp,
                        label: exp === "fresher" || exp === "Other" ? exp : `${exp} Years`,
                      }))}
                      type="experience_required"
                      selectedValue={state.experience_required || ""}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "experience_required",
                            value: e ? e.value : "",
                          },
                        });
                      }}
                    />
                  </div>

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
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="salary"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Per hour wage ($CAD):
                </label>
                <input
                  maxLength={10}
                  name="salary"
                  value={state.salary || ""}
                  onChange={onInputChange}
                  type="text"
                  min={0}
                  className={
                    errors.salary
                      ? "form-control text-capitalize border border-danger"
                      : "form-control text-capitalize"
                  }
                  placeholder="$"
                  id="salary"
                />
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
                  State:
                </label>
                <div className={errors.location ? "border border-danger rounded" : ""}>
                  <SelectBox
                    Width={"yes"}
                    options={(states || []).map((state) => ({
                      value: state.name,
                      id: state.id,
                      label: state.name,
                    }))}
                    type="location"
                    selectedValue={state.location || ""}
                    onChange={async (e) => {
                      onInputChange({
                        target: {
                          name: "location",
                          value: e ? e.value : "",
                        },
                      });

                      if (e && e.id) {
                        try {
                          const CityRes = await GetLocationByType("city", e.id);
                          setCity(CityRes.data);
                        } catch (error) {
                          console.error("Error fetching city:", error);
                        }
                      }
                    }}

                  />
                </div>

                {/* // *----ERROR MESSAGE FOR location---- */}
                {errors.location && (
                  <span
                    key={errors.location}
                    className="text-danger font-size-3"
                  >
                    {errors.location}
                  </span>
                )}
              </div>

              {state.location && (
                <div className="form-group col-md-4 px-0 pr-3">
                  <label
                    htmlFor="industry_type"
                    className="font-size-4 text-black-2  line-height-reset "
                  >
                    City:
                  </label>
                  <SelectBox
                    Width={"yes"}
                    options={(city || []).map((city) => ({
                      value: city.name,
                      id: city.id,
                      label: city.name,
                    }))}
                    type="industry_type"
                    selectedValue={state.industry_type || ""}
                    onChange={(e) => {
                      onInputChange({
                        target: {
                          name: "industry_type",
                          value: e ? e.value : "",
                        },
                      });
                    }}
                  />

                </div>
              )}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="apply_link"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Apply Link / Email:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={60}
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_description"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  style={{ top: "-12px" }}
                >
                  Job Description:
                </label>
                <div>
                  <div
                    sm="12"
                  // className={
                  //   errors.job_description
                  //     ? "border border-danger rounded overflow-hidden"
                  //     : "border rounded overflow-hidden"
                  // }
                  >
                    <SignatureTextEditor
                      name="job_description"
                      state={state.job_description || ""}
                      setState={setState}
                      placeholder="Enter description here"
                      id="job_description"
                    />
                    {/* <TextEditor
                      setState={setState}
                      state={state}
                      page={"jobDescription"}
                      identifier={"unique_identifier_1"}
                    //variable name at the place of page becoz it has 2 text area feilds
                    /> */}
                    {/* <FroalaEditor
                      model={state.job_description}
                      onModelChange={(newContent) =>
                        setState({ ...state, job_description: newContent })
                      }
                      className={
                        errors.job_description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                    /> */}
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="your_duties"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  style={{ top: "-12px" }}
                >
                  Full Address :
                </label>
                <div>
                  <div
                    sm="6"
                  // className={
                  //   errors.your_duties
                  //     ? "border border-danger rounded overflow-hidden"
                  //     : "border rounded overflow-hidden"
                  // }
                  >
                    <SignatureTextEditor
                      name="your_duties"
                      state={state.your_duties || ""}
                      setState={setState}
                      placeholder="Enter your duties here"
                      id="your_duties"
                    />
                    {/* <TextEditor
                      setState={setState}
                      state={state}
                      identifier={"unique_identifier_2"}
                      page={"yourDuties"}
                    //variable name at the place of page becoz it has 2 text area feilds
                    /> */}
                    {/* <FroalaEditor
                      model={state.your_duties}
                      onModelChange={(newContent) =>
                        setState({ ...state, your_duties: newContent })
                      }
                      className={
                        errors.your_duties
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                    /> */}
                  </div>
                  {/* //----ERROR MESSAGE FOR DESRIPTION----* */}
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
              <div className="form-group col-md-4 px-0 pr-3 d-none">
                <label
                  htmlFor="requirement"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  style={{ top: "-12px" }}
                >
                  Requirement:
                </label>
                <div>
                  <div
                    sm="6"
                  // className={
                  //   errors.requirement
                  //     ? "border border-danger rounded overflow-hidden"
                  //     : "border rounded overflow-hidden"
                  // }
                  >
                    <SignatureTextEditor
                      name="requirement"
                      state={state.requirement || ""}
                      setState={setState}
                      placeholder="Enter requirement here"
                      id="requirement"
                    />
                    {/* <TextEditor
                      setState={setState}
                      state={state}
                      identifier={"unique_identifier_3"}
                      page={"requirement"}
                    //variable name at the place of page becoz it has 2 text area feilds
                    /> */}
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

              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="role_category"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  No. Of Vacancies:<span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                  <input
                    type="number"
                    min={0}
                    name="role_category"
                    value={state.role_category || ""}
                    onChange={onInputChange}
                    className={
                      errors.role_category
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Vacancies"
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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="department"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  NOC Code:
                </label>
                <div className="position-relative">
                  <input
                    type="number"
                    maxLength={20}
                    name="department"
                    value={state.department || ""}
                    onChange={onInputChange}
                    className={
                      errors.department
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="NOC Code"
                    id="department"
                    min={0}
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
                  <div className={errors.job_type ? "border border-danger rounded" : ""}>
                    <SelectBox
                      Width={"yes"}
                      options={(FilterJson.job_type || []).map((job_type) => ({
                        value: job_type,
                        label: job_type,
                      }))}
                      type="job_type"
                      selectedValue={state.job_type || ""}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "job_type",
                            value: e ? e.value : "",
                          },
                        });
                      }}
                      placeholder="Select Job Type"
                    />
                  </div>

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
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="education"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Education:
                </label>
                <div className="position-relative">
                  <div className={errors.education ? "border border-danger rounded" : ""}>
                    <SelectBox
                      Width={"yes"}
                      options={(Json.Education || []).map((education) => ({
                        value: education.value,
                        label: education.value,
                      }))}
                      type="education"
                      selectedValue={state.education || ""}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "education",
                            value: e ? e.value : "",
                          },
                        });
                      }}
                      placeholder="Select Education"
                    />
                  </div>

                </div>
                {/*----ERROR MESSAGE FOR job_type----*/}
                {errors.Education && (
                  <span
                    key={errors.Education}
                    className="text-danger font-size-3"
                  >
                    {errors.Education}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="language"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Language:
                </label>
                <div className="position-relative">
                  <div className={errors.language ? "border border-danger rounded" : ""}>
                    <SelectBox
                      Width={"yes"}
                      options={(Json.Language || []).map((lang) => ({
                        value: lang.value,
                        label: lang.value,
                      }))}
                      type="language"
                      selectedValue={state.language || ""}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "language",
                            value: e ? e.value : "",
                          },
                        });
                      }}
                      placeholder="Select Language"
                    />
                  </div>

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
                  Key Skill:
                </label>
                <div className="position-relative">
                  <div className={errors.keyskill ? "border border-danger rounded" : ""}>
                    <SelectBox
                      Width={"yes"}
                      options={(Json.Skill || []).map((data) => ({
                        value: data.value,
                        label: data.value,
                      }))}
                      type="keyskill"
                      selectedValue={state.keyskill || ""}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "keyskill",
                            value: e ? e.value : "",
                          },
                        });
                      }}
                      placeholder="Select Skill"
                    />
                  </div>

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

              {user_type === "admin" ? (
                <div className="form-group col-md-4">
                  <label
                    htmlFor="fetured"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    Featured:
                    <input
                      type="checkbox"
                      id="fetured"
                      name="fetured"
                      checked={state.is_featured === "1"}
                      value={state.is_featured}
                      onChange={(e) =>
                        setState({
                          ...state,
                          is_featured:
                            state.is_featured === "" ||
                              state.is_featured === "0"
                              ? "1"
                              : "0",
                        })
                      }
                    />
                  </label>
                </div>
              ) : null}
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
        </div>
      </Modal>
    </>
  );
}

export default AddJobModal;
