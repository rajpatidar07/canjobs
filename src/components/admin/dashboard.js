import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

const AdminDashboard = () => {
    return (
        <div class="site-wrapper overflow-hidden bg-default-2">
            {/* <!-- Header Area --> */}
            <AdminHeader />
            {/* <!-- navbar- --> */}
            <AdminSidebar />
            <a class="sidebar-mobile-button" data-toggle="collapse" href="#sidebar" role="button" aria-expanded="false" aria-controls="sidebar">
                <i class="icon icon-sidebar-2"></i>
            </a>
            <div class="dashboard-main-container mt-25 mt-lg-22" id="dashboard-body">
                <div class="container">
                    <div class="row mb-7">
                        <div class="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <a href="#" class="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                                <div class="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i class="fas fa-briefcase"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div class="">
                                    <h5 class="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1"><span class="counter">05</span></h5>
                                    <p class="font-size-4 font-weight-normal text-gray mb-0">Posted Jobs</p>
                                </div>
                            </a>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <a href="#" class="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                                <div class="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                                    <i class="fas fa-user"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div class="">
                                    <h5 class="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1"><span class="counter">256</span></h5>
                                    <p class="font-size-4 font-weight-normal text-gray mb-0">Total Applicants</p>
                                </div>
                            </a>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <a href="#" class="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                                <div class="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                                    <i class="fas fa-eye"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div class="">
                                    <h5 class="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1"><span class="counter">16.5</span>K</h5>
                                    <p class="font-size-4 font-weight-normal text-gray mb-0">Jobs View</p>
                                </div>
                            </a>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <a href="#" class="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                                <div class="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i class="fas fa-mouse-pointer"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div class="">
                                    <h5 class="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1"><span class="counter">18.6</span>%</h5>
                                    <p class="font-size-4 font-weight-normal text-gray mb-0">Applied Rate</p>
                                </div>
                            </a>
                            {/* <!-- End Single Category --> */}
                        </div>
                    </div>
                    <div class="mb-14">
                        <div class="row mb-11 align-items-center">
                            <div class="col-lg-6 mb-lg-0 mb-4">
                                <h3 class="font-size-6 mb-0">Applicants List (12)</h3>
                            </div>
                            <div class="col-lg-6">
                                <div class="d-flex flex-wrap align-items-center justify-content-lg-end">
                                    <p class="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                                    <div class="h-px-48">
                                        <select name="country" id="country" class="nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2">
                                            <option value="" data-display="Product Designer">Product Designer</option>
                                            <option value="">Graphics Designer</option>
                                            <option value="">Web Deverloper</option>
                                            <option value="">Front End Developer</option>
                                            <option value="">Backend Developer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="pl-0  border-0 font-size-4 font-weight-normal">Name</th>
                                            <th scope="col" class="border-0 font-size-4 font-weight-normal">Applied as</th>
                                            <th scope="col" class="border-0 font-size-4 font-weight-normal">Applied on</th>
                                            <th scope="col" class="border-0 font-size-4 font-weight-normal"></th>
                                            <th scope="col" class="border-0 font-size-4 font-weight-normal"></th>
                                            <th scope="col" class="border-0 font-size-4 font-weight-normal"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 pr-0">
                                                <a href="candidate-profile.html" class="media min-width-px-235 align-items-center">
                                                    <div class="circle-36 mr-6">
                                                        <img src="image/table-one-profile-image-1.png" alt="" class="w-100" />
                                                    </div>
                                                    <h4 class="font-size-4 mb-0 font-weight-semibold text-black-2">Nicolas Bradley</h4>
                                                </a>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-235 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Senior Project Manager</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">12 July, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <div class=""><a href="javacript:" class="font-size-3 font-weight-bold text-black-2 text-uppercase" data-toggle="modal" data-target="#employe-profile">View Application</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-110 pr-0">
                                                <div class=""><a href="contact.html" class="font-size-3 font-weight-bold text-green text-uppercase">Contact</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100 pr-0">
                                                <div class=""><a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Reject</a></div>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 pr-0">
                                                <a href="candidate-profile.html" class="media min-width-px-235 align-items-center">
                                                    <div class="circle-36 mr-6">
                                                        <img src="image/table-one-profile-image-2.png" alt="" class="w-100" />
                                                    </div>
                                                    <h4 class="font-size-4 mb-0 font-weight-semibold text-black-2">Elizabeth Gomez</h4>
                                                </a>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-235 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Senior Project Manager</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">14 July, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <div class=""><a href="javacript:" class="font-size-3 font-weight-bold text-black-2 text-uppercase" data-toggle="modal" data-target="#employe-profile">View Application</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-110 pr-0">
                                                <div class=""><a href="contact.html" class="font-size-3 font-weight-bold text-green text-uppercase">Contact</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100 pr-0">
                                                <div class=""><a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Reject</a></div>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 pr-0">
                                                <a href="candidate-profile.html" class="media min-width-px-235 align-items-center">
                                                    <div class="circle-36 mr-6">
                                                        <img src="image/table-one-profile-image-3.png" alt="" class="w-100" />
                                                    </div>
                                                    <h4 class="font-size-4 mb-0 font-weight-semibold text-black-2">Joe Wade</h4>
                                                </a>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-235 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Head of Marketing</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">14 July, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <div class=""><a href="javacript:" class="font-size-3 font-weight-bold text-black-2 text-uppercase" data-toggle="modal" data-target="#employe-profile">View Application</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-110 pr-0">
                                                <div class=""><a href="contact.html" class="font-size-3 font-weight-bold text-green text-uppercase">Contact</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100 pr-0">
                                                <div class=""><a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Reject</a></div>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 pr-0">
                                                <a href="candidate-profile.html" class="media min-width-px-235 align-items-center">
                                                    <div class="circle-36 mr-6">
                                                        <img src="image/table-one-profile-image-4.png" alt="" class="w-100" />
                                                    </div>
                                                    <h4 class="font-size-4 mb-0 font-weight-semibold text-black-2">Roger Hawkins</h4>
                                                </a>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-235 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">UI Designer</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">16 July, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <div class=""><a href="javacript:" class="font-size-3 font-weight-bold text-black-2 text-uppercase" data-toggle="modal" data-target="#employe-profile">View Application</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-110 pr-0">
                                                <div class=""><a href="contact.html" class="font-size-3 font-weight-bold text-green text-uppercase">Contact</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100 pr-0">
                                                <div class=""><a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Reject</a></div>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 pr-0">
                                                <a href="candidate-profile.html" class="media min-width-px-235 align-items-center">
                                                    <div class="circle-36 mr-6">
                                                        <img src="image/table-one-profile-image-5.png" alt="" class="w-100" />
                                                    </div>
                                                    <h4 class="font-size-4 mb-0 font-weight-semibold text-black-2">Marie Green</h4>
                                                </a>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-235 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Senior Project Manager</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">21 July, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-170 pr-0">
                                                <div class=""><a href="javacript:" class="font-size-3 font-weight-bold text-black-2 text-uppercase" data-toggle="modal" data-target="#employe-profile">View Application</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-110 pr-0">
                                                <div class=""><a href="contact.html" class="font-size-3 font-weight-bold text-green text-uppercase">Contact</a></div>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100 pr-0">
                                                <div class=""><a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Reject</a></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pt-2">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination pagination-hover-primary rounded-0 ml-n2">
                                        <li class="page-item rounded-0 flex-all-center">
                                            <a class="page-link rounded-0 border-0 px-3active" href="#" aria-label="Previous">
                                                <i class="fas fa-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link border-0 font-size-4 font-weight-semibold px-3" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link border-0 font-size-4 font-weight-semibold px-3" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link border-0 font-size-4 font-weight-semibold px-3" href="#">3</a></li>
                                        <li class="page-item disabled"><a class="page-link border-0 font-size-4 font-weight-semibold px-3" href="#">...</a></li>
                                        <li class="page-item "><a class="page-link border-0 font-size-4 font-weight-semibold px-3" href="#">7</a></li>
                                        <li class="page-item rounded-0 flex-all-center">
                                            <a class="page-link rounded-0 border-0 px-3" href="#" aria-label="Next">
                                                <i class="fas fa-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="mb-18">
                        <div class="row mb-11 align-items-center">
                            <div class="col-lg-6 mb-lg-0 mb-4">
                                <h3 class="font-size-6 mb-0">Posted Jobs (4)</h3>
                            </div>
                            <div class="col-lg-6">
                                <div class="d-flex flex-wrap align-items-center justify-content-lg-end">
                                    <p class="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                                    <div class="h-px-48">
                                        <select name="country" id="country" class="nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2">
                                            <option value="" data-display="Product Designer">Full-Time</option>
                                            <option value="">Part Time</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                            <div class="table-responsive ">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="pl-0 border-0 font-size-4 font-weight-normal">Name</th>
                                            <th scope="col" class="pl-4 border-0 font-size-4 font-weight-normal">Job Type</th>
                                            <th scope="col" class="pl-4 border-0 font-size-4 font-weight-normal">City</th>
                                            <th scope="col" class="pl-4 border-0 font-size-4 font-weight-normal">Created on</th>
                                            <th scope="col" class="pl-4 border-0 font-size-4 font-weight-normal">Total Applicants</th>
                                            <th scope="col" class="pl-4 border-0 font-size-4 font-weight-normal"></th>
                                            <th scope="col" class="pl-4 border-0 font-size-4 font-weight-normal"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 min-width-px-235">
                                                <div class="">
                                                    <a href="jobdetails.html" class="font-size-4 mb-0 font-weight-semibold text-black-2">Senior Project Manager</a>
                                                </div>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-135">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Full-Time</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-125">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">New York</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-155">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">12 July, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-205">
                                                <h3 class="font-size-4 font-weight-bold text-black-2 mb-0">47</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-80">
                                                <a href="#" class="font-size-3 font-weight-bold text-green text-uppercase">Edit</a>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100">
                                                <a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Delete</a>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 min-width-px-235">
                                                <div class="">
                                                    <a href="jobdetails.html" class="font-size-4 mb-0 font-weight-semibold text-black-2">UI Designer</a>
                                                </div>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-135">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Full-Time</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-125">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Remote</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-155">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">24 June, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-205">
                                                <h3 class="font-size-4 font-weight-bold text-black-2 mb-0">145</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-80">
                                                <a href="#" class="font-size-3 font-weight-bold text-green text-uppercase">Edit</a>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100">
                                                <a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Delete</a>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 min-width-px-235">
                                                <div class="">
                                                    <a href="jobdetails.html" class="font-size-4 mb-0 font-weight-semibold text-black-2">Head of Marketing</a>
                                                </div>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-135">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Full-Time</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-125">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">London</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-155">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">15 June, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-205">
                                                <h3 class="font-size-4 font-weight-bold text-black-2 mb-0">62</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-80">
                                                <a href="#" class="font-size-3 font-weight-bold text-green text-uppercase">Edit</a>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100">
                                                <a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Delete</a>
                                            </td>
                                        </tr>
                                        <tr class="border border-color-2">
                                            <th scope="row" class="pl-6 border-0 py-7 min-width-px-235">
                                                <div class="">
                                                    <a href="jobdetails.html" class="font-size-4 mb-0 font-weight-semibold text-black-2">Full-Stack Developer</a>
                                                </div>
                                            </th>
                                            <td class="table-y-middle py-7 min-width-px-135">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">Part-Time</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-125">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">California</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-155">
                                                <h3 class="font-size-4 font-weight-normal text-black-2 mb-0">29 May, 2020</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-205">
                                                <h3 class="font-size-4 font-weight-bold text-black-2 mb-0">184</h3>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-80">
                                                <a href="#" class="font-size-3 font-weight-bold text-green text-uppercase">Edit</a>
                                            </td>
                                            <td class="table-y-middle py-7 min-width-px-100">
                                                <a href="#" class="font-size-3 font-weight-bold text-red-2 text-uppercase">Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminDashboard;
