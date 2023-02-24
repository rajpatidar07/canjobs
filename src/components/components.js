import React from "react";
function AllComponents() {
  return (
    <div className="site-wrapper overflow-hidden ">
      {/* <!-- Header Area --> */}
      <header className="site-header site-header--menu-right bg-default py-7 py-lg-0 site-header--absolute site-header--sticky">
        <div className="container">
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
            <div className="collapse navbar-collapse" id="mobile-menu">
              <div className="navbar-nav-wrapper">
                <ul className="navbar-nav main-menu">
                  <li className="nav-item dropdown active">
                    <a
                      className="nav-link dropdown-toggle gr-toggle-arrow"
                      id="navbarDropdown"
                      href="#features"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Home <i className="icon icon-small-down"></i>
                    </a>
                    <ul
                      className="gr-menu-dropdown dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li className="drop-menu-item">
                        <a href="home-1.html">Homepage 01</a>
                      </li>
                      <li className="drop-menu-item">
                        <a href="home-2.html">Homepage 02</a>
                      </li>
                      <li className="drop-menu-item">
                        <a href="home-3.html">Homepage 03</a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle gr-toggle-arrow"
                      id="navbarDropdown2"
                      href="#features"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Pages <i className="icon icon-small-down"></i>
                    </a>
                    <ul
                      className="gr-menu-dropdown dropdown-menu"
                      aria-labelledby="navbarDropdown2"
                    >
                      <li className="drop-menu-item dropdown">
                        <a
                          className="dropdown-toggle gr-toggle-arrow"
                          id="navbarDropdown242"
                          href="http://localhost:3000/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Job Pages
                          <i className="icon icon-small-down"></i>
                        </a>
                        <ul
                          className="gr-menu-dropdown dropdown-menu dropdown-left"
                          aria-labelledby="navbarDropdown242"
                        >
                          <li className="drop-menu-item">
                            <a href="search-grid.html">Job Grid</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="search-list-1.html">Job List</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="jobdetails.html">Job Details</a>
                          </li>
                        </ul>
                      </li>
                      <li className="drop-menu-item dropdown">
                        <a
                          className="dropdown-toggle gr-toggle-arrow"
                          id="navbarDropdown21"
                          href="http://localhost:3000/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Dashboard
                          <i className="icon icon-small-down"></i>
                        </a>
                        <ul
                          className="gr-menu-dropdown dropdown-menu dropdown-left"
                          aria-labelledby="navbarDropdown21"
                        >
                          <li className="drop-menu-item">
                            <a href="">Dashboard Main</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="dashboard-settings.html">Settings</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="dashboard-posted-applicants.html">
                              Applicants
                            </a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="dashboard-posted-jobs.html">Posted Jobs</a>
                          </li>
                        </ul>
                      </li>
                      <li className="drop-menu-item dropdown">
                        <a
                          className="dropdown-toggle gr-toggle-arrow"
                          id="navbarDropdown25g"
                          href="http://localhost:3000/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Candidate Pages
                          <i className="icon icon-small-down"></i>
                        </a>
                        <ul
                          className="gr-menu-dropdown dropdown-menu dropdown-left"
                          aria-labelledby="navbarDropdown25g"
                        >
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
                        <a
                          className="dropdown-toggle gr-toggle-arrow"
                          id="navbarDropdown242"
                          href="http://localhost:3000/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Search Pages
                          <i className="icon icon-small-down"></i>
                        </a>
                        <ul
                          className="gr-menu-dropdown dropdown-menu dropdown-left"
                          aria-labelledby="navbarDropdown242"
                        >
                          <li className="drop-menu-item">
                            <a href="search-grid.html">Search Grid</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="search-list-1.html">Search List 01</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="search-list-2.html">Search List 02</a>
                          </li>
                        </ul>
                      </li>
                      <li className="drop-menu-item">
                        <a href="company-profile.html">Company Profile</a>
                      </li>
                      <li className="drop-menu-item dropdown">
                        <a
                          className="dropdown-toggle gr-toggle-arrow"
                          id="navbarDropdown242"
                          href="http://localhost:3000/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Account
                          <i className="icon icon-small-down"></i>
                        </a>
                        <ul
                          className="gr-menu-dropdown dropdown-menu dropdown-left"
                          aria-labelledby="navbarDropdown242"
                        >
                          <li className="drop-menu-item">
                            <a
                              href="javacript:"
                              data-toggle="modal"
                              data-target="#login"
                            >
                              Sign In
                            </a>
                          </li>
                          <li className="drop-menu-item">
                            <a
                              href="javacript:"
                              data-toggle="modal"
                              data-target="#signup"
                            >
                              Sign Up
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="drop-menu-item dropdown">
                        <a
                          className="dropdown-toggle gr-toggle-arrow"
                          id="navbarDropdown26"
                          href="http://localhost:3000/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Essential
                          <i className="icon icon-small-down"></i>
                        </a>
                        <ul
                          className="gr-menu-dropdown dropdown-menu dropdown-left"
                          aria-labelledby="navbarDropdown26"
                        >
                          <li className="drop-menu-item">
                            <a href="faq.html">Faq</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="error-404.html">404</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="pricing-page.html">Pricing page</a>
                          </li>
                          <li className="drop-menu-item">
                            <a href="contact.html">Contact</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/">
                      Support
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
              <a
                className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                href="javacript:"
                data-toggle="modal"
                data-target="#login"
              >
                Log in
              </a>
              <a
                className="btn btn-primary text-uppercase font-size-3"
                href="javacript:"
                data-toggle="modal"
                data-target="#signup"
              >
                Sign up
              </a>
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
      {/* <!-- navbar- --> */}

      {/* <!-- Hero Area --> */}
      <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
        <div className="pos-abs-tr h-100">
          <img
            src="image/patterns/globe-pattern.png"
            alt=""
            className="h-100"
          />
        </div>
        <div className="container position-static">
          <div className="row position-relative align-items-center position-static">
            {/* <div className="col-xxl-7 col-xl-8 col-lg-9 pt-lg-23 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20" data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
                                <div className="row">
                                <div className="col-xxl-8 col-xl-7 col-md-8 col-sm-10">
                                    <div className="text-primary font-size-5 font-weight-semibold mb-7">
                                    #4923 jobs are available right now
                                    </div>
                                    <h1 className="font-size-11 mb-9 text-black-2">Find the most exciting jobs.</h1>
                                    <p className="font-size-5">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative to</p>
                                </div>
                                </div>
                            </div> */}
            {/* <!-- Hero Form --> */}
            <div className="col-lg-12 col-12 translateY-25 pt-lg-23 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
              <form
                action="http://localhost:3000/"
                className="search-form"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="filter-search-form-2 bg-white rounded-lg shadow-7 pr-10 py-7 pl-10">
                  <div className="filter-inputs">
                    <div className="form-group position-relative">
                      <input
                        className="form-control focus-reset pl-13"
                        type="text"
                        id="keyword"
                        placeholder="Type Job title, keywords"
                      />
                      <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                        <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                      </span>
                    </div>
                    {/* <!-- .select-city starts --> */}
                    <div className="form-group position-relative">
                      <select
                        name="country"
                        id="country"
                        className="nice-select pl-13 h-100 arrow-3 font-size-4"
                      >
                        <option data-display="City, state, zip code or (Remote)">
                          City
                        </option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                      <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                        <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                      </span>
                    </div>
                    {/* <!-- ./select-city ends --> */}
                  </div>
                  <div className="button-block">
                    <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- End Hero Form --> */}
          </div>
        </div>
      </div>
      {/* <!-- Hero Area --> */}
    </div>
  );
}
export default AllComponents;
