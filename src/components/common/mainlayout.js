import React from "react";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";

import EmployerHome from "../company/home";
import CompanyProfile from "../company/profile";
import ManageJobs from "../company/manageJob";
import Response from "../company/response";
import EmployeeHomePage from "../user/home";
import JobDetail from "../user/jobdetail";
import JobSearch from "../user/jobs";
import UserProfile from "../user/profile";
import AdminDashboard from "../admin/dashboard";
import Job from "../admin/job";
import Category from "../admin/category";
import Employee from "../admin/employee";
import Employer from "../admin/employer";
import EmployeeSearch from "../company/employeeSearch";
import ManageAdmin from "../admin/manageadmin";
import Followup from "../admin/followup";
import AdminLoginFrom from "../admin/login";
import FilterList from "../admin/filterList";
import ResumeGrerator from "../admin/Resume";
import ManageInterview from "../admin/interview";
import JobResponse from "../admin/response";
import NotFound from "./notfound";
function CurrentRoute() {
  const location = useLocation();
  const path = location.pathname;

  // Use the path variable in your component
  return path;
}
function MainLayout() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const pathname = <CurrentRoute />;
  // console.log("MyComponent" + JSON.stringify(pathname));
  return (
    <BrowserRouter>
      {/* <CurrentRoute /> */}
      <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobdetail" element={<JobDetail />} />
        {userType === "employee" && token !== ("" || null || undefined) ? (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {/* Employer */}
        {userType === "employer" && token !== ("" || null || undefined) ? (
          <>
            <Route path="/company" element={<EmployerHome />} />
            <Route path="/companyprofile" element={<CompanyProfile />} />
            <Route path="/managejobs" element={<ManageJobs />} />
            <Route path="/response" element={<Response />} />
            <Route path="/empsearch" element={<EmployeeSearch />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLoginFrom />} />
        {userType === "admin" && token !== ("" || null || undefined) ? (
          <>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/job" element={<Job />} />
            <Route path="/category" element={<Category />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/adminprofile" element={<ManageAdmin />} />
            <Route path="/followup" element={<Followup />} />
            <Route path="/filter" element={<FilterList />} />
            <Route path="/interview" element={<ManageInterview />} />
            <Route path="/responses" element={<JobResponse />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;
