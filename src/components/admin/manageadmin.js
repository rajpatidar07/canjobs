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
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("admin_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);
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
    setAdminData(userData.data);
    setTotalData(userData.total_rows);
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

  /*Sorting Function by name */
  let sortByNameClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "admin_id") {
      setcolumnName("name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Type no */
  let sortByTypeClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "admin_id") {
      setcolumnName("admin_type");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("admin_type");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by email  */
  let sortByEmailClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "admin_id") {
      setcolumnName("email");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("email");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Admin type array to filter*/
  const AdminType = adminData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.admin_type === thing.admin_type)
  );

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
            showAminDetails === false
              ? "dashboard-main-container mt-24"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="">
                  <h3 className="font-size-6 mb-0">Admin</h3>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Search by name:
                    </p>
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
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Type:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="type"
                        value={typeFilterValue}
                        id="type"
                        onChange={onTypeFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 font-weight-semibold text-black-2"
                      >
                        <option value="">select type</option>
                        {(FilterJson.AdminType || []).map((type, i) => (
                          <option value={type} key={i}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="text-right col-xl-6 mt-6 mt-xl-12">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editAdmin("0")}
                    >
                      Add Admin
                    </CustomButton>
                    <Addadmin
                      show={showAddAdminModal}
                      adminId={adminId}
                      close={() => setShowAdminModal(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            className="text-gray"
                            to={""}
                            onClick={sortByNameClick}
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
                            onClick={sortByTypeClick}
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
                            onClick={sortByEmailClick}
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
                          <th></th>
                          <th></th>
                          <th>No Data Found</th>
                          <th></th>
                        </tr>
                      ) : (
                        (adminData || []).map((admin) => (
                          <tr
                            className="border border-color-2"
                            key={admin.admin_id}
                          >
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {admin.name}
                              </h3>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {admin.admin_type}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {admin.email}
                              </h3>
                            </th>
                            <th className=" py-7 min-width-px-100">
                              <Link
                                to=""
                                onClick={() => editAdmin(admin.admin_id)}
                              >
                                <span className=" fas fa-edit text-gray px-5"></span>
                              </Link>
                              <Link
                                to=""
                                onClick={() => ShowDeleteAlert(admin)}
                              >
                                <span className=" text-danger">
                                  <i className="fa fa-trash"></i>
                                </span>
                              </Link>
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
        <div className="dashboard-main-container mt-24 ">
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
