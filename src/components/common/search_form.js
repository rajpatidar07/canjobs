import React from "react";
import FilterJson from "../json/filterjson";
// eslint-disable-next-line no-use-before-define
function SearchForm() {
  const user_type = localStorage.getItem("userType");

  return (
    <form
      action={user_type === "company" ? "/managejobs" : "/jobs"}
      className="search-form"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-once="true"
    >
      <div className="filter-search-form-2 bg-white job_search_main_form rounded-70 shadow-7 pr-15 py-7 pl-12">
        <div className="filter-inputs">
          <div className="form-group position-relative">
            <input
              className="form-control focus-reset pl-13"
              type="text"
              id="keyword"
              name="search"
              placeholder="Type Job title, keywords"
            />
            <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
              <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
            </span>
          </div>
          {/* <!-- .select-city starts --> */}
          <div className="form-group position-relative">
            <select
              name="country"
              id="country"
              className="nice-select bg-white pl-13 h-100 arrow-3 font-size-4"
            >
              <option
                data-display="City, state, zip code or (Remote)"
                value={""}
              >
                Select City
              </option>
              {(FilterJson.location || []).map((city, i) => {
                return (
                  <option value={city} key={i}>
                    {city}
                  </option>
                );
              })}
            </select>
            <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
              <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
            </span>
          </div>
          {/* <!-- ./select-city ends --> */}
        </div>
        <div className="button-block">
          <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
export default SearchForm;
