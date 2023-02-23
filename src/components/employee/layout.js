
import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EmployeeHomePage from './home';
// import JobSearchPage from './jobsearch';
import JobSearch from './search';


const EmployeeLayout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EmployeeHomePage />} />
                <Route path="/search" element={<JobSearch />} />
            </Routes>
        </BrowserRouter>
    )
}

export default EmployeeLayout;
