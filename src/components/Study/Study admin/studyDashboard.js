import React from 'react'
import StudyAdminHeader from '../StudyComman/studyAdminHeader'
import StudyAdminSidebar from '../StudyComman/studySiderbar'
import { Link } from 'react-router-dom'

export default function StudyDashboard() {
    return (
        <div className="site-wrapper overflow-hidden bg-default-2">
            {/* <!-- Header Area --> */}
            <StudyAdminHeader heading={"Dashboard"} />
            {/* <!-- navbar- --> */}
            <StudyAdminSidebar heading={"Dashboard"} />

            <div
                className={
                    "dashboard-main-container mt-12 mt-lg-12"
                }
                id="dashboard-body"
            >

                <div className="container-fluid mt-15">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-briefcase"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            10
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Programs
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-user"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            550
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Total Students
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-eye"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            10
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Total documents
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        {/* <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-mouse-pointer"></i>
                                </div>
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">50</span>
                                        %
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Applied Rate
                                    </p>
                                </div>
                            </Link>
                        </div> */}
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-users"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            50
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Total Applied Applicants
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        {/* <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-check "></i>
                                </div>
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">7</span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Placed Job
                                    </p>
                                </div>
                            </Link>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
