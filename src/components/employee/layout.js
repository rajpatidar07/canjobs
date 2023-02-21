import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "./home";
import JobSearchPage from "./jobsearch";
import JobDetails from "./JobDetails";

const EmployeeLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/search" element={<JobSearchPage />} />
        <Route path="/jobdetails" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployeeLayout;
