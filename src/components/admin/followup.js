import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import AddJobModal from "../forms/employer/job";
import { GetAllJobs, getJson } from "../../api/api";
import { ToastContainer } from "react-toastify";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import JobResponse from "./response";

function Followup() {
  /*show Modal and props state */
  let [apiCall, setApiCall] = useState(false);
  let [catapiCall, setCatApiCall] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  /*Filter and search state */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [locationFilterValue, setLocationFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  let [Json , setJson] = useState([])
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [responseId, setresponseId] = useState();
  /*Function to get the jSon */
 const JsonData=async()=>{
   let Json = await getJson()
   setJson(Json)
 }

  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs(
      search,
      locationFilterValue,
      categoryFilterValue,
      SkillFilterValue,
      jobSwapFilterValue,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    if (userData.data.data.length === 0) {
      setJobId([]);
      setresponseId();
    } else {
      setjobData(userData.data.data);
      setTotalData(userData.data.total_rows);
      setresponseId(userData.data.data[0].job_id);
    }
    // if (userData.message === "No data found") {
    // //// console.log((userData.status);
    // }
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    JsonData()
    if (apiCall === true || catapiCall === true) {
      setCatApiCall(false);
      setApiCall(false);
    }if((search === "") === true){
      setSearchError("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryFilterValue,
    SkillFilterValue,
    locationFilterValue,
    jobSwapFilterValue,
    search,
    currentPage,
    columnName,
    sortOrder,
    apiCall,
    showJobDetails,
    catapiCall,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    // e.preventDefault();
    setShowJobDetails(true);
    setJobId(e);
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /*Function to Search Follow up */
 const onSearch = (e) => { setSearch(e.target.value);
  if(/[-]?\d+(\.\d+)?/.test(search) ){
    setSearchError("Admin Name can not have a number.")
  }else if(/[^a-zA-Z0-9]/g.test(search)){
    setSearchError("Cannot use special character")
  }else if(search === ""){
    setSearchError("")
  }}
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Follow-ups"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Follow-ups"} />
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
                {/* <!-- Follow up search and filter --> */}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search by Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Category:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={(e) => {
                          setCategoryFilterValue(e.target.value);
                          setCatApiCall(true);
                        }}
                        className=" form-control"
                      >
                        <option value="">Select Category</option>
                        {(Json.Category || []).map((data) => {
                          return (
                            <option
                              value={data.id}
                              key={data.value}
                            >
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Swap:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={(e) => setJobSwapFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Select Job Type</option>
                        {(FilterJson.job_type || []).map((job, i) => (
                          <option key={i} value={job}>
                            {job}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Key Skill:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={SkillFilterValue}
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Select Skill</option>
                        {(Json.Skill || []).map((data) => {
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
                    <p className="input_label">Filter by Location:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={(e) => setLocationFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Select Location</option>
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
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                <div className="table-responsive main_table_div">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            onClick={() => handleSort("job_title")}
                            className="text-gray"
                            title="Sort by Industry"
                          >
                            Job title / Industry
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("job_type")}
                            className="text-gray"
                            title="Sort by Job"
                          >
                            Job Type
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("location")}
                            className="text-gray"
                            title="Sort by Address"
                          >
                            Address
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("education")}
                            className="text-gray"
                            title="Sort by Education"
                          >
                            Education
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("keyskill")}
                            className="text-gray"
                            title="Sort by Skills"
                          >
                            Skills
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("language")}
                            className="text-gray"
                            title="Sort by Language"
                          >
                            Language
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("salary")}
                            className="text-gray"
                            title="Sort by Salary"
                          >
                            Salary
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
                            onClick={() => handleSort("experience_required")}
                            className="text-gray"
                            title="Sort by Experience"
                          >
                            Experience
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link to="" className="text-gray">
                            Total Response
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map function to show the data in the list*/}
                      {totalData === 0 ? (
                        <tr>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                        </tr>
                      ) : (
                        (jobData || []).map((job) => (
                          <React.Fragment key={job.job_id}>
                            <tr
                              className="aos-init aos-animate"
                              data-aos="fade-right"
                              data-aos-duration="800"
                              data-aos-once="true"
                            >
                              <td className="py-5 ">
                                <div className="">
                                  <Link
                                    to={""}
                                    onClick={() => JobDetail(job.job_id)}
                                    className="font-size-3 mb-0 font-weight-semibold text-black-2"
                                  >
                                    <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                      {job.job_title}
                                    </p>
                                    <p className="text-gray font-size-2 m-0 text-capitalize">
                                      {job.company_name} - {job.industry_type}
                                    </p>
                                  </Link>
                                </div>
                              </td>
                              <td className=" py-5">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.employement} - {job.job_type}
                                </h3>
                              </td>
                              <td className=" py-5">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.location}
                                </h3>
                              </td>
                              <td className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.education}
                                </h3>
                              </td>
                              <td className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.keyskill}
                                </h3>
                              </td>
                              <td className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.language}
                                </h3>
                              </td>
                              <td className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.salary}
                                </h3>
                              </td>
                              <td className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {job.experience_required}
                                </h3>
                              </td>
                              <td className="py-5 ">
                                <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                                  {job.total_applicants}
                                </h3>
                              </td>
                              <td className="py-5 min-width-px-100">
                                {job.total_applicants > 0 ? (
                                  <div
                                    className="btn-group button_group"
                                    role="group"
                                  >
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() => {
                                        setresponseId(job.job_id);
                                      }}
                                      title="Job Response"
                                    >
                                      Responses
                                    </button>
                                  </div>
                                ) : null}
                              </td>
                            </tr>
                            {job.job_id === responseId &&
                            job.total_applicants > 0 ? (
                              <tr>
                                <td colSpan={10}>
                                  {/* <!-- Job Responses --> */}
                                  <JobResponse
                                    responseId={responseId}
                                    apiCall={apiCall}
                                    setApiCall={setApiCall}
                                    heading={"Manage Follow-ups"}
                                  />
                                </td>
                              </tr>
                            ) : null}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Follow up Pagination --> */}
                <div className="pt-2">
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Job Details --> */}
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
    </>
  );
}

export default Followup;
