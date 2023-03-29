import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import EmployeeDetails from "../common/employeeDetail";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee } from "../../api/api";
import moment from "moment";
import SAlert from "../common/sweetAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employee() {
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [employeeData, setemployeeData] = useState([]);
  let [employeeid, setemployeeId] = useState();
  let [employeeEducationId, setemployeeEducationId] = useState();
  let [employeeSkillId, setemployeeSkillId] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /* Function to get Employee data*/
  const EmpData = async () => {
    const userData = await getallEmployeeData();
    setemployeeData(userData);
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmpData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deleteAlert,
    showAddEmployeeModal,
    showEducationModal,
    showSkillsModal,
    showEmployeeProfile,
  ]);

  /* Function to show the single data to update Employee* Education*/
  const editEmployeeEducation = (e) => {
    // e.preventDefault();
    setShowEducationModal(true);
    setemployeeEducationId(e);
  };
  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    // e.preventDefault();
    setShowEmployeeMOdal(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee Skills*/
  const editEmployeeSkills = (e) => {
    // e.preventDefault();
    setShowSkillsModal(true);
    setemployeeSkillId(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.employee_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteEmployee(e) {
    const responseData = await DeleteJobEmployee(e);
    if (responseData.message === "Employee has been deleted") {
      toast.error("Category deleted Successfully", {
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
        <div
          className={
            showEmployeeProfile === false
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
                    Applicants ({employeeData.length})
                  </h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-3 mb-0 mr-6 py-2">Filter by Job:</p>
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
                      onClick={() => setShowEmployeeMOdal(true)}
                    >
                      Add Employee
                    </CustomButton>
                    <PersonalDetails
                      show={showAddEmployeeModal}
                      employeedata={employeeid}
                      close={() => setShowEmployeeMOdal(false)}
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
                          className="pl-0 text-center border-0 font-size-4 font-weight-normal"
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
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Languages
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Education
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Skills
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Specialization
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Experience
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
                      {(employeeData || []).map((empdata) => (
                        <tr
                          className="border border-color-2"
                          key={empdata.employee_id}
                        >
                          <th scope="row" className="pl-6 border-0 py-7 pr-0  ">
                            <div className="media  align-items-center">
                              <div className="circle-36 mx-auto">
                                {empdata.profile_photo === null ? (
                                  <img
                                    src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                    alt=""
                                    className="w-100"
                                  />
                                ) : (
                                  <img
                                    src={empdata.profile_photo}
                                    alt=""
                                    className="w-100"
                                  />
                                )}
                              </div>
                            </div>
                          </th>
                          <th className=" py-7  pr-0">
                            <Link
                              to={""}
                              onClick={() => setShowEmployeeProfile(true)}
                            >
                              <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                {empdata.name} <br />
                                <span className="text-gray font-size-2">
                                  {empdata.marital_status} <br />(
                                  {empdata.gender}
                                  {/*Calculation of age from date of birth*/}
                                  {moment().diff(
                                    empdata.date_of_birth,
                                    "years"
                                  )}
                                  )
                                </span>
                              </h4>
                            </Link>
                          </th>
                          <th className=" py-7  pr-0">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              +{empdata.contact_no} <br />
                              <span className="text-gray font-size-2">
                                {empdata.email}
                              </span>
                            </h3>
                          </th>

                          <Education
                            close={() => setShowEducationModal(false)}
                            employeeEducationData={employeeEducationId}
                            show={showEducationModal}
                          />
                          <Skills
                            show={showSkillsModal}
                            employeeSkillData={employeeSkillId}
                            close={() => setShowSkillsModal(false)}
                          />
                          <th className=" py-7 min-width-px-100">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.language}
                            </h3>
                          </th>
                          <th className=" py-7 min-width-px-100">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.education}
                            </h3>
                          </th>
                          <th className=" py-7 min-width-px-100">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.skill}
                            </h3>
                          </th>
                          <th className=" py-7 min-width-px-100">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.specialization}
                            </h3>
                          </th>
                          <th className=" py-7 min-width-px-100">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {empdata.experience}
                            </h3>
                          </th>
                          <th className="d-flex py-7 min-width-px-100">
                            <Link
                              to=""
                              onClick={() =>
                                editEmployeeEducation(empdata.employee_id)
                              }
                            >
                              <span className="	fas fa-graduation-cap text-gray px-2"></span>
                            </Link>
                            <Link
                              to=""
                              onClick={() =>
                                editEmployeeSkills(empdata.employee_id)
                              }
                            >
                              <span className=" fa fa-cogs text-gray px-2"></span>
                            </Link>
                            <Link
                              to=""
                              onClick={() => editEmployee(empdata.employee_id)}
                            >
                              <span className=" fas fa-edit text-gray px-2"></span>
                            </Link>
                            <Link
                              to=""
                              onClick={() => ShowDeleteAlert(empdata)}
                            >
                              <span className=" text-danger">
                                <i className="fa fa-trash "></i>
                              </span>
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
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item disabled">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          ...
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
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
        </div>
        <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteEmployee(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
        {showEmployeeProfile === true ? (
          <div className="dashboard-main-container mt-24">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowEmployeeProfile(false)}
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
                <EmployeeDetails />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employee;
