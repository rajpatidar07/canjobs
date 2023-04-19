import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Interview from "../common/interviewTable";
export default function ManageInterview() {
  let [search, setSearch] = useState("");
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Interview"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Interview"} />
        {/* <ToastContainer />{" "} */}

        <div className="dashboard-main-container mt-20" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Interview</h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Search by Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control "
                      placeholder={"Search Interview"}
                      value={search}
                      name={"Interview"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
              <Interview search={search} heading={"Interview"} />
            </div>
          </div>
        </div>
        {/* <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteAdmin(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        /> */}
        {/* {showJobDetails === true ? (
      <div className="dashboard-main-container mt-20 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 dark-mode-texts">
              <div className="mb-9">
                <Link
                  to={""}
                  onClick={() => setShowJobDetails(false)}
                  className="d-flex align-items-center ml-4"
                >
                  
                  <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                  <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                    Back
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-18">
            
            <JobDetailsBox />
          </div>
        </div>
      </div>
    ) : null} */}
      </div>
    </>
  );
}
