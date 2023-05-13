import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Interview from "../common/interviewTable";
import { useEffect } from "react";
export default function ManageInterview() {
  /*Search state */
  let [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");

  useEffect(()=>{
    if((search === "") === true){
    setSearchError("")
  }},[search])

  /*Search Onchange function to Search Interview data */
  const onSearch = (e) => { setSearch(e.target.value);
    if(/[-]?\d+(\.\d+)?/.test(search) ){
      setSearchError("Admin Name can not have a number.")
    }else if(/[^a-zA-Z0-9]/g.test(search)){
      setSearchError("Cannot use special character")
    }if((search === "") === true){
        setSearchError("")
      
    }}
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Interview"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Interview"} />
        {/* <ToastContainer />{" "} */}

        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Interview</h3>
                </div>
                {/*<-- Search interview -->*/}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Employee Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control "
                      placeholder={"Search Employer"}
                      value={search}
                      name={"Interview"}
                      onChange={(e) => onSearch(e)}
                    />
                    <small className="text-danger">{searcherror}</small>
                  </div>
                  {/* <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Type:</p>
                    <div className="select_div">
                      <select
                        name="type"
                        value={typeFilterValue}
                        id="type"
                        onChange={onTypeFilterChange}
                        className=" form-control"
                      >
                        <option value="">Select type</option>
                        {(FilterJson.AdminType || []).map((type, i) => (
                          <option value={type} key={i}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                  {/* <div className="text-right col-xl-12 mt-6 mt-xl-12">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => setShow(true)}
                    >
                      Add Interview
                    </CustomButton>
                  </div> */}
                </div>
              </div>
              {/*<-- Interview list Table -->*/}
              <Interview search={search} heading={"Interview"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
