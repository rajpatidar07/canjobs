import React from 'react'
import SharePointDocument from '../../common/Document folder/SharePointDocument'
import { useLocation } from 'react-router-dom';
import StudyHeader from '../StudyComman/studyHeader';

export default function StudentDocument() {
    let eId = localStorage.getItem("employee_id")
    let PersonalDetail = JSON.parse(localStorage.getItem("EmployeePersonalDetail"))
    let user_name = localStorage.getItem("name")
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const docId = searchParams.get("docId");
    const docParentId = searchParams.get("docParentId");
    return (
        <div className="site-wrapper overflow-hidden bg-default-2">
            {/* <!-- Header Area --> */}
            <StudyHeader />
            <div
                className={` employee-detail-top-padding`}
                id="dashboard-body">
                <div className={`container`}>
                    <div className="row text-left mt-18 pt-0 flex-wrap">
                        <div className=" col-12 order-2 order-xl-1">
                            <div className="bg-white">
                            </div>
                            <div
                                className={`justify-content-center`}
                                id="applieddocuments"
                                role="tabpanel"
                                aria-labelledby="applieddocuments"
                            >

                                <SharePointDocument
                                    user_id={eId}
                                    emp_user_type={"employee"}
                                    folderId={
                                        docId
                                            ? docParentId
                                            : PersonalDetail.documents_folder_id
                                    }
                                    notification={docId ? "yes" : "no"}
                                    docId={docId ? docId : ""}
                                    docTypePage={"adobe"}
                                    user_name={user_name}
                                    partnerId={PersonalDetail.reffer_by}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
