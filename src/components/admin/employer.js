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
        <CompanyDetails
          show={showAddEmployerModal}
          employerId={employerId}
          close={() => setShowEmployerMOdal(false)}
        />
        {/* <ContactInfo
          show={showContactModal}
          employerId={employerId}
          close={() => setShowContactMOdal(false)}
        />
        <KycComplianceDetails
          show={showKycModal}
          employerId={employerId}
          close={() => setShowkycMOdal(false)}
        /> */}
        {/* <Link
          to={""}
          className="sidebar-mobile-button"
          data-toggle="collapse"
          href="#sidebar"
          role="button"
          aria-expanded="false"
          aria-controls="sidebar"
        >
          <i className="icon icon-sidebar-2"></i>
        </Link> */}
        <div
          className={
            showEmployerDetails === false
              ? "dashboard-main-container mt-20"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Employer</h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
                  <div className="text-right col-md-6 col-xl-3">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editEmployer("0")}
                    >
                      Add Employer
                    </CustomButton>
                  </div>
                </div>
              </div>
              <EmployerTable
                EmployerDetail={EmployerDetail}
                search={search}
                industryFilterValue={industryFilterValue}
                corporationFilterValue={corporationFilterValue}
              />
              {/* <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-11">
                <div className="table-responsive main_table_div">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 text-center font-size-4 font-weight-normal"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByNameClick}
                            className="text-gray"
                          >
                            Name
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            // onClick={sortByVananciesClick}
                            className="text-gray"
                          >
                            Vacancies
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByLocationClick}
                            className="text-gray"
                          >
                            Location
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByContactClick}
                            className="text-gray"
                          >
                            {" "}
                            Contact Info
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByCompanyNameClick}
                            className="text-gray"
                          >
                            {" "}
                            Company name
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByIndustryClick}
                            className="text-gray"
                          >
                            {" "}
                            Industry
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByPostClick}
                            className="text-gray"
                          >
                            {" "}
                            Posts Available
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map function to show the data in the list*/}
              {/* {totalData === 0 ? (
                        <tr>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                        </tr>
                      ) : (
                        (employerData || []).map((empdata) => (
                          <tr className="" key={empdata.company_id}>
                            <th scope="row" className="pl-5 py-5 pr-0   ">
                              <div className="media  align-items-center">
                                <div className="circle-36 mx-auto">
                                  {empdata.logo === null ? (
                                    <img
                                      src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"
                                      alt=""
                                      className="w-100"
                                    />
                                  ) : (
                                    <img
                                      src={empdata.logo}
                                      alt=""
                                      className="w-100"
                                    />
                                  )}
                                </div>
                              </div>
                            </th>
                            <th className="py-5 pr-0">
                              <Link
                                to={""}
                                onClick={() =>
                                  EmployerDetail(empdata.company_id)
                                }
                              >
                                {empdata.contact_person_name === null ? (
                                  <h4 className="font-size-3 font-weight-bold  mb-0">
                                    Unavailable
                                  </h4>
                                ) : (
                                  <h4 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    {empdata.contact_person_name}{" "}
                                  </h4>
                                )}
                              </Link>
                            </th>
                            <th className=" py-5  pr-0">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {empdata.vacancies}
                              </h3>
                            </th>
                            <th className=" py-5  pr-0">
                              {empdata.address === null ? (
                                <h4 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h4>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                                  {empdata.address} {empdata.city} (
                                  {empdata.pin_code}) {empdata.state}{" "}
                                  {empdata.country}
                                </h3>
                              )}
                            </th>
                            <th className=" py-5  pr-0">
                              {empdata.contact_no === null ? (
                                <h4 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h4>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  +{empdata.contact_no}
                                  {empdata.contact_no_other === null ||
                                  empdata.contact_no_other === undefined ||
                                  empdata.contact_no_other === ""
                                    ? " "
                                    : " +" + empdata.contact_no_other}
                                  <br />
                                  <span className="text-gray font-size-2 text-truncate">
                                    {empdata.email}
                                  </span>
                                </h3>
                              )}
                            </th>
                            <th className=" py-5  pr-0">
                              {empdata.company_name === null ? (
                                <h4 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h4>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.company_name}
                                </h3>
                              )}
                            </th>
                            <th className="py-5 ">
                              {empdata.industry === null ? (
                                <h4 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h4>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.industry}
                                </h3>
                              )}
                            </th>
                            <th className="py-5 ">
                              {empdata.vacancy_for_post === null ? (
                                <h4 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h4>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.vacancy_for_post}
                                </h3>
                              )}
                            </th>
                            <th className="  py-5 ">
                              <h3 className="font-size-2 font-weight-normal text-black-2 mb-0">
                                {empdata.contact_person_name === null ||
                                empdata.contact_no === null ||
                                empdata.address === null ||
                                empdata.industry === null ||
                                empdata.company_name === null ||
                                empdata.vacancy_for_post === null ? (
                                  <>
                                    <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                      Incompelete Profile
                                    </span>
                                  </>
                                ) : (
                                  <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                    Complete
                                  </span>
                                )}
                              </h3>
                            </th>
                            <th className="  py-5  d-flex">
                              <div
                                className="btn-group button_group"
                                role="group"
                              >
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() =>
                                    editEmployerContact(empdata.company_id)
                                  }
                                >
                                  <span className="fa fa-address-book text-gray px-1"></span>
                                </button>

                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() =>
                                    editEmployerKyc(empdata.company_id)
                                  }
                                >
                                  <span className="fa fa-file text-gray px-1 "></span>
                                </button>

                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() =>
                                    editEmployer(empdata.company_id)
                                  }
                                >
                                  <span className=" fas fa-edit text-gray px-1">
                                    {" "}
                                  </span>
                                </button>
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => ShowDeleteAlert(empdata)}
                                >
                                  <span className="fa fa-trash text-danger px-1"></span>
                                </button>
                              </div>
                            </th>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pt-2">
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div> */}
            </div>
          </div>
          {/* <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteEmployer(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          /> */}
        </div>
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
