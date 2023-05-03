import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import JobBox from "../common/jobbox";
import FilterJson from "../json/filterjson";
// import JobDetailPage from "../common/jobdetail";
import SearchForm from "../common/search_form";

function JobSearch() {
  /*Filter states */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  // eslint-disable-next-line no-use-before-define
  return (
    <>
      <div className="site-wrapper overflow-hidden ">
        <EmployeeHeader />
        {/* <!-- Main Content Start --> */}
        <div className="bg-black-2 mt-15 mt-lg-18 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row ">
              {/* <!-- Hero Form --> */}
              <div className="col-lg-12 col-12 translateY-25  pb-10">
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
                <form className="mb-8" action="/">
                  <div className="search-filter from-group d-flex align-items-center flex-wrap">
                    <div className="mr-5 mb-5">
                      <select
                        name="category"
                        id="category"
                        value={categoryFilterValue}
                        /*Category Onchange function to filter the data */
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        {(FilterJson.category || []).map((cat, i) => (
                          <option key={i} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="skill"
                        id="skill"
                        value={SkillFilterValue}
                        /*Skill Onchange function to filter the data */
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Salary Range">Job Skills</option>
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
                    <div className="mr-5 mb-5">
                      <select
                        name="job_type"
                        id="job_type"
                        value={jobSwapFilterValue}
                        /*Job Onchange function to filter the data */
                        onChange={(e) => setJobSwapFilterValue(e.target.value)}
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
                </form>
                {/* <div className="d-flex align-items-center justify-content-between mb-6">
                  <h5 className="font-size-4 font-weight-normal text-gray">
                    Showing
                    <span className="text-black-2">120</span> matched jobs
                  </h5>
                </div> */}
              </div>
            </div>
            <div className="row justify-content-center position-static">
              <div className="col-12 col-xxl-8 col-xl-7 col-lg-10">
                {/* <!-- Left Section --> */}
                <div className="Left">
                  <div
                    className="justify-content-center search-nav-tab nav nav-tabs border-bottom-0"
                    id="search-nav-tab"
                    role="tablist"
                  >
                    <div className="mb-8 p-0 w-100 active nav-link active">
                      {/* <!-- Single Featured Job --> */}
                      <JobBox
                        categoryFilterValue={categoryFilterValue}
                        SkillFilterValue={SkillFilterValue}
                        jobSwapFilterValue={jobSwapFilterValue}
                      />
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                  <div className="text-center pt-5 pt-lg-13">
                    <Link
                      className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                      to={""}
                    >
                      Load More{" "}
                      <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}

              {/* <div className="col-12 col-xxl-4 col-xl-5 col-lg-10 position-static">
                <div className="tab-content" id="serachlist-tab">
                  <div className="tab-pane fade show active">
                    <JobDetailPage />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        <EmployeeFooter />
      </div>
    </>
  );
}

export default JobSearch;
