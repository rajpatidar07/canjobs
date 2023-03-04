import React, { useState } from "react";
import { Link } from "react-router-dom";
import CompanyLogin from "../company/loginModal";
import CompanySignUp from "../company/signupModal";
import ChangePassword from "./changepassword";
import EmployeeLoginModal from "../user/login";
import EmployeeSignupModal from "../user/signup";

function EmployeeHeader() {
  // ADD CLASS FOR MOBILE SCREEN IN SIDEBAR
  // state:-
  const [addClass, setAddClass] = useState(false);
  //function :-
  const addClassOnClick = () => {
    setAddClass(!addClass);
  };
  // EMPLOYEEE LOGIN AND SIGNUP
  // Employee signup and login modal
  const [showLogin, setShowLogin] = useState(false);
  const [showSingUp, setShowSingUp] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*-- Function to show menu on toggle button --*/
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  /*-- Function to switch login to singup --*/
  const SignUpClick = () => {
    setShowSingUp(true);
    setShowLogin(false);
  };
  /*-- Function to switch singup to login--*/
  const LoginClick = () => {
    setShowLogin(true);
    setShowSingUp(false);
  };
  // END EMPLOYEE LOGIN AND SIGNUP

  // COMPANY LOGIN AND SIGNUP
  // Company signup and login state
  const [showCompanyLogin, setShowCompanyLogin] = useState(false);
  const [showCompanySignUp, setShowCompanySignUp] = useState(false);
  /*-- Function to switch login to signup --*/
  const CompanySignUpClick = () => {
    setShowCompanySignUp(true);
    setShowCompanyLogin(false);
  };
  /*-- Function to switch signup to login--*/
  const CompanyLoginClick = () => {
    setShowCompanyLogin(true);
    setShowCompanySignUp(false);
  };
  //  END COMPANY LOGIN AND SIGNUP
  return (
    <header className="site-header site-header--menu-right bg-default py-7 py-lg-0 site-header--absolute site-header--sticky">
      <div className="container">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Brand Logo--> */}
          <div className="brand-logo">
            <Link to="/">
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
            </Link>
          </div>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="mobile-menu"
          >
            <div className="navbar-nav-wrapper">
              <ul className="navbar-nav main-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle gr-toggle-arrow"
                    id="navbarDropdown"
                    to=""
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={addClassOnClick}
                  >
                    Company <i className="icon icon-small-down"></i>
                  </Link>
                  <ul
                    className={`gr-menu-dropdown dropdown-menu ${
                      addClass ? "custom-opacity" : ""
                    }`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li className="nav-item drop-menu-item">
                      <Link to="/company">Company Home</Link>
                    </li>
                    <li className="drop-menu-item">
                      <Link to="/managejobs">Manage Jobs</Link>
                    </li>
                    <li className="drop-menu-item">
                      <Link to="/response">Responses</Link>
                    </li>
                    <li className="drop-menu-item">
                      <Link to="/companyprofile">Profile</Link>
                    </li>
                    <li className="drop-menu-item">
                      <Link to={""} onClick={() => setShowCompanySignUp(true)}>
                        Sign up
                      </Link>
                      <CompanySignUp
                        show={showCompanySignUp}
                        CompanyLoginClick={CompanyLoginClick}
                        close={() => setShowCompanySignUp(false)}
                      />
                    </li>
                    <li className="drop-menu-item">
                      <Link to={""} onClick={() => setShowCompanyLogin(true)}>
                        Login
                      </Link>
                      <CompanyLogin
                        show={showCompanyLogin}
                        CompanySignUpClick={CompanySignUpClick}
                        close={() => setShowCompanyLogin(false)}
                      />
                    </li>
                  </ul>
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
              onClick={() => setIsMenuOpen(false)}
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
            <EmployeeLoginModal
              show={showLogin}
              signUpClick={SignUpClick}
              close={() => setShowLogin(false)}
            />
            {/* <!-- Modal for SingUp--> */}
            <button
              className="btn btn-primary"
              to={""}
              onClick={() => setShowSingUp(true)}
            >
              Sign up
            </button>
            <EmployeeSignupModal
              show={showSingUp}
              loginClick={LoginClick}
              close={() => setShowSingUp(false)}
            />
          </div>
          <div>
            <div className="dropdown show-gr-dropdown py-5">
              <Link
                className="proile media ml-7 flex-y-center"
                to="/"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <img
                    className="rounded-circle"
                    src="image/user1.jpg"
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
                  onClick={() => setShowChangePass(true)}
                  className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  to=""
                >
                  Settings{" "}
                </Link>
                <ChangePassword
                  show={showChangePass}
                  close={() => setShowChangePass(false)}
                />
                <Link
                  className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  to="/"
                >
                  Log Out
                </Link>
              </div>
            </div>
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
export default EmployeeHeader;
