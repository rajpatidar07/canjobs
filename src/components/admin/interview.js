import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Interview from "../common/interviewTable";
import { useEffect } from "react";
import { getInterview } from "../../api/api";
import CommonThreeDots from  "../common/Common function/commonThreeDots";
export default function ManageInterview() {
  /*Search state */
  let [search, setSearch] = useState("");
  let [statusFilterValue, setStatusFilterValue] = useState("");
  const [searcherror, setSearchError] = useState("");
  const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
  const [allInterviews, setAllInterviews] = useState([]);

  /*Function to get the interview data */
  const GetInterviewData = async () => {
    try {
      let res = await getInterview();
      setAllInterviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    GetInterviewData();
    if ((search === "") === true) {
      setSearchError("");
    }
  }, [search]);

  /*Search Onchange function to Search Interview data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setpageNo(1);
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
        <div className="dashboard-main-container mt-14" id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Interview</h3>
                </div>
                {/*<-- Search interview -->*/}
                <div className="row m-0 align-items-end">
                  <div className="col-12 col-md-4 col-lg-5 col-xl-5 p-1 form_group mb-3">
                    <p className="input_label">Search by Candidate's Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control "
                      placeholder={"Search Candidate's"}
                      value={search}
                      name={"Interview"}
                      onChange={(e) => onSearch(e)}
                      maxLength={30}
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg-5 col-xl-5  p-1 form_group mb-3">
                    <p className="input_label">Filter by Status:</p>
                    <div className="select_div">
                      <select
                        name="type"
                        value={statusFilterValue}
                        id="type"
                        onChange={(e) => {
                          setStatusFilterValue(e.target.value);
                          setpageNo(1);
                        }}
                        className=" form-control"
                      >
                        <option value="">Candidate's Interview Status</option>
                        <option value="pending">Schedule</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-1 col-xl-1 p-1 mb-6">
                    <CommonThreeDots
                      tableName={"interview"}
                      tableData={allInterviews}
                    />
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/*<-- Interview list Table -->*/}
              <Interview
                search={search}
                statusFilterValue={statusFilterValue}
                heading={"Interview"}
                setpageNo={setpageNo}
                pageNo={pageNo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
