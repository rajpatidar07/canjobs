import React,
{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from "../../common/loader"
import { GetApplyProgram } from '../../../api/api';
import Pagination from '../../common/pagination';
export default function AppliedProgramTable(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [appliedProgramData, setAppliedProgramData] = useState([]);
    /* Pagination states */
    const [totalData, setTotalData] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    /* Shorting states */
    const [columnName, setcolumnName] = useState("employee_id");
    const [sortOrder, setSortOrder] = useState("DESC");
    /* Function to get Employee visa data*/
    const AppliedProgramsData = async () => {
        setIsLoading(true);
        try {
            const userData = await GetApplyProgram(
                props.search,
                props.employeeId,
                props.employeeTypeFilterValue,
                recordsPerPage,
                sortOrder,
                columnName,
                props.pageNo,
                props.appliedUserIdFilterValue,
                props.appliedUserTypeFilterValue,
            );
            if (userData.data.data.length === 0) {
                setAppliedProgramData([]);
                setIsLoading(false);
            } else {
                setAppliedProgramData(userData.data.data);
                setTotalData(userData.data.total_rows);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    /*Render function to get the employee data*/
    useEffect(() => {
        AppliedProgramsData();
        if (props.apiCall === true) {
            props.setApiCall(false);
        }
        // if (apiCall === true) {
        //   setApiCall(false);
        // }
        // eslint-disable-next-line
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            props.search,
            props.appliedUserIdFilterValue,
            props.appliedUserTypeFilterValue,
            props.employeeId,
            props.employeeTypeFilterValue,
            props.apiCall,
            recordsPerPage,
            columnName,
            sortOrder,
            props.apiCall,
            // apiCall,
        ]);
    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / recordsPerPage);

    /*Sorting Function */
    const handleSort = (columnName) => {
        setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
        setcolumnName(columnName);
        props.setpageNo(1);
    };
    return (
        <>
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
                                                        handleSort("employee_id");
                                                        props.setpageNo(1);
                                                    }}
                                                    className="text-gray"
                                                    title="Sort by Id"
                                                >
                                                    EID
                                                </Link>
                                            </th>
                                            {
                                                props.heading === "Dashboard" ? (
                                                    ""
                                                ) :
                                                    (
                                                        <th
                                                            scope="col"
                                                            className="border-0 font-size-4 font-weight-normal"
                                                        >
                                                            <Link
                                                                to={""}
                                                                onClick={() => {
                                                                    handleSort("employee_name");
                                                                    props.setpageNo(1);
                                                                }}
                                                                className="text-gray"
                                                                title="Sort byStudent Name"
                                                            >
                                                                Student Name
                                                            </Link>
                                                        </th>
                                                    )}
                                            <th
                                                scope="col"
                                                className=" border-0 font-size-4 font-weight-normal"
                                            >
                                                <Link
                                                    to={""}
                                                    onClick={() => {
                                                        handleSort("programs");
                                                        props.setpageNo(1);
                                                    }}
                                                    className="text-gray"
                                                    title="Sort by Programs Name"
                                                >
                                                    Programs Name
                                                </Link>
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0 font-size-4 font-weight-normal"
                                            >
                                                <Link
                                                    to={""}
                                                    onClick={() => {
                                                        handleSort("college_name");
                                                        props.setpageNo(1);
                                                    }}
                                                    className="text-gray"
                                                    title="Sort by College Name"
                                                >
                                                    College Name
                                                </Link>
                                            </th>
                                            {
                                                props.heading === "Dashboard" ? (
                                                    ""
                                                ) :
                                                    (
                                                        <th
                                                            scope="col"
                                                            className="border-0 font-size-4 font-weight-normal"
                                                        >
                                                            <Link
                                                                to={""}
                                                                onClick={() => {
                                                                    handleSort("city");
                                                                    props.setpageNo(1);
                                                                }}
                                                                className="text-gray"
                                                                title="Sort by Location"
                                                            >
                                                                Location
                                                            </Link>
                                                        </th>
                                                    )}
                                            {
                                                props.heading === "Dashboard" ? (
                                                    ""
                                                ) :
                                                    (
                                                        <th
                                                            scope="col"
                                                            className="border-0 font-size-4 font-weight-normal"
                                                        >
                                                            <Link
                                                                to={""}
                                                                onClick={() => {
                                                                    handleSort("course_duration");
                                                                    props.setpageNo(1);
                                                                }}
                                                                className="text-gray"
                                                                title="Sort by course Duration"
                                                            >
                                                                Course Duration
                                                            </Link>
                                                        </th>
                                                    )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map function to show the data in the list*/}
                                        {totalData === 0 || appliedProgramData.length === 0 ? (
                                            <tr>
                                                <th colSpan={10} className="bg-white text-center">
                                                    No Data Found
                                                </th>
                                            </tr>
                                        ) : (
                                            (appliedProgramData || []).map((data, i) => (
                                                <React.Fragment key={i}>
                                                    <tr className="applicant_row" >
                                                        <td className=" py-5">
                                                            <p className="font-size-3 font-weight-normal text-black-2 mb-0"
                                                                title={data.employee_id}
                                                            >
                                                                <Link
                                                                    className="text-dark"
                                                                    to={`/student_profile`}
                                                                    onClick={localStorage.setItem("employee_id", data.employee_id)}
                                                                >
                                                                    {data.employee_id}
                                                                </Link>
                                                            </p>
                                                        </td>
                                                        <td className="py-5 font-size-3 font-weight-normal text-black-2 mb-0">
                                                            <p>

                                                                <Link
                                                                    className="text-dark text-capitalize"
                                                                    to={`/student_profile`}
                                                                    onClick={localStorage.setItem("employee_id", data.employee_id)}
                                                                >{data.employee_name}
                                                                </Link></p>
                                                        </td>
                                                        <td className="font-size-3 font-weight-normal text-black-2 mb-0 py-5">
                                                            <p>{data.programs}</p>
                                                        </td>
                                                        <td className="py-5 font-size-3 font-weight-normal text-black-2 mb-0">
                                                            <p>{data.college_name}</p>
                                                        </td>
                                                        <td className="py-5 font-size-3 font-weight-normal text-black-2 mb-0">
                                                            <p>{data.city + " " + data.state}</p>
                                                        </td>
                                                        <td className="py-5 font-size-3 font-weight-normal text-black-2 mb-0">
                                                            <p>{data.course_duration}</p>
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
                        currentPage={props.pageNo}
                        setCurrentPage={props.setpageNo}
                        total={totalData}
                        count={appliedProgramData.length}
                    />
                </div>
            </div></>
    )
}
