import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployerHome from "../company/home";
import CompanyProfile from "../company/profile";
import EmployeeHomePage from "../user/home";
import JobDetail from "../user/jobdetail";
import JobSearch from "../user/jobs";
import UserProfile from "../user/profile";


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

        <Route path="/employer" element={<EmployerHome />} />
        <Route path="/company" element={<CompanyProfile />} />


        {/* <Route path="/employerhome" element={<EmployerHomePage/>} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/employeesearch" element={<EmployeeSearch />} />
        <Route path="/managejobs" element={<ManageJobs />} />
        <Route path="/response" element={<Response />} /> */}

        {/* Admin */}

      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;
