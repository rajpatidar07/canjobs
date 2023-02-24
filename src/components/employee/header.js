import React from "react";
import { Link } from "react-router-dom";
function EmployeeHeader() {
    // eslint-disable-next-line no-use-before-define
    return (
        <header className="site-header site-header--menu-right bg-default py-7 py-lg-0 site-header--absolute site-header--sticky">
            <div className="container">
                <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
                    {/* <!-- Brand Logo--> */}
                    <div className="brand-logo">
                        <a href="/">
                            {/* <!-- light version logo (logo must be black // eslint-disable-next-line)--> */}
                            <img src="image/logo-main-black.png" alt="" className="light-version-logo default-logo" />
                            {/* <!-- Dark version logo (logo must be White)--> */}
                            <img src="image/logo-main-white.png" alt="" className="dark-version-logo" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="mobile-menu">
                        <div className="navbar-nav-wrapper">
                            <ul className="navbar-nav main-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/search">Jobs</Link>
                                </li>
                            </ul>
                        </div>
                        <button className="d-block d-lg-none offcanvas-btn-close focus-reset" type="button" data-toggle="collapse" data-target="#mobile-menu" aria-controls="mobile-menu" aria-expanded="true" aria-label="Toggle navigation">
                            <i className="gr-cross-icon"></i>
                        </button>

                    </div>
                    <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
                        <a className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset disabled" href="/" data-toggle="modal" data-target="#login">
                            Log in
                        </a>
                        <a className="btn btn-primary text-uppercase font-size-3 disabled" href="/" data-toggle="modal" data-target="#signup">
                            Sign up
                        </a>
                    </div>
                    {/* <!-- Mobile Menu Hamburger--> */}
                    <button className="navbar-toggler btn-close-off-canvas  hamburger-icon border-0" type="button" data-toggle="collapse" data-target="#mobile-menu" aria-controls="mobile-menu" aria-expanded="false" aria-label="Toggle navigation">
                        {/* <!-- <i className="icon icon-simple-remove icon-close"></i> --> */}
                        <span className="hamburger hamburger--squeeze js-hamburger">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </span>
                    </button>
                    <div>
                        <div class="dropdown show-gr-dropdown py-5">
                            <a class="proile media ml-7 flex-y-center" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="circle-40">
                                    <img src="image/header-profile.png" alt="" />
                                </div>
                                <i class="fas fa-chevron-down heading-default-color ml-6"></i>
                            </a>
                            <div class="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase" href="http://localhost:3000/">Settings </a>
                                <a class="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase" href="http://localhost:3000/">Edit Profile</a>
                                <a class="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase" href="http://localhost:3000/">Log Out</a>
                            </div>
                        </div>
                    </div>
                    {/* <!--/.Mobile Menu Hamburger Ends--> */}
                </nav>
            </div>
        </header>

    );
}
export default EmployeeHeader;