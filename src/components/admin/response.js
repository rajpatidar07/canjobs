import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import Addfollowup from "../forms/admin/addfollowup";
import { getAllEmployer, GetAllResponse } from "../../api/api";
import moment from "moment";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import AddInterview from "../forms/admin/addInterview.js";
import LmiaStatus from "../forms/admin/lmiastatus";
import { ToastContainer, toast } from "react-toastify";
import ChangeJob from "../forms/admin/changeJobs";
function JobResponse(props) {
  /*show modal and data states */
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [followup, setFollowUp] = useState(false);
  let [interview, setInterview] = useState(false);
  let [limia, setLimia] = useState(false);
  let [response, setResponseData] = useState([]);
  let [resData, setResData] = useState("");
  const [company, setCompany] = useState([]);
  /*Filter and search state */
  const [skillFilterValue, setSkillFilter] = useState("");
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [experienceTypeFilterValue, setExperienceTypeFilterValue] =
    useState("");
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);
  const [jobId, setJobId] = useState(props.responseId);
  /* Function to get the Response data*/
  const ResponseData = async () => {
    const userData = await GetAllResponse(
      jobId,
      skillFilterValue,
      educationFilterValue,
      experienceTypeFilterValue,
      search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    setResponseData(userData.data.data);
    setTotalData(userData.data.total_rows);
    const CompanyData = await getAllEmployer();
    setCompany(CompanyData.data);
  };

  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    skillFilterValue,
    educationFilterValue,
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
  ]);

  /*Function to open add follow up modal */
  const addFollow = (e) => {
    setFollowUp(true);
    setResData(e);
  };
  /*Function to open add Interview up modal */
  const addnterview = (e) => {
    setInterview(true);
    setResData(e);
  };
  /*Function to open add Limia up modal */
  const addLimia = (e) => {
    setLimia(true);
    setResData(e);
  };
  /* Function to show the single data to update job */
  const editJob = (e) => {
    // e.preventDefault();
    setShowChangeJobModal(true);
    setResData(e);
  };

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);
  /*Sorting Function by name */
  let sortByNameClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Experience */
  let sortByExperienceClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("experience");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("experience");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Job */
  let sortByJobClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("job_title");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("job_title");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Company */
  let sortByCompanyClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("company_name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("company_name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Contact */
  let sortByContactClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("contact_no");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("contact_no");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Address */
  let sortByAddressClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("current_location");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("current_location");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Job array to filter*/
  // const Job = (response.filter || [])(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.job_title === thing.job_title)
  // );

  return (
    <div
      className={
        props.heading === "Manage Follow-ups"
          ? "response_main_div"
          : "site-wrapper overflow-hidden bg-default-2"
      }
    >
      {props.heading !== "Manage Follow-ups" ? (
        <>
          {/* <!-- Header Area --> */}
          <AdminHeader heading={"Response"} />
          {/* <!-- navbar- --> */}
          <AdminSidebar heading={"Response"} />
          <ToastContainer />{" "}
        </>
      ) : null}
      <Addfollowup
        show={followup}
        job_id={jobId}
        resData={resData}
        close={() => setFollowUp(false)}
      />
      <AddInterview
        show={interview}
        job_id={jobId}
        resData={resData}
        close={() => setInterview(false)}
      />
      <LmiaStatus
        show={limia}
        job_id={jobId}
        resData={resData}
        close={() => setLimia(false)}
      />{" "}
      <ChangeJob
        resData={resData}
        close={() => {
          setShowChangeJobModal(false);
        }}
        job_id={jobId}
        show={showChangeJobModal}
      />
      <div
        className={
          props.heading === "Manage Follow-ups"
            ? "response__container"
            : "dashboard-main-container mt-20"
        }
      >
        <div
          className={
            props.heading === "Manage Follow-ups"
              ? "container p-0"
              : "container"
          }
        >
          <div className="mb-8" /*"mb-18" */>
            <div
              className={
                props.heading === "Manage Follow-ups"
                  ? "bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5"
                  : ""
              }
            >
              <div
                className={
                  props.heading === "Manage Follow-ups"
                    ? "response_filters mb-2 align-items-center"
                    : "mb-8 align-items-center"
                }
              >
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Follow Up</h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Filter by Company:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Category"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
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
                  <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
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
                          onClick={sortByNameClick}
                          className="text-gray"
                        >
                          Name
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="pl-0 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={sortByExperienceClick}
                          className="text-gray"
                        >
                          Experience
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={sortByJobClick}
                          className="text-gray"
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
                          onClick={sortByCompanyClick}
                          className="text-gray"
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
                          onClick={sortByContactClick}
                          className="text-gray"
                        >
                          Contact
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={sortByAddressClick}
                          className="text-gray"
                        >
                          Address
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalData === 0 ? (
                      <tr>
                        <td className="bg-white">No Data Found</td>
                      </tr>
                    ) : (
                      (response || []).map((res) => (
                        <tr className="" key={res.apply_id}>
                          <th className="pl-5 py-5 pr-0   ">
                            <div className="media  align-items-center">
                              <div className="circle-36 mx-auto">
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
                              {res.name}(
                              {moment().diff(res.date_of_birth, "years")})
                              <br />
                              {res.gender}
                            </h3>
                          </th>
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {res.experience} years <br />
                            </h3>
                          </th>
                          <th className="py-5 ">
                            <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {res.job_title}
                            </div>
                          </th>
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {res.company_name}
                            </h3>
                          </th>
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              +{res.contact_no} <br /> {res.email}
                            </h3>
                          </th>
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              <span>{res.current_location}</span>
                              <span className="px-1">
                                {res.currently_located_country}
                              </span>
                            </h3>
                          </th>
                          <th className="py-5  min-width-px-100">
                            {" "}
                            <div
                              className="btn-group button_group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <button
                                className="btn btn-outline-info action_btn"
                                onClick={() => addFollow(res)}
                              >
                                <i className=" fas fa-plus text-gray px-2"></i>
                              </button>
                              <button
                                className="btn btn-outline-info action_btn"
                                onClick={() => addnterview(res)}
                              >
                                <i className="fa fa-podcast text-gray px-2"></i>
                              </button>
                              <button
                                className="btn btn-outline-info action_btn text-gray"
                                onClick={() => addLimia(res)}
                              >
                                LIMIA
                              </button>
                              <button
                                className="btn btn-outline-info action_btn text-gray"
                                onClick={() => editJob(res)}
                              >
                                <i className="fas fa-briefcase"></i>
                              </button>
                            </div>
                          </th>
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
