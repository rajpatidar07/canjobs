import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllJobs, ApplyJob } from "../../../api/api";
// import SelectBox from "../../common/select";
// import { Select, Button } from "antd"; // "3.26.7" worked
// import Select from "react-select";
import Select from "react-select";
function ChangeJob(props) {
  let [loading, setLoading] = useState(false);
  // console.log(props);

  let employeeId = props.resData.employee_id;
  let applyId = props.resData.apply_id;
  let [allJobData, setAllJobData] = useState([]);
  let [JobId, setJobId] = useState("");
  /* Functionality to close the modal */
  const close = () => {
    // setErrors("");
    setLoading(false);
    props.close();
  };
  // USER ADMIN PROFILE UPDATE VALIDATION
  // INITIAL STATE ASSIGNMENT

  const JobData = async () => {
    const userData = await GetAllJobs();
    // // console.log(userData.data.data);
    setAllJobData(userData.data.data);
  };

  useEffect(() => {
    JobData();
  }, [props]);
  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onSelectChange = (option) => {
    // e.preventDefault();
    // // console.log("+++++++++++++" + JSON.stringify(option.value));

    setJobId(option.value);
  };
  const onChangeJobClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    // if (validate()) {
    const responseData = await ApplyJob(applyId, employeeId, JobId);
    if (responseData.message === "Job switched successfully") {
      toast.success("Job Changed successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return close();
    }
    // }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
  const [state, setState] = useState([]);

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
          <h5 className="text-center pt-2">Change Jobs</h5>

          <form onSubmit={onChangeJobClick}>
            <div className="form-group ">
              <label
                htmlFor="job_id"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Jobs <span className="text-danger">*</span> :
              </label>
              <Select
                // getOptionValue={onSelectChange}
                options={state}
                onChange={onSelectChange}
                // onSelectChange={(e) => {
                //   setJobId(e.target.value);
                // }}

                id="job_id"
              />
              {/* <SelectBox
                value={JobId}
                options={allJobData}
                onSelectChange={(e) => {
                  setJobId(e.target.value);
                }}
              /> */}
              {/* <SelectBox options={allJobData} onSelectChange={onSelectChange} /> */}

              {/* <select
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
              </select> */}
              {/* <Select mode="multiple" style={{ width: 120 }}>
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="disabled" disabled>
                  Disabled
                </Select.Option>
                <Select.Option value="Yiminghe">yiminghe</Select.Option>
              </Select> */}
              {/* <Select
                options={jobData}
                placeholder="Select color"
                value={state.job_title}
                onChange={onInputChange}
                isSearchable={true}
                isMulti
              /> */}
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {/* {errors.job_id && (
                <span key={errors.job_id} className="text-danger font-size-3">
                  {errors.job_id}
                </span>
              )} */}
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

export default ChangeJob;
