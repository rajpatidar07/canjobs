import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import Addfollowup from "../forms/admin/addfollowup";
import { AddLimia, AddEmployeeDetails, GetAllResponse, GetFilter, AddUpdateVisa } from "../../api/api";
import moment from "moment";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import AddInterview from "../forms/admin/addInterview.js";
import LmiaStatus from "../forms/admin/lmiastatus";
import { toast, ToastContainer } from "react-toastify";
import ChangeJob from "../forms/admin/changeJobs";
import Loader from '../common/loader';
import VisaStatus from "../forms/user/visaStatus";
import DocumentModal from "../forms/admin/DocumentModal";
function JobResponse(props) {
  /*show modal and data states */
  let [documentModal, setDocumentModal] = useState(false);
  let [showVisaModal, setVisaModal] = useState(false);
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [apiCall, setApiCall] = useState(props.apiCall);
  let [followup, setFollowUp] = useState(false);
  let [interview, setInterview] = useState(false);
  let [lmia, setLimia] = useState(false);
  let [response, setResponseData] = useState([]);
  let [resData, setResData] = useState("");
  let [searchError, setSearchError] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [employeeId, setemployeeId] = useState();
  /*Filter and search state */
  const [skillFilterValue, setSkillFilter] = useState("");
  const [limiaFilterValue, setLmiaFilter] = useState("");
  const [experienceTypeFilterValue, setExperienceTypeFilterValue] =
    useState("");
  let [Json, setJson] = useState([]);
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
  let [changeJob, setChangeJob] = useState(false)

  /*Function to get the jSon */
  const JsonData = async () => {
    let Json = await GetFilter();
    setJson(Json.data.data);
  };
  if (apiCall === true && showChangeJobModal === false && changeJob === true && props.setApiCall) {
    props.setApiCall(true)
  }

  /* Function to get the Response data*/
  const ResponseData = async () => {
    setIsLoading(true)
    const userData = await GetAllResponse(
      props.heading === "Manage Jobs" || user_type === "company"
        ? jobId
        : null,
      skillFilterValue,
      experienceTypeFilterValue,
      search,
      props.filter_by_time || skillFilterValue || search || experienceTypeFilterValue || sortOrder ? 1 : currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.filter_by_time,
      limiaFilterValue,
      props.status
    );
    if (userData.data.data.length === 0) {
      setResData([]);
      setResponseData([]);
      setIsLoading(false)
    } else {
      if (props.self === "yes") {
        setResponseData(userData.data.data.filter((item) => item.employee_status === "0"));
      } else {
        if(props.employee_id){
          setResponseData(userData.data.data.filter((item) => item.employee_status !== "0" && item.employee_id === props.employee_id));
        }else{
          setResponseData(userData.data.data.filter((item) => item.employee_status !== "0"));
        }
      }
      setTotalData(userData.data.total_rows);
      setIsLoading(false)
    }
  };

  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
    JsonData();
    if (apiCall === true || changeJob === true) {
      setApiCall(false);
      setChangeJob(false)
    }
  }, [
    skillFilterValue,
    experienceTypeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
    apiCall,
  ]);

  /*Search Onchange function to Search REsponse data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Category Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  }

  /*Function to Reserved Employee */
  const ReservedEmployee = async (e) => {
    // Api call to set employee reserved
    let data = {
      employee_id: e.employee_id,
      job_status: "1",
      posted_job_id: jobId
    }
    let response = await AddEmployeeDetails(data)
    if (response.message === 'Employee data updated successfully') {
      // Api call to set employee Visa
      let status = "pending"
      let VisaResponse = await AddUpdateVisa(e.employee_id, status)
      if (VisaResponse.data.message === "created successfully") {
        // Api call to set employee Limia
        const lmia = { lmia_status: "position approved" };
        let LimiaResponse = await AddLimia(lmia, e.employee_id, e.job_id);
        if (LimiaResponse.message === 'Data added successfully') {
          toast.success("Employee Reserved successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true)
        }
      }
    }
  };

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
  /* Function to show the single data to update visa*/
  const editVisa = (e) => {
    setVisaModal(true);
    setemployeeId(e);
  };
  /*Function to open add Document up modal */
  const AddDoucument = (e) => {
    setDocumentModal(true);
    setemployeeId(e);
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };

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
                props.heading === "Manage Jobs"
                  ? "response_filters mb-2 align-items-center"
                  : "align-items-center"
              }
            >
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Follow Up</h3>
              </div>
              <div className={props.heading === "Response" ||
                (props.heading === undefined && user_type === "admin") ?
                "row m-0 align-items-center" : "d-none"}>
                {props.heading === "" ? null : (
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search :</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Company / Name"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => {
                        onSearch(e);
                        setCurrentPage(1)
                      }}
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
                      onChange={(e) => {
                        setSkillFilter(e.target.value);
                        setCurrentPage(1)
                      }}
                      className=" form-control"
                    >
                      <option value="">Select Skil</option>
                      {(Json.Skill || []).map((skill) => (
                        <option value={skill.value} key={skill.id}>
                          {skill.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Filter by Skill:</p>
                  <div className="select_div">
                    <select
                      name="job"
                      id="job"
                      value={limiaFilterValue}
                      onChange={(e) => {
                        setLmiaFilter(e.target.value);
                        setCurrentPage(1)
                      }}
                      className=" form-control"
                    >
                      <option value="">Select LMIA</option>
                      {(Json.lmia || []).map((lmia) => (
                        <option value={lmia.value} key={lmia.id}>
                          {lmia.value}
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
                      onChange={(e) => {
                        setExperienceTypeFilterValue(e.target.value);
                        setCurrentPage(1)
                      }}
                      className="text-capitalize form-control"
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
              <small className="text-danger">{searchError}</small>
            </div>
          )}
          <div className="mb-8">
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
              <div className="table-responsive main_table_div">
                {isLoading ?
                  <Loader /> : <table
                    className={
                      props.heading === "Manage Jobs"
                        ? "table table-striped main_data_table_inn"
                        : "table table-striped main_data_table"
                    }
                  >
                    <thead>
                      <tr>
                        <th scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal">
                          EID
                        </th>
                        <th
                          scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("name");
                              setCurrentPage(1)
                            }}
                            className="text-gray"
                            title="Sort by Name"
                          >
                            Name
                          </Link>
                        </th>

                        {/* <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("job_title");
                              setCurrentPage(1)
                            }}
                            className="text-gray"
                            title="Sort by Job"
                          >
                            Job / Company
                          </Link>
                        </th> */}

                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("contact_no");
                                setCurrentPage(1)
                              }}
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
                              onClick={() => {
                                handleSort("current_location");
                                setCurrentPage(1)
                              }}
                              className="text-gray"
                              title="Sort by Address"
                            >
                              Address
                            </Link>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("experience");
                                setCurrentPage(1)
                              }}
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
                            onClick={() => {
                              handleSort("lmia_status");
                              setCurrentPage(1)
                            }}
                            className="text-gray"
                            title="Sort by LIMIA Status"
                          >
                            LMIA
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Visa
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Interview
                        </th>
                        {props.heading === "Dashboard" ||
                          user_type === "company" || props.self === "yes" ? (
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
                          <th className="bg-white"></th>
                          {props.heading === "Dashboard" ? (
                            <th className="bg-white">No Data Found</th>
                          ) : (
                            <th className="bg-white"></th>
                          )}
                          {props.heading === "Dashboard" ? (
                            <th className="bg-white"></th>
                          ) : (
                            <th className="bg-white text-center">No Data Found</th>
                          )}
                          <th className="bg-white"></th>
                          {props.heading === "Dashboard" ? (
                            ""
                          ) : (
                            <>
                              <th className="bg-white"></th>
                              <th className="bg-white"></th>
                              <th className="bg-white"></th>
                            </>
                          )}
                        </tr>
                      ) : (
                        (response || []).map((res, i) => (
                          ((props.response === "response") || (props.response === "self") ||
                            ((props.response === "visa" || props.response === "lmia") && res.job_status === "1")) ?
                            <tr className="" key={i}>
                              <th className="py-5 ">
                                {res.employee_id}
                              </th>
                              <th className=" py-5">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {res.name || res.gender || res.date_of_birth ? (
                                    <div className="d-flex profile_box gx-2">
                                      <div className="media  align-items-center">
                                        <div className="circle-36 mx-auto overflow-hidden">
                                          {res.profile_photo === null ? (
                                            <img
                                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                              alt=""
                                              className="w-100"
                                            />
                                          ) : (
                                            <img
                                              src={res.profile_photo}
                                              alt=""
                                              className="w-100"
                                            />
                                          )}
                                        </div>
                                      </div>

                                      <div className=" mb-0">
                                        <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                          {res.name}
                                        </p>
                                        <p className="text-gray font-size-2 m-0 text-capitalize">
                                          {res.gender === "female" ? "F" : "M"} ({res.marital_status + ", "}
                                          {/*Calculation of age from date of birth*/}
                                          {moment().diff(
                                            res.date_of_birth,
                                            "years"
                                          )}
                                          Y)
                                        </p>
                                        {res.created_by_admin === ("0"||0) ? (
                                          <span className="bg-info text-white web_tag">
                                            Web
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                      NA
                                    </span>
                                  )}
                                </h3>
                              </th>

                              {/* <th className="py-5 ">
                              <p className="m-0 text-black-2 font-weight-semibold text-capitalize">
                                {res.job_title}
                              </p>
                              <p className="font-size-3 font-weight-normal m-0 text-capitalize">
                                {res.company_name}
                              </p>
                            </th> */}

                              {props.heading === "Dashboard" ? (
                                ""
                              ) : (
                                <th className=" py-5">
                                  <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    {res.contact_no || res.email ? (
                                      <>
                                        <p className="font-size-3 font-weight-normal m-0">
                                          <Link className="text-dark" to={`tel:${res.contact_no}`}>
                                            {`+${res.contact_no}`}
                                          </Link>
                                        </p>
                                        <p className="font-size-3 font-weight-normal m-0">
                                          <Link className="text-dark" to={`mailto:${res.email}`}>
                                            {res.email}
                                          </Link>
                                        </p>
                                      </>
                                    ) : (
                                      <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                        NA
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
                                        NA
                                      </span>
                                    )}
                                  </h3>
                                </th>
                              )}
                              {props.heading === "Dashboard" ? (
                                ""
                              ) : (
                                <th className=" py-5">
                                  <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    {res.experience ? (
                                      res.experience
                                    ) : (
                                      <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                        NA
                                      </span>
                                    )}
                                  </h3>
                                </th>
                              )}
                              <th className=" py-5">
                                <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  <Link to="/lmia" state={{ id: res.job_id }}>
                                    {res.lmia_status === "limia rejected" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-danger">
                                        Lmia Reject
                                      </span>
                                    ) : res.lmia_status === "lmia approved" ? (
                                      <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                        Lmia Approved
                                      </span>
                                    ) : res.lmia_status === "lmia partial" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-gray">
                                        Lmia partial
                                      </span>
                                    ) : res.lmia_status === "payment done" ? (
                                      <span className="px-3 py-2 badge badge-pill bg-primary-opacity-9 text-white">
                                        Payment done
                                      </span>
                                    ) : res.lmia_status === "interview done" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-warning">
                                        Interview done
                                      </span>
                                    ) : res.lmia_status === "position approved" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-dark">
                                        Position approved
                                      </span>
                                    ) : (
                                      <span>NA</span>
                                    )}</Link>
                                </div>
                              </th>
                              <th className="  py-5 ">
                                <p className="font-size-3 font-weight-normal mb-0">
                                  {res.visa_status}
                                </p>
                              </th>
                              <th className="  py-5 ">
                                <p className="font-size-3 font-weight-normal mb-0">
                                  {res.status === "COMPLETE" ? (
                                    <span className="p-1 badge badge-pill bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">Complete</span>
                                  ) : (
                                    <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                      Scheduled
                                    </span>
                                  )}
                                </p>
                              </th>
                              {props.heading === "Dashboard" ||
                                user_type === "company" || props.self === "yes" ? (
                                ""
                              ) : (
                                <th className="py-5  min-width-px-100">
                                  <div
                                    className="btn-group button_group"
                                    role="group"
                                    aria-label="Basic example"
                                  >
                                    <button
                                      className={res.job_status === "0" ? "btn btn-outline-info action_btn" : " d-none"}
                                      onClick={() => ReservedEmployee(res)}
                                      title="Reserved Employee"
                                    >
                                      Reserved
                                    </button>

                                    <button
                                      className={props.response === "visa" || res.job_status === "0" ? "d-none" : "btn btn-outline-info action_btn text-gray"}
                                      onClick={() => addLimia(res)}
                                      title="Update LMIA status"
                                    >
                                      LMIA
                                    </button>
                                    <button
                                      className={props.response === "lmia" || res.job_status === "0" ? "d-none" : "btn btn-outline-info action_btn"}
                                      onClick={() => editVisa(res)}
                                      title="Update Visa status"
                                    >
                                      <span className="fab fa-cc-visa text-gray px-2"></span>
                                    </button>
                                    <button
                                      className={res.job_status === "0" ? "d-none" : "btn btn-outline-info action_btn"}
                                      title="Employee LMIA"
                                    >
                                      <Link to="/lmia" state={{id:res.job_id,employee_id : res.employee_id}}>
                                      <span className="fab fa-cc-visa text-gray px-2"></span>
                                      </Link>
                                    </button>
                                    <button
                                      className={res.job_status === "0" ? "d-none" : "btn btn-outline-info action_btn"}
                                      title="Employee Visa"
                                    >
                                      <Link to="/visa" state={{id:res.employee_id}}>
                                      <span className="fab fa-cc-visa text-gray px-2"></span>
                                      </Link>
                                    </button>
                                    <button
                                      className={(props.response === "visa" || props.response === "lmia") && res.job_status === "1" ? "btn btn-outline-info action_btn" : "d-none"}
                                      onClick={() =>
                                        AddDoucument(res.employee_id)
                                      }
                                      title="Documents"
                                    >
                                      <span className="fas fa-file text-gray"></span>
                                    </button>
                                    <button
                                      className={props.response === "visa" || props.response === "lmia" ? "d-none" : "btn btn-outline-info action_btn"}
                                      onClick={() => addFollow(res)}
                                      title=" Add Follow Up"
                                    >
                                      <i className=" fas fa-plus text-gray px-2"></i>
                                    </button>
                                    <button
                                      className={props.response === "visa" || props.response === "lmia" ? "d-none" : "btn btn-outline-info action_btn"}
                                      onClick={() => addnterview(res)}
                                      title=" Add Interview"
                                      disabled={res.status === "complete" ? true : false}
                                    >
                                      <i className="fa fa-calendar text-gray px-2"></i>
                                    </button>
                                    <button
                                      className={props.response === "visa" || props.response === "lmia" ? "d-none" : "btn btn-outline-info action_btn text-gray"}
                                      onClick={() => editJob(res)}
                                      title="Change Job"
                                      disabled={props.total_applicants >= props.role_category ? true : false}
                                    >
                                      <i className="fas fa-briefcase"></i>
                                    </button>
                                  </div>
                                </th>
                              )}
                            </tr>
                            : null
                        ))
                      )}
                    </tbody>
                  </table>}
              </div>
              <div className="pt-2">
                <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage} total={totalData} count={response.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {documentModal ? (
        <DocumentModal
          show={documentModal}
          close={() => setDocumentModal(false)}
          employee_id={employeeId}
        />
      ) : null}
      {followup ? (
        <Addfollowup
          show={followup}
          job_id={jobId}
          resData={resData}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => {
            setFollowUp(false);
            setResData("");
          }}
        />
      ) : null}
      {showVisaModal ? (
        <VisaStatus
          show={showVisaModal}
          employeeData={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setVisaModal(false)}
        />
      ) : null}
      {interview ? (
        <AddInterview
          show={interview}
          job_id={jobId}
          resData={resData}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => {
            setInterview(false);
            setResData("");
          }}
        />
      ) : null}
      {lmia ? (
        <LmiaStatus
          show={lmia}
          resData={resData}
          apiCall={apiCall}
          setApiCall={setApiCall}
          job={"no"}
          close={() => {
            setLimia(false);
            setResData("");
          }}
        />
      ) : null}
      {showChangeJobModal ? (
        <ChangeJob
          resData={resData}
          close={() => {
            setShowChangeJobModal(false);
            setResData("");
          }}
          apiCall={apiCall}
          setApiCall={setApiCall}
          job_id={jobId}
          show={showChangeJobModal}
          status={0}
          setChangeJob={setChangeJob}
        />
      ) : null}
    </div>
  );
}

export default JobResponse;
