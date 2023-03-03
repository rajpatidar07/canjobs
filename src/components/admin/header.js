import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChangePassword from "../common/changepassword";

const AdminHeader = () => {
  const [showChangePass, setShowChangePass] = useState(false);

  return (
    <header className="site-header site-header--menu-right bg-default position-fixed py-7 py-xs-0 site-header--absolute">
      <div className="container-fluid-fluid px-10">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Brand Logo--> */}
          <div className="brand-logo">
            {/* <!-- light version logo (logo must be black)--> */}
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
          </div>
          <div className="collapse navbar-collapse" id="mobile-menu"></div>
          <div className="header-btn-devider ml-auto ml-lg-5 pl-2 d-none d-xs-flex align-items-center">
            <div>
              <Link
                to={""}
                className="px-3 ml-7 font-size-7 notification-block flex-y-center position-relative"
              >
                <i className="fas fa-bell heading-default-color"></i>
                <span className="font-size-3 count font-weight-semibold text-white bg-primary circle-24 border border-width-3 border border-white">
                  3
                </span>
              </Link>
            </div>
            <div>
              <div className="dropdown show-gr-dropdown py-5">
                <Link
                  to={""}
                  className="proile media ml-7 flex-y-center"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="circle-40">
                    <img src="image/header-profile.png" alt="" />
                  </div>
                  <i className="fas fa-chevron-down heading-default-color ml-6"></i>
                </Link>
                <div
                  className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link
                    to=""
                    onClick={() => setShowChangePass(true)}
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  >
                    Settings{" "}
                  </Link>
                  <ChangePassword
                    show={showChangePass}
                    close={() => setShowChangePass(false)}
                  />
                  <Link
                    to={"/adminprofile"}
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to={""}
                    className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default AdminHeader;
