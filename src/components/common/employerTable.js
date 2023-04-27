import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyDetails from "../forms/employer/companyDetail";
import ContactInfo from "../forms/employer/contactInfo";
import KycComplianceDetails from "../forms/employer/kyc";
import { getAllEmployer, DeleteEmployer } from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
export default function EmployerTable(props) {
  // eslint-disable-next-line
  /*show modal and data, id state */
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showKycModal, setShowkycMOdal] = useState(false);
  let [showContactModal, setShowContactMOdal] = useState(false);
  const [employerData, setemployerData] = useState([]);
  const [employerId, setEmployerID] = useState();
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
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);

  /* Function to get Employer data*/
  const EmployerData = async () => {
    const userData = await getAllEmployer(
      props.industryFilterValue,
      props.corporationFilterValue,
      props.search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.filter_by_time
    );
    if (userData.data.length === 0) {
      setemployerData([]);
    } else {
      setemployerData(userData.data);
      setTotalData(userData.total_rows);
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmployerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.showEmployerDetails,
    props.showAddEmployerModal,
    showAddEmployerModal,
    showKycModal,
    showContactModal,
    props.industryFilterValue,
    props.corporationFilterValue,
    props.search,
    deleteAlert,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
  ]);

  /* Function to show the single data to update Employer */
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
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function by name */
  let sortByNameClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "company_id"
    ) {
      setcolumnName("contact_person_name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("contact_person_name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Vacancies */
  // let sortByVananciesClick = () => {
  //   if (
  //     clicksort === 0 ||
  //     sortOrder === "DESC" ||
  //     columnName === "company_id"
  //   ) {
  //     setcolumnName("job_type");
  //     setSortOrder("ASC");
  //     setClicksort(1);
  //   } else {
  //     setcolumnName("job_type");
  //     setSortOrder("DESC");
  //     setClicksort(0);
  //   }
  // };
  /*Sorting Function by Location */
  let sortByLocationClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "company_id"
    ) {
      setcolumnName("address");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("address");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Contact no */
  let sortByContactClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "company_id"
    ) {
      setcolumnName("contact_no");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("contact_no");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Company name */
  let sortByCompanyNameClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "company_id"
    ) {
      setcolumnName("company_name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("company_name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Industry */
  let sortByIndustryClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "company_id"
    ) {
      setcolumnName("industry");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("industry");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by post available */
  let sortByPostClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "company_id"
    ) {
      setcolumnName("vacancy_for_post");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("vacancy_for_post");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /* Function to show the Job detail data */
  const EmployerDetail = (e) => {
    // e.preventDefault();
    props.EmployerDetail(e);
  };

  return (
    <>
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-11">
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
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={sortByCompanyNameClick}
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
                      onClick={sortByNameClick}
                      className="text-gray"
                      title="Sort by Name"
                    >
                      Name
                    </Link>
                  </th>
                )}
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    // onClick={sortByVananciesClick}
                    className="text-gray"
                    title="Sort by Vacancies"
                  >
                    Vacancies
                  </Link>
                </th>
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={sortByLocationClick}
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
                      onClick={sortByContactClick}
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
                    onClick={sortByIndustryClick}
                    className="text-gray"
                    title="Sort by Industry"
                  >
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
                    title="Sort by Skill"
                  >
                    Posts Available
                  </Link>
                </th>
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    Status
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
              {totalData === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading === "Dashboard" ? (
                    <th className="bg-white">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading !== "Dashboard" ? (
                    <>
                      <th className="bg-white">No Data Found</th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                    </>
                  ) : (
                    ""
                  )}
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
                            <img src={empdata.logo} alt="" className="w-100" />
                          )}
                        </div>
                      </div>
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
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className="py-5 pr-0">
                        <Link
                          to={""}
                          title="Company Details"
                          onClick={() => EmployerDetail(empdata.company_id)}
                        >
                          {empdata.contact_person_name === null ? (
                            <h4 className="font-size-3 font-weight-bold  mb-0">
                              Unavailable
                            </h4>
                          ) : (
                            <h4 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.contact_person_name}
                            </h4>
                          )}
                        </Link>
                      </th>
                    )}
                    <th className=" py-5  pr-0">
                      <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                        {empdata.vacancies}
                      </h3>
                    </th>
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className=" py-5  pr-0">
                        {empdata.address === null ? (
                          <h4 className="font-size-3 font-weight-bold  mb-0">
                            Unavailable
                          </h4>
                        ) : (
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                            {empdata.address} {empdata.city} ({empdata.pin_code}
                            ) {empdata.state} {empdata.country}
                          </h3>
                        )}
                      </th>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
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
                    )}

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
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
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
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className="py-5 d-flex min-width-px-100">
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
          </table>
        </div>
        <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <CompanyDetails
        show={showAddEmployerModal}
        employerId={employerId}
        close={() => setShowEmployerMOdal(false)}
      />
      <ContactInfo
        show={showContactModal}
        employerId={employerId}
        close={() => setShowContactMOdal(false)}
      />
      <KycComplianceDetails
        show={showKycModal}
        employerId={employerId}
        close={() => setShowkycMOdal(false)}
      />
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
