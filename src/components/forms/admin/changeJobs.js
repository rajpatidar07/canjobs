import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllJobs, ApplyJob } from "../../../api/api";
// import SelectBox from "../../common/select";
// import { Select, Button } from "antd"; // "3.26.7" worked
import Select from "react-select";
function ChangeJob(props) {
  let [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  let employeeId = props.status === 0 ? props.resData  : props.resData.employee_id;
  let applyId = props.resData.apply_id;
  let [allJobData, setAllJobData] = useState([]);
  let [JobId, setJobId] = useState("");
  /* Functionality to close the modal */
  const close = () => {
    // setErrors("");
    setLoading(false);
    props.close();
  };
  // USER CHANGE JOB VALIDATION
  // INITIAL STATE ASSIGNMENT

  const JobData = async () => {
    const userData = await GetAllJobs();
    // // console.log(userData.data.data);
    if (userData.data.data.length === 0) {
      setAllJobData([]);
    } else {
      setAllJobData(userData.data.data);
    }
  };

  useEffect(() => {
    JobData();
  }, [props]);
  // USER CHANGE JOB SUBMIT BUTTON
  const onSelectChange = (option) => {
    // e.preventDefault();
    // // console.log("+++++++++++++" + JSON.stringify(option.value));

    setJobId(option.value);
  };
  /*Function to change job */
  const onChangeJobClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    const responseData = await ApplyJob(JobId, employeeId , props.status , applyId);
    if (responseData.message === "Job switched successfully") {
      toast.success("Job Changed successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      props.setApiCall(true)
      return close();
    }
    if (responseData.message === "Job applied successfully") {
      toast.success("Applied successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      props.setApiCall(true)
      return close();
    }
    
  };
  // END USER CHANGE JOB VALIDATION
  /*FUnction to redender the data in the option of the select box*/
  useEffect(() => {
    const options = allJobData.map((option) => ({
      value: option.job_id,
      label: option.job_title + " - " + option.company_name,
    }));
    setState(options);
  }, [allJobData]);
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
          <h5 className="text-center pt-2">{props.apply==="apply" ? "Apply for Job" : "Change Jobs"}</h5>

          <form onSubmit={onChangeJobClick}>
            <div className="form-group ">
              <label
                htmlFor="job_id"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Jobs <span className="text-danger">*</span> :
              </label>
              <Select options={state || ""} onChange={onSelectChange} id="job_id" />
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
                  onClick={onChangeJobClick}
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

export default ChangeJob;
