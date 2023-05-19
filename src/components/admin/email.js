import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { ToastContainer } from "react-toastify";
import { GetAllEmailTemplate } from "../../api/api";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import ManageEmail from "../forms/admin/manageemail";

function EmailTemplate() {
  const [emailData, setEmailData] = useState([]);
  let [showAddAdminModal, setShowAdminModal] = useState(false);
  let [Email, setEmail] = useState();

  let userData = "";
  const GetAllEmail = async () => {
    userData = await GetAllEmailTemplate();
    setEmailData(userData.Data.data);
  };
  useEffect(() => {
    GetAllEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log("userData" + JSON.stringify(emailData));
  const editEmailTemplate = (e) => {
    // e.preventDefault();
    setShowAdminModal(true);
    setEmail(e || "");
  };
  return (
    <>
      {showAddAdminModal ? (
        <ManageEmail
          show={showAddAdminModal}
          data={Email}
          close={() => setShowAdminModal(false)}
        />
      ) : null}
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Email Template"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Email Template"} />
        <ToastContainer />
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Email Template</h3>
                </div>
              </div>
              {/*<-- Job List Table -->*/}
              {/* {emailData} */}
              <div className="row m-0 py-5 mb-5 text-right justify-content-end">
                <button
                  className="btn btn-primary px-5"
                  onClick={() => editEmailTemplate(0)}
                >
                  Add New Template
                </button>
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
                            // onClick={() => handleSort("name")}
                            title="Sort by Name"
                          >
                            Id
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            className="text-gray"
                            to={""}
                            // onClick={() => handleSort("admin_type")}
                            title="Sort by Type"
                          >
                            Email Type
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            className="text-gray"
                            to={""}
                            // onClick={() => handleSort("email")}
                            title="Sort by Email"
                          >
                            Subject
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
                      {(emailData || []).map((email) => (
                        <tr className="" key={email.id}>
                          <td className=" py-5">
                            <div className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                              {email.id}
                            </div>
                          </td>
                          <td className=" py-5">
                            <div className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                              {email.email_type}
                            </div>
                          </td>
                          <td className="py-5">
                            <div className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                              {email.subject}
                            </div>
                          </td>
                          {/* <td className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-lowercase">
                                {email.message}
                              </h3>
                            </td> */}
                          <td className="py-5 min-width-px-100">
                            <div
                              className="btn-group button_group"
                              role="group"
                            >
                              <button
                                className="btn btn-outline-info action_btn"
                                onClick={() => editEmailTemplate(email)}
                                title="Edit Admin"
                              >
                                <span className=" fas fa-edit text-gray"></span>
                              </button>
                              <button
                                className="btn btn-outline-info action_btn"
                                //   onClick={() => ShowDeleteAlert(admin)}
                                title="Delete"
                              >
                                <span className=" text-danger">
                                  <i className="fa fa-trash"></i>
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* )} */}
                    </tbody>
                  </table>
                </div>
                <div className="pt-2">
                  {/* <Pagination nPages={1} currentPage={1} setCurrentPage={1} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailTemplate;
