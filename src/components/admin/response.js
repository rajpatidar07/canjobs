import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import Addfollowup from "../forms/admin/addfollowup";
import { GetAllResponse } from "../../api/api";
import moment from "moment";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import AddInterview from "../forms/admin/addInterview.js";
import LmiaStatus from "../forms/admin/lmiastatus";
import { ToastContainer } from "react-toastify";
import ChangeJob from "../forms/admin/changeJobs";

function JobResponse(props) {
  /*show modal and data states */
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [apiCall, setApiCall] = useState(props.apiCall);
  let [followup, setFollowUp] = useState(false);
  let [interview, setInterview] = useState(false);
  let [limia, setLimia] = useState(false);
  let [response, setResponseData] = useState([]);
  let [resData, setResData] = useState("");
  /*Filter and search state */
  const [skillFilterValue, setSkillFilter] = useState("");
  const [experienceTypeFilterValue, setExperienceTypeFilterValue] = useState(
    ""
  );
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [jobId, setJobId] = useState(props.responseId);
  const user_type = localStorage.getItem("userType");

  /* Function to get the Response data*/
  const ResponseData = async () => {
    const userData = await GetAllResponse(
      props.heading === "Manage Follow-ups" || user_type === "company"
        ? jobId
        : null,
      skillFilterValue,
      experienceTypeFilterValue,
      search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.filter_by_time
    );
    if (userData.data.data.length === 0) {
      setResData([]);
    } else {
      setResponseData(userData.data.data);
      setTotalData(userData.data.total_rows);
    }
  };
  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
   if (apiCall === true){
    let CallApi = true
    props.setApiCall(CallApi)
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    skillFilterValue,
    experienceTypeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    followup,
    // jobId,
    limia,
    interview,
    followup,
    showChangeJobModal,
    props.filter_by_time,
    apiCall
  ]);

  /*Function to open add follow up modal */
  const addFollow = (e) => {
    setFollowUp(true);
    setResData(e);
    setJobId(e.job_id);
      
  };
  /*Function to open add Interview up modal */
  const addnterview = (e) => {
    setInterview(true);
    setResData(e);
    setJobId(e.job_id);
    
  };
  /*Function to open add Limia up modal */
  const addLimia = (e) => {
    setLimia(true);
    setResData(e);
    setJobId(e.job_id);
    
  };
  /* Function to show the single data to update job */
  const editJob = (e) => {
    // e.preventDefault();
    setShowChangeJobModal(true);
    setResData(e);
    setJobId(e.job_id);
    
    
  };

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /*Job array to filter*/
  // const Job = (response.filter || [])(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.job_title === thing.job_title)
  // );

  return (
    <div
      className={
        props.heading === "Response" ||
        (props.heading === undefined && user_type === "admin")
          ? "site-wrapper overflow-hidden bg-default-2  "
          : props.heading === "Dashboard"
          ? "site-wrapper overflow-hidden bg-default-2 bg-white"
          : "response_main_div"
      }
    >
      {props.heading === "Response" ||
      (props.heading === undefined && user_type === "admin") ? (
        <>
          {/* <!-- Header Area --> */}
          <AdminHeader heading={"Response"} />
          {/* <!-- navbar- --> */}
          <AdminSidebar heading={"Response"} />
          <ToastContainer />
        </>
      ) : null}
     {followup ? <Addfollowup
        show={followup}
        job_id={jobId}
        resData={resData}
        close={() => {
          setFollowUp(false);
          setResData("");
        }}
      /> : null}
     {interview ?<AddInterview
        show={interview}
        job_id={jobId}
        resData={resData}
        close={() => {
          setInterview(false);
          setResData("");
        }}
      />:null}
      {limia ? <LmiaStatus
        show={limia}
        resData={resData}
        close={() => {
          setLimia(false);
          setResData("");
        }}
      /> : null}
      {showChangeJobModal ? <ChangeJob
        resData={resData}
        close={() => {
          setShowChangeJobModal(false);
          setResData("");
        }}
        apiCall={apiCall}
        setApiCall={setApiCall}
        job_id={jobId}
        show={showChangeJobModal}
      /> : null}
      <div
        className={
          props.heading === "Response" ||
          (props.heading === undefined && user_type === "admin")
            ? "dashboard-main-container mt-16"
            : props.heading === "Dashboard"
            ? ""
            : "response__container"
        }
      >
        <div
          className={
            props.heading === "Response" ||
            (props.heading === undefined && user_type === "admin")
              ? "container"
              : props.heading === "Dashboard"
              ? ""
              : "container"
          }
        >
          {props.heading === "Dashboard" ? (
            ""
          ) : (
            <div
              className={
                props.heading === "Manage Follow-ups"
                  ? "response_filters mb-2 align-items-center"
                  : "align-items-center"
              }
            >
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Follow Up</h3>
              </div>
              <div className="row m-0 align-items-center">
                {props.heading === "" ? null : (
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Company:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Company"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                )}
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Filter by Skill:</p>
                  <div className="select_div">
                    <select
                      name="job"
                      id="job"
                      value={skillFilterValue}
                      onChange={(e) => setSkillFilter(e.target.value)}
                      className=" form-control"
                    >
                      <option value="">Select Skil</option>
                      {(FilterJson.keyskill || []).map((skill, i) => (
                        <option value={skill} key={i}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Filter by Experience:</p>
                  <div className="select_div">
                    <select
                      name="experience"
                      id="experience"
                      value={experienceTypeFilterValue}
                      onChange={(e) =>
                        setExperienceTypeFilterValue(e.target.value)
                      }
                      className=" form-control"
                    >
                      <option value="">Select Experience</option>
                      {(FilterJson.experience || []).map((ex, i) => (
                        <option value={ex} key={i}>
                          {ex}
                          {ex === "Fresher" || ex === "Other" ? "" : "Year"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="float-md-right mt-6"></div>
              </div>
            </div>
          )}
          <div className="mb-8" /*"mb-18" */>
            <div
              className={
                props.heading === "Response" ||
                (props.heading === undefined && user_type === "admin")
                  ? ""
                  : props.heading === "Dashboard"
                  ? "bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"
                  : ""
              }
            >
              <div className="table-responsive ">
                <table
                  className={
                    props.heading === "Manage Follow-ups"
                      ? "table table-striped main_data_table_inn"
                      : "table table-striped main_data_table"
                  }
                >
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pl-0 border-0 font-size-4 font-weight-normal text-center"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="pl-0 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={() => handleSort("name")}
                          className="text-gray"
                          title="Sort by Name"
                        >
                          Name
                        </Link>
                      </th>
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th
                          scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => handleSort("experience")}
                            className="text-gray"
                            title="Sort by Experience"
                          >
                            Experience
                          </Link>
                        </th>
                      )}
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={() => handleSort("job_title")}
                          className="text-gray"
                          title="Sort by Job"
                        >
                          Job Type
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={() => handleSort("company_name")}
                          className="text-gray"
                          title="Sort by Company"
                        >
                          Company
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={() => handleSort("lmia_status")}
                          className="text-gray"
                          title="Sort by LIMIA Status"
                        >
                          LMIA
                        </Link>
                      </th>
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => handleSort("contact_no")}
                            className="text-gray"
                            title="Sort by Contact"
                          >
                            Contact
                          </Link>
                        </th>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => handleSort("current_location")}
                            className="text-gray"
                            title="Sort by Address"
                          >
                            Address
                          </Link>
                        </th>
                      )}
                      {props.heading === "Dashboard" ||
                      user_type === "company" ? (
                        ""
                      ) : (
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {totalData === 0 || response.length === 0 ? (
                      <tr>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                        {props.heading === "Dashboard" ? (
                          <th className="bg-white">No Data Found</th>
                        ) : (
                          <th className="bg-white"></th>
                        )}
                        <th className="bg-white"></th>
                        {props.heading === "Dashboard" ? (
                          <th className="bg-white"></th>
                        ) : (
                          <th className="bg-white">No Data Found</th>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <>
                            <th className="bg-white"></th>
                            <th className="bg-white"></th>
                            <th className="bg-white"></th>
                            <th className="bg-white"></th>
                          </>
                        )}
                      </tr>
                    ) : (
                      (response || []).map((res, i) => (
                        <tr className="" key={i}>
                          <th className="pl-5 py-5 pr-0   ">
                            <div className="media  align-items-center">
                              <div className="circle-36 mx-auto overflow-hidden">
                                {/* {res.profile_photo === null ? ( */}
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                  alt=""
                                  className="w-100"
                                />
                                {/* ) : (
                              <img
                                src={empdata.profile_photo}
                                alt=""
                                className="w-100"
                              />
                            )} */}
                              </div>
                            </div>
                          </th>
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {res.name || res.gender || res.date_of_birth ? (
                                <>
                                  {res.name}(
                                  {moment().diff(res.date_of_birth, "years")})
                                  <br />
                                  {res.gender}
                                </>
                              ) : (
                                <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  No Data
                                </span>
                              )}
                            </h3>
                          </th>
                          {props.heading === "Dashboard" ? (
                            ""
                          ) : (
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.experience ? (
                                  res.experience
                                ) : (
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    No Data
                                  </span>
                                )}
                              </h3>
                            </th>
                          )}
                          <th className="py-5 ">
                            <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {res.job_title ? (
                                res.job_title
                              ) : (
                                <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  No Data
                                </span>
                              )}
                            </div>
                          </th>
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {res.company_name ? (
                                res.company_name
                              ) : (
                                <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  No Data
                                </span>
                              )}
                            </h3>
                          </th>
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-center">
                              {res.lmia_status === "Reject" ? (
                                <span className="badge badge-pill badge-danger">
                                  Reject
                                </span>
                              ) : res.lmia_status === "Approved" ? (
                                <span className="badge badge-pill bg-info-opacity-5 text-white">
                                  Approved
                                </span>
                              ) : res.lmia_status === "Draft" ? (
                                <span className="badge badge-pill badge-gray">
                                  Draft
                                </span>
                              ) : res.lmia_status === "Complete" ? (
                                <span className="badge badge-pill bg-primary-opacity-9 text-white">
                                  Complete
                                </span>
                              ) : res.lmia_status === "Pending" ? (
                                <span className="badge badge-pill badge-warning">
                                  Pending
                                </span>
                              ) : res.lmia_status === "Other" ? (
                                <span className="badge badge-pill badge-dark">
                                  Other
                                </span>
                              ) : (
                                <span>No Data</span>
                              )}
                            </h3>
                          </th>
                          {props.heading === "Dashboard" ? (
                            ""
                          ) : (
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                                {res.contact_no || res.email ? (
                                  <>
                                    {`+${res.contact_no}`}
                                    <br /> {res.email}
                                  </>
                                ) : (
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    No Data
                                  </span>
                                )}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? (
                            ""
                          ) : (
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.current_location ||
                                res.currently_located_country ? (
                                  <>
                                    <span>{res.current_location}</span>
                                    <span className="px-1">
                                      {res.currently_located_country}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    {" "}
                                    No Data
                                  </span>
                                )}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ||
                          user_type === "company" ? (
                            ""
                          ) : (
                            <th className="py-5  min-width-px-100">
                              <div
                                className="btn-group button_group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => addFollow(res)}
                                  title=" Add Follow Up"
                                >
                                  <i className=" fas fa-plus text-gray px-2"></i>
                                </button>
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => addnterview(res)}
                                  title=" Add Interview"
                                >
                                  <i className="fa fa-podcast text-gray px-2"></i>
                                </button>
                                <button
                                  className="btn btn-outline-info action_btn text-gray"
                                  onClick={() => addLimia(res)}
                                  title="Add LMIA"
                                >
                                  LMIA
                                </button>
                                <button
                                  className="btn btn-outline-info action_btn text-gray"
                                  onClick={() => editJob(res)}
                                  title="Change Job"
                                >
                                  <i className="fas fa-briefcase"></i>
                                </button>
                              </div>
                            </th>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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
    </div>
  );
}

export default JobResponse;
