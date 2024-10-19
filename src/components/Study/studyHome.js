import React from 'react'
import StudyHeader from './StudyComman/studyHeader'
import { Link } from 'react-router-dom'

export default function StudyHome() {
    let token = localStorage.getItem("token")
    return (
        <div className="site-wrapper overflow-hidden ">
            <StudyHeader />
            {/* <!-- Hero Area --> */}
            <div className="position-relative z-index-1  pt-26 pb-26 dark-mode-texts">
                <div className="container ">
                    <div className="row ">
                        {!token ? <>
                            {/* Student Section */}
                            <div className="col text-center p-2 rounded shadow-sm mx-2 study_home_banner"
                                style={{

                                    backgroundImage:
                                        "linear-gradient(45deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url('https://orcavisa.com/images/home-banner.png')",

                                }}>


                                <Link to="/candidate_login" className="btn btn-primary btn-lg" state={{ page: "study" }}>
                                    Student permit
                                </Link>
                            </div>
                            {/* Consultant Section */}
                            <div className="col text-center p-2 rounded shadow-sm mx-2 study_home_banner"
                                style={{

                                    backgroundPosition: "center 42%",
                                    backgroundImage:
                                        "linear-gradient(45deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url('https://newqwebsite.s3.amazonaws.com/career_banner.png')",

                                }}>

                                <Link to="/partnerlogin" className="btn btn-success btn-lg" state={{ page: "study" }}>
                                    Consultant
                                </Link>
                            </div>
                        </> :
                            <>
                                {/* Student Section */}
                                <div className="col text-center p-2 rounded shadow-sm mx-2 study_home_banner"
                                    style={{

                                        backgroundImage:
                                            "linear-gradient(45deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url('https://images.pexels.com/photos/7972506/pexels-photo-7972506.jpeg?auto=compress&cs=tinysrgb&w=400')",
                                            backgroundSize:"cover"

                                    }}>


                                    <Link to="/programs" className="btn btn-primary btn-lg" state={{ page: "study" }}>
                                        Apply for college
                                    </Link>
                                </div>
                                <div className="col text-center p-2 rounded shadow-sm mx-2 study_home_banner"
                                    style={{

                                        backgroundImage:
                                            "linear-gradient(45deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url('https://images.pexels.com/photos/5137963/pexels-photo-5137963.jpeg?auto=compress&cs=tinysrgb&w=400')",
                                            backgroundSize:"cover"

                                    }}>


                                    <Link to="/accommodation" className="btn btn-primary btn-lg" state={{ page: "study" }}>
                                        Accommodation
                                    </Link>
                                </div>
                                {/* Consultant Section */}
                                <div className="col text-center p-2 rounded shadow-sm mx-2 study_home_banner"
                                    style={{

                                        backgroundPosition: "center 42%",
                                        backgroundImage:
                                            "linear-gradient(45deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url('https://static.vecteezy.com/system/resources/thumbnails/046/323/439/small_2x/loan-flat-style-illustration-design-vector.jpg')",
                                            backgroundSize:"cover"

                                    }}>

                                    <Link to="/education_loan" className="btn btn-success btn-sm m-1 pt-8 pb-8">
                                        Apply for  Education Loan
                                    </Link>
                                    <Link to="/personal_loan" className="btn btn-success btn-sm m-1 pt-8 pb-8">
                                        Apply for  Personal Loan
                                    </Link>
                                </div>
                            </>}
                        {/* <!-- End Hero Form --> */}{" "}
                    </div>

                </div>
            </div>
        </div>
    )
}
