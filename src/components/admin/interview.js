import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Interview from "../common/interviewTable";
import { useEffect } from "react";
export default function ManageInterview() {
  /*Search state */
  let [search, setSearch] = useState("");
  let [statusFilterValue, setStatusFilterValue] = useState("");
  const [searcherror, setSearchError] = useState("");
  useEffect(() => {
    if ((search === "") === true) {
      setSearchError("");
    }
  }, [search]);

  /*Search Onchange function to Search Interview data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Applicant name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Interview"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Interview"} />
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Interview</h3>
                </div>
                {/*<-- Search interview -->*/}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search by Applicant's Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control "
                      placeholder={"Search Applicant"}
                      value={search}
                      name={"Interview"}
                      onChange={(e) => onSearch(e)}
                      maxLength={30}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Status:</p>
                    <div className="select_div">
                      <select
                        name="type"
                        value={statusFilterValue}
                        id="type"
                        onChange={(e) => setStatusFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Select Interview Status</option>
                        <option value="pending">Schedule</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/*<-- Interview list Table -->*/}
              <Interview
                search={search}
                statusFilterValue={statusFilterValue}
                heading={"Interview"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
