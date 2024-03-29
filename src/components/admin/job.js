import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { getJson } from "../../api/api";
import { ToastContainer } from "react-toastify";
import FilterJson from "../json/filterjson";
import JobTable from "../common/jobTable";

function Job() {
  /*show Modal and props state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [JobId, setJobId] = useState([]);
  /*Filter and search state */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [locationFilterValue, setLocationFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [search, setSearch] = useState(""); 
 const [searcherror, setSearchError] = useState("");
  const [company, setCompany] = useState("");
  let [Json, setJson] = useState([]);
  /*Function to get the jSon */
  const JsonData = async () => {
    let Json = await getJson();
    setJson(Json);
  };

  /*Render function to get the job */
  useEffect(() => {
    JsonData();
    if((search === "") === true){
      setSearchError("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryFilterValue,
    SkillFilterValue,
    locationFilterValue,
    jobSwapFilterValue,
    apiCall,
    search,
    company,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    // e.preventDefault();
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
    const onSearch = (e) => { setSearch(e.target.value);
      if(/[-]?\d+(\.\d+)?/.test(search) ){
        setSearchError("Job can not have a number.")
      }else if(/[^a-zA-Z0-9]/g.test(search)){
        setSearchError("Cannot use special character")
      }else if((search === "") === true){
        setSearchError("")
      }}
    /*Skill Json for not having same data */
    const Skill = Json.Skill ? Json.Skill.filter((thing, index, self) =>
    index === self.findIndex((t) => t.value === thing.value)
    ) : [];
      
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Jobs"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Jobs"} />
        <ToastContainer />
        <div
          className={
            showJobDetails === false
              ? "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Posted Jobs </h3>
                </div>
                {/*<-- Job Search and Filter -->*/}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job"}
                      value={search}
                      name={"name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>{" "}
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Company Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Company name"}
                      value={company}
                      name={"compnay_name"}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Category:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Category</option>
                        {(Json.Category || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Type:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={(e) => {
                          setJobSwapFilterValue(e.target.value);
                        }}
                        className=" form-control"
                      >
                        <option value="">Job Type</option>
                        {(FilterJson.job_type || []).map((job, i) => (
                          <option key={i} value={job}>
                            {job}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Skill:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={SkillFilterValue}
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Skill</option>
                        {(Skill || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Location:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={(e) => setLocationFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Location</option>
                        {(FilterJson.location || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="text-end col-xl-12">
                    <div className="float-md-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editJob("0")}
                        title="Add Jobs"
                      >
                        Add Job
                      </CustomButton>
                      {/*<-- Add Job Modal -->*/}
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
                company={company}
                JobDetail={JobDetail}
                apiCall={apiCall}
                setApiCall={setApiCall}
              />
            </div>
          </div>
        </div>
        {/*<-- Job Detail -->*/}
        {showJobDetails === true ? (
          <div className="dashboard-main-container mt-16 ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowJobDetails(false)}
                      className="d-flex align-items-center ml-4"
                    >
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mb-18">
                <JobDetailsBox jobdata={JobId} />
              </div>
            </div>
          </div>
        ) : null}
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
    </>
  );
}

export default Job;
