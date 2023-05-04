import React, { useState, useEffect } from "react";
import EmployeeFooter from "../common/footer";
import Header from "../common/header";
import SearchForm from "../common/search_form";
import AddJobModal from "../forms/employer/job";
import JobBox from "../common/jobbox";
import { ToastContainer } from "react-toastify";
import { getJson } from "../../api/api";
import FilterJson from "../json/filterjson";
import { Link } from "react-router-dom";
function ManageJobs() {
  let [showAddJobModal, setShowAddJobModal] = useState(false);
  let [jobId, setJobId] = useState();
  let [filter, SetFilter] = useState([]);
  /*Filter states */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");

  /* Function to get the JSON data*/
  const FilterData = async () => {
    const Json = await getJson();
    if (filter.length === 0) {
      SetFilter([]);
    } else {
      SetFilter(Json);
    }
  };

  const editJob = (e) => {
    // e.preventDefault();
    setShowAddJobModal(true);
    setJobId(e);
  };
  useEffect(() => {
    FilterData();
  }, [showAddJobModal, jobId]);

  // const Skill = Object.keys(filter.Skill).map((key) => {
  //   return { id: key, name: filter.Skill[key] };
  // });
  // console.log(filter);

  return (
    <>
      <div>
        <ToastContainer />
        <Header />
        {/* <!-- Main Content Start --> */}
        <div className="bg-black-2 mt-15 mt-lg-18 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 translateY-25  pb-10">
                {/* <!-- form --> */}
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-12">
                {/* <h2 className="font-size-8 mb-6">
                  You’re searching "UI Designer"
                </h2> */}
                <form className="mb-8">
                  <div className="d-flex align-items-center justify-content-space-between">
                    <div className="search-filter from-group d-flex align-items-center flex-wrap">
                      <div className="mr-5 mb-5 filter_input_div">
                        <select
                          name="category"
                          id="category"
                          value={categoryFilterValue}
                          /*Category Onchange function to filter the data */
                          onChange={(e) =>
                            setCategoryFilterValue(e.target.value)
                          }
                          className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                        >
                          {(FilterJson.category || []).map((cat, i) => (
                            <option key={i} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mr-5 mb-5 filter_input_div">
                        <select
                          name="skill"
                          id="skill"
                          value={SkillFilterValue}
                          /*Skill Onchange function to filter the data */
                          onChange={(e) => setSkillFilterValue(e.target.value)}
                          className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                        >
                          <option data-display="Salary Range">
                            Job Skills
                          </option>
                          <option value="">Select Skill</option>
                          {(FilterJson.keyskill || []).map((data, i) => {
                            return (
                              <option value={data} key={i}>
                                {data}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="mr-5 mb-5 filter_input_div">
                        <select
                          name="job_type"
                          id="job_type"
                          value={jobSwapFilterValue}
                          /*Job Onchange function to filter the data */
                          onChange={(e) =>
                            setJobSwapFilterValue(e.target.value)
                          }
                          className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                        >
                          <option data-display="Experience Level ">
                            Job type
                          </option>
                          {(FilterJson.job_type || []).map((job_type) => (
                            <option key={job_type} value={job_type}>
                              {job_type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className=" mx-2 float-left pb-5">
                      <button
                        onClick={() => editJob("0")}
                        className="btn btn-secondary text-uppercase btn-medium w-10 h-px-48 rounded-3 mr-4  "
                        type="button"
                      >
                        Add jobs
                      </button>
                    </div>
                  </div>
                </form>
                <div>
                  {/* <div className="d-flex align-items-center justify-content-between mx-2">
                    <h5 className="font-size-4 font-weight-normal text-gray">
                    Showing
                      <span className="text-black-2">120</span> matched jobs
                    </h5>
                  </div> */}
                </div>

                <AddJobModal
                  show={showAddJobModal}
                  jobData={jobId}
                  close={() => setShowAddJobModal(false)}
                />
              </div>
            </div>
            <div className="row justify-content-center position-static">
              <div className="col-12 col-xxl-10 col-xl-10 col-lg-10">
                {/* <!-- Left Section --> */}
                <div className="Left">
                  <div
                    className="justify-content-center search-nav-tab nav nav-tabs border-bottom-0"
                    id="search-nav-tab"
                    role="tablist"
                  >
                    <div className="mb-8 p-0 w-100 active nav-link">
                      {/* <!-- Single Featured Job --> */}
                      <JobBox
                        categoryFilterValue={categoryFilterValue}
                        SkillFilterValue={SkillFilterValue}
                        jobSwapFilterValue={jobSwapFilterValue}
                        showAddJobModal={showAddJobModal}
                      />
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                  <div className="text-center pt-5 pt-lg-13">
                    <Link className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center">
                      Load More{" "}
                      <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}
              {/* {ids === "" ? null : <JobDetail ids={ids} />} */}
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        <EmployeeFooter />
      </div>
    </>
  );
}

export default ManageJobs;
