import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee } from "../../api/api";
import moment from "moment";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";

export default function EmployeeTable(props) {
  /*Show modal states */
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  // let [showResume, setShowResume] = useState(false);
  /*data and id states */
  // let [resumeid, setResumeId] = useState(false);
  const [employeeData, setemployeeData] = useState([]);
  let [employeeId, setemployeeId] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);

  /* Function to get Employee data*/
  const EmpData = async () => {
    const userData = await getallEmployeeData(
      props.search,
      props.experienceFilterValue,
      props.skillFilterValue,
      props.educationFilterValue,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.filter_by_time
    );
    if (userData.data.length === 0) {
      setemployeeData([]);
    } else {
      setemployeeData(userData.data);
      setTotalData(userData.total_rows);
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmpData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.showAddEmployeeModal,
    deleteAlert,
    showAddEmployeeModal,
    props.showAddEmployeeModal,
    showEducationModal,
    showSkillsModal,
    showEmployeeProfile,
    props.experienceFilterValue,
    props.skillFilterValue,
    props.educationFilterValue,
    props.search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
  ]);

  /* Function to show the single data to update Employee*/
  const employeeDetails = (e) => {
    // e.preventDefault();
    setShowEmployeeProfile(true);
    props.employeeDetails(e);
  };
  /* Function to show the single data to update Employee Education*/
  const editEmployeeEducation = (e) => {
    // e.preventDefault();
    setShowEducationModal(true);
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
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setClicksort(clicksort === 0 ? 1 : 0);
    setSortOrder(clicksort === 0 ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /*Function to generate resume */
  const ResumeClick = (employee_id) => {
    const id = employee_id;
    window.open(`/resume/${id}`, "_blank");
  };
  return (
    <>
      <PersonalDetails
        show={showAddEmployeeModal}
        employeeId={employeeId}
        close={() => setShowEmployeeMOdal(false)}
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
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        <div className="table-responsive main_table_div">
          <table className="table table-striped main_data_table">
            <thead>
              <tr className="">
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
                    onClick={() => handleSort("name")}
                    className="text-gray"
                    title="Sort by Name"
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
                    onClick={() => handleSort("contact_no")}
                    className="text-gray"
                    title="Sort by Contact"
                  >
                    Contact
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
                      onClick={() => handleSort("languages")}
                      className="text-gray"
                      title="Sort by Languages"
                    >
                      Languages
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
                      onClick={() => handleSort("education")}
                      className="text-gray"
                      title="Sort by Education"
                    >
                      Education
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
                      onClick={() => handleSort("skill")}
                      className="text-gray"
                      title="Sort by Skill"
                    >
                      Skills
                    </Link>
                  </th>
                )}
                {/* <th
            scope="col"
            className="border-0 font-size-4 font-weight-normal"
          >
            <Link
              to={""}
              onClick={()=>handleSort("name")}
              className="text-gray"
            >
              Specialization
            </Link>
          </th> */}
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => handleSort("experience")}
                    className="text-gray"
                    title="Sort by Experience"
                  >
                    Experience
                  </Link>
                </th>
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
              {totalData !== 0 ? (
                (employeeData || []).map((empdata) => (
                  <tr className="" key={empdata.employee_id}>
                    <td className="py-5 pr-0">
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
                    <td className=" py-5">
                      {props.heading === "Dashboard" ? (
                        <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                          <p className="m-0">{empdata.name}</p>
                          <p className="text-gray font-size-2 m-0">
                            {empdata.marital_status} ({empdata.gender}
                            {/*Calculation of age from date of birth*/}
                            {moment().diff(empdata.date_of_birth, "years")}
                            Y)
                          </p>
                        </h4>
                      ) : (
                        <Link
                          to={""}
                          onClick={
                            empdata.name !== null
                              ? () => employeeDetails(empdata.employee_id)
                              : null
                          }
                          title="Employee Details"
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
                                {moment().diff(empdata.date_of_birth, "years")}
                                Y)
                              </p>
                            </h4>
                          )}
                        </Link>
                      )}
                    </td>
                    <td className="py-5 ">
                      {empdata.contact_no === null ? (
                        <h3 className="font-size-3 font-weight-bold  mb-0">
                          Unavailable
                        </h3>
                      ) : (
                        <p className="m-0">+{empdata.contact_no}</p>
                      )}
                      <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                        <p className="text-gray font-size-2 m-0">
                          {empdata.email}
                        </p>
                      </h3>
                    </td>

                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5">
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
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5">
                        {empdata.education === null ? (
                          <h3 className="font-size-3 font-weight-bold  mb-0">
                            Unavailable
                          </h3>
                        ) : (
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                            {empdata.education}
                          </h3>
                        )}
                      </td>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5">
                        {empdata.skill === null ? (
                          <h3 className="font-size-3 font-weight-bold  mb-0">
                            Unavailable
                          </h3>
                        ) : (
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                            {empdata.skill}
                          </h3>
                        )}
                      </td>
                    )}
                    {/* <td className=" py-5">
                {empdata.specialization === null ? (
                  <h3 className="font-size-3 font-weight-bold  mb-0">
                    Unavailable
                  </h3>
                ) : (
                  <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                    {empdata.specialization}
                  </h3>
                )}
              </td> */}
                    <td className=" py-5">
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
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className="d-flex py-5 min-width-px-100">
                        <div
                          className="btn-group button_group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() =>
                              editEmployeeEducation(empdata.employee_id)
                            }
                            title="Education"
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() =>
                              editEmployeeSkills(empdata.employee_id)
                            }
                            title="Skills"
                          >
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => editEmployee(empdata.employee_id)}
                            title="Edit Employee"
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn text-center"
                            onClick={() => ResumeClick(empdata.employee_id)}
                            title="Resume"
                          >
                            <span className="fas fa-file text-gray"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => ShowDeleteAlert(empdata)}
                            title="Delete"
                          >
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
                            </span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading === "Dashboard" ? (
                    <th className="bg-white">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}{" "}
                  <th className="bg-white"></th>
                  {props.heading !== "Dashboard" ? (
                    <>
                      {" "}
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                    </>
                  ) : (
                    ""
                  )}
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
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteEmployee(deleteId)}
        showCancelButton={true}
        onCancel={CancelDelete}
      />
    </>
  );
}
