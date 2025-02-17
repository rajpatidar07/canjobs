import React, { useState } from 'react'
import { BsChat, BsThreeDots } from 'react-icons/bs'
// import { GrLineChart } from 'react-icons/gr'
// import { HiOutlineBell } from 'react-icons/hi2'
import ExportExcelButton from './exportExcelButton'
import { Link } from 'react-router-dom'

export default function CommonThreeDots(props) {
    let [isOpen, setIsOpen] = useState(false);
    let user_type = localStorage.getItem("userType");
    return (
        <div
            className="position-relative d-inline-block header-btn-devider ml-auto ml-lg-5 pl-2 d-xs-flex align-items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen(true)}
        >
            <Link
                className="d-flex align-items-center justify-content-center text-dark"
            >
                <BsThreeDots size={15} />
            </Link>

            {isOpen && (
                <div className="dropdown-menu show position-absolute bg-white shadow rounded border-0 "
                    style={{ left: "auto", right: "0" }} // Align dropdown to the left
                >
                    {/* {user_type === "admin" && (
                        <Link to="#" className="dropdown-item align-items-center d-none">
                            <HiOutlineBell className="mx-3" /> Notification
                        </Link>
                    )}
                    {user_type === "admin"&&(
                        <Link to="#" className="dropdown-item d-none align-items-center ">
                            <GrLineChart className="mx-3" /> Activity Log
                        </Link>
                    )} */}
                    {(user_type === "admin" && props.applicantTypeId) ? (
                        <button
                            onClick={() => props.setShowGrpChatBox(true)}
                            className="dropdown-item d-flex align-items-center border-0 bg-transparent m-3"
                        >
                            <BsChat className="mx-3" /> Group discussion
                        </button>
                    ) : null}

                    {user_type === "admin" && (
                        <div
                            className="dropdown-item d-flex align-items-center border-0 bg-transparent"
                        >
                            <ExportExcelButton tableName={props.tableName} type={""} portal={props.portal || ""} applicantType={props.applicantTypeId} status={props.exportCandidatestatus} local={props.local || ""} tableData={props.tableData || []} />
                        </div>
                    )}
                </div>
            )}
        </div>)
}
