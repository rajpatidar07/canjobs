import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
<<<<<<< HEAD
import EmployeeHomePage from "./home";
import JobSearchPage from "./jobsearch";
import JobDetails from "./JobDetails";
import JobApplied from "./jobApplied";
import UserProfile from "../employee/profile/userProfile";
import RecommendedJobs from "./recommendedJobs";

const EmployeeLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/search" element={<JobSearchPage />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/jobapplied" element={<JobApplied />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/recommendedjobs" element={<RecommendedJobs />} />
      </Routes>
    </BrowserRouter>
  );
};
=======
import EmployeeHomePage from './home';
import JobSearchPage from './jobsearch';
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
>>>>>>> f8d985ae0ec1e29e1118db760650a970d7ae7f9d

export default EmployeeLayout;
