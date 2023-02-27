import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "../user/home";
import JobDetail from "../user/jobdetail";
import JobSearch from "../user/jobs";


function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobdetail" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;
