import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { DeleteApplicanTypeApi } from "../../api/api";
import Pagination from "./pagination";
// import AddApplicantType from "../forms/admin/AddApplicantType";
import Loader from "../common/loader";
import SAlert from "./sweetAlert";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function ApplicantTypeTable(props) {
    // let search = props.search;
    let [isLoading, setIsLoading] = useState(true);
    // let [showApplicantTypeForm, setShowApplicantTypeForm] = useState(false);
    // const [updateApplicantTypeData, setUpdateApplicantTypeData] = useState();
    let [apiCall, setApiCall] = useState(props.apiCall);
    const [deleteAlertApplicantTypeData, setDeleteAlertApplicantTypeData] =
        useState(false);
    const [deleteAlertApplicant, setDeleteAlertApplicant] =
        useState(false);

    const applicantType = props.allApplicantType;

    /*Pagination states */
    const filteredData = (applicantType || []).filter(
        (data) => data.parent_id === "0"
    );

    const [totalData, setTotalData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    //   /* Function to get the intervew data*/
    const applicantTypeData = async () => {
        try {
            if (filteredData && filteredData.length > 0) {
                setTotalData(filteredData.length);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(true);
        }
    };

    /*Render function to get the interview*/
    useEffect(() => {
        applicantTypeData();
        // eslint-disable-next-line
    }, [filteredData, apiCall]);

    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / recordsPerPage);

    /*To call Api to delete employee */
    async function deleteApplicantType(id) {
        let data = {
            id: id,
        };
        try {
            const response = await DeleteApplicanTypeApi(data);
            if (response.status === 1 || response.status === "1") {
                toast.error("Applicant Type deleted Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setDeleteAlertApplicant(false)
                setDeleteAlertApplicantTypeData();
                setApiCall(true);
                props.setApiCall(true)
            }
            if (response.message === "This applicant type cannot be deleted because it is used for applicant") {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setDeleteAlertApplicant(false)
                setDeleteAlertApplicantTypeData();
            }
            if (response.message === "This applicant type cannot be deleted because it has a sub-applicant type.") {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setDeleteAlertApplicant(false)
                setDeleteAlertApplicantTypeData();
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                                            className="border-0 font-size-4 font-weight-normal text-start"
                                        >
                                            Title
                                        </th>

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
                                                                }}
                                                                title=" Reschedule Interview"
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-info action_btn "
                                                                style={{ fontSize: "10px", color: "red" }}
                                                                onClick={() => {
                                                                    setDeleteAlertApplicantTypeData(data)
                                                                    setDeleteAlertApplicant(true)
                                                                }
                                                                }
                                                                title="Delete Applicant Type">
                                                                <FaTrash />
                                                            </button>
                                                            <SAlert
                                                                show={deleteAlertApplicant}
                                                                title={deleteAlertApplicantTypeData?.title}
                                                                text="Are you Sure you want to delete !"
                                                                onConfirm={() => deleteApplicantType(deleteAlertApplicantTypeData.id)}
                                                                showCancelButton={true}
                                                                onCancel={() =>
                                                                    setDeleteAlertApplicant(false)
                                                                }
                                                            />
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
        </>
    );
}

export default ApplicantTypeTable;