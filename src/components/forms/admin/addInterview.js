import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddInterviewSheduale, getInterview } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
function AddInterview(props) {
  // // console.log(props);
  let [loading, setLoading] = useState(false);
  let [date, setDate] = useState();
  let employeeId = props.resData.employee_id;
  let jobId = props.job_id;

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  // USER ADMIN PROFILE UPDATE VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    interview_date: date ? date : "",
  };
  // // console.log(props.resData.interview_date);
  // VALIDATION CONDITIONS
  const validators = {
    interview_date: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Interview date is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  const InterviewData = async () => {
    const userData = await getInterview(jobId, employeeId);
    // search,
    // currentPage,
    // columnName,
    // recordsPerPage,
    // sortOrder
    // setInterviewData(userData.data);
    // setTotalData(userData.total_rows);
    // console.log(userData.data[0].interview_date);
    setDate(userData.data[0].interview_date);
  };
  // // console.log(state.interview_date, "lol");

  /*Render function to get the interview*/
  useEffect(() => {
    InterviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAddFIlterClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      const responseData = await AddInterviewSheduale(state, employeeId, jobId);
      if (responseData.message === "data inserted successfully") {
        toast.success("Interview shedualed successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
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
          <h5 className="text-center pt-2">Shedual Interview</h5>

          <form onSubmit={onAddFIlterClick}>
            <div className="form-group ">
              <label
                htmlFor="interview_date"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Interview date <span className="text-danger">*</span> :
              </label>
              {/* {// console.log(props.resData.interview_date)} */}
              <input
                className={
                  errors.interview_date
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.interview_date}
                onChange={onInputChange}
                id="interview_date"
                name="interview_date"
                type={"date"}
                placeholder="Interview date"
                min={moment().format("YYYY-MM-DD")}
              />
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.interview_date && (
                <span
                  key={errors.interview_date}
                  className="text-danger font-size-3"
                >
                  {errors.interview_date}
                </span>
              )}
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
        </div>
      </Modal>
    </>
  );
}

export default AddInterview;
