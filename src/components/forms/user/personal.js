import moment from "moment/moment";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import { AddEmployeeDetails, EmployeeDetails } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PersonalDetails(props) {
  console.log(props.employeeid);
  let encoded;
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
    interested_in: "",
    experience: "",
    work_permit_canada: "",
    work_permit_other_country: "",
    resume: "",
  };
  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    props.close();
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
          ? "Mobile No. is required"
          : value.length < 10
          ? "Mobile no should be of 10 digits"
          : null,
    ],
    description: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Description is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character"
          : value.length < 5
          ? "Description should have 5 or more letter"
          : null,
    ],
    date_of_birth: [
      (value) => (value === "" || value === null ? "Dob is required" : ""),
    ],
    gender: [
      (value) => (value === "" || value === null ? "Gender is required" : null),
    ],
    marital_status: [
      (value) => (value === "" || value === null ? "Status is required" : null),
    ],
    nationality: [
      (value) =>
        value === "" || value === null
          ? "Nationality is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 3
          ? "Nationality should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Nationality can not have a number."
          : "",
    ],
    current_location: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Location is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 3
          ? "Location should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Location can not have a number."
          : "",
    ],
    currently_located_country: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Country is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 3
          ? "Country should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Country can not have a number."
          : "",
    ],
    language: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Language is required"
          : value.length < 3
          ? "Language should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Language can not have a number."
          : "",
    ],
    religion: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Religion is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 3
          ? "Religion should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Religion can not have a number."
          : "",
    ],
    interested_in: [
      (value) => (value === "" ? "Interested in is required" : null),
    ],
    experience: [
      (value) =>
        value === "" || value === null ? "Experience is required" : null,
    ],
    resume: [
      (value) => (value === "" || value === null ? "Resume is required" : null),
    ],
    work_permit_canada: [
      (value) =>
        value === "" || value === null ? "Work Permit is required" : null,
    ],
    work_permit_other_country: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Other Permit is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);
  // API CALL
  const UserData = async () => {
    const userData = await EmployeeDetails(props.employeeId);
    setState(userData.data.employee[0]);
  };
  useEffect(() => {
    if (props.employeeId === "0" || props.employeeId === undefined) {
      setState(initialFormStateuser);
    } else {
      UserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // USER PERSONAL DETAIL SUBMIT BUTTON
  async function onUserPersonalDetailClick(event) {
    console.log(state);
    event.preventDefault();
    if (validate()) {
      const responseData = await AddEmployeeDetails(state);
      if (responseData.message === "Employee data inserted successfully") {
        toast.success("Employee added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
      if (responseData.message === "Employee data updated successfully") {
        toast.success("Employee Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
    }
  }
  // END USER PERSONAL DETAIL VALIDATION
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
    encoded = await convertToBase64(e.target.files[0]);
    let base64Name = encoded.base64;
    setState({ ...state, resume: base64Name });
  };
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
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={onUserPersonalDetailClick}>
            {props.employeeId === "0" ? (
              <h5 className="text-center pt-2 mb-7"> Add Personal Details</h5>
            ) : (
              <h5 className="text-center pt-2 mb-7">
                {" "}
                Update Personal Details
              </h5>
            )}
            {/* FIRST LINE */}
            <div className="row pt-5">
              {" "}
              <input
                maxLength={20}
                name="employee_id"
                value={state.id}
                type="hidden"
                id="employee_id"
              />
              <div className="form-group col-md-4">
                <label
                  htmlFor="name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  name="name"
                  value={state.name}
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
                  <span key={errors.name} className="text-danger font-size-3">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id : <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={30}
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={onInputChange}
                  className={
                    errors.email
                      ? "form-control border border-danger"
                      : "form-control "
                  }
                  id="email"
                  placeholder="email"
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
                {errors.email && (
                  <span key={errors.email} className="text-danger font-size-3">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="contact_no"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number : <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  name="contact_no"
                  value={state.contact_no}
                  onChange={onInputChange}
                  className={
                    errors.contact_no
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="contact_no"
                />
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
            </div>
            {/* DECRIBE YOUSELF */}
            {/* <div className="row">
              <div className="form-group col-md-12">
                <label
                  htmlFor="description"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Description : <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="12"
                    className={
                      errors.description
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <CKEditor
                      initData={state.description}
                      // onInstanceReady={() => {
                      //   alert("Editor is ready!");
                      // }}
                    />
                    {/* <CKEditor
                      // data={emailText}
                      // initData={emailText}
                      type={"classic"}
                      name={"description"}
                      id={"description"}
                      editor={ClassicEditor}
                      onReady={editor=>}
                      data={contentEditor}
                      // onChange={DescriptionChange}
                      onChange={(event, editor) => {
                        console.log(event, "Description", editor);
                        const data = editor.getData();
                        setState({ ...state, description: data });
                      }}
                      initData="Describe Yourself"
                    /> */}
            {/* </div>  */}
            {/* {errors.description && (
                    <span
                      key={errors.description}
                      className="text-danger font-size-3"
                    >
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>
            </div> */}
            <div className="row">
              {" "}
              <div className="form-group col-md-12">
                <label
                  htmlFor="description"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  description : <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  value={state.description}
                  onChange={onInputChange}
                  className={
                    errors.description
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="description"
                ></textarea>
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
            </div>

            {/* SECOND LINE */}
            <div className="row">
              {" "}
              <div className="form-group col-md-4">
                <label
                  htmlFor="date_of_birth"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date Of Birth : <span className="text-danger">*</span>
                </label>
                <input
                  max={moment().format("YYYY-MM-DD")}
                  type="date"
                  placeholder="Date Of Birth "
                  name="date_of_birth"
                  value={state.date_of_birth}
                  onChange={onInputChange}
                  className={
                    errors.date_of_birth
                      ? "form-control border border-danger"
                      : "form-control"
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
              <div className="form-group col-md-4">
                <label
                  htmlFor="gender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Gender : <span className="text-danger">*</span>
                </label>
                <select
                  name="gender"
                  value={state.gender}
                  onChange={onInputChange}
                  className={
                    errors.gender
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="gender"
                >
                  <option value={""}>Select Gender</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </select>
                {/*----ERROR MESSAGE FOR GENDER----*/}
                {errors.gender && (
                  <span key={errors.gender} className="text-danger font-size-3">
                    {errors.gender}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="marital_status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Maritial status : <span className="text-danger">*</span>
                </label>{" "}
                <select
                  name="marital_status"
                  value={state.marital_status}
                  onChange={onInputChange}
                  className={
                    errors.marital_status
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="marital_status"
                >
                  <option value={""}>Select Status</option>
                  <option value={"single"}>Single</option>
                  <option value={"married"}>Married</option>
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
            </div>
            {/* THIRD LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="nationality"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  nationality / Citizenship :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  placeholder="nationality / Citizenship"
                  name="nationality"
                  value={state.nationality}
                  onChange={onInputChange}
                  className={
                    errors.nationality
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="nationality"
                />
                {/*----ERROR MESSAGE FOR nationality----*/}
                {errors.nationality && (
                  <span
                    key={errors.nationality}
                    className="text-danger font-size-3"
                  >
                    {errors.nationality}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="current_location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Location : <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  placeholder="Current Location"
                  name="current_location"
                  value={state.current_location}
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
              <div className="form-group col-md-4">
                <label
                  htmlFor="currently_located_country"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Currently Located Country :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.currently_located_country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Currently Located Country"
                  id="currently_located_country"
                  name="currently_located_country"
                  value={state.currently_located_country}
                  onChange={onInputChange}
                />
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
            </div>

            {/* FOURTH LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="language"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Languages Known (Max 3) :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  placeholder="Languages Known (Max 3)"
                  className={
                    errors.language
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="language"
                  name="language"
                  value={state.language}
                  onChange={onInputChange}
                />
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
              <div className="form-group col-md-4">
                <label
                  htmlFor="religion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  religion : <span className="text-danger">*</span>
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
                  value={state.religion}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR religion----*/}
                {errors.religion && (
                  <span
                    key={errors.religion}
                    className="text-danger font-size-3"
                  >
                    {errors.religion}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Interested ined In : <span className="text-danger">*</span>
                </label>
                <select
                  className={
                    errors.language
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="interested_in"
                  name="interested_in"
                  value={state.interested_in}
                  onChange={onInputChange}
                >
                  <option value={""}>Select</option>
                  <option value={"swap"}>Swap</option>
                  <option value={"parttime"}>Part-time</option>
                  <option value={"all"}>All</option>
                </select>
                {/*----ERROR MESSAGE FOR interested_in----*/}
                {errors.interested_in && (
                  <span
                    key={errors.interested_in}
                    className="text-danger font-size-3"
                  >
                    {errors.interested_in}
                  </span>
                )}
              </div>
            </div>
            {/* WORDK PERMIT LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="experience"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  experience : <span className="text-danger">*</span>
                </label>
                <select
                  name="experience"
                  value={state.experience}
                  onChange={onInputChange}
                  className={
                    errors.experience
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="experience"
                >
                  <option value={""}>Select experience</option>
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
              <div className="form-group col-md-4">
                <label
                  htmlFor="work_permit_canada"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit of Canada : <span className="text-danger">*</span>
                </label>
                <select
                  name="work_permit_canada"
                  value={state.work_permit_canada}
                  onChange={onInputChange}
                  className={
                    errors.work_permit_canada
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="work_permit_canada"
                >
                  <option value={""}>Select </option>
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
              <div className="form-group col-md-4">
                <label
                  htmlFor="otherpermit"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit of Other Country :{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.work_permit_other_country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Permit of Other Country"
                  id="work_permit_other_country"
                  name="work_permit_other_country"
                  value={state.work_permit_other_country}
                  onChange={onInputChange}
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
            </div>
            {/* RESUME UPLOAD */}
            <div className="row">
              <div className="form-group col-md-12">
                <label
                  htmlFor="resume"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Resume <span className="text-danger">*</span>:
                </label>
                <input
                  type="file"
                  placeholder="Resume"
                  id="resume"
                  name="resume"
                  accept=".pdf,application/pdf"
                  onChange={handleUploadFile}
                  className={
                    errors.resume
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR RESUME----*/}
                {errors.resume && (
                  <span key={errors.resume} className="text-danger font-size-3">
                    {errors.resume}
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

export default PersonalDetails;
