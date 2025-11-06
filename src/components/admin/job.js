import React, { useEffect, useState } from "react";
import CustomButton from "../common/button";
// import JobDetailsBox from "../common/jobdetail";
// import AdminHeader from "./header";
// import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { GetAllJobs, GetFilter, GetLocationByType } from "../../api/api";
import FilterJson from "../json/filterjson";
import JobTable from "../common/jobTable";
import CommonThreeDots from "../common/Common function/commonThreeDots";
import SelectBox from "../common/Common function/SelectBox";
import LmiafieldsPermission from "../forms/admin/LmiafieldsPermission";
import { FaEyeSlash } from "react-icons/fa";

function Job(props) {
  /*show Modal and props state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [JobId, setJobId] = useState([]);
  const [states, seStates] = useState([]);
  /*Filter and search state */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState(
    /*props ? props.skill : */ ""
  );
  const [openPermission, setOpenPermission] = useState(false);
  const [locationFilterValue, setLocationFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  // const [company, setCompany] = useState("");
  const [pageNo, setPageNo] = useState(localStorage.getItem("PageNo") || 1);
  let [Json, setJson] = useState([]);
  let [allJob, setAllJob] = useState([]);
  // let location = useLocation();
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
    try {
      let allJobData = await GetAllJobs();
      setAllJob(allJobData.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*Render function to get the job */
  useEffect(() => {
    JsonData();
    if ((search === "") === true) {
      setSearchError("");
    }
    // if (location.state) {
    //   setCompany(location.state.company_name);
    // }
  }, [
    categoryFilterValue,
    SkillFilterValue,
    locationFilterValue,
    jobSwapFilterValue,
    apiCall,
    search,
    // company,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    setShowJobDetails(true);
    setJobId(e);
  };

  /* Function to show the single data to update job */
  const editJob = (e) => {
    // e.preventDefault();
    setShowAddJobsModal(true);
    setJobId(e);
  };
  /*Function to search the Job */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setPageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Job cannot start with a number.");
      }
      // else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
      //   setSearchError("Cannot use special characters.");
      // }
      else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  /*Skill Json for not having same data */
  const Skill =
    Json && Json.Skill
      ? Json.Skill.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.value === thing.value)
      )
      : [];
  return (
    <>
      <div
        className={
          props.skill === null || props.skill === undefined
            ? "site-wrapper overflow-hidden bg-default-2"
            : "site-wrapper overflow-hidden "
        }
      >
        {props.skill === null ||
          props.skill === undefined ||
          Object.keys(props.skill).length === 0 ? (
          <>
            {/* <!-- Header Area --> */}
            {/* <AdminHeader heading={"Manage Jobs"} /> */}
            {/* <!-- navbar- --> */}
            {/* <AdminSidebar heading={"Manage Jobs"} /> */}
          </>
        ) : null}

        <div
          className={
            showJobDetails === false
              ? props.skill === null ||
                props.skill === undefined ||
                Object.keys(props.skill).length === 0
                ? "dashboard-main-container mt-14"
                : ""
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Posted Jobs </h3>
                </div>
                {/*<-- Job Search and Filter -->*/}
                <div className="row m-0 align-items-center">
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100 input-height"
                      placeholder={"Search Job / Employer"}
                      value={search}
                      name={"name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  {/* <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Company Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Employer name"}
                      value={company}
                      name={"compnay_name"}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        setPageNo(1);
                        }}
                        />
                        </div> */}
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Job Category:</p>
                    <div className="select_div">
                      <SelectBox
                        Width={"yes"} options={Json && Json?.Category ? Json?.Category.map((option) => ({
                          value: option.id,
                          label: option.value,
                        })) : []}
                        selectedValue={categoryFilterValue}
                        onChange={(e) => {
                          setCategoryFilterValue(e ? e.value : null);
                          setPageNo(1);
                        }}
                        type={"category"}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Job Type:</p>
                    <div className="select_div">
                      <SelectBox
                        Width={"yes"} options={(FilterJson.job_type.map((option) => ({
                          value: option,
                          label: option,
                        })) || [])}
                        selectedValue={jobSwapFilterValue}
                        onChange={(e) => {
                          setJobSwapFilterValue(e ? e.value : null);
                          setPageNo(1);
                        }}
                        type={"job_type"}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Job Skill:</p>
                    <div className="select_div">
                      <SelectBox
                        Width={"yes"} options={(Skill.map((option) => ({
                          value: option.value,
                          label: option.value,
                        })) || [])}
                        selectedValue={SkillFilterValue}
                        onChange={(e) => {
                          setSkillFilterValue(e ? e.value : null);
                          setPageNo(1);
                        }}
                        type={"skill"}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Job Location:</p>
                    <div className="select_div">
                      <SelectBox
                        Width={"yes"}
                        options={(states || []).map((state) => ({
                          value: state.name,
                          id: state.id,
                          label: state.name,
                        }))}
                        type="location"
                        selectedValue={locationFilterValue || ""}
                        onChange={async (e) => {
                          setLocationFilterValue(e ? e.value : null);
                          setPageNo(1);

                        }}

                      />
                    </div>
                  </div>
                  <div className={props.employee_id ? "d-none" : "text-end col-xl-12"}>
                    <div className="float-md-right d-flex">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editJob("0")}
                        title="Add Jobs"
                      >
                        Add Job
                      </CustomButton>
                      <div className="mt-4">
                        <CommonThreeDots tableName={"job"} tableData={allJob} />
                      </div>
                      <button className=" btn-sm btn-primary border-0 mx-2"
                        onClick={() => setOpenPermission("0")}
                        title="Hide Columns "
                      >
                        <FaEyeSlash /></button>
                    </div>
                    <small className="text-danger">{searcherror}</small>
                  </div>
                </div>
              </div>
              {/*<-- Job List Table -->*/}
              <JobTable
                search={search}
                jobSwapFilterValue={jobSwapFilterValue}
                locationFilterValue={locationFilterValue}
                SkillFilterValue={SkillFilterValue}
                categoryFilterValue={categoryFilterValue}
                // company={company}
                JobDetail={JobDetail}
                apiCall={apiCall}
                setApiCall={setApiCall}
                skill={props.skill}
                employee_id={props.employee_id}
                selfJob={"no"}
                response={"response"}
                pageNo={pageNo}
                setpageNo={setPageNo}
                jobCall={props.jobCall}
                page="job"
              />
            </div>
          </div>
        </div>
      </div>
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          admin={"admin"}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowAddJobsModal(false)}
        />
      ) : null}
      {openPermission ?
        <LmiafieldsPermission
          show={openPermission}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setOpenPermission(false)}
          page="job"
        />
        : null}
    </>
  );
}

export default Job;
