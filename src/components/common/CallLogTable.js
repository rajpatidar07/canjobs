/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import Pagination from "./pagination";
import StyledDropdown from "./StyledDropDown";
import TableInput from "./TableInput";
import useValidation from "./useValidation";
import { AddUpdateDailCallLogApi, getDailyCallLogApi, GetFilter, DeleteCallLogApi } from "../../api/api";
import { toast } from "react-toastify";
import { BsChat } from "react-icons/bs";
import CommentTaskBox from "./commonTaskBox";
import ModalSidebar from "./modalSidebar";
import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import SAlert from "./sweetAlert";

function Calllogtable(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let NotificallLogId = searchParams.get("call_logId") || ""
    let NotifiTaskId = searchParams.get("taskId") || ""
    const [isLoading, setIsLoading] = useState(false);
    const [/*isScrolled,*/ setIsScrolled] = useState(false);
    let [taskId, setTaskId] = useState(NotifiTaskId ? NotifiTaskId : "");
    let [callLogId, setCallLogId] = useState(NotificallLogId ? NotificallLogId : "");
    let [filterListapiCall, setFilterListApiCall] = useState(false);
    const [showCallLogModal, setShowCallLogModal] = useState(false);
    const [singelCallLogData, setSingelCallLogData] = useState();
    const tableContainerRef = useRef(null);
    const [jsonList, setJsonList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [apiCall, setApiCall] = useState(false);
    const [deleteAlertCallLogData, setDeleteAlertCallLogData] =
        useState(false);
    const [deleteAlertCallLog, setDeleteAlertCallLog] =
        useState(false);
    const [columnName, setcolumnName] = useState("updated_at");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [callLogData, setCallLogData] = useState([]);
    const [totalData, setTotalData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const nPages = Math.ceil(totalData / recordsPerPage);
    const GetDailyCallLogList = async () => {
        try {
            setIsLoading(true)
            let ResCallLog = await getDailyCallLogApi(props.searchCandidate, props.selectedAdminId, callLogId, '', currentPage, recordsPerPage, columnName, sortOrder);
            setCallLogData(ResCallLog.data.data.data)
            setTotalData(ResCallLog.data.data.total_rows)
            if (taskId) {
                setSingelCallLogData(ResCallLog.data.data.data[0])
                setShowCallLogModal(true)
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
        name: "",
        status: "",
        caller: "",
        call_ans_by: "",
        received_call_date: "",
        email: "",
        purpose: "",
        phone: ""
    };
    // VALIDATION CONDITIONS
    const validators = {
        name: [
            (value) =>
                value === "" || value.trim() === ""
                    ? "Name is required"
                    : /[-]?\d+(\.\d+)?/.test(value)
                        ? "Name can not have a number."
                        : value.length < 2
                            ? "Name should have 2 or more letters"
                            : /[^A-Za-z 0-9]/g.test(value)
                                ? "Cannot use special character "
                                : "",
        ],
        phone: [(value) =>
            value === ""
                ? "Phone is required"
                : value.length < 2
                    ? "Phone should have 2 or more letters"
                    : /[^A-Za-z 0-9]/g.test(value)
                        ? "Cannot use special character "
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
        return AddCallLog(e, data);
    };

    let getFilterList = async () => {
        try {
            let json = await GetFilter();
            setJsonList(json.data.data);
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
        if (NotificallLogId) {
            setCallLogId(NotificallLogId)
        }
    }, [location.key, NotificallLogId, NotifiTaskId])
    useEffect(() => {

        GetDailyCallLogList()
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
    }, [taskId, callLogId, apiCall, props.searchCandidate, props.selectedAdminId, currentPage, sortOrder, columnName]);
    /*Function to add New Daily call log item */
    const AddCallLog = async (newValue, data) => {
        if (newValue && newValue.preventDefault) {
            newValue.preventDefault();
        }
        if (validate() || data?.id) {
            try {
                setLoading(true)
                let res = await AddUpdateDailCallLogApi(data ? data : state)
                if (res.status === 1 || res.status === "2" || res.data.status === 1) {
                    setLoading(false)
                    setState(initialFormState)
                    setErrors("")
                    props.setShowAddForm(false)
                    setApiCall(true)
                    toast.success(`Call log ${data?.id ? "Updated" : "Added"} successfully`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                } else {
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }
    /*Function to delete the Call log */
    const deleteCallLog = async (id) => {
        let data = {
            id: id,
        };
        try {
            const response = await DeleteCallLogApi(data);
            if (response.data.status === 1 || response.data.status === "1") {
                toast.error("Call log has been deleted !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setDeleteAlertCallLog(false)
                setDeleteAlertCallLogData();
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
                        <h3 className="font-size-6 mb-0">Call Log</h3>
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
                                            {[
                                                "Name",
                                                "Status",
                                                "Caller",
                                                "Date and Time Call",
                                                "Call Ans By",
                                                "Phone",
                                                "Purpose of Call",
                                                "Email",
                                                // "Call back Date/time",
                                                // "Additional Notes",
                                                "Action Taken",
                                            ].map((heading, index) => (
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
                                                        onClick={() => { if (heading !== "Action Taken") { handleSort(heading === "Date and Time Call" ? "received_call_date" : heading === "Purpose of Call" ? "purpose" : (heading.toLowerCase().replaceAll(" ", "_"))) } }}
                                                    >
                                                        {heading}</Link>
                                                </th>
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
                                                        value={state.name}
                                                        onChange={onInputChange}
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                    />
                                                    {errors.name && (
                                                        <span key={errors.name} className="text-danger font-size-3">
                                                            {errors.name}
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Other Columns */}
                                                <td style={{ minWidth: "150px" }}>
                                                    <StyledDropdown options={jsonList.status_type} status_name={"Status"} value={state.status} onChange={onInputChange} width={"600"} id="status" name="status"
                                                        setFilterListApiCall={setFilterListApiCall}
                                                        filterItemID={"36"} />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <StyledDropdown options={jsonList.caller} value={state.caller} onChange={onInputChange} width={"400"} id="caller" name="caller" status_name={"Caller"}
                                                        setFilterListApiCall={setFilterListApiCall}
                                                        filterItemID={"39"} />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.received_call_date} onChange={onInputChange} type="datetime-local" id="received_call_date" name="received_call_date" />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <select className="form-control" value={state.call_ans_by} onChange={onInputChange} id="call_ans_by" name="call_ans_by">
                                                        <option>Select Admin</option>
                                                        {(props.adminList || []).map((item, index) => (
                                                            <option value={item.admin_id} key={index}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.phone} onChange={onInputChange} type="number" id="phone" name="phone" />
                                                    {errors.phone && (
                                                        <span key={errors.phone} className="text-danger font-size-3">
                                                            {errors.phone}
                                                        </span>
                                                    )}
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.purpose} onChange={onInputChange} type="text" id="purpose" name="purpose" />
                                                </td>

                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput value={state.email} onChange={onInputChange} type="email" id="email" name="email" />
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
                                                            onClick={(e) => AddCallLog(e)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();  // Prevents form submission
                                                                    AddCallLog();
                                                                }
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                        </>
                                                    }
                                                    <button type="button" title="Cancel" onClick={() => {
                                                        props.setShowAddForm(false)
                                                        setState(initialFormState)
                                                    }} className="btn-sm btn-dark mx-2">x</button>
                                                </td>
                                            </tr>

                                        )}
                                        {callLogData.length === 0 ?
                                            <tr>
                                                <td style={{ minWidth: "150px" }} colSpan={8}>No Data Found</td>
                                            </tr> :
                                            (callLogData
                                                || []).map((item, index) => (
                                                    <tr key={index}>
                                                        {/* Sticky First Column */}
                                                        <td
                                                            className="table_sticky_col sticky_col1 "
                                                            style={{
                                                                minWidth: "150px",
                                                                maxWidth: "190px",
                                                                background: "white",
                                                                transition: "background 0.3s ease",
                                                            }}
                                                        >
                                                            <div className="d-flex">
                                                                <TableInput
                                                                    value={item.name}
                                                                    onChange={(newValue) =>
                                                                        handleUpdateChange(newValue, item.id, "name")
                                                                    }
                                                                    type="text"
                                                                    name="name"
                                                                    id="name"

                                                                />
                                                                <Link onClick={() => {
                                                                    setSingelCallLogData(item)
                                                                    setShowCallLogModal(true)
                                                                }}>
                                                                    <span className="text-gray px-2">
                                                                        <BsChat />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </td>

                                                        {/* Other Columns */}
                                                        <td
                                                            style={{
                                                                minWidth: "150px",
                                                            }}
                                                        >
                                                            <StyledDropdown
                                                                options={jsonList.status_type}
                                                                value={item.status}
                                                                onChange={(selectedValue) =>
                                                                    handleUpdateChange(selectedValue, item.id, "status")
                                                                }
                                                                name="status"
                                                                id="status"
                                                                status_name={"Status"}
                                                                width={"600"}
                                                                filterItemID={"36"}
                                                                setFilterListApiCall={setFilterListApiCall}

                                                            />
                                                        </td>

                                                        <td

                                                            style={{
                                                                minWidth: "150px",

                                                            }}
                                                        >
                                                            <StyledDropdown
                                                                options={jsonList.caller}
                                                                status_name={"Caller"}
                                                                value={item.caller}
                                                                name="caller"
                                                                id="caller"
                                                                onChange={(selectedValue) =>
                                                                    handleUpdateChange(selectedValue, item.id, "caller")
                                                                }
                                                                width={"400"}
                                                                filterItemID={"39"}
                                                                setFilterListApiCall={setFilterListApiCall}

                                                            />
                                                        </td>

                                                        {/* Date Input */}
                                                        <td style={{ minWidth: "150px" }}>
                                                            <TableInput
                                                                value={item.received_call_date}
                                                                onChange={(newValue) =>
                                                                    handleUpdateChange(newValue, item.id, "received_call_date")
                                                                }
                                                                type="datetime-local"
                                                                name="received_call_date"
                                                                id="received_call_date"
                                                            />
                                                        </td>

                                                        {/* Call Answered By */}
                                                        <td style={{ minWidth: "150px" }}>
                                                            <select
                                                                className="form-control"
                                                                value={item.call_ans_by}
                                                                onChange={(e) => handleUpdateChange(e, item.id, "call_ans_by")}
                                                                name="call_ans_by"
                                                                id="call_ans_by"
                                                            >
                                                                <option value="">Select Admin</option>
                                                                {(props.adminList || []).map((admin, index) => (
                                                                    <option value={admin.admin_id} key={index}>
                                                                        {admin.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>

                                                        {/* Phone Number */}
                                                        <td style={{ minWidth: "150px" }}>
                                                            <TableInput
                                                                value={item.phone}
                                                                onChange={(newValue) =>
                                                                    handleUpdateChange(newValue, item.id, "phone")
                                                                }
                                                                type="tel"
                                                                name="phone"
                                                                id="phone"
                                                            />
                                                        </td>

                                                        {/* Purpose of Call */}
                                                        <td style={{ minWidth: "150px" }}>
                                                            <TableInput
                                                                value={item.purpose}
                                                                onChange={(newValue) =>
                                                                    handleUpdateChange(newValue, item.id, "purpose")
                                                                }
                                                                type="text"
                                                                id="purpose" name="purpose"
                                                            />
                                                        </td>

                                                        {/* Email */}
                                                        <td style={{ minWidth: "150px" }}>
                                                            <TableInput
                                                                value={item.email}
                                                                onChange={(newValue) =>
                                                                    handleUpdateChange(newValue, item.id, "email")
                                                                }
                                                                type="email"
                                                                id="email" name="email"
                                                            />
                                                        </td>
                                                        <td className={""} style={{ minWidth: "150px" }}>  <button
                                                            className="btn 
                                                            btn-outline-info action_btn "
                                                            style={{
                                                                fontSize: "10px",
                                                                color: "red"
                                                            }}
                                                            type="button"
                                                            onClick={() => {
                                                                setDeleteAlertCallLogData(item)
                                                                setDeleteAlertCallLog(true)
                                                            }
                                                            }
                                                            title="Delete Call Log ">
                                                            <FaTrash />
                                                        </button></td>
                                                    </tr>
                                                ))}
                                    </tbody>
                                </table>

                            )}
                        </form>
                        <SAlert
                            show={deleteAlertCallLog}
                            title={deleteAlertCallLogData?.name}
                            text="Are you Sure you want to delete !"
                            onConfirm={() => deleteCallLog(deleteAlertCallLogData.id)}
                            showCancelButton={true}
                            onCancel={() =>
                                setDeleteAlertCallLog(false)
                            }
                        />
                    </div>

                    {/* Pagination Controls */}
                    <div className="pt-2">
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            total={callLogData.length}
                            count={totalData}
                        />
                    </div>
                </div>
            </div>
            <ModalSidebar
                show={showCallLogModal}
                onClose={() => {
                    setShowCallLogModal(false)
                    setTaskId("")
                    setCallLogId("")
                }}
                children={
                    <CommentTaskBox
                        userId={singelCallLogData?.id}
                        taskType={"call_log_chat"}
                        taskUserType={"call_log"}
                        setOpenReplyBox={setShowCallLogModal}
                        openReplyBox={showCallLogModal}
                        taskName={"Discussion for Call log"}
                        TaskId={taskId}
                    />
                }
            >
                {showCallLogModal ? (
                    <CommentTaskBox
                        userId={singelCallLogData?.id}
                        taskType={"call_log_chat"}
                        taskUserType={"call_log"}
                        setOpenReplyBox={setShowCallLogModal}
                        openReplyBox={showCallLogModal}
                        taskName={"Discussion for Call log"}
                        TaskId={taskId}
                    />
                ) : null}
            </ModalSidebar>
        </>
    );
}

export default Calllogtable;
