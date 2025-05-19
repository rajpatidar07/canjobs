import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import Calllogtable from "../common/CallLogTable";
import { CiFilter, CiSearch } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
// import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import { getallAdminData } from "../../api/api";

const ManageDailyCallLog = () => {
  const [showdropdown, setShowdropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  // const [showItemdropdown, setShowItemdropdown] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showfilterdropdown, setShowfilterdropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [adminList, setAdminList] = useState([false]);
  const [searchCandidate, setSearchCandidate] = useState("");
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
      <AdminHeader heading={"Manage Daily Call Log"} />
      <AdminSidebar heading={"Manage Daily Call Log"} />

      <div className="dashboard-main-container mt-14" id="dashboard-body">
         {/*removing class for now mt-14 */}
        <div className="container-fluid">
          <div className="mb-18">
            <div className="mb-4 align-items-center">
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Manage Daily Call Log</h3>
              </div>
            </div>

            <div className="d-flex justify-content-start">
              {/* New Item Dropdown */}
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

                {/* <div
                                    className={` position-absolute end-0 bg-white z-index-4 text-left shadow-lg p-4 ${showItemdropdown === 0 ? "d-block" : "d-none"
                                        }`}
                                    style={{ width: "300px" }}
                                >
                                    <div className="">
                                        <div>
                                            <button className="btn font-size-4 font-weight-regular justify-content-start ">
                                                <span>
                                                    <CgFileDocument />
                                                </span>
                                                <span className="ml-2 text-left">
                                                    New Group of Items
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button className=" btn justify-content-start font-size-4 font-weight-regular">
                                                <span>
                                                    <CiImport />
                                                </span>
                                                <span className="ml-2 font-weight-500">
                                                    Import Items
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
              </div>

              {/* Search */}
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
                  value={searchCandidate}
                  onChange={(e) => setSearchCandidate(e.target.value)}
                />
              </div>

              {/* Person Dropdown */}
              {/* <div className="position-relative">
                                <button
                                    className="font-size-4 rounded-3 border-0 btn bg-white p-2 mr-4"
                                    onClick={() => {
                                        setShowdropdown((prev) => !prev);
                                        // setShowItemdropdown(false);
                                        setShowfilterdropdown(false);
                                    }}
                                >
                                    <IoPersonCircleOutline />
                                    <span className="ml-2">Person</span>
                                </button>

                                <div
                                    className={`position-absolute bg-white z-index-4 p-8 shadow-lg ${showdropdown ? "d-block" : "d-none"
                                        }`}
                                    style={{ width: "500px" }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="font-size-4">
                                            Filter this board by person
                                        </h3>
                                        <button className="btn btn-primary d-none">
                                            Save as New View
                                        </button>
                                    </div>
                                    <p>And find items they are working on</p>
                                    <div className="position-relative w-100">
                                        <input
                                            type="text"
                                            className="form-control font-size-4 mb-4 w-100 px-4"
                                            placeholder="Search"
                                            onChange={(e) => setPersonSearch(true)}
                                        />
                                    </div>

                                    {personSearch && (
                                        <div className="d-none justify-content-between align-items-center ">
                                            <Link
                                                to={""}
                                                className="font-size-4 text-primary font-weight-bold"
                                            >
                                                <img
                                                    alt="persons"
                                                    src="image/icons/arrow-right.svg"
                                                />
                                            </Link>
                                            <Link
                                                to={""}
                                                className="font-size-4 text-primary font-weight-bold"
                                            >
                                                <img
                                                    alt="persons"
                                                    src="image/icons/arrow-right.svg"
                                                />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div> */}
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
                    {/* Admin List */}
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

              {/* Filter Dropdown */}
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
                  className={`position-absolute bg-white z-index-4 p-8 shadow-lg right-25 ${
                    showfilterdropdown ? "d-block" : "d-none"
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
                  setSelectedAdminId("");
                  setSearchQuery("");
                }}
              >
                Reset
              </button>
            </div>

            {/* Call Log Table */}
            <Calllogtable
              heading={"Daily Call log"}
              showAddForm={showAddItemForm}
              adminList={adminList}
              searchCandidate={searchCandidate}
              setShowAddForm={setShowAddItemForm}
              selectedAdminId={selectedAdminId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDailyCallLog;
