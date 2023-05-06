import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import EmployerProfile from "../company/profile";
import CompanyDetails from "../forms/employer/companyDetail";
import { ToastContainer } from "react-toastify";
import FilterJson from "../json/filterjson";
import EmployerTable from "../common/employerTable";

function Employer() {
  // eslint-disable-next-line
  /*show modal and data, id state */
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showEmployerDetails, setShowEmployerDetails] = useState(false);
  const [employerId, setEmployerID] = useState();
  /*Filter and search state */
  const [industryFilterValue, setIndutryFilterValue] = useState("");
  const [corporationFilterValue, setcorporationFilterValue] = useState("");
  const [search, setSearch] = useState("");

  /* Function to show the single data to update Employer */
  const editEmployer = (e) => {
    // e.preventDefault();
    setShowEmployerMOdal(true);
    setEmployerID(e);
  };

  /*Industry array to filter*/
  // const Industry = employerData.filter(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.industry === thing.industry)
  // );
  /*Corporation array to filter*/
  // const Corporation = employerData.filter(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.corporation === thing.corporation)
  // );

  /* Function to show the Job detail data */
  const EmployerDetail = (e) => {
    // e.preventDefault();
    setShowEmployerDetails(true);
    setEmployerID(e);
  };
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Companies"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Companies"} />
        <ToastContainer />
        {/* <!-- Add Company Details Modal --> */}
        {showAddEmployerModal ? (
          <CompanyDetails
            show={showAddEmployerModal}
            employerId={employerId}
            close={() => setShowEmployerMOdal(false)}
          />
        ) : null}
        <div
          className={
            showEmployerDetails === false
              ? "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Employer</h3>
                </div>
                {/* <!-- Employer Search and Filter --> */}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search by Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Employer"}
                      value={search}
                      name={"Employer_name"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Corporation:</p>
                    <div className="select_div">
                      <select
                        name="corporation"
                        value={corporationFilterValue}
                        id="corporation"
                        onChange={(e) =>
                          setcorporationFilterValue(e.target.value)
                        }
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black form-control text-black-2 w-100"
                      >
                        <option value={""}>Select Corporation</option>
                        {(FilterJson.corporation || []).map(
                          (corporation, i) => (
                            <option key={i} value={corporation}>
                              {corporation}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Industry:</p>
                    <div className="select_div">
                      <select
                        name="industry"
                        value={industryFilterValue}
                        id="industry"
                        onChange={(e) => setIndutryFilterValue(e.target.value)}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black form-control text-black-2 w-100"
                      >
                        <option value={""}>Select Industry</option>
                        {(FilterJson.industry || []).map((industry, i) => (
                          <option key={i} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col px-1 form_group mt-4 text-right">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editEmployer("0")}
                    >
                      Add Employer
                    </CustomButton>
                  </div>
                </div>
              </div>
              {/* <!-- Employer List Table --> */}
              <EmployerTable
                showAddEmployerModal={showAddEmployerModal}
                EmployerDetail={EmployerDetail}
                search={search}
                industryFilterValue={industryFilterValue}
                corporationFilterValue={corporationFilterValue}
                showEmployerDetails={showEmployerDetails}
              />
            </div>
          </div>
        </div>
        {/* <!-- Employer Details- --> */}
        {showEmployerDetails === true ? (
          <div className="dashboard-main-container mt-30">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <Link
                    to={""}
                    onClick={() => setShowEmployerDetails(false)}
                    className="d-flex align-items-center ml-4"
                  >
                    {" "}
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>{" "}
              <EmployerProfile employerId={employerId} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employer;
