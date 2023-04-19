import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddInterviewSheduale } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
function AddInterview(props) {
  let employeeId = props.resData.employee_id;
  let jobId = props.job_id;

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
  // USER ADMIN PROFILE UPDATE VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    interview_date: props.resData.interview_date,
  };
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

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAddFIlterClick = async (event) => {
    event.preventDefault();
    if (validate()) {
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
              <input
                className={
                  errors.interview_date
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={moment(state.interview_date).format("YYYY-MM-DD")}
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

export default AddInterview;
