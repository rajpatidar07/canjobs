import React from 'react'
import StudyHeader from '../StudyComman/studyHeader'
import StudyAdminSidebar from '../StudyComman/studySiderbar';
import StudyAdminHeader from '../StudyComman/studyAdminHeader';

export default function Programs() {
    let user_type = localStorage.getItem("userType")
    return (
        <div className="site-wrapper overflow-hidden bg-default-2">
            {/* <!-- Header Area --> */}

            {user_type === "admin" || user_type === "agent" ? (
                <> <StudyAdminHeader
                    heading={"Programs"}
                />
                    {/* <!-- navbar- --> */}
                    <StudyAdminSidebar heading={"Programs"} />
                </>
            ) : (
                <StudyHeader />
            )}
            <div
                className={
                    user_type === "admin" || user_type === "agent"
                        ? "dashboard-main-container "
                        : " employee-detail-top-padding"
                }
                id="dashboard-body"
            >
                <div className="position-relative z-index-1  pt-8  dark-mode-texts overflow-scroll">
                    <iframe src="https://canpathways.ca/myapi/program/programs_f.php" title="Program List" className='w-100' style={{ height: "150vh" }}></iframe>
                </div>
            </div>
        </div>
    )
}
