import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddLimia } from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";

function LmiaStatus(props) {
  // console.log(props);
  let employeeId =
    props.resData === undefined ? null : props.resData.employee_id;
  let jobId = props.job_id;
  const [company] = useState([]);
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
  // USER ADMIN PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    lmia_status: "",
    completion_time: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    lmia_status: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Lmia status is required"
          : "",
    ],
    completion_time: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Expected time of completion is required"
          : "",
    ],
    // posted: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "posted is required"
    //       : "",
    // ],
    // posted_company_id: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Company is required"
    //       : null,
    // ],
    // date_of_posting: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Date of posting is required"
    //       : null,
    // ],
    // designation: [
    //   (value) =>
    //     value < 2 ? "designation should have 2 or more letters." : "null",
    // ],
  };
  /* Function to get Company data*/
  // const CompnayData = async () => {
  //   const userData = await getAllEmployer();
  //   setCompany(userData.data);
  // };
  /* Function to get Employee data*/
  // const UserData = async () => {
  //   const userData = await EmployeeDetails(props.employeeId);
  //   setState(userData.data.employee[0]);
  // };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  useEffect(() => {
    // CompnayData();
    // if (props.employeeId === undefined || props.employeeId === "0") {
    //   setState(initialFormState);
    // } else {
    //   UserData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAminProfileUpdateClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      const responseData = await AddLimia(state, employeeId, jobId);
      if (responseData.message === "Data added successfully") {
        toast.success("Lmia Status Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
      //   if (responseData.message === "admin updated successfully") {
      //     toast.success("Admin Updated successfully", {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 1000,
      //     });
      //     return close();
      //   }
    }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
  return (
    <>
      <Modal
        show={props.show}
        size="md"
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
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <h5 className="text-center pt-2">LMIA staus</h5>
          <form onSubmit={onAminProfileUpdateClick}>
            <div className="form-group mt-5">
              <label
                htmlFor="lmia_status"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Lmia status :
              </label>
              <select
                type={"text"}
                className={
                  errors.lmia_status
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.lmia_status}
                onChange={onInputChange}
                id="lmia_status"
                name="lmia_status"
                multiple={false}
              >
                <option value={""}>select lmia status</option>
                {(FilterJson.lmia_status || []).map((status, i) => (
                  <option value={status} key={i}>
                    {status}
                  </option>
                ))}
              </select>
              {/*----ERROR MESSAGE FOR LIMA STATUS----*/}
              {errors.lmia_status && (
                <span
                  key={errors.lmia_status}
                  className="text-danger font-size-3"
                >
                  {errors.lmia_status}
                </span>
              )}
            </div>
            <div className="form-group mt-5">
              <label
                htmlFor="completion_time"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Expected time of completion
              </label>
              <input
                type="date"
                className={
                  errors.completion_time
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.completion_time}
                onChange={onInputChange}
                id="completion_time"
                name="completion_time"
              />
              {/*----ERROR MESSAGE FOR Admin Name----*/}
              {errors.completion_time && (
                <span
                  key={errors.completion_time}
                  className="text-danger font-size-3"
                >
                  {errors.completion_time}
                </span>
              )}
            </div>
            {state.lmia_status === "complete" ? (
              <>
                <div className="form-group">
                  <label
                    htmlFor="posted"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Posted :
                  </label>
                  <select
                    type={"text"}
                    className={
                      errors.posted
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.posted}
                    onChange={onInputChange}
                    id="posted"
                    name="posted"
                    multiple={false}
                  >
                    <option value={""}>select lmia status</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                  {/*----ERROR MESSAGE FOR LIMA STATUS----*/}
                  {errors.posted && (
                    <span
                      key={errors.posted}
                      className="text-danger font-size-3"
                    >
                      {errors.posted}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="job_category_id"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Company <span className="text-danger"> *</span> :
                  </label>
                  <div className="position-relative">
                    <select
                      name="posted_company_id"
                      value={state.posted_company_id}
                      onChange={onInputChange}
                      className={
                        errors.posted_company_id
                          ? " form-control border border-danger position-relative overflow-hidden"
                          : " form-control position-relative overflow-hidden"
                      }
                      placeholder="company name"
                      id="posted_company_id"
                    >
                      <option value={""}>Select Company</option>
                      {(company || []).map((com) => (
                        <option key={com.company_id} value={com.company_id}>
                          {com.company_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----ERROR MESSAGE FOR COMPANY----*/}
                  {errors.posted_company_id && (
                    <span
                      key={errors.posted_company_id}
                      className="text-danger font-size-3"
                    >
                      {errors.posted_company_id}
                    </span>
                  )}
                </div>
                <div className="form-group ">
                  <label
                    htmlFor="date_of_posting"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Date of posting :
                  </label>
                  <input
                    type={"date"}
                    className={
                      errors.date_of_posting
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.date_of_posting}
                    onChange={onInputChange}
                    id="date_of_posting"
                    name="date_of_posting"
                  />
                  {/*----ERROR MESSAGE FOR COMPANY NAME----*/}
                  {errors.date_of_posting && (
                    <span
                      key={errors.date_of_posting}
                      className="text-danger font-size-3"
                    >
                      {errors.date_of_posting}
                    </span>
                  )}
                </div>
                <div className="form-group ">
                  <label
                    htmlFor="date_of_posting"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Designation
                  </label>
                  <input
                    type={"text"}
                    className={
                      errors.designation
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.designation}
                    onChange={onInputChange}
                    id="designation"
                    name="designation"
                  />
                  {/*----ERROR MESSAGE FOR COMPANY NAME----*/}
                  {errors.designation && (
                    <span
                      key={errors.designation}
                      className="text-danger font-size-3"
                    >
                      {errors.designation}
                    </span>
                  )}
                </div>
              </>
            ) : null}

            <div className="form-group text-center">
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default LmiaStatus;
