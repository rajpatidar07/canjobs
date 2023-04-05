import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { Link } from "react-router-dom";
import {
  EmployeeEducationDetails,
  AddEmployeeEducation,
  DeleteEmployeeEducation,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../../common/sweetAlert";
import moment from "moment";
import FilterJson from "../../json/filterjson";

function Education(props) {
  let [educationData, setEducationData] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*----USER Education VALIDATION----*/
  const initialFormState = {
    qualification: "",
    university_institute: "",
    course: "",
    specialization: "",
    institute_location: "",
    passing_year: "",
  };
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    qualification: [
      (value) =>
        value === null || value.trim() === ""
          ? "Qualification is required"
          : null,
    ],
    university_institute: [
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
    institute_location: [
      (value) =>
        value === null || value.trim() === ""
          ? "institute_location is required"
          : null,
    ],
    passing_year: [
      (value) =>
        value === "" || value === null ? "Passing Year is required" : null,
    ],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const EducationData = async (data) => {
    let EducationDetails = await EmployeeEducationDetails(
      props.employeeEducationData
    ); /*"No Employee found"*/
    setEducationData(EducationDetails.data);
    if (data !== undefined || data) {
      setState(data);
    }
  };
  useEffect(() => {
    if (props.employeeEducationData === undefined || educationData === []) {
      setState(initialFormState);
    } else {
      EducationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, deleteAlert]);

  /*----LOGIN SUBMIT FUNCTION----*/
  const onEducationSubmitClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      let responseData = await AddEmployeeEducation(
        state,
        props.employeeEducationData
      );
      if (responseData.message === "Employee data updated successfully") {
        toast.success("Education Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
      if (responseData.message === "Employee data inserted successfully") {
        toast.success("Education Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      } //"
      // handle form submission
    }
  };
  // END USER Education VALIDATION

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.education_id);
    setDeleteName(e.course);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete Skill */
  async function deleteEducation(e) {
    console.log(e);
    const responseData = await DeleteEmployeeEducation(e);
    if (responseData.message === "Education details has been deleted") {
      toast.error("Education deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
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
                  {(FilterJson.qualification || []).map((data, i) => {
                    return (
                      <option value={data} key={i}>
                        {data}
                      </option>
                    );
                  })}
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
                  htmlFor="university_institute"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  University/Institute <span className="text-danger">*</span> :
                </label>
                <input
                  maxLength={40}
                  type="text"
                  placeholder="University/Institute "
                  className={
                    errors.university_institute
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  name="university_institute"
                  id="university_institute"
                  value={state.university_institute}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR UNIVERSITY----*/}
                {errors.university_institute && (
                  <span
                    key={errors.university_institute}
                    className="text-danger font-size-3"
                  >
                    {errors.university_institute}
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
                  {(FilterJson.course || []).map((course) => (
                    <option value={course} key={course}>
                      {course}
                    </option>
                  ))}
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
                  {(FilterJson.Specialization || []).map((Specialization) => (
                    <option value={Specialization} key={Specialization}>
                      {Specialization}
                    </option>
                  ))}
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
                  htmlFor="institute_location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Institute institute_location{" "}
                  <span className="text-danger">*</span> :
                </label>
                <div className="position-relative">
                  <select
                    className={
                      errors.institute_location
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    name="institute_location"
                    id="institute_location"
                    value={state.institute_location}
                    onChange={onInputChange}
                  >
                    <option value={""}>select institute location</option>
                    {(FilterJson.location || []).map((data, i) => {
                      return (
                        <option value={data} key={i}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                  {/*----ERROR MESSAGE FOR institute_location----*/}
                  {errors.institute_location && (
                    <span
                      key={errors.institute_location}
                      className="text-danger font-size-3"
                    >
                      {errors.institute_location}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="passing_year"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Passing Year <span className="text-danger">*</span> :
                </label>
                <input
                  type="number"
                  className={
                    errors.passing_year
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Passing Year"
                  id="passing_year"
                  name="passing_year"
                  value={moment(state.passing_year).format("YYYY")}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR PASSING YEAR----*/}
                {errors.passing_year && (
                  <span
                    key={errors.passing_year}
                    className="text-danger font-size-3"
                  >
                    {errors.passing_year}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {(educationData || []).map((education) => (
                  <li
                    className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    key={education.education_id}
                  >
                    {education.course}
                    <Link onClick={() => EducationData(education)}>
                      <i className="px-3 fa fa-edit" aria-hidden="true"></i>
                    </Link>
                    <Link onClick={() => ShowDeleteAlert(education)}>
                      <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </Link>
                  </li>
                ))}
              </ul>
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
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteEducation(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
        </div>
      </Modal>
    </>
  );
}

export default Education;
