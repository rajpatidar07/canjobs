import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import SingUp from "./singup";

function EmployerHeader() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSingUp, setShowSingUp] = useState(false);

  return (
    <header className="site-header site-header--menu-right bg-default py-7 py-lg-0 site-header--absolute site-header--sticky">
      <div className="container">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Brand Logo--> */}
          <div className="brand-logo">
            <a href="/">
              {/* <!-- light version logo (logo must be black // eslint-disable-next-line)--> */}
              <img
                src="image/logo-main-black.png"
                alt=""
                className="light-version-logo default-logo"
              />
              {/* <!-- Dark version logo (logo must be White)--> */}
              <img
                src="image/logo-main-white.png"
                alt=""
                className="dark-version-logo"
              />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="mobile-menu">
            <div className="navbar-nav-wrapper">
              <ul className="navbar-nav main-menu">
                {/* <li className="nav-item dropdown active">
                                    <a className="nav-link dropdown-toggle gr-toggle-arrow" id="navbarDropdown" href="#features" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home <i className="icon icon-small-down"></i></a>
                                    <ul className="gr-menu-dropdown dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li className="drop-menu-item">
                                            <a to="/">
                                                Homepage 01
                                            </a>
                                        </li>
                                        <li className="drop-menu-item">
                                            <a href="home-2.html">
                                                Homepage 02
                                            </a>
                                        </li>
                                        <li className="drop-menu-item">
                                            <a href="home-3.html">
                                                Homepage 03
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle gr-toggle-arrow" id="navbarDropdown2" href="#features" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages <i className="icon icon-small-down"></i></a>
                                    <ul className="gr-menu-dropdown dropdown-menu" aria-labelledby="navbarDropdown2">
                                        <li className="drop-menu-item dropdown">
                                            <a className="dropdown-toggle gr-toggle-arrow" id="navbarDropdown242" href="/search" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Job Pages
                                                <i className="icon icon-small-down"></i>
                                            </a>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-left" aria-labelledby="navbarDropdown242">
                                                <li className="drop-menu-item">
                                                    <a href="search-grid.html">
                                                        Job Grid
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="search-list-1.html">
                                                        Job List
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="jobdetails.html">
                                                        Job Details
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="drop-menu-item dropdown">
                                            <a className="dropdown-toggle gr-toggle-arrow" id="navbarDropdown21" href="http://localhost:3000/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Dashboard
                                                <i className="icon icon-small-down"></i>
                                            </a>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-left" aria-labelledby="navbarDropdown21">
                                                <li className="drop-menu-item">
                                                    <a href="dashboard-main.html">
                                                        Dashboard Main
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="dashboard-settings.html">
                                                        Settings
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="dashboard-posted-applicants.html">
                                                        Applicants
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="dashboard-posted-jobs.html">
                                                        Posted Jobs
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="drop-menu-item dropdown">
                                            <a className="dropdown-toggle gr-toggle-arrow" id="navbarDropdown25g" href="http://localhost:3000/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Candidate Pages
                                                <i className="icon icon-small-down"></i>
                                            </a>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-left" aria-labelledby="navbarDropdown25g">
                                                <li className="drop-menu-item">
                                                    <a href="candidate-profile-main.html">
                                                        Candidate Profile
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="candidate-profile.html">
                                                        Candidate Profile 02
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="drop-menu-item dropdown">
                                            <a className="dropdown-toggle gr-toggle-arrow" id="navbarDropdown242" href="http://localhost:3000/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Search Pages
                                                <i className="icon icon-small-down"></i>
                                            </a>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-left" aria-labelledby="navbarDropdown242">
                                                <li className="drop-menu-item">
                                                    <a href="search-grid.html">
                                                        Search Grid
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="search-list-1.html">
                                                        Search List 01
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="search-list-2.html">
                                                        Search List 02
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="drop-menu-item">
                                            <a href="company-profile.html">
                                                Company Profile
                                            </a>
                                        </li>
                                        <li className="drop-menu-item dropdown">
                                            <a className="dropdown-toggle gr-toggle-arrow" id="navbarDropdown242" href="http://localhost:3000/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Account
                                                <i className="icon icon-small-down"></i>
                                            </a>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-left" aria-labelledby="navbarDropdown242">
                                                <li className="drop-menu-item">
                                                    <a href="javacript:" data-toggle="modal" data-target="#login">
                                                        Sign In
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="javacript:" data-toggle="modal" data-target="#signup">
                                                        Sign Up
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="drop-menu-item dropdown">
                                            <a className="dropdown-toggle gr-toggle-arrow" id="navbarDropdown26" href="http://localhost:3000/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Essential
                                                <i className="icon icon-small-down"></i>
                                            </a>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-left" aria-labelledby="navbarDropdown26">
                                                <li className="drop-menu-item">
                                                    <a href="faq.html">
                                                        Faq
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="error-404.html">
                                                        404
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="pricing-page.html">
                                                        Pricing page
                                                    </a>
                                                </li>
                                                <li className="drop-menu-item">
                                                    <a href="contact.html">Contact</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="">
                    Manage Jobs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/companyprofile">
                    Company Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Manage Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Resume search
                  </a>
                </li>
              </ul>
            </div>
            <button
              className="d-block d-lg-none offcanvas-btn-close focus-reset"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-menu"
              aria-controls="mobile-menu"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <i className="gr-cross-icon"></i>
            </button>
          </div>
          <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
            {/* <!-- Modal for Login--> */}
            <Link
              className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
              to={""}
              onClick={() => setShowLogin(true)}
            >
              Log in
            </Link>
            <Login show={showLogin} close={() => setShowLogin(false)} />
            {/* <!-- Modal for SingUp--> */}
            <button
              className="btn btn-primary"
              to={""}
              onClick={() => setShowSingUp(true)}
            >
              Sign up
            </button>
            <SingUp show={showSingUp} close={() => setShowSingUp(false)} />
          </div>
          {/* <!-- Mobile Menu Hamburger--> */}
          <button
            className="navbar-toggler btn-close-off-canvas  hamburger-icon border-0"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-menu"
            aria-controls="mobile-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
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
export default EmployerHeader;
