import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer /*,toast */ } from "react-toastify";
import Interview from "../common/interviewTable";
import LimiaStatusTable from "../common/limiaStatusTable";
// import JobResponse from "./response";
import JobTable from "../common/jobTable";
import EmployeeTable from "../common/employeeTable";
import EmployerTable from "../common/employerTable";
import {
  AddAdminPermission,
  GetAdminrSetting,
  /*getSummaryCount*/ GetAllApplicanttypeChartData,
  GetAllChartData /* GetAllLimaChartData, GetAllVisaChartData */,
} from "../../api/api";
// import FollowUpDashBoard from "../common/followUpTableDashboard";
import Addfollowup from "../forms/admin/addfollowup";
import { FaWindowMaximize } from "react-icons/fa";
import { BsUsbMiniFill } from "react-icons/bs";
import AdminTaskTable from "../common/AdminTaskTable";
import DataChart from "../common/DataChart";
import Loader from "../common/loader";
import ActivityTable from "../common/activity_table";
import { BiLeftArrow } from "react-icons/bi";
// import SessionCheck from "../common/session";
const AdminDashboard = ({ setLoginCondition }) => {
  // useEffect(() => {
  //   SessionCheck();
  // }, []);
  let adminType = localStorage.getItem("admin_type");
  let adminId = localStorage.getItem("admin_id");
  let navigateUrl = localStorage.getItem("navigation_url")
  let navigate = useNavigate()
  // eslint-disable-next-line
  /*States */
  const [countData /* setCountData*/] = useState("");
  let [job, setJob] = useState("");
  let [employee, setEmployee] = useState("");
  let [task, setTask] = useState("");
  let [activity, setActivity] = useState("");
  let [lima, setLima] = useState("");
  let [employer, setEmployer] = useState("");
  let [interview, setInterview] = useState("");
  // let [response, setResponse] = useState("");
  // let [followup, setFollowUP] = useState("");
  let [apiCall, setApiCall] = useState(false);
  const [employeepageNo, setEmployeePageNo] = useState(1);
  const [employerpageNo, setEmployerPageNo] = useState(1);
  const [jobPageNo, setJobPageNo] = useState(1);
  const [lmiaPageNo, setLmiaPageNo] = useState(1);
  const [interviewPageNo, setInterviewPageNo] = useState(1);
  const [taskPageNo, setTaskPageNo] = useState(1);
  const [activityNo, setActivityNo] = useState(1);
  const [openTable, setOpenTable] = useState(null);
  const [applicantStatusChartData, setApplicantStatusData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingType, setLoadingType] = useState(true);
  // const [loadingLmia, setLoadingLmia] = useState(true);
  // const [loadingVisa, setLoadingVisa] = useState(true);
  const [applicantsTypeChartData, setapplicantsTypeChartData] = useState([]);
  // const [lmiaChartData, setLmiaChartData] = useState([]);
  // const [visaChartData, setVisaChartData] = useState([]);
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State to manage table visibility
  const [tables, setTables] = useState({
    jobTable: 0,
    employeeTable: 0,
    employerTable: 0,
    taskTable: 0,
    lmiaTable: 0,
    followupTable: 0,
    activityTable: 0,
    interviewTable: 0
  });

  // Toggle sidebar visibility
  const toggleMangeTableSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  /*Function to get the permision data */
  const GetDashboardPermissionData = async () => {
    try {
      let Response = await GetAdminrSetting();
      const dashboard_permission = JSON.parse(Response.data.dashboard_permission);
      setTables(dashboard_permission || tables);
    } catch (err) {
      console.log(err);
    }
  };
  // Handle checkbox change
  const handleMangeTableCheckboxChange = async (tableName) => {
    const updatedPermissions = {
      dashboard_permission: {
        jobTable: tableName === "jobTable"
          ? tables.jobTable === 0
            ? 1
            : 0
          : tables.jobTable,
        employeeTable: tableName === "employeeTable"
          ? tables.employeeTable === 0
            ? 1
            : 0
          : tables.employeeTable,
        employerTable: tableName === "employerTable"
          ? tables.employerTable === 0
            ? 1
            : 0
          : tables.employerTable,
        lmiaTable: tableName === "lmiaTable"
          ? tables.lmiaTable === 0
            ? 1
            : 0
          : tables.lmiaTable,
        followupTable: tableName === "followupTable"
          ? tables.followupTable === 0
            ? 1
            : 0
          : tables.followupTable,
        taskTable: tableName === "taskTable"
          ? tables.taskTable === 0
            ? 1
            : 0
          : tables.taskTable,
        activityTable: tableName === "activityTable"
          ? tables.activityTable === 0
            ? 1
            : 0
          : tables.activityTable,
        interviewTable: tableName === "interviewTable"
          ? tables.interviewTable === 0
            ? 1
            : 0
          : tables.interviewTable,
      }
    }
    try {
      let Response = await AddAdminPermission(updatedPermissions);
      if (Response.message === "successfully") {
        GetDashboardPermissionData()
      }
    } catch (err) {
      console.log(err)
    }
  };

  /*Function to maximixe and minimize the tables*/
  const toggleTable = (tableNumber) => {
    if (openTable === tableNumber) {
      setOpenTable(null);
    } else {
      setOpenTable(tableNumber);
    }
    // Function to focus on the particular div we select for maximizing and minimizing.
    window.requestAnimationFrame(() => {
      const element = document.getElementById(`table${tableNumber}`);
      element && element.scrollIntoView({ behavior: "smooth" });
    });
  };
  /*Function get minimize maximize icons */
  const getIcon = (tableNumber) => {
    return openTable === tableNumber ? <BsUsbMiniFill /> : <FaWindowMaximize />;
  };
  /*Function to Get Graph data */
  const GetChartData = async () => {
    //Applicants status data
    try {
      let res = await GetAllChartData("", adminType);
      if (res.status === 1) {
        setLoginCondition(false)
        setApplicantStatusData(res.data);
        setLoadingStatus(false);
      } else {
        setApplicantStatusData([]);
        setLoadingStatus(false);
      }
    } catch (err) {
      console.log(err);
      setLoadingStatus(false);
    }
    //Applicants types data
    try {
      let typeRes = await GetAllApplicanttypeChartData("", adminType);
      if (typeRes.status === 1) {
        setapplicantsTypeChartData(typeRes.data);
        setLoadingType(false);
      } else {
        setapplicantsTypeChartData([]);
        setLoadingType(false);
      }
    } catch (err) {
      console.log(err);
      setLoadingType(false);
    }
    //Applicants lmia types data
    // try {
    //   let limaRes = await GetAllLimaChartData("", adminType)
    //   if (limaRes.status === 1) {
    //     setLmiaChartData(limaRes.data)
    //     setLoadingLmia(false)
    //   } else {
    //     setLmiaChartData([])
    //     setLoadingLmia(false)
    //   }
    //   //Applicants visa types data
    //   if (visaRes.status === 1) {
    //     setVisaChartData(visaRes.data)
    //     setLoadingVisa(false)
    //   } else {
    //     setVisaChartData([])
    //     setLoadingVisa(false)
    //   }
    // } catch (err) {
    //   setLoadingLmia(false)
    //   console.log(err)
    // }
    //Applicants visa types data
    // try {
    //   let visaRes = await GetAllVisaChartData("", adminType)
    //   if (visaRes.status === 1) {
    //     setVisaChartData(visaRes.data)
    //     setLoadingVisa(false)
    //   } else {
    //     setVisaChartData([])
    //     setLoadingVisa(false)
    //   }
    // } catch (err) {
    //   console.log(err)
    //   setLoadingVisa(false)
    // }
  };
  useEffect(() => {
    GetChartData();
    GetDashboardPermissionData();
    if (apiCall === true) {
      setApiCall(false);
    }
    if (navigateUrl) {
      navigate(`${navigateUrl}`)
      // localStorage.setItem("navigation_url", "")
    }
    // eslint-disable-next-line
  }, [apiCall]);

  /*Function to get the summary count */
  // let AllCounts = async () => {
  // try{  let Data = await getSummaryCount();
  //   if (Data.length === 0) {
  //     setCountData("");
  //   } else {
  //     setCountData(Data);
  //   }}catch(err){
  //    console.log(err) {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //   }
  // };
  // useEffect(() => {
  //   AllCounts();
  // }, [job, employee, employer, interview, response, followup]);
  /*Function to get the percentage in correct form  */
  const appliedRateFormatted = countData.applied_rate;
  // countData && countData.applied_rate
  //   ? countData.applied_rate.toLocaleString("en-US", {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     })
  //   : null;
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"Dashboard"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Dashboard"} />

      <div
        className={"dashboard-main-container mt-12 mt-lg-12 row"}
        id="dashboard-body"
      >

        <Link
          to={""}
          onClick={() => {
            toggleMangeTableSidebar()
          }}
          className={"annotation-mobile-button"
          }
          data-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebar"
          title="Manage tables"
        >
          <BiLeftArrow />
        </Link>
        <div className={`container-fluid mt-5 ${isSidebarOpen
          ? "col-md-9 col-lg-9 col-sm-11"
          : "col-md-12 col-lg-12 col-sm-12"}`}>
          {/* <!-- Summary count --> */}
          <div className="row mb-7 d-none">
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/job"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-briefcase"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.posted_jobs || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Posted Jobs
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-user"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.total_applicants || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Applicants
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-eye"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.jobs_viewed || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Jobs View
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-mouse-pointer"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">{appliedRateFormatted || 0}</span>
                    %
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Applied Rate
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-users"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.applied_employee || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Applied Applicants
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/job"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-check "></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">{countData.placed || "N/A"}</span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Placed Job
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-building"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.total_company || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Clients
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-lightbulb"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.active_company || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Active Client's
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-podcast"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.total_interviews || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Interview
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
          </div>

          <div className="row">
            {/* Applicant's status */}
            <div id="table0" className={"col-md-6"}>
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0 ">Applicant's status</h3>
                </div>
                <div className="bg-white dashboard_card ">
                  {loadingStatus ? (
                    <Loader />
                  ) : (
                    <DataChart
                      data={applicantStatusChartData}
                      dataType={"status"}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Applicant's type */}
            <div id="table_0" className={"col-md-6"}>
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0 ">Applicant Type's</h3>
                </div>
                <div className="bg-white dashboard_card ">
                  {loadingType ? (
                    <Loader />
                  ) : (
                    <DataChart
                      data={applicantsTypeChartData}
                      dataType={"type"}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Applicant's Lima */}
            {/* <div
              id="table_01"
              className={"col-md-6 d-none"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0 ">Applicant's LMIA</h3>
                </div>
                <div className="bg-white dashboard_card ">
                  {loadingLmia
                    ? <Loader />
                    : <DataChart data={lmiaChartData}
                      dataType={"lima"} />}
                </div>
              </div>
            </div> */}
            {/* Applicant's visa */}
            {/* <div
              id="table_02"
              className={"col-md-6 d-none"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0 ">Applicant's Visa</h3>
                </div>
                <div className="bg-white dashboard_card ">
                  {loadingVisa
                    ? <Loader />
                    : <DataChart data={visaChartData}
                      dataType={"visa"} />}
                </div>
              </div>
            </div> */}
            {/* <!-- Recent Jobs- --> */}
            {tables.jobTable ? <div
              id="table1"
              className={openTable === 1 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0 ">Recently Added Jobs</h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="job"
                        value={job}
                        id="job"
                        onChange={(e) => {
                          setJob(e.target.value);
                          setJobPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/job"}
                        title="View All Jobs"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${openTable === 1 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(1)}
                      title={openTable === 1 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(1)}
                    </Link>
                  </div>
                </div>
                <JobTable
                  heading={openTable === 1 ? "" : "Dashboard"}
                  filter_by_time={job}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  lmia={openTable === 1 ? "" : "no"}
                  setpageNo={setJobPageNo}
                  pageNo={jobPageNo}
                  selfJob={openTable === 1 ? "no" : ""}
                  response={openTable === 1 ? "response" : ""}
                />
              </div>
            </div> : null}
            {/* <!-- Recent Employees- --> */}
            {tables.employeeTable ? <div
              id="table4"
              className={openTable === 4 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Candidates
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="employee"
                        value={employee}
                        id="employee"
                        onChange={(e) => {
                          setEmployee(e.target.value);
                          setEmployeePageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/employee"}
                        title="View all Applicants"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${openTable === 4 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(4)}
                      title={openTable === 4 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(4)}
                    </Link>
                  </div>
                </div>
                <EmployeeTable
                  heading={openTable === 4 ? "" : "Dashboard"}
                  filter_by_time={employee}
                  setpageNo={setEmployeePageNo}
                  pageNo={employeepageNo}
                  self={"yes"}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  adminFilterValue={adminId}
                />
              </div>
            </div> : null}
            {/* <!-- Recent Companies --> */}
            {tables.employerTable ? <div
              id="table2"
              className={openTable === 2 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Clients
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="employer"
                        value={employer}
                        id="employer"
                        onChange={(e) => {
                          setEmployer(e.target.value);
                          setEmployerPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/adminclient"}
                        title="View All Clients"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${openTable === 2 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(2)}
                      title={openTable === 2 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(2)}
                    </Link>
                  </div>
                </div>
                <EmployerTable
                  heading={openTable === 2 ? "" : "Dashboard"}
                  filter_by_time={employer}
                  setpageNo={setEmployerPageNo}
                  pageNo={employerpageNo}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                />
              </div>
            </div> : null}
            {/* <!-- Recent Tasks- --> */}
            {tables.taskTable ? <div
              id="table4"
              className={openTable === 7 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Tasks
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="task"
                        value={task}
                        id="task"
                        onChange={(e) => {
                          setTask(e.target.value);
                          setTaskPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    {/* <div className="">
                      <Link
                        className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/employee"}
                        title="View all Applicants"
                      >
                        View All
                      </Link>
                    </div> */}
                    <Link
                      className={`text-dark mx-5 ${openTable === 7 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(7)}
                      title={openTable === 7 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(7)}
                    </Link>
                  </div>
                </div>
                <AdminTaskTable
                  heading={openTable === 7 ? "" : "Dashboard"}
                  filter_by_time={task}
                  setpageNo={setTaskPageNo}
                  pageNo={taskPageNo}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                />
              </div>
            </div> : null}
            {/* <!-- Recent Job Response- --> */}
            {/* <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Job Response
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="response"
                        value={response}
                        id="response"
                        onChange={(e) => setResponse(e.target.value)}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/responses"}
                        title="View All Responses"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <JobResponse heading={"Dashboard"} filter_by_time={response} />
              </div> */}
            {/* <!-- Recent lima's- --> */}
            {tables.lmiaTable ? <div
              id="table5"
              className={openTable === 5 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Lmia
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="job"
                        value={lima}
                        id="job"
                        onChange={(e) => {
                          setLima(e.target.value);
                          setLmiaPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/lmia"}
                        title="View all Applicants"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${openTable === 5 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(5)}
                      title={openTable === 5 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(5)}
                    </Link>
                  </div>
                </div>
                <LimiaStatusTable
                  heading={openTable === 5 ? "" : "Dashboard"}
                  filter_by_time={lima}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  lmia={openTable === 5 ? "" : "yes"}
                  response={openTable === 5 ? "" : "lima"}
                  pageNo={lmiaPageNo}
                  setpageNo={setLmiaPageNo}
                />
              </div>
            </div> : null}

            {/* <!-- Recent Follow- --> */}
            {tables.followupTable ? <div
              id="table6"
              className={openTable === 6 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0">Latest notes</h3>
                  <Link
                    className={`text-dark mx-5 ${openTable === 6 ? "open" : ""
                      }`}
                    to=""
                    onClick={() => toggleTable(6)}
                    title={openTable === 6 ? "Minimize" : "Maximize"}
                  >
                    {getIcon(6)}
                  </Link>
                  {/* <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="followup"
                        value={followup}
                        id="followup"
                        onChange={(e) => setFollowUP(e.target.value)}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/followup"}
                        title="View All Followup"
                      >
                        View All
                      </Link>
                    </div>
                  </div> */}
                </div>
                {/* <FollowUpDashBoard
                  heading={"Dashboard"}
                  filter_by_time={followup}
                /> */}
                <Addfollowup
                  userId={""}
                  userType={"employee"}
                  assigned_by_id={adminId}
                  setApiCall={setApiCall}
                  page={"dashboard"}
                />
              </div>
            </div> : null}

            {/* <!-- Recent Activity- --> */}
            {tables.activityTable ? <div
              id="table8"
              className={openTable === 8 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Activity
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="activity"
                        value={activity}
                        id="activity"
                        onChange={(e) => {
                          setActivity(e.target.value);
                          setActivityNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${openTable === 8 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(8)}
                      title={openTable === 8 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(8)}
                    </Link>
                  </div>
                </div>
                <ActivityTable
                  heading={openTable === 8 ? "" : "Dashboard"}
                  filter_by_time={activity}
                  setpageNo={setActivityNo}
                  pageNo={activityNo}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                />
              </div>
            </div> : null}
            {/* <!-- Recent Interviews- --> */}
            {tables.interviewTable ? <div
              id="table3"
              className={openTable === 3 ? "col-md-12" : "col-md-6"}
            >
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Interview
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="interview"
                        value={interview}
                        id="interview"
                        onChange={(e) => {
                          setInterview(e.target.value);
                          setInterviewPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Time Duration</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/interview"}
                        title="View All Interview"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${openTable === 3 ? "open" : ""
                        }`}
                      to=""
                      onClick={() => toggleTable(3)}
                      title={openTable === 3 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(3)}
                    </Link>
                  </div>
                </div>
                <Interview
                  heading={openTable === 3 ? "" : "Dashboard"}
                  filter_by_time={interview}
                  pageNo={interviewPageNo}
                  setpageNo={setInterviewPageNo}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  openTable={openTable}
                />
              </div>
            </div> : null}
          </div>
        </div>
        {/* <!--Mange Table sidebar  --> */}
        <div className={` col-md-3 col-lg-3 col-sm-2 py-2 h-75vh  bg-white  ${isSidebarOpen
          ? ""
          : " d-none"}`}>
          <div
            className={`position-fixed  ${isSidebarOpen
              ? " show"
              : ""}`
            }
            style={{
              transition: "width .5s",
              width: "100%",
              // zIndex: "9999",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            <div className="right_side">
              <div className=" d-flex align-items-center p-3 px-5 justify-content-between">
                <h4 className="font-size-5 font-weight-bold m-0 border-bottom text-uppercase px-5">
                  Manage Tables
                </h4>
                <i
                  style={{ fontSize: "22px" }}
                  className="fas fa-times text-dark ml-4"
                  onClick={() => setIsSidebarOpen(false)}
                ></i>
              </div>
              <div
                className="row   px-5 ">
                {/* Sidebar */}
                {isSidebarOpen && (
                  <div
                    className={
                      `font-size-5 text-wrap`
                    }
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {tables && Object.keys(tables || []).map((tableName, index) => (
                      <div className="text-dark text-decoration-none d-flex justify-content-between" key={index}>
                        <label>
                          <input
                            type="checkbox"
                            checked={tables[tableName] === 0 ? false : true}
                            onChange={() => handleMangeTableCheckboxChange(tableName)}
                          />
                          <span className="px-2 text-capitalize">{tableName === "jobTable" ? "Recent Added Job" : tableName === "employeeTable" ? "Recent Added Candidate" : tableName === "employerTable" ? "Recent Added Client" : tableName === "taskTable" ? "Recent Added Task" : tableName === "lmiaTable" ? "Recent Added LMIA" : tableName === "followupTable" ? "Recent Added Notes" : tableName === "activityTable" ? "Recent Added Activity" : "Recent Added Interview"}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default AdminDashboard;
