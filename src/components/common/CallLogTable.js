/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import Pagination from "./pagination";
import StyledDropdown from "./StyledDropDown";
import TableInput from "./TableInput";
import useValidation from "./useValidation";
import { AddUpdateDailCallLogApi, getallAdminData, getDailyCallLogApi, GetFilter } from "../../api/api";
import { toast } from "react-toastify";

function Calllogtable(props) {
    const [isLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const tableContainerRef = useRef(null);
    const [admiinList, setAdminList] = useState([]);
    const [jsonList, setJsonList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [apiCall, setApiCall] = useState(false);
    const [callLogData, setCallLogData] = useState([]);
    const [totalData, setTotalData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const nPages = Math.ceil(callLogData.length / recordsPerPage);
    const GetListJson = async () => {
        try {
            let response = await getallAdminData();
            let json = await GetFilter();
            let ResCallLog = await getDailyCallLogApi(props.searchCandidate, '', currentPage, recordsPerPage);
            console.log(ResCallLog)
            setJsonList(json.data.data);
            setAdminList(response.data)
            setCallLogData(ResCallLog.data.data.data)
            setTotalData(ResCallLog.data.total_rows)
        } catch (err) {
            console.log(err);
        }
    };
    const initialFormState = {
        name: "",
        status: "",
        caller: "",
        call_ans_by: "",
        received_call_date: "",
        email: "",
        call_notes: "",
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

    //  Handle Input Change
    const handleChange = (index, field, value) => {
        const updatedData = [...callLogData];
        updatedData[(currentPage - 1) * recordsPerPage + index][field] = value;
        setCallLogData(updatedData);
    };

    useEffect(() => {

        GetListJson()
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
    }, [apiCall]);

    /*Function to add New Daily call log item */
    const AddCallLog = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                setLoading(true)
                let res = await AddUpdateDailCallLogApi(state)
                if (res.status === 1 || res.status === "2") {
                    setLoading(false)
                    setState(initialFormState)
                    setErrors("")
                    props.setShowAddForm(false)
                    setApiCall(true)
                    toast.success("Call log added successfully", {
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
    return (
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
                    className="table-responsive"
                    style={{ overflowX: "auto", overflowY: "hidden" }}
                    ref={tableContainerRef}
                >
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <form >
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
                                            // "Action Taken",
                                        ].map((heading, index) => (
                                            <th
                                                key={index}
                                                className={`border-0 font-size-3 font-weight-normal 
                         
                          ${index === 0 ? "table_sticky_col sticky_col1" : ""} 
                          ${index === 1 ? "table_sticky_col sticky_col2" : ""} 
                          ${index === 2 ? "table_sticky_col sticky_col3" : ""}`}
                                                style={
                                                    index <= 2
                                                        ? {
                                                            background: isScrolled
                                                                ? "white"
                                                                : "transparent",
                                                            transition: "background 0.3s ease",
                                                        }
                                                        : {}
                                                }
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {props.showAddForm && (
                                        <tr>
                                            {/* Sticky First Column for New Row */}
                                            <td
                                                className="table_sticky_col sticky_col1"
                                                style={{
                                                    minWidth: "150px",
                                                    maxWidth: "150px",
                                                    background: isScrolled ? "white" : "transparent",
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
                                            <td className="table_sticky_col sticky_col2" style={{ minWidth: "150px", maxWidth: "150px", background: isScrolled ? "white" : "transparent", transition: "background 0.3s ease" }}>
                                                <StyledDropdown options={jsonList.status_type} status_name={"Status"} value={state.status} onChange={onInputChange} width={"600"} id="status" name="status" />
                                            </td>

                                            <td className="table_sticky_col sticky_col3" style={{ minWidth: "150px", maxWidth: "150px", background: isScrolled ? "white" : "transparent", transition: "background 0.3s ease" }}>
                                                <StyledDropdown options={jsonList.caller} value={state.caller} onChange={onInputChange} width={"400"} id="caller" name="caller" status_name={"Caller"} />
                                            </td>

                                            <td style={{ minWidth: "150px" }}>
                                                <TableInput value={state.received_call_date} onChange={onInputChange} type="datetime-local" id="received_call_date" name="received_call_date" />
                                            </td>

                                            <td style={{ minWidth: "150px" }}>
                                                <select className="form-control" value={state.call_ans_by} onChange={onInputChange} id="call_ans_by" name="call_ans_by">
                                                    <option>Select Admin</option>
                                                    {(admiinList || []).map((item, index) => (
                                                        <option value={item.admin_id} key={index}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td style={{ minWidth: "150px" }}>
                                                <TableInput value={state.phone} onChange={onInputChange} type="tel" id="phone" name="phone" />
                                                {errors.phone && (
                                                    <span key={errors.phone} className="text-danger font-size-3">
                                                        {errors.phone}
                                                    </span>
                                                )}
                                            </td>

                                            <td style={{ minWidth: "150px" }}>
                                                <TableInput value={state.call_notes} onChange={onInputChange} type="text" id="call_notes" name="call_notes" />
                                            </td>

                                            <td style={{ minWidth: "150px" }}>
                                                <TableInput value={state.email} onChange={onInputChange} type="email" />
                                            </td>

                                            {/* Button Column */}
                                            <td style={{ minWidth: "50px", textAlign: "center" }}>
                                                {loading === true ? (
                                                    <button
                                                        className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
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
                                                ) : <button
                                                    title="Submit"
                                                    type="button" className="btn-sm btn-primary" onClick={(e) => AddCallLog(e)}>+</button>}
                                            </td>
                                        </tr>

                                    )}
                                    {(callLogData
                                        || []).map((item, index) => (
                                            <tr key={index}>
                                                {/* Sticky First Column */}
                                                <td
                                                    className="table_sticky_col sticky_col1"
                                                    style={{
                                                        minWidth: "150px",
                                                        maxWidth: "150px",
                                                        background: isScrolled ? "white" : "transparent",
                                                        transition: "background 0.3s ease",
                                                    }}
                                                >
                                                    <TableInput
                                                        value={item.name}
                                                        onChange={(newValue) =>
                                                            handleChange(index, "name", newValue)
                                                        }
                                                        type="text"
                                                    />
                                                </td>

                                                {/* Other Columns */}
                                                <td
                                                    style={{
                                                        minWidth: "150px",
                                                        maxWidth: "150px",
                                                        background: isScrolled ? "white" : "transparent",
                                                        transition: "background 0.3s ease",
                                                    }}
                                                    className="table_sticky_col sticky_col2"
                                                >
                                                    <StyledDropdown
                                                        options={jsonList.status_type}
                                                        value={item.status}
                                                        onChange={(selectedValue) =>
                                                            handleChange(index, "status", selectedValue)
                                                        }
                                                        status_name={"Status"}
                                                        width={"600"}
                                                    />
                                                </td>

                                                <td

                                                    style={{
                                                        minWidth: "150px",
                                                        maxWidth: "150px",
                                                        background: isScrolled ? "white" : "transparent",
                                                        transition: "background 0.3s ease",
                                                    }}
                                                    className="table_sticky_col sticky_col3"
                                                >
                                                    <StyledDropdown
                                                        options={jsonList.caller}
                                                        status_name={"Caller"}
                                                        value={item.callBy}
                                                        onChange={(selectedValue) =>
                                                            handleChange(index, "callBy", selectedValue)
                                                        }
                                                        width={"400"}
                                                    />
                                                </td>

                                                {/* Date Input */}
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput
                                                        value={item.callerDateTime}
                                                        onChange={(newValue) =>
                                                            handleChange(index, "callerDateTime", newValue)
                                                        }
                                                        type="datetime-local"
                                                    />
                                                </td>

                                                {/* Call Answered By */}
                                                <td style={{ minWidth: "150px" }}>
                                                    <select className="form-control">
                                                        <option>Simran</option>
                                                        <option>Raman</option>
                                                        <option>Other</option>
                                                    </select>
                                                </td>

                                                {/* Phone Number */}
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput
                                                        value={item.phone}
                                                        onChange={(newValue) =>
                                                            handleChange(index, "phone", newValue)
                                                        }
                                                        type="tel"
                                                    />
                                                </td>

                                                {/* Purpose of Call */}
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput
                                                        value={item.purposeOfCall}
                                                        onChange={(newValue) =>
                                                            handleChange(index, "purposeOfCall", newValue)
                                                        }
                                                        type="text"
                                                    />
                                                </td>

                                                {/* Email */}
                                                <td style={{ minWidth: "150px" }}>
                                                    <TableInput
                                                        value={item.email}
                                                        onChange={(newValue) =>
                                                            handleChange(index, "email", newValue)
                                                        }
                                                        type="email"
                                                    />
                                                </td>
                                                <td className={props.showAddForm ? "" : "d-none"} style={{ minWidth: "150px" }}></td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </form>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="pt-2">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        total={callLogData.length}
                        count={
                            totalData
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default Calllogtable;
