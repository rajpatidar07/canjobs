import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
// import FroalaEditor from "react-froala-wysiwyg";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/js/plugins.pkgd.min.js";

import {
  AddEmployeeDetails,
  EmployeeDetails,
  GetAgentJson,
  getallAdminData,
  getApplicanTypeApi,
  // GetFilter,
  // AddEmployeePermission,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";
// import Select from "react-select";
// import AddAgent from "../admin/addAgent";
// import { Link } from "react-router-dom";
import AddNewAgent from "../admin/add_agent";
import Permissions from "../../json/emailPermisionJson";
import TextEditor from "../../common/TextEditor";
import SelectBox from "../../common/Common function/SelectBox";
// import ContactNoWithCountryCode from "../../common/ContactNoWithCountryCode";

function PersonalDetails(props) {
  let encoded;
  const [imgError, setImgError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [admiinList, setAdminList] = useState([]);
  const [applicantTypeList, setApplicantTypeList] = useState([]);
  let [apiCall, setApiCall] = useState(false);
  let [showAddEAgentModal, setShowAgentMOdal] = useState(false);
  // let [showAddEAdminModal, setShowAdminMOdal] = useState(false);
  /*data and id states */
  let [agentId /*, setAgentId*/] = useState();

  let user_type = localStorage.getItem("userType");
  let portal = localStorage.getItem("portal");
  let admin_id = user_type === "agent" ? localStorage.getItem("agent_id") : localStorage.getItem("admin_id");
  // USER PERSONAL DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    name: "",
    email: "",
    contact_no: "",
    description: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    nationality: "",
    current_location: "",
    currently_located_country: "",
    language: "",
    religion: "",
    interested_in_id: portal === "study" ? 13 : "",
    experience: "",
    work_permit_canada: "",
    work_permit_other_country: "",
    resume: "",
    profile_photo: "",
    is_featured: "",
    status: props.employeeId === "0" ? "1" : "",
    reffer_by: user_type === "agent" ? localStorage.getItem("agent_id") : "",
    permission: props.employeeId === "0" ? JSON.stringify(Permissions) : null,
    assigned_by: "",
    other_contact_no: "",

  };

  // VALIDATION CONDITIONS

  const validators = {
    name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
            ? "Cannot use special character "
            : value.length < 2
              ? "Name should have 2 or more letter"
              : /[-]?\d+(\.\d+)?/.test(value)
                ? "Name can not have a number."
                : "",
    ],
    email: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
            ? null
            : "Email is invalid",
    ],
    contact_no: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Mobile number is required"
          : value.length < 10
            ? "Mobile number should be more than 10 digits"
            : value.length > 13
              ? "Mobile no should be of 13 digits"
              : "",
    ],
    // description: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Description is required"
    //       : value.length < 5
    //       ? "Description should have 5 or more letter"
    //       : null,
    // ],
    // date_of_birth: [
    //   (value) => (value === "" || value === null ? "Dob is required" : ""),
    // ],
    // gender: [
    //   (value) => (value === "" || value === null ? "Gender is required" : null),
    // ],
    // marital_status: [
    //   (value) => (value === "" || value === null ? "Status is required" : null),
    // ],
    // nationality: [
    //   (value) =>
    //     value === "" || value === null
    //       ? "Nationality is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 3
    //       ? "Nationality should have 3 or more letter"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "Nationality can not have a number."
    //       : "",
    // ],
    // current_location: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Location is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //         ? "Cannot use special character "
    //         : value.length < 3
    //           ? "Location should have 3 or more letter"
    //           : /[-]?\d+(\.\d+)?/.test(value)
    //             ? "Location can not have a number."
    //             : "",
    // ],
    // currently_located_country: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Country is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 3
    //       ? "Country should have 3 or more letter"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "Country can not have a number."
    //       : "",
    // ],
    // language: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Language is required"
    //       : "",
    // ],
    // religion: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Religion is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 3
    //       ? "Religion should have 3 or more letter"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "Religion can not have a number."
    //       : "",
    // ],
    interested_in_id: user_type === "user"
      ? null
      : [(value) => (value === "" ? "Applicant Type is required" : null),
      ],
    // experience: [
    //   (value) =>
    //     value === "" || value === null ? "Experience is required" : null,
    // ],
    // resume: [
    //   // (value) => (value === "" || value === null ? "Resume is required" : null),
    // ],
    // work_permit_canada: [
    //   (value) =>
    //     value === "" || value === null ? "Work Permit is required" : null,
    // ],
    // work_permit_other_country: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Other Permit is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 2
    //       ? "Other permit sholud have 2 or more letters"
    //       : "",
    // ],
    reffer_by:
      props.employeeId !== "0" || user_type === "user"
        ? null
        : [
          (value) =>
            value === "" || value === null ? "Refferer is required" : null,
        ],
    // assigned_by: props.employeeId !== "0" || user_type === "user" || user_type === "agent"
    //   ? null
    //   : [
    //     (value) =>
    //       value === "" || value === null ? "Assigned To is required" : null,
    //   ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);
  // const handleEditorChange = (content, editor) => {
  //   setState({ ...state, description: content });
  // };

  // API CALL
  const UserData = async () => {
    try {
      const userData = await EmployeeDetails(props.employeeId);
      if (userData.data.employee.length === 0) {
        setState([]);
      } else {
        setState((prevState) => ({
          ...prevState,
          ...userData.data.employee[0],
          last_updated_by: user_type === "user" ? localStorage.getItem("employee_id") : admin_id,
          last_updated_by_type: user_type === "user" ? "employee" : user_type
        }));
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  /*Function to get admin json list */
  const AdminJson = async () => {
    try {
      let response = await getallAdminData();

      setAdminList(response.data)
    } catch (err) {
      console.log(err);
    }


  };
  /*Function to set data to the search agent  */
  // const onAdminSelectChange = (option) => {
  //   setState({ ...state, assigned_by: option.value });
  // };

  /*Function to get agent json list */
  const AgentJson = async () => {
    try {
      let response = await GetAgentJson();
      setAgentList(response);
    } catch (err) {
      console.log(err);
    }
    try {
      let response = await getApplicanTypeApi("");
      setApplicantTypeList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to set data to the search agent  */
  // const onSelectChange = (option) => {
  //   setState({ ...state, reffer_by: option.value });
  // };

  /*Render function to get the agent list */
  useEffect(() => {
    AgentJson();
    if (user_type === "admin") {
      AdminJson()
    }
    if (props.employeeId === "0" || props.employeeId === undefined) {
      setState(initialFormStateuser);
    } else {
      UserData();
    }
    setShowAgentMOdal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, apiCall]);

  // USER PERSONAL DETAIL SUBMIT BUTTON
  async function onUserPersonalDetailClick(event) {
    event.preventDefault();
    if (validate() && imgError === "") {
      setLoading(true);
      try {
        let data = {
          ...state,
          contact_no: state.contact_no.replace(/\s+/g, '') // condition set to remove white space from contact number
        }
        const responseData = await AddEmployeeDetails(data);
        if (responseData.message === "Employee data inserted successfully") {
          try {
            // let Response = await AddEmployeePermission(Permissions);
            // conditions for the response toaster message
            // if (Response.message === "successfully") {
            toast.success("Candidate added successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            props.setApiCall(true);
            return close();
            // }
          } catch (err) {
            console.log(err);
          }
        }
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Candidate Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Email already exists") {
          toast.error("Email already exists", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          // props.setApiCall(true);
          setLoading(false)
          setErrors({ ...errors, email: "Email already exists" })
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      toast.error("Please complete the profile first!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setLoading(false);
    }
  }

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /*Onchange function of Resume */
  const handleUploadFile = async (e) => {
    // const allowedFormats = ["image/jpeg", "image/png", "application/pdf"]; // List of allowed formats
    const allowedFormats = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const file = e.target.files[0];
    const fileType = `.${file.name.split(".").pop()}`
    if (allowedFormats.includes(fileType)) {
      encoded = await convertToBase64(file);
      let base64Name = encoded.base64;
      let finalBase = base64Name;
      setState({ ...state, resume: finalBase });
    } else {
      setErrors({
        ...errors,
        resume: [
          "Invalid file format. Please upload an image (JPEG, JPG or PNG) ,DOC ,DOCX or a PDF.",
        ],
      });
    }
  };

  /*Onchange function of profile */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (/*file.size > 1024 * 100*/ (file.size > 100) * 1024 === true) {
          setImgError("Image size can't be more then 100 kb");
        } else {
          setImgError("");
          setState({ ...state, profile_photo: event.target.result });
        }
      };
      img.src = event.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
    encoded = await convertToBase64(file);
    let base64Name = encoded.base64;
    setState({ ...state, profile_photo: base64Name });
  };

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    props.close();
  };
  const getHierarchy = (id) => {
    const selected = applicantTypeList.find(item => item.id === id);
    if (!selected) return { main: "", sub: "", subsub: "" };

    if (selected.level === "0") {
      return { main: selected.id, sub: "", subsub: "" };
    } else if (selected.level === "1") {
      return { main: selected.parent_id, sub: selected.id, subsub: "" };
    } else if (selected.level === "2") {
      const sub = applicantTypeList.find(item => item.id === selected.parent_id);
      return { main: sub?.parent_id || "", sub: sub?.id || "", subsub: selected.id };
    }

    return { main: "", sub: "", subsub: "" };
  };

  const { main, sub, subsub } = getHierarchy(state.interested_in_id);
  // Calculate min and max dates dynamically
  // const currentYear = moment().year();
  // const minDate = moment().subtract(10, 'years').format("YYYY-MM-DD");
  // const maxDate = moment().add(10, 'years').format("YYYY-MM-DD");
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {showAddEAgentModal ? (
          <div className="form-group col-md-12">
            <button
              className="btn btn-primary"
              onClick={() => setShowAgentMOdal(false)}
            >
              Cancel
            </button>
            <AddNewAgent
              agentId={agentId}
              apiCall={apiCall}
              setApiCall={setApiCall}
            />
          </div>
        ) : (
          <>
            <button
              type="button"
              className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
              data-dismiss="modal"
              onClick={close}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7">
              <form onSubmit={(e) => onUserPersonalDetailClick(e)}>
                {props.employeeId === "0" ? (
                  <h5 className="text-center pt-2 mb-7">
                    Add Candidate Details
                  </h5>
                ) : (
                  <h5 className="text-center pt-2 mb-7">
                    Update {props.pageNameForForm === "ApplicantType" ?
                      "Candidates Applicant Type" : props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned"
                        ? "Refer By" : props.user_of_page === "assignedUser"
                          ? "Assigned To" :
                          "Candidate Details"}
                  </h5>
                )}
                {/* FIRST LINE */}
                <div className={`form-group mx-auto text-center ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" ||
                  props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ?
                  "d-none" : ""}`}>
                  <div className="mb-4 position-relative">
                    <input
                      type={"file"}
                      id="profile_photo"
                      accept="image/png,image/jpeg,image/jpg,image/gif"
                      onChange={handleFileChange}
                      className="d-none"
                    />
                    <img
                      className="rounded-circle"
                      src={
                        state.profile_photo
                          ? state.profile_photo
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt=""
                      width={"100px"}
                      height={"100px"}
                    />
                    <label
                      className="mt-lg-20 mx-lg-35 bg-transparent edit_profile_icon"
                      htmlFor="profile_photo"
                    >
                      <span className="fas fa-pen text-white bg-gray p-1 rounded mx-lg-14 mt-lg-3 "></span>
                    </label>
                  </div>
                  <small className="text-danger">{imgError}</small>
                </div>
                <div className="row pt-5">
                  <input
                    maxLength={20}
                    name="employee_id"
                    value={state.id || ""}
                    type="hidden"
                    id="employee_id"
                  />
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="name"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Full Name:<span className="text-danger">*</span>
                    </label>
                    <input
                      maxLength={60}
                      name="name"
                      value={state.name || ""}
                      onChange={onInputChange}
                      type="text"
                      className={
                        errors.name
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Full Name"
                      id="name"
                    />
                    {/*----ERROR MESSAGE FOR name----*/}
                    {errors.name && (
                      <span
                        key={errors.name}
                        className="text-danger font-size-3"
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="email"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Email Id: <span className="text-danger">*</span>
                    </label>
                    <input
                      maxLength={60}
                      type="email"
                      name="email"
                      value={state.email || ""}
                      onChange={onInputChange}
                      className={
                        errors.email
                          ? "form-control border border-danger"
                          : "form-control "
                      }
                      id="email"
                      placeholder="email"
                      disabled={user_type === "user"}
                    />
                    {/*----ERROR MESSAGE FOR EMAIL----*/}
                    {errors.email && (
                      <span
                        key={errors.email}
                        className="text-danger font-size-3"
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="contact_no"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Mobile Number: <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      {/* <span
                        style={{
                          cursor: 'pointer',
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          backgroundColor: '#f1f1f1',
                          padding: '0.5rem',
                        }}
                        onClick={handleSpanClick} // Open/close the dropdown on click
                      >
                        {countryCode || 'Code'}
                      </span>
                      {showDropdown && (
                        <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: 0 }}>
                          {(FilterJson.location || []).map((item, index) => (
                            <li key={index}>
                              <Link
                                to=""
                                className="dropdown-item text-dark"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCountryChange(item.code);
                                }}
                              >
                                {item.country} ({item.code})
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}*/}
                      <input
                        type="tel"
                        min={0}
                        placeholder="Mobile Number"
                        name="contact_no"
                        value={state.contact_no || ""}
                        onChange={onInputChange}
                        className={
                          errors.contact_no
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        id="contact_no"
                        maxLength={13}
                        style={{ marginLeft: '5px', flex: 1 }} // Allow input to take available space
                      />
                    </div>
                    {/* <ContactNoWithCountryCode
                      id={"contact_no"}
                      name={"contact_no"}
                      value={state.contact_no}
                      feildError={errors.contact_no}
                      onInputChange={onInputChange} /> */}
                    {/*----ERROR MESSAGE FOR MOBILENO----*/}
                    {errors.contact_no && (
                      <span
                        key={errors.contact_no}
                        className="text-danger font-size-3"
                      >
                        {errors.contact_no}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="other_contact_no"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Alternate  Mobile Number:{/* <span className="text-danger">*</span>*/}
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Alternate Mobile Number"
                      name="other_contact_no"
                      value={state.other_contact_no || ""}
                      onChange={onInputChange}
                      className={
                        errors.other_contact_no
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="other_contact_no"
                      maxLength={13}
                    />
                    {/*----ERROR MESSAGE FOR MOBILENO----*/}
                    {errors.other_contact_no && (
                      <span
                        key={errors.other_contact_no}
                        className="text-danger font-size-3"
                      >
                        {errors.other_contact_no}
                      </span>
                    )}
                  </div>



                  {/* SECOND LINE */}
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="date_of_birth"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Date Of Birth:
                    </label>
                    <input
                      // max={moment().format("DD-MM-YYYY")}
                      min={moment().subtract(84, 'years').format("YYYY-MM-DD")}
                      max={moment().subtract(1, 'year').endOf('year').format("YYYY-MM-DD")}
                      type="date"
                      placeholder="Date Of Birth "
                      name="date_of_birth"
                      value={state.date_of_birth || ""}
                      onChange={onInputChange}
                      // onKeyDownCapture={(e) => e.preventDefault()}
                      className={
                        `form-control ${errors.date_of_birth
                          ? " border border-danger"
                          : ""}`
                      }
                      id="date_of_birth"
                    />
                    {/*----ERROR MESSAGE FOR DOB----*/}
                    {errors.date_of_birth && (
                      <span
                        key={errors.date_of_birth}
                        className="text-danger font-size-3"
                      >
                        {errors.date_of_birth}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="gender"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Gender:
                    </label>
                    <select
                      name="gender"
                      value={state.gender || ""}
                      onChange={onInputChange}
                      className={
                        errors.gender
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="gender"
                    >
                      <option value={""}>User Gender</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </select>
                    {/*----ERROR MESSAGE FOR GENDER----*/}
                    {errors.gender && (
                      <span
                        key={errors.gender}
                        className="text-danger font-size-3"
                      >
                        {errors.gender}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-12 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="description"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      style={{ top: "-12px" }}
                    >
                      About:
                    </label>
                    <TextEditor
                      state={state}
                      setState={setState}
                      page={"description"}
                    />
                    {/* <textarea
                      name="description"
                      value={state.description || ""}
                      onChange={onInputChange}
                      className={
                        errors.description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="description"
                      placeholder="Description"
                    ></textarea> */}
                    {/* <FroalaEditor
                      model={state.description}
                      onModelChange={(newContent) =>
                        setState({ ...state, description: newContent })
                      }
                      className={
                        errors.description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                    /> */}
                    {/*----ERROR MESSAGE FOR GENDER----*/}
                    {errors.description && (
                      <span
                        key={errors.description}
                        className="text-danger font-size-3"
                      >
                        {errors.description}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="marital_status"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Marital Status:
                    </label>
                    <select
                      name="marital_status"
                      value={state.marital_status || ""}
                      onChange={onInputChange}
                      className={
                        errors.marital_status
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="marital_status"
                    >
                      <option value={""}>Marital Status</option>
                      <option value={"single"}>Single</option>
                      <option value={"widow"}>Widow</option>
                      <option value={"married"}>Married</option>
                      <option value={"separated"}>Separated</option>
                      <option value={"divorced"}>Divorced</option>
                      <option value={"common law"}>Common Law</option>
                    </select>
                    {/*----ERROR MESSAGE FOR MARITAL STATUS----*/}
                    {errors.marital_status && (
                      <span
                        key={errors.marital_status}
                        className="text-danger font-size-3"
                      >
                        {errors.marital_status}
                      </span>
                    )}
                  </div>
                  {/* THIRD LINE */}
                  {/* <div className="form-group col-md-4">
                    <label
                      htmlFor="nationality"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Nationality / Citizenship:
                      
                    </label>
                    <input
                      maxLength={60}
                      type="text"
                      placeholder="nationality / Citizenship"
                      name="nationality"
                      value={state.nationality || ""}
                      onChange={onInputChange}
                      className={
                        errors.nationality
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="nationality"
                    />
                    // ----ERROR MESSAGE FOR nationality----
                    {errors.nationality && (
                      <span
                        key={errors.nationality}
                        className="text-danger font-size-3"
                      >
                        {errors.nationality}
                      </span>
                    )}
                  </div> */}
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="current_location"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Current Location:
                    </label>
                    <input
                      maxLength={60}
                      type="text"
                      placeholder="Current Location"
                      name="current_location"
                      value={state.current_location || ""}
                      onChange={onInputChange}
                      className={
                        errors.current_location
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="current_location"
                    />
                    {/*----ERROR MESSAGE FOR LOCATION----*/}
                    {errors.current_location && (
                      <span
                        key={errors.current_location}
                        className="text-danger font-size-3"
                      >
                        {errors.current_location}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="currently_located_country"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Country Of Residence:
                    </label>
                    <div className={errors.currently_located_country ? "border border-danger rounded" : ""}>
                      <SelectBox
                        Width={"yes"}
                        options={(FilterJson.location || []).map((item) => ({
                          value: item.country,
                          label: item.country,
                        }))}
                        type="currently_located_country"
                        selectedValue={state.currently_located_country || ""}
                        onChange={(e) => {
                          onInputChange({
                            target: {
                              name: "currently_located_country",
                              value: e ? e.value : "",
                            },
                          });
                        }}
                        placeholder="Select Country"
                      />
                    </div>
                    {/*----ERROR MESSAGE FOR COUNTRY----*/}
                    {errors.currently_located_country && (
                      <span
                        key={errors.currently_located_country}
                        className="text-danger font-size-3"
                      >
                        {errors.currently_located_country}
                      </span>
                    )}
                  </div>
                  {/* FOURTH LINE */}
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="language"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      English level {/*(Max 3)*/}:
                    </label>
                    <select
                      name="language"
                      value={state.language || ""}
                      onChange={onInputChange}
                      className={
                        errors.language
                          ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                          : "text-capitalize form-control position-relative overflow-hidden"
                      }
                      placeholder="Language"
                      id="language"
                    >
                      <option value={""}>Level</option>
                      <option value={"no english"}> No English</option>
                      <option value={"basic"}>Basic</option>
                      <option value={"medium"}>Medium</option>
                      <option value={"advance"}>Advance</option>
                      {/* {(jsonList.Language || []).map((Lang) => (
                        <option key={Lang.id} value={Lang.value}>
                          {Lang.value}
                        </option>
                      ))} */}
                    </select>
                    {/*----ERROR MESSAGE FOR LANGUAGE----*/}
                    {errors.language && (
                      <span
                        key={errors.language}
                        className="text-danger font-size-3"
                      >
                        {errors.language}
                      </span>
                    )}
                  </div>
                  {/* <div className="form-group col-md-4">
                <label
                  htmlFor="religion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Religion: 
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.religion
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="religion"
                  id="religion"
                  name="religion"
                  value={state.religion || ""}
                  onChange={onInputChange}
                />
                {errors.religion && (
                  <span
                    key={errors.religion}
                    className="text-danger font-size-3"
                  >
                    {errors.religion}
                  </span>
                )}
              </div> */}
                  {/* <div className={`form-group  ${props.user_of_page === "assignedUser" ||
                    props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" || props.pageNameForForm === "Category" || portal === "study"
                    ? "d-none"
                    : `${props.pageNameForForm === "ApplicantType" ?
                      "col-md-12" : "col-md-4"}
                        `}`
                  }>
                    <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                      Applicant's Type : <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`${errors.interested_in_id
                        ? "form-control  border border-danger "
                        : "form-control "}
                            ${state.interested_in_id === "pgwp" || state.interested_in_id === "wes" ||
                          state.interested_in_id === "atip" ?
                          `text-uppercase` :
                          "text-capitalize"}`
                      }
                      // id="interested_in_id"
                      name="interested_in_id"
                      value={applicantTypeList.filter((item) => item.id == state.interested_in_id).level == 1 ? applicantTypeList.filter((item) => item.id == state.interested_in_id).parent_id : state.interested_in_id || ""}
                      onChange={onInputChange}
                    >
                      <option value={""}>Select</option>
                      {(applicantTypeList.filter((item) => item.level === "0") || []).map((interest, index) => {
                        // const parent = applicantTypeList.find((item) => item.id === interest.parent_id);

                        return (
                          <option key={index} value={interest.id} className={
                            [
                              "test typw",
                              "All Checklists",
                              "Checklists",
                              "Invitation letters/Declarations",
                              "Daily hours log",
                              "Training Modules",
                              "Admission/student/college"
                            ].some(item => interest.title.includes(item))
                              ? "d-none"
                              : ""
                          }
                          >
                            {interest?.title}
                            {/* {interest.level !== "0" ? (
                              <small>( {parent?.title} sub type)</small>
                            ) : null} 
                          </option>
                        );
                      })}

                    </select>
                    {errors.interested_in_id && (
                      <span
                        key={errors.interested_in_id}
                        className="text-danger font-size-3"
                      >
                        {errors.interested_in_id}
                      </span>
                    )}
                  </div>
                  {applicantTypeList?.filter((item) => item.parent_id == state.interested_in_id).length > 0 &&
                    state.interested_in_id &&
                    <div className={`form-group ${props.user_of_page === "assignedUser" ||
                      props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned"
                      || props.pageNameForForm === "ApplicantType"
                      ? "d-none"
                      : `${props.pageNameForForm === "Category" ?
                        "col-md-12" : "col-md-4"}`}
    `}>
                      <label
                        // htmlFor="category_id"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Sub Type:
                      </label>
                      <select
                        name="interested_in_id"
                        value={state.interested_in_id || ""}
                        onChange={onInputChange}
                        className={`form-control 
                            ${errors.interested_in_id
                            ? " border border-danger"
                            : ""} ${state.interested_in_id === "aos" || state.interested_in_id === "rrs" ? "text-uppercase" : "text-capitalize"}`
                        }
                      // id="interested_in_id"
                      >
                        <option value={""}>Select Sub Type</option>
                        {(applicantTypeList.filter((item) => item.parent_id === state.interested_in_id) || []).map((subType, index) => (
                          <option key={index} value={subType.id} >
                            {subType?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  }
                   {(applicantTypeList.filter((item) => item.parent_id == state.interested_in_id).length > 0 &&
                    applicantTypeList?.find((item) => item.parent_id == state.interested_in_id).level == 1) && (
                      <div className={`form-group ${props.user_of_page === "assignedUser" ||
                        props.user_of_page === "agentAssigned" ||
                        props.pageNameForForm === "agentAssigned" ||
                        props.pageNameForForm === "ApplicantType"
                        ? "d-none"
                        : `${props.pageNameForForm === "Category" ? "col-md-12" : "col-md-4"}`}`}>
                        <label
                          // htmlFor="sub_category_id"
                          className="font-size-4 text-black-2 font-weight-semibold text-capitalize line-height-reset"
                        >
                          {applicantTypeList?.find((item) => item.id === state.interested_in_id)?.title} Sub Type:
                        </label>
                        <select
                          name="interested_in_id"
                          value={applicantTypeList.filter((item) => item.id == state.interested_in_id).level == 1 ? applicantTypeList.filter((item) => item.id == state.interested_in_id).parent_id : state.interested_in_id || ""}
                          onChange={onInputChange}
                          className={`form-control text-capitalize ${errors.sub_category_id ? "border border-danger" : ""}`}
                        // id="sub_category_id"
                        >
                          <option value={""}>Select Sub Type</option>
                          {(applicantTypeList.filter((item) => item.parent_id === state.category_id) || []).map((subType, index) => (
                            <option key={index} value={subType.id} >
                              {subType?.title}
                            </option>
                          ))}
                        </select>

                      </div>
                    )} */}
                  {/* MAIN TYPE */}
                  <div className={user_type === "user" || props.user_of_page === "assignedUser" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" || props.pageNameForForm === "Category" ? "d-none" : "form-group col-md-4"}>
                    <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                      Applicant's Type: <span className="text-danger">*</span>
                    </label>
                    <div className={errors.interested_in_id ? "border border-danger rounded" : ""}>
                      <SelectBox
                        Width={"yes"}
                        options={applicantTypeList
                          .filter(item => item.level === "0" && ![
                            "test typw",
                            "All Checklists",
                            "Checklists",
                            "Invitation letters/Declarations",
                            "Daily hours log",
                            "Training Modules",
                            "Admission/student/college"
                          ].some(it => item.title.includes(it)))
                          .map(item => ({
                            value: item.id,
                            label: item.title,
                          }))
                        }
                        type="interested_in_id"
                        selectedValue={main}
                        onChange={(e) =>
                          onInputChange({
                            target: {
                              name: "interested_in_id",
                              value: e ? e.value : "",
                            },
                          })
                        }
                        placeholder="Select Main Type"
                      />
                    </div>
                    {errors.interested_in_id && (
                      <span className="text-danger font-size-3">
                        {errors.interested_in_id}
                      </span>
                    )}
                  </div>
                  {/* SUB TYPE */}
                  {main && applicantTypeList.some(item => item.level === "1" && item.parent_id === main) && (
                    <div className="form-group col-md-4">
                      <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                        Sub Type:
                      </label>
                      <div className={errors.interested_in_id ? "border border-danger rounded" : ""}>
                        <SelectBox
                          Width={"yes"}
                          options={(applicantTypeList || [])
                            .filter(item => item.level === "1" && item.parent_id === main)
                            .map(item => ({
                              value: item.id,
                              label: item.title,
                            }))
                          }
                          type="interested_in_id"
                          selectedValue={sub}
                          onChange={(e) => {
                            onInputChange({
                              target: {
                                name: "interested_in_id",
                                value: e ? e.value : "",
                              },
                            });
                          }}
                          placeholder="Select Sub Type"
                        />
                      </div>
                    </div>
                  )}
                  {/* SUB SUB TYPE */}
                  {sub && applicantTypeList.some(item => item.level === "2" && item.parent_id === sub) && (
                    <div className="form-group col-md-4">
                      <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                        Sub Sub Type:
                      </label>
                      <div className={errors.interested_in_id ? "border border-danger rounded" : ""}>
                        <SelectBox
                          Width={"yes"}
                          options={(applicantTypeList || [])
                            .filter(item => item.level === "2" && item.parent_id === sub)
                            .map(item => ({
                              value: item.id,
                              label: item.title,
                            }))
                          }
                          type="interested_in_id"
                          selectedValue={subsub}
                          onChange={(e) =>
                            onInputChange({
                              target: {
                                name: "interested_in_id",
                                value: e ? e.value : "",
                              },
                            })
                          }
                          placeholder="Select Sub Sub Type"
                        />
                      </div>
                    </div>)}
                  <div className={`form-group col-md-4
                  ${props.user_of_page === "assignedUser" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned"
                      || props.pageNameForForm === "ApplicantType" || props.pageNameForForm === "Category" ? "d-none" : ""}`}>
                    <label
                      htmlFor="experience"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Experience:
                    </label>
                    <SelectBox
                      Width={"yes"}
                      options={(FilterJson.experience || []).map((ex) => ({
                        value: ex,
                        label: `${ex}${ex.toLowerCase() === "fresher" || ex.toLowerCase() === "other" ? "" : " Years"}`
                      }))}
                      type="experience"
                      selectedValue={state.experience || ""}
                      onChange={(e) =>
                        onInputChange({
                          target: {
                            name: "experience",
                            value: e ? e.value : "",
                          },
                        })
                      }
                    />
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
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser" || props.pageNameForForm === "Category" || props.pageNameForForm === "ApplicantType" || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="work_permit_canada"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      If Candidate is Inside Canada
                    </label>
                    <select
                      name="work_permit_canada"
                      value={state.work_permit_canada || ""}
                      onChange={onInputChange}
                      className={
                        errors.work_permit_canada
                          ? "form-control  border border-danger"
                          : "form-control"
                      }
                      id="work_permit_canada"
                    >
                      <option value={""}>Permit </option>
                      <option value={"no"}>No</option>
                      <option value={"yes"}>Yes</option>
                    </select>
                    {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
                    {errors.work_permit_canada && (
                      <span
                        key={errors.work_permit_canada}
                        className="text-danger font-size-3"
                      >
                        {errors.work_permit_canada}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${state.work_permit_canada === "yes" &&
                      props.user_of_page === ""
                      ? "form-group col-md-4"
                      : "d-none"
                      }`}
                  >
                    <label
                      htmlFor="otherpermit"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Candidate Status:
                    </label>
                    <SelectBox
                      Width={"yes"}
                      options={(FilterJson.canadian_candidate_work_status || []).map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      type="work_permit_other_country"
                      selectedValue={state.work_permit_other_country || ""}
                      onChange={(e) =>
                        onInputChange({
                          target: {
                            name: "work_permit_other_country",
                            value: e ? e.value : "",
                          },
                        })
                      }
                    />
                    {/*----ERROR MESSAGE FOR OTHER COUNTRY PERMIT----*/}
                    {errors.work_permit_other_country && (
                      <span
                        key={errors.work_permit_other_country}
                        className="text-danger font-size-3"
                      >
                        {errors.work_permit_other_country}
                      </span>
                    )}
                  </div>
                  <div className={`w-100 ${props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? " col-md-12" : " col-md-4 "}`}>
                    <div
                      className={
                        `form-group  ${user_type === "user" ||
                          props.pageNameForForm === "Category"
                          || props.pageNameForForm === "ApplicantType"
                          || props.user_of_page === "assignedUser"
                          ? " d-none"
                          : ` d-flex`}
                    `}
                      style={{ position: "relative" }}
                    >
                      <label
                        htmlFor="reffer_by"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Referred By<span className="text-danger">*</span>:
                      </label>
                      {/* <Select
                      options={agentList || []} 
                      name="reffer_by"
                      defaultValue={agentList && agentList.find(item => item.value === state.reffer_by) ? agentList.find(item => item.value === state.reffer_by).label : ""}
                      id="reffer_by"
                      onChange={onSelectChange}
                      className={errors.reffer_by ? "form-control border border-danger px-0 pt-4" : "form-control px-0 pt-4 border-0"}
                    /> */}
                      <div className={errors.reffer_by ? "border border-danger rounded" : ""}>
                        <SelectBox
                          Width={"yes"}
                          options={agentList.map((item) => ({
                            value: item.id,
                            label: item.u_id,
                          }))}
                          type="reffer_by"
                          selectedValue={state.reffer_by || ""}
                          onChange={(e) =>
                            onInputChange({
                              target: {
                                name: "reffer_by",
                                value: e ? e.value : "",
                              },
                            })
                          }
                          isDisabled={user_type === "agent"}
                          placeholder="Select Partner"
                        />
                      </div>
                      <span
                        className={user_type === "agent" ? "d-none" : "btn btn-sm btn-secondary"}
                        onClick={() => setShowAgentMOdal(true)}
                        style={{
                          width: "auto",
                          minWidth: "auto",
                          height: "44px",
                        }}
                        title="Add New Partner"
                      >
                        +
                      </span>
                    </div>
                    {/* ERROR MSG FOR REFFER BY */}
                    {errors.reffer_by && (
                      <span
                        key={errors.reffer_by}
                        className="text-danger font-size-3 mb-3"
                      >
                        {errors.reffer_by}
                      </span>
                    )}
                  </div>
                  <div
                    className={`form-group
                    ${user_type === "agent"
                        || props.pageNameForForm === "Category"
                        || user_type === "user"
                        || props.pageNameForForm === "ApplicantType"
                        || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned"
                        ? "d-none"
                        : props.user_of_page === "assignedUser" ?
                          "d-flex col-md-12" :
                          "d-flex col-md-4"}`
                    }
                    style={{ position: "relative" }}
                  >
                    <label
                      htmlFor="assigned_by"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Assigned To:
                    </label>
                    {/* <Select
                      options={"" || admiinList}
                      name="assigned_by"
                      value={state.assigned_by}
                      id="assigned_by"
                      onChange={onAdminSelectChange}
                      className={
                        errors.assigned_by
                          ? "form-control border border-danger px-0 pt-4 "
                          : "form-control px-0 pt-4 border-0"
                      }
                    /> */}
                    <SelectBox
                      Width={"yes"}
                      options={(admiinList || []).map((item) => ({
                        value: item.admin_id,
                        label: item.name,
                      }))}
                      type="assigned_by"
                      selectedValue={state.assigned_by || ""}
                      onChange={(e) =>
                        onInputChange({
                          target: {
                            name: "assigned_by",
                            value: e ? e.value : "",
                          },
                        })
                      }
                      placeholder="Select Admin"
                      className={
                        errors.assigned_by
                          ? "border border-danger text-capitalize"
                          : "text-capitalize"
                      }
                    />
                    {/* <span
                      className="btn btn-sm btn-secondary"
                      onClick={() => setShowAdminMOdal(true)}
                      style={{
                        width: "auto",
                        minWidth: "auto",
                        height: "44px",
                      }}
                      title="Add New Admin"
                    >
                      +
                    </span>  */}
                    {/* ERROR MSG FOR REFFER BY  */}
                    {errors.assigned_by && (
                      <span
                        key={errors.assigned_by}
                        className="text-danger font-size-3"
                      >
                        {errors.assigned_by}
                      </span>
                    )}
                  </div>
                  <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser"
                    || props.pageNameForForm === "ApplicantType" ||
                    props.pageNameForForm === "Category" ||
                    props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                    <label
                      htmlFor="resume"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Resume: {/*<span className="text-danger">*</span>*/}
                    </label>
                    <input
                      type="file"
                      placeholder="Resume"
                      id="resume"
                      name="resume"
                      // accept=".pdf,application/pdf"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleUploadFile}
                      className={
                        errors.resume
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                    />
                    {/*----ERROR MESSAGE FOR RESUME----*/}
                    {errors.resume && (
                      <span
                        key={errors.resume}
                        className="text-danger font-size-3"
                      >
                        {errors.resume}
                      </span>
                    )}
                  </div>
                  {user_type === "admin" ? (
                    <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser"
                      || props.pageNameForForm === "ApplicantType"
                      || props.pageNameForForm === "Category"
                      || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                      <label
                        htmlFor="fetured"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
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
                        /> <span className="pb-2">Featured</span>
                      </label>
                    </div>
                  ) : null}
                  {user_type === "admin" ? (
                    <div className={`form-group col-md-4 ${props.user_of_page === "assignedUser"
                      || props.pageNameForForm === "ApplicantType"
                      || props.pageNameForForm === "Category"
                      || props.user_of_page === "agentAssigned" || props.pageNameForForm === "agentAssigned" ? "d-none" : ""}`}>
                      <label
                        htmlFor="addlocal"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        <input
                          type="checkbox"
                          id="addlocal"
                          name="local"
                          checked={state.is_local === "1"}
                          value={state.is_local}
                          onChange={(e) =>
                            setState({
                              ...state,
                              is_local:
                                state.is_local === "" ||
                                  state.is_local === "0"
                                  ? "1"
                                  : "0",
                            })
                          }
                        /> <span className="pb-2">Local</span>
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
                    <button
                      className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              {/* </div> */}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
export default PersonalDetails;
