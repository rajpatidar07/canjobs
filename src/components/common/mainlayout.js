import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
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

function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobdetail" element={<JobDetail />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Employer */}

        <Route path="/company" element={<EmployerHome />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/managejobs" element={<ManageJobs />} />
        <Route path="/response" element={<Response />} />
        <Route path="/empsearch" element={<EmployeeSearch />} />

        {/* <Route path="/employerhome" element={<EmployerHomePage/>} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/managejobs" element={<ManageJobs />} />
        <Route path="/response" element={<Response />} /> */}

        {/* Admin */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/job" element={<Job />} />
        <Route path="/category" element={<Category />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/adminprofile" element={<ManageAdmin />} />
        <Route path="/followup" element={<Followup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;
