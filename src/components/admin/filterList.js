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
                        />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Skill || []).map((data, i) => (
                              <React.Fragment key={data.id}>
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={4} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Industry || []).map((data, i) => (
                              <React.Fragment key={data.id}>
                                <li className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 4)}
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
                  {/* <!-- Education Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Education
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={5} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Education || []).map((data) => (
                              <React.Fragment key={data.id}>
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={6} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Corporation || []).map((data, i) => (
                              <React.Fragment key={data.id}>
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={7} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Language || []).map((data) => (
                              <React.Fragment key={data.id}>
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={10} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={11} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={13} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={12} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={14} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={15} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={16} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={17} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={18} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={19} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={20} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={21} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={22} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={23} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={24} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={25} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={26} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={27} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={28} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={29} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={30} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
                        <AddFilter setApiCall={() => setApiCall(true)} id={31} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
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
