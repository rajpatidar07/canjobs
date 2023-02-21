import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployerHomePage from "./home";
import CompanyProfile from "./companyProfile";

const EmployerLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployerHomePage />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmployerLayout;
