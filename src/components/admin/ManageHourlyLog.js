import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { CiFilter, CiSearch } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getallAdminData } from "../../api/api";
import Hourlylogtable from "../common/HourlylogTable";

const ManageHourlyLog = () => {
    const [showdropdown, setShowdropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [FilterByHour, setFilterByHour] = useState("");
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const [selectedAdminType, setSelectedAdminType] = useState(null);

    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [dayFilterValue, setDayFilterValue] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [showfilterdropdown, setShowfilterdropdown] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [adminList, setAdminList] = useState([false]);
    const [searchCandidate, setSearchCandidate] = useState("");
    const dropdownRef = useRef(null);

    let getAdminData = async () => {
        try {
            let response = await getallAdminData();
            setAdminList(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAdminData()

    }, [])
    const filteredAdmins = adminList ? adminList?.filter(admin =>
        admin?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) : []

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
            <AdminHeader heading={"Manage Daily Hourly Log"} />
            <AdminSidebar heading={"Manage Daily Hourly Log"} />

            <div className="dashboard-main-container mt-16" id="dashboard-body">
                <div className="container-fluid">
                    <div className="mb-18">
                        <div className="mb-4 align-items-center">
                            <div className="page___heading">
                                <h3 className="font-size-6 mb-0">Manage Daily Hourly Log</h3>
                            </div>
                        </div>

                        <div className="d-flex justify-content-start">
                            {/* New Item Dropdown */}
                            <div className="position-relative mr-2">
                                <button
                                    className="font-size-4 rounded-3 border-0 btn btn-primary p-2 mr-4"
                                    onClick={() => {
                                        // Toggle new item dropdown and close others
                                        setShowdropdown(false);
                                        setShowfilterdropdown(false);
                                        setShowAddItemForm(true)
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
                                    onClick={() => setShowdropdown(prev => !prev)}

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
                                                filteredAdmins.map((admin) => (
                                                    <li
                                                        key={admin.id}
                                                        className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                                    >
                                                        <Link onClick={() => {
                                                            setSelectedAdminId(admin.admin_id)
                                                            setSelectedAdminType(admin.admin_type)
                                                            setShowfilterdropdown((prev) => !prev);
                                                            setShowdropdown(false);
                                                            setSearchQuery("")
                                                            setPageNo(1)

                                                        }}>
                                                            <span className="font-size-4 text-decoration-none">{admin.name}</span>
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
                            <div className=" mr-2 row" style={{ bottom: 15 }}>
                                <div
                                    className={"col  form_group "
                                    }
                                >
                                    <p className="input_label">Filter by Day</p>
                                    <div className="select_div">
                                        <select
                                            name="day"
                                            value={dayFilterValue}
                                            id="day"
                                            onChange={(e) => {
                                                setDayFilterValue(e.target.value);
                                                setPageNo(1);
                                            }}
                                            className="text-capitalize form-control"
                                        >
                                            <option value="" data-display="Product Designer">
                                                Select day            </option>
                                            {(filterData.days || []).map((data, index) => {
                                                return (
                                                    <option value={data.id} key={index}>
                                                        {data.value}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div
                                    className={"col  form_group "
                                    }
                                >
                                    <p className="input_label">Filter by Total Hour</p>
                                    <div className="select_div">
                                        <input
                                            name="hour"
                                            value={FilterByHour}
                                            id="hour"
                                            onChange={(e) => {
                                                setFilterByHour(e.target.value);
                                                setPageNo(1);
                                            }}
                                            className="text-capitalize form-control"
                                        />
                                    </div>
                                </div></div>
                            {/* Filter Dropdown */}
                            <div className="position-relative d-none">
                                <button
                                    className="font-size-4 rounded-3 border-0 bg-white btn p-2 mr-4"
                                    onClick={() => {
                                        setShowfilterdropdown((prev) => !prev);
                                        setShowdropdown(false);
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
                            <button className="btn btn-primary" onClick={() => {
                                setSelectedAdminId("")
                                setSelectedAdminType("")
                                setSearchQuery("")

                            }}>Reset</button>
                        </div>

                        {/* Call Log Table */}
                        <Hourlylogtable heading={"Hourly log"}
                            showAddForm={showAddItemForm}
                            adminList={adminList}
                            searchCandidate={searchCandidate}
                            setShowAddForm={setShowAddItemForm}
                            selectedAdminId={selectedAdminId}
                            selectedAdminType={selectedAdminType}
                            totalHour={FilterByHour}
                            day={dayFilterValue}
                            setFilterData={setFilterData}
                            pageNo={pageNo}
                            setPageNo={setPageNo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageHourlyLog;