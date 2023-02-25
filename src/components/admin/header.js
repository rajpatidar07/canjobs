import React from "react";

const AdminHeader = () => {
  return (
    <header className="site-header site-header--menu-right bg-default position-fixed py-7 py-xs-0 site-header--absolute">
      <div className="container-fluid-fluid px-10">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Brand Logo--> */}
          <div className="brand-logo">
            <a href="index.html">
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
            </a>
          </div>
          <div className="collapse navbar-collapse" id="mobile-menu"></div>
          <div className="header-btn-devider ml-auto ml-lg-5 pl-2 d-none d-xs-flex align-items-center">
            <div>
              <a
                href="http://localhost:3000/"
                className="px-3 ml-7 font-size-7 notification-block flex-y-center position-relative"
              >
                <i className="fas fa-bell heading-default-color"></i>
                <span className="font-size-3 count font-weight-semibold text-white bg-primary circle-24 border border-width-3 border border-white">
                  3
                </span>
              </a>
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
                  <div className="circle-40">
                    <img src="image/header-profile.png" alt="" />
                  </div>
                  <i className="fas fa-chevron-down heading-default-color ml-6"></i>
                </a>
                <div
                  className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                    href="dashboard-settings.html"
                  >
                    Settings{" "}
                  </a>
                  <a
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                    href="candidate-profile-main.html"
                  >
                    Edit Profile
                  </a>
                  <a
                    className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                    href="http://localhost:3000/"
                  >
                    Log Out
                  </a>
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
