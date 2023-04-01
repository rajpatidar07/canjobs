import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import EmployerProfile from "../company/profile";
import CompanyDetails from "../forms/employer/companyDetail";
import ContactInfo from "../forms/employer/contactInfo";
import KycComplianceDetails from "../forms/employer/kyc";
import { getAllEmployer, DeleteEmployer } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";

function Employer() {
  // eslint-disable-next-line
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showKycModal, setShowkycMOdal] = useState(false);
  let [showContactModal, setShowContactMOdal] = useState(false);
  let [showEmployerDetails, setShowEmployerDetails] = useState(false);
  const [employerData, setemployerData] = useState([]);
  const [employerId, setEmployerID] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /* Function to get Employer data*/
  const EmployerData = async () => {
    const userData = await getAllEmployer();
    setemployerData(userData);
    console.log(userData);
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmployerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddEmployerModal, showKycModal, showContactModal, deleteAlert]);

  /* Function to show the single data to update Employer Contact*/
  const editEmployer = (e) => {
    // e.preventDefault();
    setShowEmployerMOdal(true);
    setEmployerID(e);
  };
  /* Function to show the single data to update Employer Contact*/
  const editEmployerContact = (e) => {
    // e.preventDefault();
    setShowContactMOdal(true);
    setEmployerID(e);
  };
  /* Function to show the single data to update Kyc*/
  const editEmployerKyc = (e) => {
    // e.preventDefault();
    setShowkycMOdal(true);
    setEmployerID(e);
  };

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.company_id);
    setDeleteName(e.company_name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete Employer */
  async function deleteEmployer(e) {
    const responseData = await DeleteEmployer(e);
    if (responseData.message === "company has been deleted") {
      toast.error("Employer deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <ToastContainer />
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
              ? "dashboard-main-container mt-24"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">
                    Employer ({employerData.length})
                  </h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="" data-display="Product Designer">
                          Software Engineer
                        </option>
                        <option value="">MBA</option>
                        <option value="">BE</option>
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editEmployer("0")}
                    >
                      Add Employer
                    </CustomButton>
                    <CompanyDetails
                      show={showAddEmployerModal}
                      employerId={employerId}
                      close={() => setShowEmployerMOdal(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                <div className="table-responsive">
                  <table className="table table-striped">
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Vacancies
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Contact Info
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Company name
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Industry
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Posts Available
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
                      {(employerData || []).map((empdata) => (
                        <tr
                          className="border border-color-2"
                          key={empdata.company_id}
                        >
                          <th scope="row" className="pl-6 border-0 py-7 pr-0 ">
                            <div className="media  align-items-center">
                              <div className="circle-36 mx-auto">
                                {empdata.logo === null ? (
                                  <img
                                    src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
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
                          <th className=" border-0 py-7 pr-0">
                            <Link
                              to={""}
                              onClick={() => setShowEmployerDetails(true)}
                            >
                              <h4 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {empdata.contact_person_name}
                              </h4>
                            </Link>
                          </th>
                          <th className=" py-7  pr-0">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              50
                            </h3>
                          </th>
                          <th className=" py-7  pr-0">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.address} {empdata.city} (
                              {empdata.pin_code}) {empdata.state}{" "}
                              {empdata.country}
                            </h3>
                          </th>
                          <th className=" py-7  pr-0">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              +{empdata.contact_no} +{empdata.contact_no_other}
                              <br />
                              <span className="text-gray font-size-2">
                                {empdata.email}
                              </span>
                            </h3>
                          </th>
                          <th className=" py-7  pr-0">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.company_name}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.industry}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.vacancy_for_post}
                            </h3>
                          </th>
                          <th className="  py-7 ">
                            <h3 className="font-size-2 font-weight-normal text-black-2 mb-0">
                              <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                Pending
                              </span>
                            </h3>
                          </th>
                          <th className="  py-7  d-flex">
                            <Link
                              to=""
                              onClick={() =>
                                editEmployerContact(empdata.company_id)
                              }
                            >
                              <span className="fa fa-address-book text-gray px-1"></span>
                            </Link>
                            <ContactInfo
                              show={showContactModal}
                              employerId={employerId}
                              close={() => setShowContactMOdal(false)}
                            />
                            <Link
                              to=""
                              onClick={() =>
                                editEmployerKyc(empdata.company_id)
                              }
                            >
                              <span className="fa fa-file text-gray px-1 "></span>
                            </Link>
                            <KycComplianceDetails
                              show={showKycModal}
                              employerId={employerId}
                              close={() => setShowkycMOdal(false)}
                            />
                            <Link
                              to=""
                              onClick={() => editEmployer(empdata.company_id)}
                            >
                              <span className=" fas fa-edit text-gray px-1">
                                {" "}
                              </span>
                            </Link>
                            <Link
                              to=""
                              onClick={() => ShowDeleteAlert(empdata)}
                            >
                              <span className="fa fa-trash text-danger px-1"></span>
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pt-2">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3active"
                          aria-label="Previous"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item disabled">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          ...
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          7
                        </Link>
                      </li>
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3"
                          aria-label="Next"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteEmployer(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
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
              <EmployerProfile />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employer;
