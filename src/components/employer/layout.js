import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployerHomePage from "./home";
import CompanyProfile from "./company profile/companyProfile";
import EmployeeSearch from "./employeeSearch";
import ManageJobs from "./manageJobs/manageJobs";

const EmployerLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployerHomePage />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/employeesearch" element={<EmployeeSearch />} />
        <Route path="/managejobs" element={<ManageJobs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployerLayout;
