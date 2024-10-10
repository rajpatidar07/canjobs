import React, { useState, useEffect } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { GetAdminsTasks } from "../../api/api";
import Pagination from "./pagination";
export default function AdminListTaskTable(props) {
    const [AdminTaskData, setAdminTaskData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [taskStatus/*, setTaskStatus*/] = useState("");
    const [columnName, setcolumnName] = useState("updated_on");
    const [sortOrder, setSortOrder] = useState("DESC");
    // let adminEmail = localStorage.getItem("admin_id");

    /*Pagination states */
    const [totalData, setTotalData] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / recordsPerPage);

    // Generate a list of admin;s task
    const getAdminList = async () => {
        try {
            let res = await GetAdminsTasks(
                "",
                props.adminId,//adminEmail,
                props.status ? props.status : taskStatus,
                "document",
                currentPage,
                recordsPerPage,
                sortOrder,
                columnName,
                props.filter_by_time,
                props.adminType,
                props.employeeId,
                props.TaskUserType,

            );
            if (res.data.status === (1 || "1")) {

                // if (window.location.pathname === "/managetasks") {
                //     props.setCount(res.data.employee_task_count[0])
                // }
                console.log(res.data.data.data.length)
                if (res.data.data.data.length === 0) {
                    setIsLoading(false);
                    setAdminTaskData([]);
                    setTotalData(0);
                } else {
                    setAdminTaskData(res.data.data.data);
                    setIsLoading(false);
                    setTotalData(res.data.data.total_rows);
                }
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAdminList();
        // eslint-disable-next-line
    }, [taskStatus, props.TaskUserType, props.adminId, props.employeeId, props.filter_by_time, currentPage, sortOrder, columnName]);
    /*Sorting Function */
    const handleSort = (columnName) => {
        setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
        setcolumnName(columnName);
    };
    return (
        <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
            <div className="table-responsive main_table_div">
                {
                    isLoading ? (
                        <Loader />
                    ) :
                        (
                            <table className="table table-striped main_data_table">
                                <thead>
                                    <tr className="">
                                        <th
                                            scope="col"
                                            className=" border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("task_creator_user_name");
                                                    setCurrentPage(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by Name"
                                            >
                                                Name
                                            </Link>
                                        </th>
                                        {/* <th
                                    scope="col"
                                    className=" border-0 font-size-4 font-weight-normal"
                                >
                                    <Link
                                        to={""}
                                        onClick={() => {
                                            handleSort("assigned_to_name");
                                            setCurrentPage(1);
                                        }}
                                        className="text-gray"
                                        title="Sort by Email"
                                    >
                                        Email
                                    </Link>
                                </th> */}
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("subject_description");
                                                    setCurrentPage(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by Type"
                                            >
                                                Type
                                            </Link>
                                        </th>
                                        {props.heading === "Dashboard" ? (
                                            ""
                                        ) : (
                                            <th
                                                scope="col"
                                                className="border-0 font-size-4 font-weight-normal"
                                            >
                                                <Link
                                                    to={""}
                                                    onClick={() => {
                                                        handleSort("Total task");
                                                        setCurrentPage(1);
                                                    }}
                                                    className="text-gray"
                                                    title="Sort by Type"
                                                >
                                                    Total tasks
                                                </Link>
                                            </th>
                                        )}
                                        {
                                            <th
                                                scope="col"
                                                className="border-0 font-size-4 font-weight-normal"
                                            >
                                                <Link
                                                    to={""}
                                                    onClick={() => {
                                                        handleSort("status");
                                                        setCurrentPage(1);
                                                    }}
                                                    className="text-gray"
                                                    title="Sort by Completed task"
                                                >
                                                    Completed task
                                                </Link>
                                            </th>
                                        }
                                        {props.heading === "Dashboard" ? (
                                            ""
                                        ) : (
                                            <th
                                                scope="col"
                                                className="border-0 font-size-4 font-weight-normal"
                                            >
                                                <Link
                                                    to={""}
                                                    // onClick={() => {
                                                    //   handleSort("country");
                                                    //   setCurrentPage(1);
                                                    // }}
                                                    className="text-gray"
                                                    title="Sort by Incomplete tasks"
                                                >
                                                    Incomplete tasks
                                                </Link>
                                            </th>
                                        )}
                                        {props.heading === "Dashboard" ? (
                                            ""
                                        ) : (
                                            <th
                                                scope="col"
                                                className="border-0 font-size-4 font-weight-normal"
                                            >
                                                <Link
                                                    to={""}
                                                    // onClick={() => {
                                                    //   handleSort("country");
                                                    //   setCurrentPage(1);
                                                    // }}
                                                    className="text-gray"
                                                    title="Sort by Overdue tasks"
                                                >
                                                    Overdue tasks
                                                </Link>
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map function to show the data in the list*/}
                                    {totalData === 0 || AdminTaskData.length === 0 ? (
                                        <tr>
                                            <th colSpan={6} className="bg-white text-center">
                                                No Data Found
                                            </th>
                                        </tr>
                                    ) : (
                                        (AdminTaskData || []).map((data,index) => (
                                            <React.Fragment key={index}>
                                                <tr className="text-capitalize applicant_row">
                                                    <td className=" py-5">
                                                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                                            {data.assigned_to_name === null ||
                                                                data.assigned_to_name === undefined ||
                                                                data.assigned_to_name === "undefined" ||
                                                                data.assigned_to_name === "" ||
                                                                data.assigned_to_name === "0" ? (
                                                                <span className="font-size-3  mb-0">N/A</span>
                                                            ) : (
                                                                data.assigned_to_name
                                                            )}
                                                        </p>
                                                    </td>
                                                    {/* <td className=" py-5">
                                    <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                        {data.assigned_to_name === null ||
                                                        data.assigned_to_name === undefined ||
                                                        data.assigned_to_name === "undefined" ||
                                                        data.assigned_to_name === "" ||
                                                        data.assigned_to_name === "0" ? (
                                                        <span className="font-size-3  mb-0">N/A</span>
                                                    ) : (
                                                        data.assigned_to_name
                                                    )} 
                                        raj.we2code@gmail.com
                                    </p>
                                </td> */}
                                                    <td className="py-5 ">
                                                        {data.assigned_user_type === null ||
                                                            data.assigned_user_type === undefined ||
                                                            data.assigned_user_type === "undefined" ||
                                                            data.assigned_user_type === "" ||
                                                            data.assigned_user_type === "0" ? (
                                                            <p className="font-size-3  mb-0">N/A</p>
                                                        ) : (
                                                            <div className="m-0">
                                                                <div className="text-gray font-size-2 m-0"
                                                                >{data.assigned_user_type}</div>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className=" py-5">
                                                        <div className="m-0">
                                                            <div className="text-gray font-size-2 m-0 text-center">{data.total_tasks || 0}</div>
                                                        </div>
                                                    </td>

                                                    <td className=" py-5">
                                                        <div className="m-0">
                                                            <div className="text-gray font-size-2 m-0 text-center">{data.total_completed_task || 0}</div>
                                                        </div>
                                                    </td>


                                                    <td className=" py-5">
                                                        <div className="m-0">
                                                            <div className="text-gray font-size-2 m-0 text-center">{data.total_uncompleted_task || 0}</div>
                                                        </div>
                                                    </td>
                                                    <td className=" py-5 min-width-px-100">
                                                        <div className="m-0">
                                                            <div className="text-gray font-size-2 m-0 text-center">{data.total_overdue_task || 0}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
            </div>
            <div className="pt-2">
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalData}
                    count={AdminTaskData.length}
                />
            </div>
        </div>
    );
}
