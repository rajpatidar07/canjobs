import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import Addadmin from "../forms/admin/addadmin";
import { getallAdminData, DeleteAdmin } from "../../api/api";
import { ToastContainer,toast } from "react-toastify";
import SAlert from "../common/sweetAlert";

function ManageAdmin() {
  // eslint-disable-next-line
  let [showAminDetails, setShowAminDetails] = useState(false);
  let [showAddAdminModal, setShowAdminModal] = useState(false);
  let [adminData, setAdminData] = useState([]);
  let [adminId, setAdminID] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");

  /* Function to get the Amin data*/
  const AdminData = async () => {
    const userData = await getallAdminData();
    setAdminData(userData);
  };

  /*Render function to get the Admin*/
  useEffect(() => {
    AdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddAdminModal, deleteAlert]);

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
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Admin</h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Type:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">select type</option>
                        <option value="">Super Admin</option>
                        <option value="">Admin</option>
                        <option value="">Manager</option>
                        <option value="">Operator</option>
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => setShowAdminModal(true)}
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Admin Type
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Email{" "}
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
                      {(adminData || []).map((admin) => (
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
                              <span className=" fas fa-edit text-gray px-5">
                                {" "}
                              </span>
                            </Link>
                            <Link to="" onClick={() => ShowDeleteAlert(admin)}>
                              <span className=" text-danger">
                                {" "}
                                <i className="fa fa-trash"></i>
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
                    {" "}
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-18">
              {" "}
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
