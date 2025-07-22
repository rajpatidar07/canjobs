import React, { useState, useEffect } from 'react'
import { AddAdminPermission, GetAdminrSetting } from '../../../api/api';
import { Modal } from 'react-bootstrap';

export default function LmiafieldsPermission(props) {
    // State to manage table visibility
    const [tables, setTables] = useState({
        location: 0,
        lmia_number: 0,
        lmia_status: 0,
        monday_status: 0,
        lmia_creation_date: 0,
        lmia_date_approved: 0,
        lmia_date_expiry: 0,
        job_category: 0,
        salary: 0,
        lmia_submissiom_date: 0,
        lmia_payment_status: 0,
        lmia_payment_by: 0,
        type_of_lmia: 0,
        lmia_notes: 0,
        education: 0,
        keyskill: 0,
        experience_required: 0,
        applied_by_admin: 0,
        profile_complete: 0,
    })

    let close = () => {
        props.close()
    }
    /*Function to get the permission data */
    const GetDashboardPermissionData = async () => {
        try {
            let Response = await GetAdminrSetting();
            const lmia_column_permission = JSON.parse(
                Response.data.lmia_column_permission
            );
            setTables(lmia_column_permission || tables);
        } catch (err) {
            console.log(err);
        }
    };
    // Handle checkbox change
    const handleMangeTableCheckboxChange = async (tableName) => {
        const updatedPermissions = {
            lmia_column_permission: {
                location:
                    tableName === "location"
                        ? tables.location === 0
                            ? 1
                            : 0
                        : tables.location,
                lmia_number:
                    tableName === "lmia_number"
                        ? tables.lmia_number === 0
                            ? 1
                            : 0
                        : tables.lmia_number,
                lmia_status:
                    tableName === "lmia_status"
                        ? tables.lmia_status === 0
                            ? 1
                            : 0
                        : tables.lmia_status,
                lmia_creation_date:
                    tableName === "lmia_creation_date"
                        ? tables.lmia_creation_date === 0
                            ? 1
                            : 0
                        : tables.lmia_creation_date,
                lmia_date_approved:
                    tableName === "lmia_date_approved"
                        ? tables.lmia_date_approved === 0
                            ? 1
                            : 0
                        : tables.lmia_date_approved,
                monday_status:
                    tableName === "monday_status"
                        ? tables.monday_status === 0
                            ? 1
                            : 0
                        : tables.monday_status,
                lmia_date_expiry:
                    tableName === "lmia_date_expiry"
                        ? tables.lmia_date_expiry === 0
                            ? 1
                            : 0
                        : tables.lmia_date_expiry,
                job_category:
                    tableName === "job_category"
                        ? tables.job_category === 0
                            ? 1
                            : 0
                        : tables.job_category,
                salary:
                    tableName === "salary"
                        ? tables.salary === 0
                            ? 1
                            : 0
                        : tables.salary,
                lmia_submissiom_date:
                    tableName === "lmia_submissiom_date"
                        ? tables.lmia_submissiom_date === 0
                            ? 1
                            : 0
                        : tables.lmia_submissiom_date,
                lmia_payment_status:
                    tableName === "lmia_payment_status"
                        ? tables.lmia_payment_status === 0
                            ? 1
                            : 0
                        : tables.lmia_payment_status,
                lmia_payment_by:
                    tableName === "lmia_payment_by"
                        ? tables.lmia_payment_by === 0
                            ? 1
                            : 0
                        : tables.lmia_payment_by,
                type_of_lmia:
                    tableName === "type_of_lmia"
                        ? tables.type_of_lmia === 0
                            ? 1
                            : 0
                        : tables.type_of_lmia,
                lmia_notes:
                    tableName === "lmia_notes"
                        ? tables.lmia_notes === 0
                            ? 1
                            : 0
                        : tables.lmia_notes,
                education:
                    tableName === "education"
                        ? tables.education === 0
                            ? 1
                            : 0
                        : tables.education,
                keyskill:
                    tableName === "keyskill"
                        ? tables.keyskill === 0
                            ? 1
                            : 0
                        : tables.keyskill,
                experience_required:
                    tableName === "experience_required"
                        ? tables.experience_required === 0
                            ? 1
                            : 0
                        : tables.experience_required,
                applied_by_admin:
                    tableName === "applied_by_admin"
                        ? tables.applied_by_admin === 0
                            ? 1
                            : 0
                        : tables.applied_by_admin,
                profile_complete:
                    tableName === "profile_complete"
                        ? tables.profile_complete === 0
                            ? 1
                            : 0
                        : tables.profile_complete,
            },
        };
        try {
            let Response = await AddAdminPermission(updatedPermissions);
            if (Response.message === "successfully") {
                GetDashboardPermissionData();
                props.setApiCall(true)
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        GetDashboardPermissionData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Modal
                show={props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <button
                    type="button"
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
                    data-dismiss="modal"
                    onClick={close}
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                    <form>

                        <h5 className="text-center mb-7 pt-2">Add Permission</h5>
                        <div className="row">
                            {tables &&
                                Object.keys(tables || []).map((tableName, index) => (
                                    <div
                                        className="text-dark text-decoration-none d-flex justify-content-between col-6"
                                        key={index}
                                    >
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={tables[tableName] === 0 ? false : true}
                                                onChange={() =>
                                                    handleMangeTableCheckboxChange(tableName)
                                                }
                                            />
                                            <span className="px-2 text-capitalize">
                                                {tableName === "location"
                                                    ? "Address"
                                                    : tableName === "lmia_number"
                                                        ? "LMIA Number"
                                                        : tableName === "lmia_status"
                                                            ? "LMIA Status"
                                                            : tableName === "monday_status"
                                                                ? "Monday Status"
                                                                : tableName === "lmia_creation_date"
                                                                    ? "LMIA creation date"
                                                                    : tableName === "lmia_date_approved"
                                                                        ? "LMIA Approved Date"
                                                                        : tableName === "lmia_date_expiry"
                                                                            ? "LMIA expiry date"
                                                                            : tableName === "job_category"
                                                                                ? "Position/Job Category"
                                                                                : tableName === "salary"
                                                                                    ? "LMIA Wages"
                                                                                    : tableName === "lmia_submissiom_date"
                                                                                        ? "LMIA Submission Date"
                                                                                        : tableName === "lmia_payment_status"
                                                                                            ? "LMIA Payment"
                                                                                            : tableName === "lmia_payment_by"
                                                                                                ? "LMIA Payment By"
                                                                                                : tableName === "type_of_lmia"
                                                                                                    ? "Type of LMIA"
                                                                                                    : tableName === "lmia_notes"
                                                                                                        ? "LMIA Notes"
                                                                                                        : tableName === "education"
                                                                                                            ? "Education"
                                                                                                            : tableName === "keyskill"
                                                                                                                ? "Skills"
                                                                                                                : tableName === "experience_required"
                                                                                                                    ? "Experience"
                                                                                                                    : tableName === "applied_by_admin"
                                                                                                                        ? "Vacancies / Responses"
                                                                                                                        : tableName === "profile_complete"
                                                                                                                            ? "Profile"
                                                                                                                            : ""
                                                }
                                            </span>
                                        </label>
                                    </div>
                                ))}</div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
