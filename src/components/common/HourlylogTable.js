/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import Pagination from "./pagination";
import StyledDropdown from "./StyledDropDown";
import TableInput from "./TableInput";
import useValidation from "./useValidation";
import { GetFilter, GetHourLogApi, AddUpdateHourLogApi, DeleteUpdateHourLogApi } from "../../api/api";
import { toast } from "react-toastify";
import { BsChat } from "react-icons/bs";
import CommentTaskBox from "./commonTaskBox";
import ModalSidebar from "./modalSidebar";
import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import SAlert from "./sweetAlert";
import UserAvatar from "./UserAvtar";

function Hourlylogtable(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let NotifiHourLogId = searchParams.get("hour_logId") || ""
    let NotifiTaskId = searchParams.get("taskId") || ""
    const [isLoading, setIsLoading] = useState(false);
    const [/*isScrolled,*/ setIsScrolled] = useState(false);
    let [taskId, setTaskId] = useState(NotifiTaskId ? NotifiTaskId : "");
    let [HourLogId, setHourLogId] = useState(NotifiHourLogId ? NotifiHourLogId : "");
    let [filterListapiCall, setFilterListApiCall] = useState(false);
    const [showHourLogModal, setShowHourLogModal] = useState(false);
    const [singelHourLogData, setSingelHourLogData] = useState();
    const tableContainerRef = useRef(null);
    const [jsonList, setJsonList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [apiCall, setApiCall] = useState(false);
    const [deleteAlertHourLogData, setDeleteAlertHourLogData] =
        useState();
    const [deleteAlertHourLog, setDeleteAlertHourLog] =
        useState(false);
    const [HourLogData, setHourLogData] = useState([]);
    const [totalData, setTotalData] = useState();
    const [editRowId, setEditRowId] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1);
    const [columnName, setcolumnName] = useState("updated_at");
    const [sortOrder, setSortOrder] = useState("DESC");
    const recordsPerPage = 10;
    const nPages = Math.ceil(totalData / recordsPerPage);
    const GetDailyHourLogList = async () => {
        try {
            setIsLoading(true)
            let data = {
                "limit": recordsPerPage, "page": props.pageNo, "id": HourLogId, "column_name": columnName, "sort_order": sortOrder, "day": props.day, "total_hour": props.totalHour
            };
            let ResHourLog = await GetHourLogApi(data);
            setHourLogData(ResHourLog.data.data)
            setTotalData(ResHourLog.data.total_rows)
            if (taskId) {
                setSingelHourLogData(ResHourLog.data.data[0])
                setShowHourLogModal(true)
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
                localStorage.setItem("navigation_url", "")
            }
            setIsLoading(false)
        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    };
    const initialFormState = {
        item: "",
        hour_log_of_admin: "",
        mention_person_id: "",
        mention_person_type: "",
        date: "",
        day: "",
        total_hour: "",
        start_time: "",
        finish_time: "",
        break: "",
        notes: "",
        info: ""
    };
    // VALIDATION CONDITIONS
    const validators = {
        item: [
            (value) =>
                value === "" || value.trim() === ""
                    ? "Item is required"
                    : null
        ],
        hour_log_of_admin: [(value) =>
            value === ""
                ? "Admin for the hour log is required."
                : "",
        ],
    }
    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, setErrors, onInputChange, errors, validate } =
        useValidation(initialFormState, validators);

    //  Handle Update Input Change
    const handleUpdateChange = (e, id, field) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        let data = {
            id: id,
            [field]: e.target.value,
        };
        return AddHourLog(e, data);
    };

    let getFilterList = async () => {
        try {
            let json = await GetFilter();
            setJsonList(json.data.data);
            props.setFilterData(json.data.data)
        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        getFilterList()
        if (filterListapiCall === true) {
            setFilterListApiCall(false)
        }
    }, [filterListapiCall])
    useEffect(() => {
        if (NotifiTaskId) {
            setTaskId(NotifiTaskId)
        }
        if (NotifiHourLogId) {
            setHourLogId(NotifiHourLogId)
        }
    }, [location.key, NotifiHourLogId, NotifiTaskId])
    useEffect(() => {
        GetDailyHourLogList()
        if (apiCall === true) { setApiCall(false) }
        const handleScroll = () => {
            if (tableContainerRef.current) {
                setIsScrolled(tableContainerRef.current.scrollLeft > 0);
            }
        };

        if (tableContainerRef.current) {
            tableContainerRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (tableContainerRef.current) {
                tableContainerRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [taskId, HourLogId, apiCall, props.searchCandidate, props.selectedAdminId, props.pageNo, columnName, sortOrder, props.totalHour, props.day]);
    /*Function to add New Daily Hours log item */
    const AddHourLog = async (newValue, data) => {
        if (newValue && newValue.preventDefault) {
            newValue.preventDefault();
        }
        if (validate() || data?.id) {
            try {
                setLoading(true)
                let res = await AddUpdateHourLogApi(data ? data : state)
                console.log(res)
                if (res.status === 1 || res.status === "2" || res.data.status === 1) {
                    setLoading(false)
                    setState(initialFormState)
                    setEditRowId()
                    setErrors("")
                    props.setShowAddForm(false)
                    setApiCall(true)
                    toast.success(`Daily Hour log ${data?.id ? "Updated" : "Added"} successfully`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }
    /*Function to delete the Hours log */
    const deleteHourLog = async (id) => {
        let data = {
            id: id,
        };
        try {
            const response = await DeleteUpdateHourLogApi(data);
            if (response.data.status === 1 || response.data.status === "1") {
                toast.error("Daily Hour Log has been deleted !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setDeleteAlertHourLog(false)
                setDeleteAlertHourLogData();
                setApiCall(true);
                props.setApiCall(true)
            }

        } catch (err) {

        }
    }
    /*Sorting Function */
    const handleSort = (columnName) => {
        setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
        setcolumnName(columnName);
    };
    return (
        <>
            <div className="mb-18 height-100">
                <div className="mb-4 align-items-center">
                    <div className="page___heading">
                        <h3 className="font-size-6 mb-0">Hours log</h3>
                    </div>
                </div>

                <div
                    className={
                        props.heading === "Dashboard"
                            ? ""
                            : "bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"
                    }
                >
                    <div
                        className="datatable_div  pt-7 rounded pb-8 px-2"
                        style={{ overflowX: "auto", overflowY: "hidden" }}
                        ref={tableContainerRef}
                    >
                        <form className="table-responsive main_table_div">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <table className="table table-striped main_data_table text-center align-middle">
                                    <thead>
                                        <tr className="py-2">
                                            {(props.showAddForm ? [
                                                "item",
                                                "Manager",
                                                "Person",
                                                "Date",
                                                "Day",
                                                "Total Hours",
                                                "Start Time",
                                                "Finish Time",
                                                "Break",
                                                "Notes / Extra",
                                                "Info",
                                                "Action",
                                            ] : [
                                                "item",
                                                "Person",
                                                "Date",
                                                "Day",
                                                "Total Hours",
                                                "Start Time",
                                                "Finish Time",
                                                "Break",
                                                "Notes / Extra",
                                                "Info",
                                                "Action",
                                            ]).map((heading, index) => (
                                                <th
                                                    key={index}
                                                    className={`border-0 font-size-3 font-weight-normal 
                         
                          ${index === 0 ? "table_sticky_col sticky_col1" : ""} `}
                                                    style={
                                                        index === 0
                                                            ? {
                                                                background: "white",
                                                                transition: "background 0.3s ease",
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    <Link to="" className="text-dark"
                                                        onClick={() => { if (heading !== "Action") { handleSort(heading === "Person" ? "mention_person_id" : heading === "Total Hours" ? "total_hour" : heading === "Manager" ? "hour_log_of_admin" : heading === "Notes / Extra" ? "notes" : (heading.toLowerCase().replaceAll(" ", "_"))) } }}
                                                    >
                                                        {heading}</Link>                                                 </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {props.showAddForm && (
                                            <tr>
                                                {/* Sticky First Column for New Row */}
                                                <td
                                                    className="table_sticky_col sticky_col1 "
                                                    style={{
                                                        minWidth: "150px",
                                                        maxWidth: "150px",
                                                        background: "white",
                                                        transition: "background 0.3s ease",
                                                    }}
                                                >
                                                    <TableInput
                                                        value={state.item}
                                                        onChange={onInputChange}
                                                        type="date"
                                                        id="item"
                                                        name="item"
                                                    />
                                                    {errors.item && (
                                                        <span key={errors.item} className="text-danger font-size-3">
                                                            {errors.item}
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <select className="form-control" value={state.hour_log_of_admin} onChange={onInputChange} id="hour_log_of_admin" name="hour_log_of_admin">
                                                        <option>Select Manger</option>
                                                        {(props.adminList || []).map((item, index) => (
                                                            <option value={item.admin_id} key={index}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.hour_log_of_admin && (
                                                        <span key={errors.hour_log_of_admin} className="text-danger font-size-3">
                                                            {errors.hour_log_of_admin}
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <select className="form-control" value={`${state.mention_person_id},${state.mention_person_type}`} onChange={(e) => {
                                                        setState({ ...state, mention_person_id: e.target.value.split(",")[0], mention_person_type: e.target.value.split(",")[1] })
                                                    }} id="mention_person_id" name="mention_person_id">
                                                        <option>Select person</option>
                                                        {(props.adminList || []).map((item, index) => (
                                                            <option value={`${item.admin_id},${item.admin_type}`} key={index}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.date} onChange={onInputChange} type="date" id="date" name="date" />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <StyledDropdown options={jsonList.days} value={state.day} onChange={onInputChange} width={"400"} id="day" name="day" status_name={"day"} setFilterListApiCall={setFilterListApiCall}
                                                        filterItemID={"43"}
                                                    />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.total_hour} onChange={onInputChange} type="number" id="total_hour" name="total_hour" />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.start_time} onChange={onInputChange} type="time" id="start_time" name="start_time" />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.finish_time} onChange={onInputChange} type="time" id="finish_time" name="finish_time" />
                                                </td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.break} onChange={onInputChange} type="text" id="break" name="break" />
                                                </td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.notes} onChange={onInputChange} type="text" id="notes" name="notes" />
                                                </td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.info} onChange={onInputChange} type="text" id="info" name="info" />
                                                </td>
                                                {/* Button Column */}
                                                <td style={{ minWidth: "50px", textAlign: "center" }}>
                                                    {loading === true ? (
                                                        <button
                                                            className="btn-sm btn-primary"
                                                            type="button"
                                                            disabled
                                                        >
                                                            <span
                                                                className="spinner-border spinner-border-sm "
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                            <span className="sr-only">Loading...</span>
                                                        </button>
                                                    ) :
                                                        <> <button
                                                            title="Submit"
                                                            type="button"
                                                            className="btn-sm btn-primary"
                                                            onClick={AddHourLog}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();
                                                                    AddHourLog();
                                                                }
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                            <button type="button" title="Cancel" onClick={() => {
                                                                props.setShowAddForm(false);
                                                                setState(initialFormState);
                                                            }} className="btn-sm btn-dark mx-2">x</button>
                                                        </>
                                                    }
                                                </td>

                                            </tr>

                                        )}
                                        {
                                            HourLogData.length === 0 || !HourLogData ?
                                                <tr className="overflow-hidden">
                                                    <td colSpan={11} className="text-center font-weight-bold text-capitalize">
                                                        No Data found                                            </td>
                                                </tr>
                                                :
                                                Object.entries(
                                                    HourLogData.reduce((acc, item) => {
                                                        const managerId = item.hour_log_of_admin;
                                                        if (!acc[managerId]) acc[managerId] = [];
                                                        acc[managerId].push(item);
                                                        return acc;
                                                    }, {})
                                                ).map(([managerId, logs], groupIndex) => {
                                                    const manager = (props.adminList || []).find((admin) => admin.admin_id === managerId);
                                                    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // generates hex color

                                                    return (
                                                        <>
                                                            {/* Manager Row */}
                                                            <tr key={`manager-${groupIndex}`} className="overflow-hidden">
                                                                <td colSpan={11} className="text-left font-weight-bold text-capitalize"
                                                                    style={{ color: randomColor }}>
                                                                    {manager?.name || "N/A"}
                                                                </td>
                                                            </tr>

                                                            {/* Hour Log Rows */}
                                                            {logs.map((item, index) => (
                                                                <tr key={`log-${groupIndex}-${index}`}>
                                                                    {/* Item (Date) with Chat Icon */}
                                                                    <td
                                                                        className="table_sticky_col sticky_col1"
                                                                        style={{
                                                                            minWidth: "150px",
                                                                            maxWidth: "190px",
                                                                            background: "white",
                                                                            transition: "background 0.3s ease",
                                                                        }}
                                                                    >
                                                                        <div className="d-flex">
                                                                            <TableInput
                                                                                value={item.item}
                                                                                onChange={(newValue) => handleUpdateChange(newValue, item.id, "item")}
                                                                                type="date"
                                                                                id="item"
                                                                                name="item"
                                                                            />
                                                                            <Link
                                                                                onClick={() => {
                                                                                    setSingelHourLogData(item);
                                                                                    setShowHourLogModal(true);
                                                                                }}
                                                                            >
                                                                                <span className="text-gray px-2">
                                                                                    <BsChat />
                                                                                </span>
                                                                            </Link>
                                                                        </div>
                                                                    </td>

                                                                    {/* Hour Log of Admin (Manager) */}
                                                                    <td style={{ minWidth: "150px" }} className="d-none">
                                                                        {editRowId === item.hour_log_of_admin ? (
                                                                            <select
                                                                                className="form-control"
                                                                                value={item.hour_log_of_admin}
                                                                                onChange={(e) =>
                                                                                    handleUpdateChange(e, item.id, "hour_log_of_admin")}
                                                                                onBlur={() => setEditRowId(null)}
                                                                                autoFocus
                                                                            >
                                                                                <option value="">Select Manager</option>
                                                                                {(props.adminList || []).map((admin, idx) => (
                                                                                    <option value={admin.admin_id} key={idx}>
                                                                                        {admin.name}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        ) : (
                                                                            item.hour_log_of_admin ? (
                                                                                <div onClick={() => setEditRowId(item.hour_log_of_admin)} style={{ cursor: "pointer" }}>
                                                                                    <UserAvatar
                                                                                        profileImage={(props.adminList || []).find((i) => i.admin_id === item.hour_log_of_admin)?.profile_image}
                                                                                        name={(props.adminList || []).find((i) => i.admin_id === item.hour_log_of_admin)?.name}
                                                                                        userType={(props.adminList || []).find((i) => i.admin_id === item.hour_log_of_admin)?.admin_type}
                                                                                        index={index}
                                                                                        userId={item.hour_log_of_admin}
                                                                                    />
                                                                                </div>
                                                                            ) : "N/A"
                                                                        )}
                                                                    </td>

                                                                    {/* Mention Person */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        {editRowId === item.mention_person_id ? (
                                                                            <select
                                                                                className="form-control"
                                                                                value={item.mention_person_id}
                                                                                onChange={(e) =>
                                                                                    handleUpdateChange(e, item.id, "mention_person_id")
                                                                                }
                                                                                onBlur={() => setEditRowId(null)}
                                                                                autoFocus
                                                                            >
                                                                                <option value="">Select Person</option>
                                                                                {(props.adminList || []).map((admin, idx) => (
                                                                                    <option value={admin.admin_id} key={idx}>
                                                                                        {admin.name}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        ) : (
                                                                            item.mention_person_id ? (
                                                                                <div onClick={() => setEditRowId(item.mention_person_id)} style={{ cursor: "pointer" }}>
                                                                                    <UserAvatar
                                                                                        profileImage={(props.adminList || []).find((i) => i.admin_id === item.mention_person_id)?.profile_image}
                                                                                        name={(props.adminList || []).find((i) => i.admin_id === item.mention_person_id)?.name}
                                                                                        userType={(props.adminList || []).find((i) => i.admin_id === item.mention_person_id)?.admin_type}
                                                                                        index={index}
                                                                                        userId={item.mention_person_id}
                                                                                    />
                                                                                </div>
                                                                            ) : "N/A"
                                                                        )}
                                                                    </td>

                                                                    {/* Date */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.date}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "date")}
                                                                            type="date"
                                                                            id="date"
                                                                            name="date"
                                                                        />
                                                                    </td>

                                                                    {/* Day */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <StyledDropdown
                                                                            options={jsonList.days}
                                                                            value={item.day}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "day")}
                                                                            width={"400"}
                                                                            id="day"
                                                                            name="day"
                                                                            status_name={"Day"}
                                                                            setFilterListApiCall={setFilterListApiCall}
                                                                            filterItemID={"43"}
                                                                        />
                                                                    </td>

                                                                    {/* Total Hour */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.total_hour}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "total_hour")}
                                                                            type="number"
                                                                            id="total_hour"
                                                                            name="total_hour"
                                                                        />
                                                                    </td>

                                                                    {/* Start Time */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.start_time}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "start_time")}
                                                                            type="time"
                                                                            id="start_time"
                                                                            name="start_time"
                                                                        />
                                                                    </td>

                                                                    {/* Finish Time */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.finish_time}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "finish_time")}
                                                                            type="time"
                                                                            id="finish_time"
                                                                            name="finish_time"
                                                                        />
                                                                    </td>

                                                                    {/* Break */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.break}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "break")}
                                                                            type="text"
                                                                            id="break"
                                                                            name="break"
                                                                        />
                                                                    </td>

                                                                    {/* Notes */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.notes}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "notes")}
                                                                            type="text"
                                                                            id="notes"
                                                                            name="notes"
                                                                        />
                                                                    </td>

                                                                    {/* Info */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <TableInput
                                                                            value={item.info}
                                                                            onChange={(newValue) => handleUpdateChange(newValue, item.id, "info")}
                                                                            type="text"
                                                                            id="info"
                                                                            name="info"
                                                                        />
                                                                    </td>

                                                                    {/* Delete Button */}
                                                                    <td style={{ minWidth: "150px" }}>
                                                                        <button
                                                                            className="btn btn-outline-info action_btn"
                                                                            style={{ fontSize: "10px", color: "red" }}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setDeleteAlertHourLogData(item);
                                                                                setDeleteAlertHourLog(true);
                                                                            }}
                                                                            title="Delete Hour Log"
                                                                        >
                                                                            <FaTrash />
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                            ))}
                                                        </>
                                                    );
                                                })}
                                    </tbody>
                                </table>

                            )}
                        </form>
                        {<SAlert
                            show={deleteAlertHourLog === true}
                            title={deleteAlertHourLogData?.item}
                            text="Are you Sure you want to delete !"
                            onConfirm={() => deleteHourLog(deleteAlertHourLogData.id)}
                            showCancelButton={true}
                            onCancel={() =>
                                setDeleteAlertHourLog(false)
                            }
                        />}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pt-2">
                        <Pagination
                            nPages={nPages}
                            currentPage={props.pageNo}
                            setCurrentPage={props.setPageNo}
                            total={HourLogData.length}
                            count={totalData}
                        />
                    </div>
                </div>
            </div>
            <ModalSidebar
                show={showHourLogModal}
                onClose={() => {
                    setShowHourLogModal(false)
                    setTaskId("")
                    setHourLogId("")
                }}
                children={
                    <CommentTaskBox
                        userId={singelHourLogData?.id}
                        taskType={"hour_log_chat"}
                        taskUserType={"hour_log"}
                        setOpenReplyBox={setShowHourLogModal}
                        openReplyBox={showHourLogModal}
                        taskName={"Discussion for Hours log"}
                        TaskId={taskId}
                    />
                }
            >
                {showHourLogModal ? (
                    <CommentTaskBox
                        userId={singelHourLogData?.id}
                        taskType={"hour_log_chat"}
                        taskUserType={"hour_log"}
                        setOpenReplyBox={setShowHourLogModal}
                        openReplyBox={showHourLogModal}
                        taskName={"Discussion for Daily Hour log"}
                        TaskId={taskId}
                    />
                ) : null}
            </ModalSidebar>
        </>
    );
}

export default Hourlylogtable;
