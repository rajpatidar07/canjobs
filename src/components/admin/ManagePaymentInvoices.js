import React, {/* useEffect, useRef, useState*/ } from "react";
// import { CiFilter, CiSearch } from "react-icons/ci";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import PaymentPage from "../common/payment invoice/PaymentPage";
// import { FaAngleDown } from "react-icons/fa";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import PaymentTable from "../common/PaymentTable";
// import {
//   getallAdminData,
//   getallEmployeeData,
//   getAllEmployer,
// } from "../../api/api";
// import { Link } from "react-router-dom";
// import PaymentInvoiceTable from "../common/payment invoice/PaymentInvoiceTable";
const ManagePayment = () => {
  // const [showdropdown, setShowdropdown] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedAdminType, setSelectedAdminType] = useState("");
  // const [selectedAdminId, setSelectedAdminId] = useState("");
  // const [employeeEmployerlist, setEmployeeEmployerlist] = useState(false);
  // const [adminList, setAdminList] = useState([]);
  // const [showAddItemForm, setShowAddItemForm] = useState(false);
  // const [showfilterdropdown, setShowfilterdropdown] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
  // const [search, setSearch] = useState("");
  // const [resetWithPaymentRecId, setResetWithPaymentRecId] = useState(false);

  // const dropdownRef = useRef(null);

  // /*function to get the user and admin data */
  // const getUserData = async () => {
  //   try {
  //     const userData = await getallEmployeeData();
  //     const CompanyData = await getAllEmployer();
  //     const resAdmin = await getallAdminData();
  //     setAdminList(resAdmin.data);
  //     let allUserData = [];
  //     if (userData?.data?.length === 0 && CompanyData?.data?.length === 0) {
  //       setEmployeeEmployerlist([]);
  //     } else {
  //       allUserData = [...userData.data, ...CompanyData.data];
  //       setEmployeeEmployerlist(allUserData);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const filteredAdmins = adminList
  //   ? adminList?.filter((admin) =>
  //     admin?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   : [];

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setShowdropdown(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* Header & Sidebar */}
      <AdminHeader heading={"Manage Payment"} />
      <AdminSidebar heading={"Manage Payment"} />

      <div className="dashboard-main-container mt-14" id="dashboard-body">
        <div className="container-fluid">
          <div className="mb-18">
            <div className="mb-4 align-items-center">
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Manage Payments</h3>
              </div>
            </div>
            <PaymentPage pageName={"manage_payment"} />
            {/* <div className=" justify-content-start d-none">//d-flex tha Abhi payemnt wala compoent import krne ke liye d- none kiya he 
              <div className="position-relative mr-2">
                <button
                  className="font-size-4 rounded-3 border-0 btn btn-primary p-2 mr-4"
                  onClick={() => {
                    // Toggle new item dropdown and close others
                    // setShowItemdropdown((prev) => !prev);
                    setShowdropdown(false);
                    setShowfilterdropdown(false);
                    setShowAddItemForm(true);
                  }}
                >
                  <span className="ml-4">New Item</span>
                  <span className=" d-none ml-4 font-size-3 border-left-1">
                    <FaAngleDown />
                  </span>
                </button>
              </div>

              <div
                className="input-group mr-4"
                style={{
                  width: isFocused ? "300px" : "100px",
                  transition: "width 0.3s ease-in-out",
                }}
              >
                <div className="input-group-append">
                  <button
                    className="form-control"
                    type="button"
                    style={{
                      background: "#fff",
                      border: "none",
                      outline: 0,
                      height: "2.5rem",
                    }}
                  >
                    <CiSearch />
                  </button>
                </div>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{ height: "2.5rem" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="font-size-4 rounded-3 border-0 btn bg-white p-2 mr-4"
                  onClick={() => setShowdropdown((prev) => !prev)}
                >
                  <IoPersonCircleOutline />
                  <span className="ml-2">Person</span>
                </button>

                {showdropdown && (
                  <div
                    className="position-absolute bg-white z-index-4 p-8 shadow-lg"
                    style={{ width: "500px" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="font-size-4">
                        Filter this board by person
                      </h3>
                    </div>
                    <div className="position-relative w-100">
                      <input
                        type="text"
                        className="form-control font-size-4 mb-4 w-100 px-4"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin) => (
                          <li
                            key={admin.id}
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                          >
                            <Link
                              onClick={() => {
                                setSelectedAdminId(admin.admin_id);
                                setSelectedAdminType(admin.admin_type);
                                setShowfilterdropdown((prev) => !prev);
                                setShowdropdown(false);
                                setSearchQuery("");
                              }}
                            >
                              <span className="font-size-4 text-decoration-none">
                                {admin.name}
                              </span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <p className="text-muted text-center">
                          No results found
                        </p>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="position-relative d-none">
                <button
                  className="font-size-4 rounded-3 border-0 bg-white btn p-2 mr-4"
                  onClick={() => {
                    setShowfilterdropdown((prev) => !prev);
                    setShowdropdown(false);
                    // setShowItemdropdown(false);
                  }}
                >
                  <CiFilter />
                  <span className="ml-2">Filter</span>
                </button>

                <div
                  className={`position-absolute bg-white z-index-4 p-8 shadow-lg right-25 ${showfilterdropdown ? "d-block" : "d-none"
                    }`}
                  style={{ width: "800px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="font-size-4 mr-4">Advanced filters</h3>
                      <p className="font-size-3 mt-4 text-muted">
                        Showing 15 of 50 items
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <button className="btn btn-light">Clear All</button>
                      <button className="btn btn-primary">
                        Save as New View
                      </button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <span className="me-2">Where</span>

                    <select className="form-select me-2 p-2 mx-4 w-100">
                      <option>Column</option>
                      <option>Priority</option>
                      <option>Status</option>
                    </select>

                    <select className="form-select p-2 w-100">
                      <option>Condition</option>
                      <option>Equals</option>
                      <option>Contains</option>
                    </select>

                    <select className="form-select ml-4 p-2 w-100">
                      <option>Value</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div className="d-flex mb-3">
                    <button className="btn mr-2">+ New Filter</button>
                    <button className="btn">+ New Group</button>
                  </div>

                  <div className="d-flex align-items-center">
                    <span className="me-2">Quick Filter</span>
                    <input
                      type="checkbox"
                      id="quickFilter"
                      className="d-none"
                    />
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedAdminId("");
                  setSelectedAdminType("");
                  setSearchQuery("");
                  setResetWithPaymentRecId(true);
                  const newUrl = window.location.pathname;
                  window.history.replaceState({}, document.title, newUrl);
                  // Reset the flag after a short delay to allow ConsultationTable to react
                  setTimeout(() => setResetWithPaymentRecId(false), 100);
                }}
              >
                Reset
              </button>
            </div> */}

            {/* Payment Table */}
            {/* <PaymentTable
              heading={"Payment Table"}
              showAddForm={showAddItemForm}
              setShowAddForm={setShowAddItemForm}
              employeeEmployerlist={employeeEmployerlist}
              adminList={adminList}
              search={search}
              selectedAdminId={selectedAdminId}
              selectedAdminType={selectedAdminType}
              resetWithPaymentRecId={resetWithPaymentRecId}

            /> */}
            {/* <PaymentInvoiceTable
              handleSort={handleSort}
              setDeleteAlert={setDeleteAlert}
              setDeleteData={setDeleteData}
              setOpenViewInvoice={setOpenViewInvoice}
              setInvoiceData={setInvoiceData}
              GetInvoicePdf={GetInvoicePdf}
              setOpenRecPaymentForm={setOpenRecPaymentForm}
              setOpenPaymentReminder={setOpenPaymentReminder}
              setOpenUploadPaymentForm={setOpenUploadPaymentForm}
              setOpenAddPaymentForm={setOpenAddPaymentForm}
              setSingleInvoiceData={setSingleInvoiceData}
              json={json}
              invoiceList={invoiceList}
              totalData={totalData}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePayment;
