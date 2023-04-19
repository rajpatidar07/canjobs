import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllJobs } from "../../../api/api";
function ChangeJob(props) {
  console.log(props);

  let employeeId = props.resData.employee_id;
  let jobId = props.job_id;
  let [jobData, setJobData] = useState([]);
  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
  // USER ADMIN PROFILE UPDATE VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    job_title: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    job_title: [
      (value) =>
        value === "" || value.trim() === "" ? "Job is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs();
    console.log(userData.data.data);
    setJobData(userData.data.data);
  };
  useEffect(() => {
    JobData();
  }, [props]);
  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAddFIlterClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      //   const responseData = await AddInterviewSheduale(state, employeeId, jobId);
      //   if (responseData.message === "data inserted successfully") {
      //     toast.success("Interview shedualed successfully", {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 1000,
      //     });
      //     return close();
      //   }
    }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
  /*Admin type array to filter*/
  const Job = jobData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.job_title === thing.job_title)
  );

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
          <h5 className="text-center pt-2">Change Jobs</h5>

          <form onSubmit={onAddFIlterClick}>
            <div className="form-group ">
              <label
                htmlFor="job_title"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Jobs <span className="text-danger">*</span> :
              </label>
              <select
                className={
                  errors.job_title
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.job_title}
                onChange={onInputChange}
                id="job_title"
                name="job_title"
              >
                {" "}
                <option value={""}>select Job</option>
                {(Job || []).map((data) => {
                  return (
                    <option value={data.job_id} key={data.job_id}>
                      {data.job_title}
                    </option>
                  );
                })}
              </select>
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.job_title && (
                <span
                  key={errors.job_title}
                  className="text-danger font-size-3"
                >
                  {errors.job_title}
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

export default ChangeJob;
