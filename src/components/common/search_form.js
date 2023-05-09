import React, { useEffect, useState } from "react";
import FilterJson from "../json/filterjson";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import Filterbox from "./filterbox";
import filterjson from "../json/filterjson";

// eslint-disable-next-line no-use-before-define
function SearchForm() {
  const location = useLocation();
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const country = searchParams.get("country");
  const user_type = localStorage.getItem("userType");
  let [state, setState] = useState({
    search: search ? search : "",
    country: "",
    country_value: country ? country : "",
  });
  let navigate = useNavigate();
  /*Function to set data to the search job by country */
  const onSelectChange = (option) => {
    setState({ ...state, country_value: option.value });
  };

  /*Function to redender the data in the option of the select box*/
  useEffect(() => {
    const options = (FilterJson.location || []).map((option) => ({
      value: option,
      label: option,
    }));
    setState({ ...state, country: options });
  }, [FilterJson.location]);

  /*Onclick Function to search */
  const Onsearch = () => {
    if (user_type === "company") {
      navigate(
        `/managejobs?search=${state.search}&country=${state.country_value}`
      );
    } else {
      navigate(`/jobs?search=${state.search}&country=${state.country_value}`);
    }
  };
  return (
    <form
      action={user_type === "company" ? "/managejobs" : "/jobs"}
      className="search-form"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-once="true"
    >
      <div className=" bg-white job_search_main_form rounded-70 shadow-7 pr-15 py-7 pl-12">
        <div className="filter-search-form-2">
          <div className="filter-inputs">
            <div className="form-group position-relative">
              <input
                className="form-control focus-reset pl-13"
                type="text"
                id="keyword"
                name="search"
                value={state.search}
                onChange={(e) => setState({ ...state, search: e.target.value })}
                placeholder="Type Job title, keywords"
              />
              <span className="h-100 w-px-50 pos-abs-tl d-flex ali gn-items-center justify-content-center font-size-6">
                <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
              </span>
            </div>
            {/* <!-- .select-city starts --> */}
            <div className="form-group position-relative">
              <Select
                options={"" || state.country}
                name="country"
                id="country"
                onChange={onSelectChange}
                className="bg-white pl-13"
              />
             
              <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
              </span>
            </div>
            {/* <!-- ./select-city ends --> */}
          </div>
          {/* <!-- ./select-city ends --> */}
          <button
            onClick={path === "/jobs" ? null : Onsearch}
            className="btn btn-primary line-height-reset text-uppercase"
          >
            Search
          </button>
        </div>

        <div className="row m-0 job_filter_block mt-5">
          <Filterbox
            name="country"
            filterheading=" Jobs by Location"
            filterjson={filterjson.location}
          />
          <Filterbox
            name="category"
            filterheading=" Jobs by Category"
            filterjson={filterjson.category}
          />
        </div>
      </div>
    </form>
  );
}
export default SearchForm;
