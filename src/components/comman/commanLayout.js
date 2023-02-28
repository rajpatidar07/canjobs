import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "../employee//home";
import JobDetails from "../employee/JobDetails";
import JobApplied from "../employee/jobApplied";
import UserProfile from "../employee/profile/profile";
import RecommendedJobs from "../employee/recommendedJobs";
import EmployerHomePage from "../employer/home";
import JobSearch from "../employee/search";
import CompanyProfile from "../employer/company_profile/companyProfile";
import ManageJobs from "../employer/manageJobs/manageJobs";
import EmployeeSearch from "../employer/employeeSearch";
import Response from "../employer/response";
import AdminDashboard from "../admin/dashboard";
import Job from "../admin/job";
import Category from "../admin/category";
import Profile from "../admin/profile";
import Employee from "../admin/employee";
import Employer from "../admin/employer";

function CommanLayout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/jobapplied" element={<JobApplied />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/recommendedjobs" element={<RecommendedJobs />} />
        {/* Employer */}
        <Route path="/employerhome" element={<EmployerHomePage />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/employeesearch" element={<EmployeeSearch />} />
        <Route path="/managejobs" element={<ManageJobs />} />
        <Route path="/response" element={<Response />} />
        {/* Admin */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/job" element={<Job />} />
        <Route path="/category" element={<Category />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/adminprofile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CommanLayout;
