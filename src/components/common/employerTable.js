import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyDetails from "../forms/employer/companyDetail";
import ContactInfo from "../forms/employer/contactInfo";
import KycComplianceDetails from "../forms/employer/kyc";
import { getAllEmployer, DeleteEmployer } from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import Loader from '../common/loader';

export default function EmployerTable(props) {
  /*show modal and data , id state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showKycModal, setShowkycMOdal] = useState(false);
  let [showContactModal, setShowContactMOdal] = useState(false);
  const [employerData, setemployerData] = useState([]);
  const [employerId, setEmployerID] = useState();
  let [isLoading, setIsLoading] = useState(true);

  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("company_id");
  const [sortOrder, setSortOrder] = useState("");

  /* Function to get Employer data*/
  const EmployerData = async () => {
    setIsLoading(true)
    try {
      const userData = await getAllEmployer(
        props.industryFilterValue,
        props.corporationFilterValue,
        props.search,
        props.filter_by_time ||
          props.industryFilterValue ||
          props.corporationFilterValue ||
          props.search ||
          sortOrder ? 1 : currentPage,
        recordsPerPage,
        columnName,
        sortOrder,
        props.filter_by_time
      );
      if (userData.data.length === 0) {
        setemployerData([]);
        setIsLoading(false)
      } else {
        setemployerData(userData.data);
        setTotalData(userData.total_rows);
        setIsLoading(false)
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setIsLoading(false)
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmployerData();
    if (apiCall === true || props.apiCall === true) {
      props.setApiCall(false)
      setApiCall(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.industryFilterValue,
    props.corporationFilterValue,
    props.search,
    deleteAlert,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
    apiCall,
    props.apiCall,
    props.showEmployerDetails
  ]);
  /* Function to show the single data to update Employer */
  const editEmployer = (e) => {
    setShowEmployerMOdal(true);
    setEmployerID(e);
  };
  /* Function to show the single data to update Employer Contact*/
  const editEmployerContact = (e) => {
    setShowContactMOdal(true);
    setEmployerID(e);
  };
  /* Function to show the single data to update Kyc*/
  const editEmployerKyc = (e) => {
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
    try {
      const responseData = await DeleteEmployer(e);
      if (responseData.message === "company has been deleted") {
        toast.error("Employer deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlert(false);
        setApiCall(true)
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /* Function to show the Job detail data */
  const EmployerDetail = (e) => {
    props.EmployerDetail(e);
  };

  return (
    <>

      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-11">
        <div className="table-responsive main_table_div">
          {isLoading ?
            <Loader /> : <table className="table table-striped main_data_table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => { handleSort("company_name"); setCurrentPage(1) }}
                      className="text-gray"
                      title="Sort by Company Name"
                    >
                      Company name
                    </Link>
                  </th>
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => { handleSort("contact_person_name"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Name"
                      >
                        Name
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => { handleSort("address"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Location"
                      >
                        Location
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => { handleSort("contact_no"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Contact"
                      >
                        Contact Info
                      </Link>
                    </th>
                  )}
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => { handleSort("vacancy_for_post"); setCurrentPage(1) }}
                      className="text-gray"
                      title="Sort by jobs"
                    >
                      Jobs
                    </Link>
                  </th>
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Profile
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || employerData.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    {props.heading === "Dashboard" ? (
                      <th className="bg-white">No Data Found</th>
                    ) : (
                      <th className="bg-white"></th>
                    )}
                    <th className="bg-white">No Data Found</th>
                    <th className="bg-white"></th>
                    {props.heading !== "Dashboard" ? (
                      <>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  (employerData || []).map((empdata) => (
                    <tr className="text-capitalize" key={empdata.company_id}>
                      <th scope="row" className="pl-5 py-5 pr-0   ">
                        <div className="d-flex profile_box gx-2">
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
                          {empdata.company_name === null ? (
                            <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                              Unavailable
                            </p>
                          ) : (
                            props.heading === "Dashboard" ? (
                              ""
                            ) : <Link
                              to={""}
                              title="Company Details"
                              onClick={() => EmployerDetail(empdata.company_id)}
                            >
                              <div className="company_profile">
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {empdata.company_name}
                                </p>
                                <p className="font-size-3 font-weight-normal mb-0">
                                  {empdata.industry}
                                </p>
                              </div>
                            </Link>
                          )}
                        </div>
                      </th>
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th className="py-5 pr-0">
                          <Link
                            to={""}
                            title="Company Details"
                            onClick={() => EmployerDetail(empdata.company_id)}
                          >
                            <p className="m-0 font-weight-normal text-capitalize">
                              {empdata.contact_person_name === null
                                ? "Unavailable"
                                : empdata.contact_person_name}
                            </p>
                          </Link>
                        </th>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th className=" py-5  pr-0">
                          {empdata.address === null ? (
                            <p className="font-size-3 font-weight-bold  mb-0">
                              Unavailable
                            </p>
                          ) : (
                            <p className="font-size-3 font-weight-normal mb-0">
                              {empdata.address} {empdata.city} ({empdata.pin_code}
                              ) {empdata.state} {empdata.country}
                            </p>
                          )}
                        </th>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th className=" py-5  pr-0">
                          {empdata.contact_no === null ? (
                            <p className="font-size-3 font-weight-bold  mb-0">
                              Unavailable
                            </p>
                          ) : (
                            <>
                              <div className="font-size-3 font-weight-normal mb-0">
                                + <Link className="text-dark" to={`tel:${empdata.contact_no}`}>{empdata.contact_no}</Link>
                              </div>
                              <div className="font-size-3 font-weight-normal mb-0">
                                {empdata.contact_no_other === null ||
                                  empdata.contact_no_other === undefined ||
                                  empdata.contact_no_other === ""
                                  ? ""
                                  : <><Link className="text-dark" to={`tel:${empdata.contact_no_other}`}>{empdata.contact_no_other}</Link></>}
                              </div>
                              <p className="text-gray font-size-2 font-weight-normal m-0">
                                <Link className="text-dark" to={`mailto:${empdata.email}`}>
                                  {empdata.email}
                                </Link>
                              </p>
                            </>
                          )}
                        </th>
                      )}
                      <th className="py-5 ">
                        {empdata.vacancy_for_post === null ? (
                          <p className="font-size-3 font-weight-bold  mb-0">
                            Unavailable
                          </p>
                        ) : (
                          <p className="font-size-3 font-weight-normal mb-0">
                            {empdata.vacancy_for_post} ({empdata.vacancies})
                          </p>
                        )}
                      </th>
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th className="  py-5 ">
                          <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                            {empdata.profile_complete >= 99.00 ? (
                              <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                Complete
                              </span>

                            ) : (
                              <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                Incompelete
                              </span>
                            )}</p>
                        </th>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <th className="py-5 min-width-px-100">
                          <div className="btn-group button_group" role="group">
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() =>
                                editEmployerContact(empdata.company_id)
                              }
                              title="Contact"
                            >
                              <span className="fa fa-address-book text-gray px-1"></span>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                            >
                              <Link
                                // onClick={() => Joblist(empdata.company_name)}
                                to="/job"
                                state={{ company_name: empdata.company_name }}
                                title="Jobs"
                              >
                                <span className="fas fa-briefcase text-gray  "></span>
                              </Link>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => editEmployerKyc(empdata.company_id)}
                              title="KYC"
                            >
                              <span className="fa fa-file text-gray px-1 "></span>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => editEmployer(empdata.company_id)}
                              title="Edit Employer"
                            >
                              <span className=" fas fa-edit text-gray px-1"></span>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => ShowDeleteAlert(empdata)}
                              title="Delete"
                            >
                              <span className="fa fa-trash text-danger px-1"></span>
                            </button>
                          </div>
                        </th>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>}
        </div>
        <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} total={totalData} count={employerData.length}
          />
        </div>
      </div>
      {showAddEmployerModal ? <CompanyDetails
        show={showAddEmployerModal}
        employerId={employerId}
        setApiCall={setApiCall}
        apiCall={apiCall}
        close={() => setShowEmployerMOdal(false)}
      /> : null}
      {showContactModal ? <ContactInfo
        show={showContactModal}
        employerId={employerId}
        setApiCall={setApiCall}
        apiCall={apiCall}
        close={() => setShowContactMOdal(false)}
      /> : null}
      {showKycModal ? <KycComplianceDetails
        show={showKycModal}
        employerId={employerId}
        setApiCall={setApiCall}
        apiCall={apiCall}
        close={() => setShowkycMOdal(false)}
      /> : null}
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteEmployer(deleteId)}
        showCancelButton={true}
        onCancel={CancelDelete}
      />
    </>
  );
}
