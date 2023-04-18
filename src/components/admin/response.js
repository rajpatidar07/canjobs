import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import Addfollowup from "../forms/admin/addfollowup";
import {
  getAllFollowUpData,
  getAllEmployer,
  GetAllResponse,
} from "../../api/api";
import moment from "moment";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import AddInterview from "../forms/admin/addInterview.js";
import LmiaStatus from "../forms/admin/lmiastatus";
function JobResponse(props) {
  /*show modal and data states */
  let [followup, setFollowUp] = useState(false);
  let [interview, setInterview] = useState(false);
  let [limia, setLimia] = useState(false);
  let [response, setResponseData] = useState([]);
  let [resData, setResData] = useState("");
  const [company, setCompany] = useState([]);
  /*Filter and search state */
  // const [jobFilterValue, setJobTypeFilterValue] = useState("");
  // const [companyFilterValue, setCompanyTypeFilterValue] = useState("");
  // const [experienceTypeFilterValue, setExperienceTypeFilterValue] =
  // useState("");
  // const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);
  const [jobId] = useState(props.responseId);
  /* Function to get the Response data*/
  const ResponseData = async () => {
    const userData = await GetAllResponse(jobId);

    //   jobFilterValue,
    //   companyFilterValue,
    //   experienceTypeFilterValue,
    //   search,
    //   currentPage,
    //   recordsPerPage,
    //   columnName,
    //   sortOrder
    // );
    setResponseData(userData.data.data);
    setTotalData(userData.total_rows);
  };
  /* Function to get Employer data*/
  const CompnayData = async () => {
    const userData = await getAllEmployer();
    setCompany(userData.data);
    // //console.log((userData);
  };

  /*Render function to get the Response*/
  useEffect(() => {
    CompnayData();
    ResponseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // jobFilterValue,
    // companyFilterValue,
    // experienceTypeFilterValue,
    // search,
    // currentPage,
    // recordsPerPage,
    // columnName,
    // sortOrder,
    // followup,
    jobId,
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

  console.log(resData);

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
  // const Job = (response.filter||[])(
  //   (thing, index, self) => index === self.findIndex((t) => t.job_title === thing.job_title)
  // );

  return (
    <div className="response_main_div">
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
      />
      <div className="response__container">
        <div className="container p-0">
          <div className="mb-8">
            <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
              {/* <div className="response_filters mb-2 align-items-center">
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
                      <p className="input_label">Filter by Job:</p>
                      <div className="select_div">
                        <select
                          name="job"
                          id="job"
                          value={jobFilterValue}
                          onChange={(e) => setJobTypeFilterValue(e.target.value)}
                          className=" form-control"
                        >
                          <option value="">Select Job</option>
                          {(Job || []).map((job, i) => (
                            <option value={job.job_title} key={i}>
                              {job.job_title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
                      <p className="input_label">Filter by Company:</p>
                      <div className="select_div">
                        <select
                          name="company_name"
                          id="company_name"
                          value={companyFilterValue}
                          onChange={(e) =>
                            setCompanyTypeFilterValue(e.target.value)
                          }
                          className=" form-control"
                        >
                          <option value="">Select Company</option>
                          {(company || []).map((company) => (
                            <option
                              value={company.company_name}
                              key={company.company_id}
                            >
                              {company.company_name}
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
                              {ex === "Fresher" || ex === "Other" ? "" : "Years"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="float-md-right mt-6"></div>
                  </div>
                </div> */}
              <div className="table-responsive ">
                <table className="table table-striped main_data_table_inn">
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
                            <Link to="" onClick={() => addFollow(res)}>
                              <i className=" fas fa-plus text-gray px-2"></i>
                            </Link>
                            <Link to="" onClick={() => addnterview(res)}>
                              <i className="fa fa-podcast text-gray px-2"></i>
                            </Link>
                            <Link to="">
                              <span
                                className=" text-danger"
                                onClick={() => addLimia(res)}
                              >
                                <i className="fas fa-stream text-gray"></i>
                              </span>
                            </Link>
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
