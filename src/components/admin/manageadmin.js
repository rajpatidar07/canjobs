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
function ManageAdmin() {
  // eslint-disable-next-line
  /*data and id state */
  let [showAminDetails /*, setShowAminDetails*/] = useState(false);
  let [showAddAdminModal, setShowAdminModal] = useState(false);
  let [adminData, setAdminData] = useState([]);
  let [adminId, setAdminID] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("admin_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get the Amin data*/
  const AdminData = async () => {
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
    } else {
      setAdminData(userData.data);
      setTotalData(userData.total_rows);
    }
  };
  /*Render function to get the Admin*/
  useEffect(() => {
    AdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    typeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    showAddAdminModal,
    deleteAlert,
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
    const responseData = await DeleteAdmin(e);
    if (responseData.message === "admin has been deleted") {
      toast.error("Admin deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
  /*Admin type Onchange function to filter the data */
  let onTypeFilterChange = (e) => {
    setTypeFilterValue(e.target.value);
  };
  /*Search Onchange function to filter the data */
  let onSearch = (e) => {
    setSearch(e.target.value);
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /*Admin type array to filter*/
  // const AdminType = adminData.filter(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.admin_type === thing.admin_type)
  // );

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Admin"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Admin"} />
        <ToastContainer />{" "}
        {showAddAdminModal ? (
          <Addadmin
            show={showAddAdminModal}
            adminId={adminId}
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
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Admin</h3>
                </div>
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search by Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control "
                      placeholder={"Search Admin"}
                      value={search}
                      name={"Admin_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
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
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                <div className="table-responsive ">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
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
                            {" "}
                            Name
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
                      {totalData === 0 ? (
                        <tr>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
                          <th className="bg-white"></th>
                        </tr>
                      ) : (
                        (adminData || []).map((admin) => (
                          <tr className="" key={admin.admin_id}>
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {admin.name}
                              </h3>
                            </th>
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {admin.admin_type}
                              </h3>
                            </th>
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {admin.email}
                              </h3>
                            </th>
                            <th className="py-5 min-width-px-100">
                              <div
                                className="btn-group button_group"
                                role="group"
                              >
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => editAdmin(admin.admin_id)}
                                  title="Edit Admin"
                                >
                                  <span className=" fas fa-edit text-gray"></span>
                                </button>
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => ShowDeleteAlert(admin)}
                                  title="Delete"
                                >
                                  <span className=" text-danger">
                                    <i className="fa fa-trash"></i>
                                  </span>
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
        {/* {showJobDetails === true ? (
        <div className="dashboard-main-container mt-16 ">
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

export default ManageAdmin;
