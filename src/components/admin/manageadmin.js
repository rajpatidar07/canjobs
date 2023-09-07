import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import Addadmin from "../forms/admin/addadmin";
import { getallAdminData, DeleteAdmin } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import Loader from "../common/loader";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineAddTask, MdPersonRemove } from "react-icons/md";
function ManageAdmin() {
  /*data and id state */
  let [apiCall, setApiCall] = useState(false);
  let [showAminDetails /*, setShowAminDetails*/] = useState(false);
  let [showAddAdminModal, setShowAdminModal] = useState(false);
  let [adminData, setAdminData] = useState([]);
  let [executiveData, setexecutiveData] = useState([]);
  let [adminId, setAdminID] = useState();
  let [isLoading, setIsLoading] = useState(true);
  let [addTeamListShow, setAddTeamListShow] = useState(true);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("admin_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get the Amin data*/
  const AdminData = async () => {
    setIsLoading(true);
    try {
      const userData = await getallAdminData(
        typeFilterValue,
        search,
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.length === 0) {
        setAdminData([]);
        setIsLoading(false);
      } else {
        setAdminData(userData.data);
        setexecutiveData(
          userData.data.filter((item) => item.admin_type === "executive")
        );
        setTotalData(userData.total_rows);
        if (apiCall === true) {
          let Admin_name = userData.data.filter(
            (data) => data.admin_id === localStorage.getItem("admin_id")
          );
          if (Admin_name[0].admin_id === localStorage.getItem("admin_id")) {
            localStorage.setItem("admin", Admin_name[0].name);
          }
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  /*Render function to get the Admin*/
  useEffect(() => {
    AdminData();
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    typeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    apiCall,
  ]);

  /* Function to show the single data to update Admin*/
  const editAdmin = (e) => {
    // e.preventDefault();
    setShowAdminModal(true);
    setAdminID(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.admin_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteAdmin(e) {
    try {
      const responseData = await DeleteAdmin(e);
      if (responseData.message === "admin has been deleted") {
        toast.error("Admin deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*Search Onchange function to filter the data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setCurrentPage(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Admin Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setCurrentPage(1);
  };
  /*Function to add team to the manager */
  const addTeam = async () => {
    setAddTeamListShow(true ? false : true);
    console.log("add team to manager");
  };
  /*Function o add task to the executive */
  // const AddTask = async () => {console.log("add task to executive")};

  /*Functo to remove assigned executive */
  const RemoveAssined = async () => {
    console.log("remove assigned executive");
  };
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Admin"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Admin"} />
        <ToastContainer />
        {showAddAdminModal ? (
          <Addadmin
            show={showAddAdminModal}
            adminId={adminId}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setShowAdminModal(false)}
          />
        ) : null}
        <div
          className={
            showAminDetails === false
              ? "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 mb-18">
                <div className="mb-4 align-items-center">
                  <div className="page___heading">
                    <h3 className="font-size-6 mb-0">Admin</h3>
                  </div>
                  <div className="row m-0 align-items-center">
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Search:</p>
                      <input
                        required
                        maxLength={30}
                        type="text"
                        className="form-control "
                        placeholder={"Admin Name"}
                        value={search}
                        name={"Admin_name"}
                        onChange={(e) => {
                          onSearch(e);
                        }}
                      />
                    </div>
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Filter by Admin:</p>
                      <div className="select_div">
                        <select
                          name="type"
                          value={typeFilterValue}
                          id="type"
                          onChange={(e) => {
                            setTypeFilterValue(e.target.value);
                            setCurrentPage(1);
                          }}
                          className=" form-control"
                        >
                          <option value="">Admin type</option>
                          {(FilterJson.admintype || []).map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col px-1 form_group mt-4 text-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editAdmin("0")}
                        title="Add Admin"
                      >
                        Add Admin
                      </CustomButton>
                    </div>
                  </div>
                  <small className="text-danger">{searcherror}</small>
                </div>
                {
                  <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                    <div className="table-responsive main_table_div">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <table className="table table-striped main_data_table">
                          <thead>
                            <tr>
                              <th></th>
                              <th
                                scope="col"
                                className="border-0 font-size-4 font-weight-normal"
                              >
                                <Link
                                  className="text-gray"
                                  to={""}
                                  onClick={() => handleSort("name")}
                                  title="Sort by Name"
                                >
                                  Admin Name
                                </Link>
                              </th>
                              <th
                                scope="col"
                                className="pl-4 border-0 font-size-4 font-weight-normal"
                              >
                                <Link
                                  className="text-gray"
                                  to={""}
                                  onClick={() => handleSort("admin_type")}
                                  title="Sort by Type"
                                >
                                  Admin Type
                                </Link>
                              </th>
                              <th
                                scope="col"
                                className="pl-4 border-0 font-size-4 font-weight-normal"
                              >
                                <Link
                                  className="text-gray"
                                  to={""}
                                  onClick={() => handleSort("email")}
                                  title="Sort by Email"
                                >
                                  Email
                                </Link>
                              </th>
                              <th
                                scope="col"
                                className="pl-4 border-0 font-size-4 font-weight-normal"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalData === 0 || adminData.length === 0 ? (
                              <tr>
                                <th className="bg-white"></th>
                                <th className="bg-white text-center">
                                  No Data Found
                                </th>
                                <th className="bg-white"></th>
                                <th className="bg-white"></th>
                              </tr>
                            ) : (
                              (adminData || []).map((admin) => (
                                <tr
                                  className="text-capitalize"
                                  key={admin.admin_id}
                                >
                                  <th>
                                    <div className="d-flex profile_box gx-2">
                                      <div className="media  align-items-center">
                                        <div className="circle-36 mx-auto overflow-hidden">
                                          {/* {empdata.profile_photo === null ? ( */}
                                          <img
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                            alt=""
                                            className="w-100"
                                          />
                                          {/* ) : (
                                  <img
                                    src={empdata.profile_photo}
                                    alt=""
                                    className="w-100"
                                  />
                                )} */}
                                        </div>
                                      </div>
                                    </div>
                                  </th>
                                  <th className=" py-5">
                                    <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                                      {admin.name}
                                    </h3>
                                  </th>
                                  <th className="py-5">
                                    <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                                      {admin.admin_type}
                                    </h3>
                                  </th>
                                  <th className="py-5 ">
                                    <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-lowercase">
                                      <Link
                                        className="text-dark"
                                        to={`mailto:${admin.email}`}
                                      >
                                        {admin.email}
                                      </Link>
                                    </h3>
                                  </th>
                                  <th className="py-5 min-width-px-100">
                                    <div
                                      className="btn-group button_group"
                                      role="group"
                                    >
                                      <button
                                        className="btn btn-outline-info action_btn"
                                        onClick={() =>
                                          editAdmin(admin.admin_id)
                                        }
                                        title="Edit Admin"
                                      >
                                        <span className="text-gray">
                                          <LiaUserEditSolid />
                                        </span>
                                        {/* <span className=" fas fa-edit text-gray"></span> */}
                                      </button>
                                      <button
                                        className="btn btn-outline-info action_btn"
                                        onClick={() => ShowDeleteAlert(admin)}
                                        title="Delete"
                                      >
                                        <span className=" text-danger">
                                          <RiDeleteBin5Line />
                                          {/* <i className="fa fa-trash"></i> */}
                                        </span>
                                      </button>
                                    </div>
                                  </th>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="pt-2">
                      <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        total={totalData}
                        count={adminData.length}
                      />
                    </div>
                  </div>
                }
              </div>
              <div className="col-6 mb-18">
                <div className="mb-4 align-items-center">
                  <div className="page___heading">
                    <h3 className="font-size-6 mb-0">Admin</h3>
                  </div>
                  <div className="row m-0 align-items-center">
                    <div className="col p-1 form_group mb-3">
                      <h4 className="">Ram</h4>
                    </div>
                    <div className="col px-1 form_group mt-4 text-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => addTeam()}
                        title="Add Team"
                      >
                        Add Team
                      </CustomButton>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                  <div className="table-responsive main_table_div">
                    {isLoading ? (
                      <Loader />
                    ) : addTeamListShow === true ? (
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        {(executiveData || []).map((item, index) => (
                          <div className="accordion mt-2" key={index}>
                            <div className="card">
                              <div
                                className="card-header bg-white"
                                id={`headingOne${index}`}
                              >
                                <div className=" d-flex justify-content-between flex-row">
                                  <div className=" d-flex flex-column ">
                                    <div className="d-flex profile_box gx-2">
                                      <div className="media  align-items-center">
                                        <div className="circle-36 mx-auto overflow-hidden">
                                          {/* {empdata.profile_photo === null ? ( */}
                                          <img
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                            alt=""
                                            className="w-100"
                                          />
                                          {/* ) : (
                                  <img
                                    src={empdata.profile_photo}
                                    alt=""
                                    className="w-100"
                                  />
                                )} */}
                                        </div>
                                      </div>

                                      <h5 className="mb-0">{item.name} </h5>
                                    </div>
                                    <Link to={""} className="text-dark">
                                      {item.contact_no}
                                    </Link>
                                    <Link to={""} className="text-dark">
                                      {item.email}
                                    </Link>
                                  </div>
                                  <div className="btn-group button_group flex-shrink-1">
                                    <button
                                      // onClick={() => AddTask()}
                                      title="Add task"
                                      className={`btn btn-outline-info action_btn ${
                                        index === activeIndex ? "" : "collapsed"
                                      }`}
                                      data-toggle="collapse"
                                      data-target="#collapseOne"
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                      onClick={() => handleToggle(index)}
                                    >
                                      <span className="text-gray">
                                        <MdOutlineAddTask />
                                      </span>
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() => RemoveAssined()}
                                      title="Remove Assigned"
                                    >
                                      <span className=" text-danger">
                                        <MdPersonRemove />
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div
                                id={`collapseOne${index}`}
                                className={`collapse  ${
                                  index === activeIndex ? "show" : ""
                                }`}
                                aria-labelledby={`headingOne${index}`}
                                data-parent="#accordion"
                              >
                                <div className="card-body d-flex justify-content-between">
                                  <div className="card-text d-flex flex-row">
                                    <div
                                      className={`sub-stage text-capitalize `}
                                      // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                                    >
                                      <input
                                        type="checkbox"
                                        className="mx-2"
                                        // checked={(selectedStatus || []).some(
                                        //   (item) => item.substage === subStage
                                        // )}
                                        // readOnly
                                      />
                                      Lmia
                                    </div>
                                    <div
                                      className={`sub-stage text-capitalize `}
                                      // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                                    >
                                      <input
                                        type="checkbox"
                                        className="mx-2"
                                        // checked={(selectedStatus || []).some(
                                        //   (item) => item.substage === subStage
                                        // )}
                                        // readOnly
                                      />
                                      Visa
                                    </div>
                                    <div
                                      className={`sub-stage text-capitalize `}
                                      // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                                    >
                                      <input
                                        type="checkbox"
                                        className="mx-2"
                                        // checked={(selectedStatus || []).some(
                                        //   (item) => item.substage === subStage
                                        // )}
                                        // readOnly
                                      />
                                      Job
                                    </div>
                                    <div
                                      className={`sub-stage text-capitalize `}
                                      // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                                    >
                                      <input
                                        type="checkbox"
                                        className="mx-2"
                                        // checked={(selectedStatus || []).some(
                                        //   (item) => item.substage === subStage
                                        // )}
                                        // readOnly
                                      />
                                      Interview
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <h2 className="accordion-header" id={`flush-heading${index}`}>
                              <button
                                className={`accordion-button ${index === activeIndex ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => handleToggle(index)}
                              >
                                {item.name}
                              </button>
                            </h2>
                            <div
                              id={`flush-collapse${index}`}
                              className={`accordion-collapse collapse ${index === activeIndex ? 'show' : ''}`}
                              aria-labelledby={`flush-heading${index}`}
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div className="accordion-body">
                                Placeholder content for this accordion, which is intended to demonstrate the{' '}
                                <code>.accordion-flush</code> className. This is the first item's accordion body.
                              </div>
                            </div> */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="card-text">
                        <h5>Executive's List</h5>
                        <div className="card-text d-flex flex-column">
                          {(executiveData || []).map((item, index) => {
                            return (
                              <div
                                className={`sub-stage text-capitalize `}
                                // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                                key={index}
                              >
                                <input
                                  type="checkbox"
                                  className="mx-2"
                                  // checked={(selectedStatus || []).some(
                                  //   (item) => item.substage === subStage
                                  // )}
                                  // readOnly
                                />
                                {item.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Pagination
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      total={totalData}
                      count={adminData.length}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteAdmin(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
      </div>
    </>
  );
}

export default ManageAdmin;
