import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from "./home";
import JobSearchPage from "./jobsearch";
import Login from "./login";

const EmployeeLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/search" element={<JobSearchPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployeeLayout;
