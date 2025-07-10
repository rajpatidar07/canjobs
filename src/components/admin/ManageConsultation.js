
import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { CiSearch } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getallAdminData } from "../../api/api";
import ConsultationTable from "../common/ConsultationTable";

const ManageConsultation = () => {
  const [showdropdown, setShowdropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminType, setSelectedAdminType] = useState(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [dayFilterValue, setDayFilterValue] = useState("");
  // const [filterData, setFilterData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  // const [showfilterdropdown, setShowfilterdropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [adminList, setAdminList] = useState([false]);
  const [searchCandidate, setSearchCandidate] = useState("");
  const [resetWithoutConsultationId, setResetWithoutConsultationId] = useState(false);
  const dropdownRef = useRef(null);

  let getAdminData = async () => {
    try {
      let response = await getallAdminData();
      setAdminList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAdminData();
  }, []);
  const filteredAdmins = adminList
    ? adminList?.filter((admin) =>
      admin?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowdropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* Header & Sidebar */}
      <AdminHeader heading={"Manage Consultation Log"} />
      <AdminSidebar heading={"Manage Consultation Log"} />

      <div className="dashboard-main-container" id="dashboard-body">
        <div className="container-fluid">
          <div className="mb-18">
            <div className="mb-4 align-items-center">
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Manage Consultation Log</h3>
              </div>
            </div>

            <div className="d-flex justify-content-start">
              {/* New Item Dropdown */}
              <div className="position-relative mr-2">
                <button
                  className="font-size-4 rounded-3 border-0 btn btn-primary p-2 mr-4"
                  onClick={() => {
                    setShowdropdown(false);
                    // setShowfilterdropdown(false);
                    setShowAddItemForm(true);
                  }}
                >
                  <span className="ml-4">New Item</span>
                  <span className=" d-none ml-4 font-size-3 border-left-1">
                    <FaAngleDown />
                  </span>
                </button>
              </div>

              {/* Search */}
              <div
                className="input-group mr-4 d-none"
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
                  value={searchCandidate}
                  onChange={(e) => setSearchCandidate(e.target.value)}
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
                      <h3 className="font-size-4">Filter this board by person</h3>
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
                    {/* Admin List */}
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin, index) => (
                          <li
                            key={index}
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                          >
                            <Link
                              onClick={() => {
                                setSelectedAdminId(admin.admin_id);
                                setSelectedAdminType(admin.admin_type);
                                // setShowfilterdropdown((prev) => !prev);
                                setShowdropdown(false);
                                setSearchQuery("");
                                setPageNo(1);
                              }}
                            >
                              <span className="font-size-4 text-decoration-none">
                                {admin.name}
                              </span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <p className="text-muted text-center">No results found</p>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedAdminId("");
                  setSelectedAdminType("");
                  setSearchQuery("");
                  setDayFilterValue("");
                  setPageNo(1);
                  setResetWithoutConsultationId(true);
                  const newUrl = window.location.pathname;
                  window.history.replaceState({}, document.title, newUrl);
                  // Reset the flag after a short delay to allow ConsultationTable to react
                  setTimeout(() => setResetWithoutConsultationId(false), 100);
                }}
              >
                Reset
              </button>
            </div>

            {/* Consultation Table */}
            <ConsultationTable
              heading={"Consultation"}
              showAddForm={showAddItemForm}
              adminList={adminList}
              searchCandidate={searchCandidate}
              setShowAddForm={setShowAddItemForm}
              selectedAdminId={selectedAdminId}
              selectedAdminType={selectedAdminType}
              day={dayFilterValue}
              // setFilterData={setFilterData}
              pageNo={pageNo}
              setPageNo={setPageNo}
              resetWithoutConsultationId={resetWithoutConsultationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageConsultation;
