import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { DeleteFilter, GetFilter } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../common/sweetAlert";
import AddFilter from "../forms/admin/FilterForm";
function FilterList() {
  /*States */
  let [apiCall, setApiCall] = useState(false);
  const [filterData, setFilterData] = useState([]);
  /*delete states */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteChildId, setDeleteChildID] = useState();
  const [deleteName, setDeleteName] = useState("");

  /* Function to get the filter data*/
  const FilterData = async () => {
    try {
      let Data = await GetFilter();
      if (
        Data.data.message === "No data found" ||
        Data.data.data.length === 0
      ) {
        setFilterData([]);
      } else {
        setFilterData(Data.data.data);
        setApiCall(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Render function to get the filter data*/
  useEffect(() => {
    FilterData();
    if (apiCall === true) {
      setApiCall(false)
    }
  }, [apiCall]);

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e, f) => {
    setDeleteID(f);
    setDeleteChildID(e.id);
    setDeleteName(e.value);
    setDeleteAlert(true);
  };

  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteFilter(e, f) {
    /*Function to delete the filter */
    try {
      const responseData = await DeleteFilter(e, f);
      if (responseData.message === "List item has been deleted") {
        toast.error("Filter deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Filter List"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Filter List"} />
        <div>
          <ToastContainer />
        </div>
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Filter</h3>
                </div>
              </div>
              <div className="pt-7 rounded pb-9 px-5 ">
                <div className="row">
                  {/* <!-- Skill Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Skill
                        </h4>
                        <AddFilter
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          id={1}
                          setFilterData={setFilterData}
                          filterData={filterData}
                          filterType={"Skill"}
                        />
                        <ul className="row m-0 p-0">
                          {filterData.Skill && filterData.Skill.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Skill || []).map((data, i) => (
                              <React.Fragment key={i}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 1)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Industry Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Industry
                        </h4>
                        <AddFilter
                          id={4}
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          setFilterData={setFilterData}
                          filterData={filterData}
                          filterType={"Industry"}
                        />
                        <ul className="row m-0 p-0">
                          {filterData.Industry && filterData.Industry.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Industry || []
                            ).map((data, i) => (
                              <React.Fragment key={i}>
                                <li className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  {data.value}
                                  <Link onClick={() => ShowDeleteAlert(data, 4)} title="Delete">
                                    <i className="px-3 fa fa-times-circle" aria-hidden="true"></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))

                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Education Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Education
                        </h4>
                        <AddFilter
                          id={5}
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          setFilterData={setFilterData}
                          filterData={filterData}
                          filterType={"Education"} />
                        <ul className="row m-0 p-0">
                          {filterData.Education && filterData.Education.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Education || []).map((data,i) => (
                              <React.Fragment key={i}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 5)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Corporation Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Corporation
                        </h4>
                        <AddFilter id={6}
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          setFilterData={setFilterData}
                          filterData={filterData}
                          filterType={"Corporation"} />
                        <ul className="row m-0 p-0">
                          {filterData.Corporation && filterData.Corporation.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Corporation || []).map((data, i) => (
                              <React.Fragment key={i}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 6)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Language Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Language
                        </h4>
                        <AddFilter id={7}
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          setFilterData={setFilterData}
                          filterData={filterData}
                          filterType={"Language"} />
                        <ul className="row m-0 p-0">
                          {filterData.Language && filterData.Language.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Language || []).map((data,i) => (
                              <React.Fragment key={i}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 7)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Experience  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        Experience 
                        </h4>
                        <AddFilter  id={10} 
                          apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"Experience"} />
                       <ul className="row m-0 p-0">
                         {filterData.Experience && filterData.Experience.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Experience  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 10)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Applicant's types   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        Applicant's types 
                        </h4>
                        <AddFilter  id={11} 
                          apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"Interested"} />
                       <ul className="row m-0 p-0">
                         {filterData.Interested && filterData.Interested.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Interested  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 11)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Applicant's Categories   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        Applicant's Categories  
                        </h4>
                        <AddFilter  id={13}
                         apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"Applicantscategories"} />
                       <ul className="row m-0 p-0">
                         {filterData.Applicantscategories && filterData.Applicantscategories.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Applicantscategories  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 13)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Job types   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        Job types 
                        </h4>
                        <AddFilter  id={12} 
                          apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"JobType"} />
                       <ul className="row m-0 p-0">
                         {filterData.JobType && filterData.JobType.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.JobType  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 12)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Qualification   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        Qualification 
                        </h4>
                        <AddFilter  id={14} 
                        apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"Qualification"} />
                       <ul className="row m-0 p-0">
                         {filterData.Qualification && filterData.Qualification.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Qualification  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 14)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Salary   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        Salary 
                        </h4>
                        <AddFilter  id={15} 
                            apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"Salary"} />
                       <ul className="row m-0 p-0">
                         {filterData.Salary && filterData.Salary.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Salary  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 15)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA Status   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        LMIA Status 
                        </h4>
                        <AddFilter  id={16} 
                         apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LmiaStatus"} />
                       <ul className="row m-0 p-0">
                         {filterData.LmiaStatus && filterData.LmiaStatus.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LmiaStatus  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 16)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA's SubStage Onboarding    Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        LMIA's SubStage Onboarding  
                        </h4>
                        <AddFilter  id={17} 
                        apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LimaSubStagesOnboarding"} />
                       <ul className="row m-0 p-0">
                         {filterData.LimaSubStagesOnboarding && filterData.LimaSubStagesOnboarding.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LimaSubStagesOnboarding  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 17)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA's SubStage Advertisements    Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                        LMIA's SubStage Advertisements  
                        </h4>
                        <AddFilter  id={18} 
                        apiCall={apiCall}
                         setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LimaSubStagesAdvertisements"} />
                       <ul className="row m-0 p-0">
                         {filterData.LimaSubStagesAdvertisements && filterData.LimaSubStagesAdvertisements.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LimaSubStagesAdvertisements  || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 18)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA's SubStages Documentation    Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          LMIA's SubStages Documentation
                        </h4>
                        <AddFilter  id={19} 
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LimaSubStagesDocumentation"} />
                       <ul className="row m-0 p-0">
                         {filterData.LimaSubStagesDocumentation && filterData.LimaSubStagesDocumentation.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LimaSubStagesDocumentation || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 19)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA's SubStage CandidatePlacement     Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          LMIA's SubStage Candidate Placement
                        </h4>
                        <AddFilter  id={20} 
                         apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LimaSubStagesCandidatePlacement"} />
                       <ul className="row m-0 p-0">
                         {filterData.LimaSubStagesCandidatePlacement && filterData.LimaSubStagesCandidatePlacement.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LimaSubStagesCandidatePlacement || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 20)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA's SubStage Submission      Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          LMIA's SubStage Submission
                        </h4>
                        <AddFilter  id={21} 
                         apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LimaSubStagesSubmission"} />
                       <ul className="row m-0 p-0">
                         {filterData.LimaSubStagesSubmission && filterData.LimaSubStagesSubmission.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LimaSubStagesSubmission || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 21)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- LMIA's SubStage Decision      Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          LMIA's SubStage Decision
                        </h4>
                        <AddFilter id={22} 
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"LimaSubStagesDecision"} />
                       <ul className="row m-0 p-0">
                         {filterData.LimaSubStagesDecision && filterData.LimaSubStagesDecision.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.LimaSubStagesDecision || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 22)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Visa Status Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Visa Status
                        </h4>
                        <AddFilter id={23}  apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"VisaStatus"} />
                       <ul className="row m-0 p-0">
                         {filterData.VisaStatus && filterData.VisaStatus.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.VisaStatus || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 23)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Visa's SubStages Onboard  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Visa's SubStages Onboard
                        </h4>
                        <AddFilter  id={24}
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"VisaSubStagesOnboard"} />
                       <ul className="row m-0 p-0">
                         {filterData.VisaSubStagesOnboard && filterData.VisaSubStagesOnboard.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.VisaSubStagesOnboard || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 24)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Visa's SubStages Documentation   Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Visa's SubStages Documentation
                        </h4>
                        <AddFilter id={25} 
                         apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"VisaSubStagesDocumentation"} />
                       <ul className="row m-0 p-0">
                         {filterData.VisaSubStagesDocumentation && filterData.VisaSubStagesDocumentation.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.VisaSubStagesDocumentation || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 25)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Visa's SubStages File Preparation Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Visa's SubStages File Preparation
                        </h4>
                        <AddFilter  id={26} 
                         apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"VisaSubStagesFilePreparation"} />
                       <ul className="row m-0 p-0">
                         {filterData.VisaSubStagesFilePreparation && filterData.VisaSubStagesFilePreparation.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.VisaSubStagesFilePreparation || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 26)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Visa's SubStages File Review  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Visa's SubStages File Review
                        </h4>
                        <AddFilter  id={27}
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"VisaSubStagesFileReview"} />
                       <ul className="row m-0 p-0">
                         {filterData.VisaSubStagesFileReview && filterData.VisaSubStagesFileReview.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.VisaSubStagesFileReview || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 27)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Visa's SubStages File Decision  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Visa's SubStages File Decision
                        </h4>
                        <AddFilter  id={28}
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"VisaSubStagesFileDecision"} />
                       <ul className="row m-0 p-0">
                         {filterData.VisaSubStagesFileDecision && filterData.VisaSubStagesFileDecision.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.VisaSubStagesFileDecision || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 28)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Canadian Candidate Work Status  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Canadian Candidate Work Status
                        </h4>
                        <AddFilter  id={29}  apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"CanadianCandidateWorkStatus"} />
                       <ul className="row m-0 p-0">
                         {filterData.CanadianCandidateWorkStatus && filterData.CanadianCandidateWorkStatus.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.CanadianCandidateWorkStatus || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 29)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Employee Document  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Employee Document
                        </h4>
                        <AddFilter  id={30} 
                         apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"EmployeeDocument"} />
                       <ul className="row m-0 p-0">
                         {filterData.EmployeeDocument && filterData.EmployeeDocument.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.EmployeeDocument || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 30)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Employer Document  Filter List --> */}
                  {/* <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Employer Document
                        </h4>
                        <AddFilter  id={31} 
                         apiCall={apiCall}
                        setApiCall={setApiCall}
                         setFilterData={setFilterData}
                         filterData={filterData}
                         filterType={"EmployerDocument"} />
                       <ul className="row m-0 p-0">
                         {filterData.EmployerDocument && filterData.EmployerDocument.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.EmployerDocument || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 31)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Delete filter sweet alert- --> */}
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteFilter(deleteId, deleteChildId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
        </div>
      </div>
      ;
    </>
  );
}

export default FilterList;
