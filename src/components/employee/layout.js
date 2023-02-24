import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "./home";
import JobDetails from "./JobDetails";
import JobApplied from "./jobApplied";
import UserProfile from "../employee/profile/userProfile";
import RecommendedJobs from "./recommendedJobs";
import EmployerHomePage from "../employer/home";
import JobSearch from "./search";
import CompanyProfile from "../employer/company profile/companyProfile";
import ManageJobs from "../employer/manageJobs/manageJobs";
import EmployeeSearch from "../employer/employeeSearch";
import Response from "../employer/response";
const EmployeeLayout = () => {
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
      </Routes>
    </BrowserRouter>
  );
};

export default EmployeeLayout;
