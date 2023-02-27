import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "./home";
import JobDetails from "./JobDetails";
import JobApplied from "./jobApplied";
import UserProfile from "../employee/profile/profile";
import RecommendedJobs from "./recommendedJobs";
import JobSearch from "./search";
const EmployeeLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path="/jobapplied" element={<JobApplied />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/recommendedjobs" element={<RecommendedJobs />} />
        <Route path="/jobdetails" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployeeLayout;
