import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee } from "../../api/api";
import moment from "moment";
import SAlert from "../common/sweetAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import UserProfile from "../user/profile";
import LmiaStatus from "../forms/admin/lmiastatus";
function Employee() {
  /*Show modal states */
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showLimiaSttusModal, setShowLimiaStatusModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  /*data and id states */
  const [employeeData, setemployeeData] = useState([]);
  let [employeeId, setemployeeId] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState("");
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);

  /* Function to get Employee data*/
  const EmpData = async () => {
    const userData = await getallEmployeeData(
      experienceFilterValue,
      skillFilterValue,
      educationFilterValue,
      search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    setemployeeData(userData.data);
    setTotalData(userData.total_rows);
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
    experienceFilterValue,
    skillFilterValue,
    educationFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
  ]);

  /* Function to show the single data to update Employee*/
  const employeeDetails = (e) => {
    // e.preventDefault();
    setShowEmployeeProfile(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee Education*/
  const editEmployeeEducation = (e) => {
    // e.preventDefault();
    setShowEducationModal(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee Limia status*/
  const editEmployeeLimiaStatus = (e) => {
    // e.preventDefault();
    setShowLimiaStatusModal(true);
    setemployeeId(e);
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
    localStorage.setItem("employee_id", e);
    setShowSkillsModal(true);
    setemployeeId(e);
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
  /*To call Api to delete employee */
  async function deleteEmployee(e) {
    const responseData = await DeleteJobEmployee(e);
    if (responseData.message === "Employee has been deleted") {
      toast.error("Employee deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
  /*Corporation Onchange function to filter the data */
  let onExperienceFilterChange = (e) => {
    setExperienceFilterValue(e.target.value);
  };
  /*industry Onchange function to filter the data */
  let onSkillFilterChange = (e) => {
    setSkillFilterValue(e.target.value);
  };
  /*industry Onchange function to filter the data */
  let onEducationFilterChange = (e) => {
    setEducationFilterValue(e.target.value);
  };
  /*Search Onchange function to filter the data */
  let onSearch = (e) => {
    setSearch(e.target.value);
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function by name */
  let sortByNameClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Contact no */
  let sortByContactClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
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
  /*Sorting Function by language */
  let sortByLanguageClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("language");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("language");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };

  /*Sorting Function by Education */
  let sortByEducationClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("education");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("education");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };

  /*Sorting Function by Skill */
  let sortBySkillClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("skill");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("skill");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by specialization */
  let sortBySpecializationClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("specialization");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("specialization");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by experience */
  let sortByExperienceClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "employee_id"
    ) {
      setcolumnName("experience");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("experience");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Experience type array to filter*/
  const Experience = employeeData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.experience === thing.experience)
  );
  /*Skill type array to filter*/
  const Skill = employeeData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.skill === thing.skill)
  );

  /*Education type array to filter*/
  const EducationArray = employeeData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.education === thing.education)
  );

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <ToastContainer />
        <PersonalDetails
          show={showAddEmployeeModal}
          employeeId={employeeId}
          close={() => setShowEmployeeMOdal(false)}
        />
        <LmiaStatus
          close={() => setShowLimiaStatusModal(false)}
          employeeId={employeeId}
          show={showLimiaSttusModal}
        />
        <Education
          close={() => setShowEducationModal(false)}
          employeeId={employeeId}
          show={showEducationModal}
        />
        <Skills
          show={showSkillsModal}
          employeeId={employeeId}
          close={() => setShowSkillsModal(false)}
        />
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
              <div className="mb-8 align-items-center">
                <div className="">
                  <h3 className="font-size-6 mb-0">Applicants</h3>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Search Employee:
                    </p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Employee"}
                      value={search}
                      name={"Employee_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Experience:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="experience"
                        value={experienceFilterValue}
                        id="experience"
                        onChange={onExperienceFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 form-control text-black-2"
                      >
                        <option value={""}>Select Experience</option>
                        {(Experience || []).map((experience) => (
                          <option
                            key={experience.employee_id}
                            value={experience.experience}
                          >
                            {experience.experience}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Skill:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="skill"
                        value={skillFilterValue}
                        id="Skill"
                        onChange={onSkillFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 form-control text-black-2"
                      >
                        <option value={""}>Select Skill</option>
                        {(Skill || []).map((keyskill) => (
                          <option
                            key={keyskill.employee_id}
                            value={keyskill.skill}
                          >
                            {keyskill.skill}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Education:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="education"
                        value={educationFilterValue}
                        id="education"
                        onChange={onEducationFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 form-control text-black-2"
                      >
                        <option value="" data-display="Product Designer">
                          Select education
                        </option>
                        {(EducationArray || []).map((education) => (
                          <option
                            key={education.employee_id}
                            value={education.education}
                          >
                            {education.education}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="text-end px-6 w-100">
                    <div className="float-md-right mt-6">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editEmployee("0")}
                      >
                        Add Employee
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-8 px-2 ">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr className="border border-color-2">
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
                            onClick={sortByContactClick}
                            className="text-gray"
                          >
                            Contact
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByLanguageClick}
                            className="text-gray"
                          >
                            Languages
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByEducationClick}
                            className="text-gray"
                          >
                            Education
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortBySkillClick}
                            className="text-gray"
                          >
                            Skills
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortBySpecializationClick}
                            className="text-gray"
                          >
                            Specialization
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByExperienceClick}
                            className="text-gray"
                          >
                            Experience
                          </Link>
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
                      {totalData !== 0 ? (
                        (employeeData || []).map((empdata) => (
                          <tr
                            className="border border-color-2"
                            key={empdata.employee_id}
                          >
                            <td className=" border-0 py-7 ">
                              <div className="media  align-items-center">
                                <div className="circle-36 mx-auto">
                                  {empdata.profile_photo === null ? (
                                    <img
                                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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
                            </td>
                            <td className=" py-7">
                              <Link
                                to={""}
                                onClick={
                                  empdata.name !== null
                                    ? () => employeeDetails(empdata.employee_id)
                                    : null
                                }
                              >
                                {empdata.name === null ? (
                                  <h4 className="font-size-3 font-weight-bold  mb-0">
                                    Unavailable
                                  </h4>
                                ) : (
                                  <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                    <p className="m-0">{empdata.name}</p>
                                    <p className="text-gray font-size-2 m-0">
                                      {empdata.marital_status} ({empdata.gender}
                                      {/*Calculation of age from date of birth*/}
                                      {moment().diff(
                                        empdata.date_of_birth,
                                        "years"
                                      )}
                                      Y)
                                    </p>
                                  </h4>
                                )}
                              </Link>
                            </td>
                            <td className=" py-7 ">
                              {empdata.contact_no === null ? (
                                <h3 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h3>
                              ) : (
                                <p className="m-0">+{empdata.contact_no}</p>
                              )}
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                <p className="text-gray font-size-2 m-0">
                                  {empdata.email}
                                </p>
                              </h3>
                            </td>

                            <td className=" py-7">
                              {empdata.language === null ? (
                                <h3 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h3>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.language}
                                </h3>
                              )}
                            </td>
                            <td className=" py-7">
                              {empdata.education === null ? (
                                <h3 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h3>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.education}
                                </h3>
                              )}
                            </td>
                            <td className=" py-7">
                              {empdata.skill === null ? (
                                <h3 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h3>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.skill}
                                </h3>
                              )}
                            </td>
                            <td className=" py-7">
                              {empdata.specialization === null ? (
                                <h3 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h3>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.specialization}
                                </h3>
                              )}
                            </td>
                            <td className=" py-7">
                              {empdata.experience === null ? (
                                <h3 className="font-size-3 font-weight-bold  mb-0">
                                  Unavailable
                                </h3>
                              ) : (
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {empdata.experience} Years
                                </h3>
                              )}
                            </td>
                            <td className="d-flex py-7">
                              <Link
                                to=""
                                onClick={() =>
                                  editEmployeeLimiaStatus(empdata.employee_id)
                                }
                              >
                                <span className="fas fa-stream text-gray px-2"></span>
                              </Link>

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
                                onClick={() =>
                                  editEmployee(empdata.employee_id)
                                }
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
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                        </tr>
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
                <UserProfile employeeId={employeeId} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employee;
