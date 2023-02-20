
import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from './home';
import JobSearchPage from './jobsearch';


const EmployeeLayout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EmployeeHomePage />} />
                <Route path="/search" element={<JobSearchPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default EmployeeLayout;
