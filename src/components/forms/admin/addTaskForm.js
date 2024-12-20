import React, { useEffect, useState } from 'react'
import { AddFIlter, ADocAnnotation, getallAdminData, GetFilter } from '../../../api/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaWindowClose } from "react-icons/fa";
export default function AddTaskForm(props) {
    const [taskTitle, setTaskTitle] = useState("");
    const [stardivate, setStardivate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState("");
    const [AdminList, setAdminList] = useState([]);
    const [selectedGroupBy, setSelectedGroupBy] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState([]);
    const [groupBy, setGroupBy] = useState([]);
    const [status, setStatus] = useState([]);
    const [priority, setPriority] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [loading, setLoading] = useState(false);
    const [addStatusloading, setAddStatusLoading] = useState(false);
    const [showStatusInput, setShowStatusInput] = useState(false);
    const [newStatus, setNewStatus] = useState("");
    const [statusErrors, setStatusErrors] = useState("");
    const [apicall, setApiCall] = useState(false);
    /*Functio to get the json of group by */
    const GetJson = async () => {
        try {
            let res = await GetFilter()
            let adminRes = await getallAdminData()
            // console.log(res.data.status === 1)
            if (adminRes.data.length > 0) {
                setAdminList(adminRes.data)
            } else {
                setAdminList([])
            }
            if (res.data.status === 1) {
                setPriority(res.data.data.priority)
                setGroupBy(res.data.data.group_by)
                setStatus(res.data.data.status_type)
                // if (newStatus) {
                //     console.log(selectedStatus)
                //     // eslint-disable-next-line eqeqeq
                //     setSelectedStatus(res.data.data.status_type.find((item) => item.value == newStatus)?.value)
                //     // setNewStatus("");
                // }
            } else {
                setPriority([])
                setGroupBy([])
                setStatus([])
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetJson()
        if (apicall) {
            setApiCall(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall])
    /*On change function for group by field */
    const handleGroupSelect = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue && !selectedGroupBy.includes(selectedValue)) {
            setSelectedGroupBy([...selectedGroupBy, selectedValue]);
        }
    };
    /*Delete function for group by field */
    const removeGroup = (user) => {
        setSelectedGroupBy(selectedGroupBy.filter((item) => item !== user));
    };
    const handleAdminSelect = (e) => {
        const selectedAdminId = e.target.value;
        // console.log('Current selectedAdmin:', selectedAdmin); // Debugging line

        const selectedAdminObj = AdminList.find(user => user.admin_id === selectedAdminId);

        if (selectedAdminObj && !selectedAdmin.some(admin => admin.admin_id === selectedAdminObj.admin_id)) {
            setSelectedAdmin([...selectedAdmin, selectedAdminObj]);
        }
    };


    /*Delete function for group by field */
    const removeAdmin = (adminId) => {
        setSelectedAdmin(selectedAdmin.filter((admin) => admin.admin_id !== adminId));
    };
    /*Function to submit the form */
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        let assignedAdminId = selectedAdmin?.length > 0 ? selectedAdmin.map((admin) => (admin.admin_id)).join(",") : ""
        let email = selectedAdmin?.length > 0 ? selectedAdmin.map((admin) => admin.email).join(",") : ""
        let assignedAdminName = selectedAdmin?.length > 0 ? selectedAdmin.map((admin) => admin.name).join(",") : ""
        let assignedUserType = selectedAdmin?.length > 0 ? selectedAdmin.map((admin) => admin.admin_type).join(",") : ""
        try {
            let res = await ADocAnnotation(
                localStorage.getItem("admin_id"),
                "",
                assignedAdminId,
                email,
                "", //     subject,
                taskTitle,
                "", //annotation.x_axis,
                "", //annotation.y_axis,
                "task",
                localStorage.getItem("admin_type"), //sender type
                localStorage.getItem("admin"), //sender name,
                assignedAdminName, //assigned Admin or user Name,
                "", //follow up status(for notes only)
                "", //Next follow up date(for notes only)
                assignedUserType, //Assign user type,
                "", //Document url(for notes only)
                localStorage.getItem("admin_email"), //Sender email
                props.userId ? props.userId : "", //employee id,
                "", //assigned_by_id
                "", // document parent code
                "", //Annotation data,
                "", //annotationId
                props.userId ? props.TaskUserType : "", //User type of document
                "",//document name
                stardivate,
                endDate,
                selectedGroupBy.toString(),
                selectedPriority,
                selectedStatus
            );
            if (res.data.message === "task inserted successfully!") {
                toast.success("Task added Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setTaskTitle("")
                setStardivate(new Date().toISOString().split("T")[0])
                setEndDate("")
                setSelectedGroupBy([])
                setSelectedAdmin([])
                setSelectedStatus("")
                setSelectedPriority("")
                setLoading(false)
                props.setApiCall(true)
                props.setShowTaskForm(false)
                setApiCall(true)
            }
            if (res.data.message === "required fields cannot be blank assined_to_user_id") {
                toast.error("Please add the fields", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }

    }
    /*Function to add more status */
    const onAddStatusClick = async (event) => {
        event.preventDefault();

        if (newStatus) {
            let data = {
                json_item: newStatus
            }
            try {
                const responseData = await AddFIlter(data, 36);
                if (responseData.message === "item already exist !") {
                    setStatusErrors("Status already exist !");
                    setApiCall(true);
                    setNewStatus("");
                    setLoading(false);
                }
                if (responseData.message === "filter item added successfully") {
                    toast.success("Status added successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    setShowStatusInput(false)
                    setNewStatus("");
                    setStatus(prevStatus => [
                        ...prevStatus,
                        { id: responseData.newStatusId, value: newStatus }
                    ]);
                    setSelectedStatus(newStatus);
                    setAddStatusLoading(false);
                    setStatusErrors("")
                }
            } catch (err) {
                console.log(err);
                setAddStatusLoading(false);
                setStatusErrors("")
            }
        } else {
            alert("No status found")
        }
    }
    // console.log(selectedStatus)
    return (
        <form className='mb-3'>
            <div className='d-flex flex-row-reverse'>
                <Link
                    className="btn-sm btn-light rounded-3 p-2"
                    onClick={() => props.setShowTaskForm(false)}
                    title="Close form"
                >
                    <FaWindowClose />
                </Link>
            </div>
            <div className='row'>
                <div className='col'>
                    <input
                        type="text"
                        className="form-control"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Enter Text comment"
                    />
                </div>
                <div className='col'>
                    <input
                        type="date"
                        className="form-control"
                        value={stardivate}
                        onChange={(e) => setStardivate(e.target.value)}
                    />
                </div>
                <div className='col'>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className='col'>
                    <select
                        className="form-control"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                    >
                        <option value="">Select Priority</option>
                        {(priority || []).map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <div className="d-flex flex-column">
                        {/* Status Dropdown and Add Button */}
                        <div className="d-flex align-items-center mb-2">
                            <select
                                className={`form-control text-capitalize ${showStatusInput ? "" : "flex-grow-1 me-2"}`}
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                {(status || []).map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.value}
                                    </option>
                                ))}
                            </select>
                            {showStatusInput ? <Link
                                className="btn-sm btn-light rounded-3 p-2"
                                onClick={() => setShowStatusInput(false)}
                                title="Close"
                            >
                                x
                            </Link> : (
                                <Link
                                    className="btn-sm btn-primary rounded-3 p-2 mx-1"
                                    onClick={() => setShowStatusInput(true)}
                                    title="Add New Option"
                                >
                                    +
                                </Link>
                            )}
                        </div>
                        {/* Add New Status Input and Save Button */}
                        {showStatusInput && (
                            <div className="d-flex align-items-center">
                                <div >
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Enter status"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                    />
                                    {statusErrors && <small className="text-danger">{statusErrors}</small>}
                                </div>
                                {addStatusloading ? (
                                    <Link
                                        className="btn-sm btn-primary rounded-3 p-2"
                                        type="button"
                                        disabled
                                    >
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        ...
                                    </Link>
                                ) : newStatus ? (
                                    <Link
                                        className="btn-sm btn-primary rounded-3 p-2 mx-1"
                                        onClick={onAddStatusClick}
                                        title="Save Status"
                                    >
                                        ➡
                                    </Link>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col">
                    <select
                        className="form-control mb-2 text-capitalize"
                        onChange={handleGroupSelect}
                    >
                        <option value="">Select Group</option>
                        {(groupBy || []).map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.value}
                            </option>
                        ))}
                    </select>
                    <div className="row m-0 p-0">
                        {selectedGroupBy.length === 0 ? (
                            null) : (
                            (selectedGroupBy || []).map((item, index) => (
                                <span
                                    key={index}
                                    className="text-capitalize text-black-2 font-size-2 d-flex align-items-center p-1"
                                    title={`${groupBy.find((i) => i.id === parseInt(item))?.value}`}>
                                    {groupBy.find((i) => i.id === parseInt(item)).value}
                                    <Link
                                        onClick={() => removeGroup(item)}
                                        title={`Delete ${groupBy.find((i) => i.id === parseInt(item))?.value}`}
                                    >
                                        <i className="px-1 fa fa-times-circle" aria-hidden="true"></i>
                                    </Link>
                                </span>
                            ))
                        )}
                    </div>
                </div>
                <div className="col">
                    <select
                        className="form-control mb-2 text-capitalize"
                        onChange={handleAdminSelect}
                        value=""
                    >
                        <option value="">Select Admin</option>
                        {(AdminList || []).map((user) => (
                            <option key={user.admin_id} value={user.admin_id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <div className="row m-0 p-0">
                        {selectedAdmin.length === 0 ? (
                            null
                        ) : (
                            (selectedAdmin || []).map((item) => (
                                <div
                                    key={item.admin_id}
                                    className="position-relative d-inline-block mr-3 mb-2"
                                    style={{ width: '25px', height: '25px' }}
                                >
                                    <img
                                        className="rounded-circle"
                                        src={item.profile_image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
                                        alt={`Profile of ${item.name}`}
                                        title={`Profile image of ${item.name}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            border: '2px solid #dee2e6',
                                        }}
                                    />
                                    <button
                                        onClick={() => removeAdmin(item.admin_id)}
                                        aria-label={`Remove ${item.name}`}
                                        className="position-absolute text-danger bg-transparent border-0 p-0"
                                        style={{
                                            top: '-5px',
                                            right: '-5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <i
                                            className="fa fa-times-circle"
                                            aria-hidden="true"
                                            style={{
                                                fontSize: '10px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                                            }}
                                        ></i>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="col">

                    {loading === true ? (
                        <Link className="btn-md btn-primary p-1 px-12 rounded-4">
                            <span
                                className="spinner-border spinner-border-sm "
                                role="status"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Loading...</span>
                        </Link>
                    ) : (
                        <Link onClick={(e) => handleTaskSubmit(e)} className="btn-md btn-primary p-1 px-10 rounded-4">
                            Save
                        </Link>
                    )}
                </div>
            </div>
        </form>
    )
}
