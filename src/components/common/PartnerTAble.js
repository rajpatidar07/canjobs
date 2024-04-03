import React, { useState, useEffect } from 'react'
import { GetAgent } from '../../api/api';
import Pagination from './pagination';
import { Link } from 'react-router-dom';
import Loader from './loader';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri"
export default function PartnerTAble(props) {
    const [prtnerData, setprtnerData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    /*Pagination states */
    const [totalData, setTotalData] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    /*Shorting states */
    const [columnName, setcolumnName] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    //   /* Function to get the intervew data*/
    const PartnerData = async () => {
        try {
            const userData = await GetAgent(
                "",
                props.search,
                props.pageNo,
                recordsPerPage,
                columnName,
                sortOrder
            );
            if (userData.data.length === 0) {
                setprtnerData([]);
                setIsLoading(false);
            } else {
                setprtnerData(userData.data.data);
                setTotalData(userData.data.total_rows);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    /*Render function to get the interview*/
    useEffect(() => {
        PartnerData();
        if (props.apiCall === true) {
            props.setApiCall(false)
        }
    }, [
        props.search,
        props.pageNo,
        columnName,
        recordsPerPage,
        sortOrder,
        // props.filter_by_time,
        // props.statusFilterValue,
        // props.openTable,
        props.apiCall,
    ]);

    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / recordsPerPage);

    /*Sorting Function */
    const handleSort = (columnName) => {
        setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
        setcolumnName(columnName);
    };

    return (
        <div>
            <div className="mb-18">
                <div className="mb-4 align-items-center">
                    <div className="page___heading">
                        <h3 className="font-size-6 mb-0">Manage Partner </h3>
                    </div>
                </div>
                <div
                    className={
                        props.heading === "Dashboard"
                            ? ""
                            : "bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5"
                    }
                >
                    <div className="table-responsive main_table_div">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <table className="table table-striped main_data_table">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("u_id");
                                                    props.setpageNo(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by ID"
                                            > UID
                                            </Link>

                                        </th>
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("name");
                                                    props.setpageNo(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by Name"
                                            >
                                                Name
                                            </Link>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("address");
                                                    props.setpageNo(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by Location"
                                            >
                                                Location
                                            </Link>
                                        </th>

                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("email");
                                                    props.setpageNo(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by email"
                                            >
                                                Contact Info
                                            </Link>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                onClick={() => {
                                                    handleSort("agent_employee_count");
                                                    props.setpageNo(1);
                                                }}
                                                className="text-gray"
                                                title="Sort by Candidates"
                                            >
                                                Total Candidates
                                            </Link>
                                        </th>
                                        <th
                                            scope="col"
                                            className=" border-0 font-size-4 font-weight-normal"
                                        >
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map function to show the data in the list*/}
                                    {totalData === 0 || prtnerData.length === 0 ? (
                                        <tr>
                                            <th colSpan={7} className="bg-white text-center">
                                                No Data Found
                                            </th>
                                        </tr>
                                    ) : (
                                        (prtnerData || []).map((data) => (
                                            <tr className="text-capitalize" key={data.id}>
                                                <td className="py-5 ">
                                                    <Link
                                                        to={`/partner_profile`}
                                                        onClick={
                                                            () =>
                                                            localStorage.setItem("agent_id", data.id)
                                                        }
                                                        title="Partner Profile"
                                                    >
                                                        <p className="font-size-3 mb-0 font-weight-normal text-black-2">
                                                            {data.u_id}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td className="py-5 ">
                                                    <Link
                                                        to={`/partner_profile`}
                                                        onClick={() =>
                                                            localStorage.setItem("agent_id", data.id)
                                                        }
                                                        title="Partner Profile"
                                                    >
                                                        <div className="d-flex profile_box gx-2">
                                                            <div className="media  align-items-center">
                                                                <div className="circle-30 mx-auto overflow-hidden">
                                                                    {data.profile_image === null || !data.profile_image ? (
                                                                        <img
                                                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                                                            alt=""
                                                                            className="w-100"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={data.profile_image}
                                                                            alt={data.name}
                                                                            className="w-100"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className=" mb-0">
                                                                {data.name === null ||
                                                                    data.name === undefined ||
                                                                    data.name === "undefined" ||
                                                                    data.name === "" ? (
                                                                    <p className="font-size-3  mb-0">N/A</p>
                                                                ) : (
                                                                    <p
                                                                        className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                                                        title={data.name}
                                                                    >
                                                                        {data.name}
                                                                    </p>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="py-5 ">
                                                    {data.address === null || !data.address ? (
                                                        <p className="font-size-3 font-weight-bold  mb-0">
                                                            N/A
                                                        </p>
                                                    ) : (
                                                        <p
                                                            className="font-size-3 font-weight-normal mb-0 text-truncate"
                                                            style={{ maxWidth: 200 }}
                                                            title={`${data.address ? data.address : ""}${data.city ? ", " + data.city : ""}${data.state ? ", " + data.state : ""}${data.country ? ", " + data.country : ""} `}
                                                        >
                                                            {`${data.address ? data.address : ""}${data.city ? ", " + data.city : ""}${data.state ? ", " + data.state : ""}${data.country ? ", " + data.country : ""} `}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="py-5 ">
                                                    {data.contact_no === null || !data.contact_no ? (
                                                        <p className="font-size-3 font-weight-bold  mb-0">
                                                            N/A
                                                        </p>
                                                    ) : (
                                                        <>
                                                            <div className="font-size-3 font-weight-normal mb-0">
                                                                +
                                                                <Link
                                                                    className="text-dark"
                                                                    to={`tel:${data.contact_no}`}
                                                                >
                                                                    {data.contact_no}
                                                                </Link>
                                                            </div>
                                                            <p className="text-gray font-size-2 font-weight-normal m-0">
                                                                <Link
                                                                    className="text-dark"
                                                                    to={`mailto:${data.email}`}
                                                                >
                                                                    {data.email}
                                                                </Link>
                                                            </p>
                                                        </>
                                                    )}
                                                </td>
                                                <td className=" py-5">
                                                    {data.agent_employee_count === null ||
                                                        data.agent_employee_count === undefined ||
                                                        data.agent_employee_count === "undefined" ||
                                                        data.agent_employee_count === "" ||
                                                        data.agent_employee_count === "0" || data.agent_employee_count === 0 ? (
                                                        <p className="font-size-3  mb-0">N/A</p>
                                                    ) : (
                                                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                                            {(data.agent_employee_count)}
                                                        </h3>
                                                    )}
                                                </td>
                                                <td
                                                    className={
                                                        props.heading === "Dashboard" ? "d-none" : "py-5 "
                                                    }
                                                >
                                                    <div className="btn-group button_group" role="group">
                                                        <button
                                                            className="btn btn-outline-info action_btn "
                                                            style={{ fontSize: "10px" }}
                                                            onClick={() => props.EditAgent(data.id)}
                                                            title="Edit Partner"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            className={
                                                                props.user === "agent"
                                                                    ? "d-none"
                                                                    : "font-size-3 text-break btn btn-outline-danger btn-rounded action_btn "
                                                            }
                                                            onClick={() => props.ShowDeleteAlert(data)}
                                                            title="Delete Partner"
                                                        >
                                                            <RiDeleteBin5Line />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
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
                            count={prtnerData.length}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
