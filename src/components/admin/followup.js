import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import Addfollowup from "../forms/admin/addfollowup";
import { getAllFollowUpData } from "../../api/api";
import moment from "moment";
import Pagination from "../common/pagination";

function Followup() {
  /*show modal and data states */
  let [followup, setFollowUp] = useState(false);
  let [response, setResponseData] = useState([]);
  let [resData, setResData] = useState("");
  /*Filter and search state */
  const [jobFilterValue, setJobTypeFilterValue] = useState("");
  const [companyFilterValue, setCompanyTypeFilterValue] = useState("");
  const [experienceTypeFilterValue, setExperienceTypeFilterValue] =
    useState("");
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);
  /* Function to get the Response data*/
  const ResponseData = async () => {
    const userData = await getAllFollowUpData(
      jobFilterValue,
      companyFilterValue,
      experienceTypeFilterValue,
      search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    setResponseData(userData.data);
    setTotalData(userData.total_rows);
  };

  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    jobFilterValue,
    companyFilterValue,
    experienceTypeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    followup,
  ]);

  /*Function to open add follow up modal */
  const addFollow = (e) => {
    setFollowUp(true);
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
  const Job = response.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.job_title === thing.job_title)
  );
  /*Company name array to filter*/
  const Company = response.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.company_name === thing.company_name)
  );
  /*Experience name array to filter*/
  const Experience = response.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.experience === thing.experience)
  );

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <div className="dashboard-main-container mt-24" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Follow Up</h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2  ">
                    <input
                      required
                      type="text"
                      className="form-control col-6"
                      placeholder={"Search Category"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <select
                        name="job"
                        id="job"
                        value={jobFilterValue}
                        onChange={(e) => setJobTypeFilterValue(e.target.value)}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">select job</option>
                        {(Job || []).map((job, i) => (
                          <option value={job.job_title} key={i}>
                            {job.job_title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by company:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="company_name"
                        id="company_name"
                        value={companyFilterValue}
                        onChange={(e) =>
                          setCompanyTypeFilterValue(e.target.value)
                        }
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">select company</option>
                        {(Company || []).map((job, i) => (
                          <option value={job.company_name} key={i}>
                            {job.company_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Experience:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="experience"
                        id="experience"
                        value={experienceTypeFilterValue}
                        onChange={(e) =>
                          setExperienceTypeFilterValue(e.target.value)
                        }
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">select Experience</option>
                        {(Experience || []).map((job, i) => (
                          <option value={job.experience} key={i}>
                            {job.experience}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
                    <Addfollowup
                      show={followup}
                      resData={resData}
                      close={() => setFollowUp(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  <table className="table table-striped">
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
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>No Data Found</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      ) : (
                        (response || []).map((res) => (
                          <tr
                            className="border border-color-2"
                            key={res.employee_id}
                          >
                            <th className="pl-6 border-0 py-7 pr-0  ">
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
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.name}(
                                {moment().diff(res.date_of_birth, "years")})
                                <br />
                                {res.gender}
                              </h3>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.experience} years <br />
                              </h3>
                            </th>
                            <th className=" border-0 py-7 ">
                              <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.job_title}
                              </div>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.company_name}
                              </h3>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                +{res.contact_no} <br /> {res.email}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                <span>{res.current_location}</span>
                                <span className="px-1">
                                  {res.currently_located_country}
                                </span>
                              </h3>
                            </th>
                            <th className=" py-7  min-width-px-100">
                              <Link to="" onClick={() => addFollow(res)}>
                                <span className=" fas fa-plus text-gray px-2"></span>
                              </Link>
                              {/* <Link to="">
                              <span className=" text-danger">
                                <i className="fa fa-trash"></i>
                              </span>
                            </Link> */}
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
        {/* {showJobDetails === true ? (
    <div className="dashboard-main-container mt-24 ">
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
          
          <JobDetailsBox />
        </div>
      </div>
    </div>
  ) : null} */}
      </div>
    </>
  );
}

export default Followup;
