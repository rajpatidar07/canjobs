import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "./home";
import JobSearchPage from "./jobsearch";
import JobDetails from "./JobDetails";
import JobApplied from "./jobApplied";

const EmployeeLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/search" element={<JobSearchPage />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/jobapplied" element={<JobApplied />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployeeLayout;
