import React, { useEffect, useState } from "react";
import Footer from "../common/footer";
import Headers from "../common/header";
import JobBoxResponse from "./jobBoxResponse";
import SearchForm from "../common/search_form";
import { Link } from "react-router-dom";
import JobDetail from "./jobDetail";
import { getAllJobsCategory } from "../../api/api";
function Response() {
  let [category, setCategory] = useState([]);
  const [ids, setIds] = useState("");

  const handleIdClick = (id) => {
    setIds(id);
  };
  /* Function to get the job category data*/
  const CategoryData = async () => {
    const userData = await getAllJobsCategory();
    setCategory(userData);
  };
  useEffect(() => {
    CategoryData();
  }, []);
  return (
    <>
      <div>
        <Headers />
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
                <h2 className="font-size-8 mb-6">
                  You’re searching "UI Designer"
                </h2>
                <form className="mb-8" action="/">
                  <div className="search-filter from-group d-flex align-items-center flex-wrap">
                    <div className="mr-5 mb-5">
                      <select
                        name="category"
                        id="category"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        {/* {(category || []).map((cat) => (
                          <option
                            key={cat.job_category_id}
                            value={cat.job_category_id}
                          >
                            {cat.category_name}
                          </option>
                        ))} */}
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="country"
                        id="country"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Salary Range">Job Skills</option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="country"
                        id="country"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Experience Level ">
                          Job Location
                        </option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                    </div>
                  </div>
                </form>
                <div className="d-flex align-items-center justify-content-between mb-6 mx-2">
                  <h5 className="font-size-4 font-weight-normal text-gray">
                    Showing
                    <span className="text-black-2">120</span> matched jobs
                  </h5>
                </div>
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
                      <JobBoxResponse handleIdClick={handleIdClick} />

                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                  <div className="text-center pt-5 pt-lg-13">
                    <Link
                      to={""}
                      className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                    >
                      Load More{" "}
                      <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}
              <JobDetail ids={ids} />
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        <Footer />
      </div>
    </>
  );
}

export default Response;
