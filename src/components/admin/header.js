import React from "react";

const AdminHeader = () => {
    return (
        <header class="site-header site-header--menu-right bg-default position-fixed py-7 py-xs-0 site-header--absolute">
            <div class="container-fluid-fluid px-10">
                <nav class="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
                    {/* <!-- Brand Logo--> */}
                    <div class="brand-logo">
                        <a href="index.html">
                            {/* <!-- light version logo (logo must be black)--> */}
                            <img src="image/logo-main-black.png" alt="" class="light-version-logo default-logo" />
                            {/* <!-- Dark version logo (logo must be White)--> */}
                            <img src="image/logo-main-white.png" alt="" class="dark-version-logo" />
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="mobile-menu">

                    </div>
                    <div class="header-btn-devider ml-auto ml-lg-5 pl-2 d-none d-xs-flex align-items-center">
                        <div>
                            <a href="http://localhost:3000/" class="px-3 ml-7 font-size-7 notification-block flex-y-center position-relative">
                                <i class="fas fa-bell heading-default-color"></i>
                                <span class="font-size-3 count font-weight-semibold text-white bg-primary circle-24 border border-width-3 border border-white">3</span>
                            </a>
                        </div>
                        <div>
                            <div class="dropdown show-gr-dropdown py-5">
                                <a class="proile media ml-7 flex-y-center" href="http://localhost:3000/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div class="circle-40">
                                        <img src="image/header-profile.png" alt="" />
                                    </div>
                                    <i class="fas fa-chevron-down heading-default-color ml-6"></i>
                                </a>
                                <div class="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default" aria-labelledby="dropdownMenuLink">
                                    <a class="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase" href="dashboard-settings.html">Settings </a>
                                    <a class="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase" href="candidate-profile-main.html">Edit Profile</a>
                                    <a class="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase" href="http://localhost:3000/">Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
export default AdminHeader;
