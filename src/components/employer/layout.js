import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployerHomePage from "./home";
import CompanyProfile from "./company profile/companyProfile";
import EmployeeSearch from "./employeeSearch";

const EmployerLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployerHomePage />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/employeesearch" element={<EmployeeSearch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployerLayout;
