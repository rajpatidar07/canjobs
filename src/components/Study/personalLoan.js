import React from 'react'
import StudyHeader from './StudyComman/studyHeader'

export default function PersonalLoan() {
    return (
        <div className="site-wrapper overflow-hidden ">
            <StudyHeader />
            <div className="position-relative z-index-1  dark-mode-texts">
                <div className="row text-left mt-18 pt-0 flex-wrap">
                    <div className=" col-12 order-2 order-xl-1">
                        <div className="bg-white">
                            {/*----Profile Header----*/}
                            {/* <ul
                        className={`nav border-mercury user_profile_tab d-flex justify-content-center `}
                        id="myTab"
                        role="tablist"
                    >
                        <li className="tab-menu-items nav-item">
                            <Link
                                className={
                                    tabActive === "education"
                                        ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6 active"
                                        : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6"
                                }
                                id="home-tab"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                onClick={() => setTabActive("education")}
                            >
                                Education Loan
                            </Link>
                        </li>
                        <li className="tab-menu-items nav-item">
                            <Link
                                className={
                                    tabActive === "personal"
                                        ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6 active"
                                        : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-6"
                                }
                                id="home-tab"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                onClick={() => setTabActive("personal")}
                            >
                                Personal Loan
                            </Link>
                        </li>
                    </ul> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
