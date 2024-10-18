import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudyHeader() {
    const userType = localStorage.getItem("userType");
    let profile_photo = localStorage.getItem("profile_photo");
    let navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /*-- Function to show menu on toggle button --*/
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        // eslint-disable-next-line
        profile_photo = localStorage.getItem("profile_photo");
        // eslint-disable-next-line

    }, [localStorage.getItem("profile_photo")]);

    return (
        <header className="site-header site-header--menu-right bg-default py-7 py-lg-0 site-header--absolute site-header--sticky">
            <div className="container">
                <nav className="navbar site-navbar offcanvas-active navbar-expand-lg p-0 px-0 py-0">
                    {/* <!-- Brand Logo--> */}
                    <div className="brand-logo">
                        <Link to="/study_home">
                            {/* <!-- light version logo (logo must be black // eslint-disable-next-line)--> */}
                            <img
                                src="image/00logo-main-black.png"
                                alt=""
                                className="light-version-logo default-logo"
                                style={{ maxWidth: "160px" }}
                            />
                            {/* <!-- Dark version logo (logo must be White)--> */}
                            <img
                                src="image/logo-main-white.png"
                                alt=""
                                className="dark-version-logo"
                            />
                        </Link>
                    </div>
                    <div
                        className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
                        id="mobile-menu"
                    >
                        <button
                            className="d-block d-lg-none offcanvas-btn-close focus-reset"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-menu"
                            aria-controls="mobile-menu"
                            aria-expanded="true"
                            aria-label="Toggle navigation"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="gr-cross-icon"></i>
                        </button>
                    </div>
                    {
                        userType === "user" ? <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
                            <Link
                                className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                                to={
                                    `/student_profile`}
                            >
                                Profile
                            </Link>

                            <Link
                                className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                                to={
                                    "/student_document"
                                }
                            >
                                Documents
                            </Link>
                        </div> : null
                        //  : (
                        //     <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
                        //         {/* <!-- Modal for Login--> */}
                        //         <Link
                        //             className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                        //             to={"/candidate_login"}
                        //             state={{ page: "study" }}
                        //         >
                        //             Log in
                        //         </Link>

                        //         {/* <!-- Modal for SingUp--> */}
                        //         <Link
                        //             className="btn btn-primary"
                        //             to={"/candidate_signup"}
                        //         >
                        //             Sign up
                        //         </Link>
                        //     </div>
                        // )
                    }
                    {userType === "user" ? (
                        <div>
                            <div className="dropdown show-gr-dropdown py-5">
                                <Link
                                    className="proile media ml-7 flex-y-center"
                                    to="/study_home"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <div>
                                        <img
                                            className="rounded-circle"
                                            src={
                                                profile_photo === null ||
                                                    profile_photo === "" ||
                                                    profile_photo === "null" ||
                                                    profile_photo === undefined ||
                                                    profile_photo === "undefined"
                                                    ? userType === "company"
                                                        ? "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"
                                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                                    : profile_photo
                                            }
                                            width={50}
                                            height={50}
                                            alt={""}
                                        />
                                    </div>
                                    <i className="fas fa-chevron-down heading-default-color ml-6"></i>
                                </Link>
                                <div
                                    className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                                    aria-labelledby="dropdownMenuLink"
                                >


                                    <Link
                                        className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                                        to=""
                                        onClick={() => {
                                            localStorage.clear(); // clear the local storage
                                            toast.error("Log Out Successfully", {
                                                position: toast.POSITION.TOP_RIGHT,
                                                autoClose: 1000,
                                            });
                                            navigate("/study_home");
                                            window.location.reload();
                                        }}
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {/* <!-- Mobile Menu Hamburger--> */}
                    <button
                        className={`navbar-toggler btn-close-off-canvas  hamburger-icon border-0 ${userType === "user" ? " d-none" : ""}`}
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-menu"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        {/* <!-- <i className="icon icon-simple-remove icon-close"></i> --> */}
                        <span className="hamburger hamburger--squeeze js-hamburger">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </span>
                    </button>
                    {/* <!--/.Mobile Menu Hamburger Ends--> */}
                </nav>
            </div>
        </header>
    );
}
export default StudyHeader;
