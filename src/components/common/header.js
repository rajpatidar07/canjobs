import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeLoginModal from "../user/login";
import EmployeeSignupModal from "../user/signup";

function EmployeeHeader() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSingUp, setShowSingUp] = useState(false);

  /*-- Function to switch login to singup --*/
  const SingUpClick = () => {
    setShowSingUp(true);
    setShowLogin(false);
  };
  /*-- Function to switch singup to login--*/
  const LoginClick = () => {
    setShowLogin(true);
    setShowSingUp(false);
  };
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
              {1 == 1 ? (
                <ul className="navbar-nav main-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="/employer">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/managejobs">
                      Manage Jobs
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/response">
                      Responses
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/company">
                      Profile
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav main-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/jobs">
                      Jobs
                    </a>
                  </li>
                </ul>
              )}
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
            <EmployeeLoginModal
              show={showLogin}
              singUpClick={SingUpClick}
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
              <a
                className="proile media ml-7 flex-y-center"
                href="http://localhost:3000/"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="">
                  <img
                    className="rounded-circle"
                    src="image/user1.jpg"
                    width={50}
                    height={50}
                    alt={""}
                  />
                </div>
                <i className="fas fa-chevron-down heading-default-color ml-6"></i>
              </a>
              <div
                className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                aria-labelledby="dropdownMenuLink"
              >
                <Link
                  className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  to="/setting"
                >
                  Settings{" "}
                </Link>
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
