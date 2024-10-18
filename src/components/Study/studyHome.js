import React from 'react'
import StudyHeader from './StudyComman/studyHeader'
import { Link } from 'react-router-dom'

export default function StudyHome() {
    return (
        <div className="site-wrapper overflow-hidden ">
            <StudyHeader />
            {/* <!-- Hero Area --> */}
            <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
                <div className="container position-static hero_container">
                    <div className="row position-relative align-items-center justify-content-center position-static w-80">
                        {/* <!-- Hero Form --> */}
                        <div className="col-lg-12 col-12 translateY-25 pt-lg-12 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
                            <Link to={"/candidate_login"}
                                state={{ page: "study" }}>Student Login</Link>
                        </div>
                        {/* <!-- End Hero Form --> */}{" "}
                    </div>

                </div>
            </div>
        </div>
    )
}
