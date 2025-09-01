import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { DeleteApplicanTypeApi } from "../../api/api";
import Pagination from "./pagination";
import Loader from "../common/loader";
import SAlert from "./sweetAlert";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function ApplicantTypeTable(props) {
    const applicantType = useMemo(() => [...props.allApplicantType].reverse(), [props.allApplicantType]);
    const [isLoading, setIsLoading] = useState(true);
    const [applicantLevel, setApplicantLevel] = useState("parent");
    // const [apiCall, setApiCall] = useState(props.apiCall);
    const [deleteId, setDeleteId] = useState("");
    const [deleteName, setDeleteName] = useState("");
    const [deleteAlert, setDeleteAlert] = useState(false);

    /* Pagination states */
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    /* Filtered data based on applicantLevel */
    const filteredData = useMemo(() => {
        if (applicantLevel === "child") {
            return applicantType.filter((data) => data.parent_id !== "0");
        } else {
            return applicantType.filter((data) => data.parent_id === "0");
        }
    }, [applicantType, applicantLevel]);

    const totalData = filteredData.length;
    /* Function to get the applicant type data */
    const applicantTypeData = () => {
        setIsLoading(false);
    };

    /* Effect to handle data loading and apiCall changes */
    useEffect(() => {
        applicantTypeData();
    }, [applicantType]);

    useEffect(() => {
        setCurrentPage(1);
        if (props.setpageNo) props.setpageNo(1);
    }, [applicantLevel, props]);
    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / recordsPerPage);

    /* To call API to delete applicant type */
    async function deleteApplicantType(id) {
        const data = { id };
        try {
            const response = await DeleteApplicanTypeApi(data);
            if (response.status === 1 || response.status === "1") {
                toast.success("Applicant Type deleted successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setDeleteAlert(false);
                setDeleteId("");
                setDeleteName("");
                props.setApiCall(true); // Trigger refetch from parent
            } else if (response.message === "This applicant type cannot be deleted because it is used for applicant" ||
                       response.message === "This applicant type cannot be deleted because it is used for applicant.") {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                setDeleteAlert(false);
                setDeleteId("");
                setDeleteName("");
            } else if (response.message === "This applicant type cannot be deleted because it has a sub-applicant type.") {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                setDeleteAlert(false);
                setDeleteId("");
                setDeleteName("");
            }
        } catch (err) {
            console.error("Error deleting applicant type:", err);
            toast.error("An error occurred while deleting the applicant type.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
    }

    /*Function to close the delete alert box */
    const CancelDelete = () => {
        setDeleteAlert(false);
    };


    return (
        <>
            {/* {showApplicantTypeForm ? (
                <AddApplicantType
                    show={showApplicantTypeForm}
                    close={() => {
                        setShowApplicantTypeForm(false);
                    }}
                    apicall={apiCall}
                    setApicall={setApiCall}
                    UpdateApplicantTypeData={updateApplicantTypeData}
                />
            ) : null} */}

            <div className="mb-18">
                <div className="mb-4 align-items-center">
                    <div className="page___heading">
                        <h3 className="font-size-6 mb-0">Applicant Type </h3>
                    </div>
                </div>
                <ul
                    className={`nav border-top border-bottom border-mercury user_profile_tab`}
                    id="myTab"
                    role="tablist"
                >
                    <li className="tab-menu-items nav-item">
                        <Link
                            className={
                                applicantLevel === "parent"
                                    ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6 active"
                                    : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6"
                            }
                            id="parent"
                            onClick={() => {
                                setApplicantLevel("parent")
                                // setFilteredData((applicantType || []).filter(
                                //     (data) => data.parent_id === "0"))
                                setCurrentPage(1)
                                props.setpageNo(1)
                            }}
                        >
                            Applicant Type
                        </Link>
                    </li>
                    <li className={"tab-menu-items nav-item"}>
                        <Link
                            className={
                                applicantLevel === "child"
                                    ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6 active"
                                    : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6"
                            }
                            id="child"
                            onClick={() => {
                                setApplicantLevel("child")
                                // setFilteredData((applicantType || []).filter(
                                //     (data) => data.level === "1"))
                                setCurrentPage(1)
                                props.setpageNo(1)
                            }}
                        >
                            Sub Applicant Type
                        </Link>
                    </li>
                </ul>
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
                                            className="border-0 text-start font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                className=" text-dark"
                                                onClick={() => {
                                                    props.handleSort("title")
                                                    setCurrentPage(1)
                                                }}>
                                                Name
                                            </Link>
                                        </th>
                                        {applicantLevel === "child" ? <th
                                            scope="col"
                                            className=" border-0 font-size-4 font-weight-normal text-end"
                                            title="Actions"
                                        >
                                            Parent
                                        </th> : null}
                                        {props.heading === "Dashboard" ||
                                            props.user_type === "company" ? null : (
                                            <th
                                                scope="col"
                                                className=" border-0 font-size-4 font-weight-normal text-end"
                                                title="Actions"
                                            >
                                                Action
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map function to show the data in the list*/}
                                    {totalData === 0 || filteredData.length === 0 ? (
                                        <tr>
                                            <th colSpan={8} className="bg-white text-center">
                                                No Data Found
                                            </th>
                                        </tr>
                                    ) : (
                                        filteredData
                                            .slice(
                                                (currentPage - 1) * recordsPerPage,
                                                currentPage * recordsPerPage
                                            )
                                            .map((data) => (
                                                <tr className="text-capitalize" key={data.id}>
                                                    <td className="py-5 text-start">
                                                        {data.title === null ||
                                                            data.title === undefined ||
                                                            data.title === "undefined" ||
                                                            data.title === "" ? (
                                                            <p className="font-size-3  mb-0">N/A</p>
                                                        ) : (
                                                            <div
                                                                className="font-size-3 mb-0 font-weight-semibold  text-truncate"
                                                                title={`Open ${data.title}`}
                                                            >
                                                                <Link
                                                                    to={`/slots`}
                                                                    className="text-black-2"
                                                                    state={{ applicantType: data.id, folderId: data.doc_folder_id }}>
                                                                    {data.title}
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </td>
                                                    {applicantLevel === "child" ?
                                                        <td className="font-size-3 mb-0 font-weight-semibold  text-truncate">
                                                            {(applicantType || [])?.find((item) => item.id === data.parent_id)?.title}
                                                        </td> : null}
                                                    <td
                                                        className={
                                                            props.heading === "Dashboard" ||
                                                                props.user_type === "company"
                                                                ? "d-none"
                                                                : "py-5 "
                                                        }
                                                    >
                                                        <div
                                                            className="btn-group button_group"
                                                            role="group"
                                                        >
                                                            <button
                                                                className="btn btn-outline-info action_btn "
                                                                style={{ fontSize: "10px" }}
                                                                onClick={() => {
                                                                    props.setUpdateApplicantTypeData(data);
                                                                    props.setShowApplicantTypeForm(true);
                                                                    props.setParentApplicant(data.level)
                                                                }}
                                                                title="Update"
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-info action_btn "
                                                                style={{ fontSize: "10px" }}
                                                                onClick={() => {
                                                                    props.setUpdateApplicantTypeData(data);
                                                                    props.setShowApplicantTypeForm(true);
                                                                    props.setParentApplicant("3")
                                                                }}
                                                                title="Grant Access"
                                                            >
                                                                Grant Access
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-info action_btn "
                                                                style={{ fontSize: "10px", color: "red" }}
                                                                onClick={() => {
                                                                    setDeleteName(data.title)
                                                                    setDeleteId(data.id)
                                                                    setDeleteAlert(true)
                                                                }
                                                                }
                                                                title="Delete Applicant Type">
                                                                <FaTrash />
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
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            total={totalData}
                            count={
                                filteredData.slice(
                                    (currentPage - 1) * recordsPerPage,
                                    currentPage * recordsPerPage
                                ).length
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Single SAlert instance outside the table */}
            <SAlert
                show={deleteAlert}
                title={deleteName}
                text="Are you Sure you want to delete !"
                onConfirm={() => deleteApplicantType(deleteId)}
                showCancelButton={true}
                onCancel={(CancelDelete)}
            />
        </>
    );
}

export default ApplicantTypeTable;
