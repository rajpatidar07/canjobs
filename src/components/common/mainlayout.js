import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import EmployerHome from "../company/home";
import CompanyProfile from "../company/profile";
import ManageJobs from "../company/manageJob";
import Response from "../company/response";
import EmployeeHomePage from "../user/home";
import JobDetail from "../user/jobdetail";
import JobSearch from "../user/jobs";
import UserProfile from "../user/profile";
import AdminDashboard from "../admin/dashboard";
import Job from "../admin/job";
import Category from "../admin/category";
import Employee from "../admin/employee";
import Employer from "../admin/employer";
import EmployeeSearch from "../company/employeeSearch";
import ManageAdmin from "../admin/manageadmin";
import Followup from "../admin/followup";
import AdminLoginFrom from "../admin/login";
import FilterList from "../admin/filterList";
import ResumeGrerator from "../admin/Resume";
import ManageInterview from "../admin/interview";
import JobResponse from "../admin/response";
import PrivateRoute from "./privateRoute";
function MainLayout() {
  // const [adminLoggedIn, setAdminLoggedIn] = useState("");
  // const isAuthenticated = true; // replace with your authentication logic
  // const userType = "admin"; // replace with the user type of the current user
  // console.log(adminLoggedIn, "adminLoggedIn");
  // useEffect(() => {
  //   setAdminLoggedIn(localStorage.getItem("token"));
  // }, []);
  // const authUserToken = localStorage.getItem("token");
  // const authUser = localStorage.getItem("userType");
  // console.log(authUser, "Auth ------------", authUserToken);
  // const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  //   return isAuthenticated ? <Outlet /> : <AdminLoginFrom />;
  // };
  const isAuthenticated = true; // replace with your authentication logic
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Employee */}
          {/* <Route path="/" element={<EmployeeHomePage />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/jobdetail" element={<JobDetail />} />
          <Route path="/profile" element={<UserProfile />} /> */}
          {/* Employer */}
          {/* <Route path="/company" element={<EmployerHome />} />
          <Route path="/companyprofile" element={<CompanyProfile />} />
          <Route path="/managejobs" element={<ManageJobs />} />
          <Route path="/response" element={<Response />} />
          <Route path="/empsearch" element={<EmployeeSearch />} /> */}
          {/* <Route path="/employerhome" element={<EmployerHomePage/>} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/managejobs" element={<ManageJobs />} />
        <Route path="/response" element={<Response />} /> */}
          {/* Admin */}
          {/* <Route>
            <AdminLoginFrom setAdminLoggedIn={setAdminLoggedIn} />

            <PrivateRout>
              <AdminDashboard />
            </PrivateRout>
          </Route> */}
          {/* <Route exact path="/dashboard">
            {adminLoggedIn ? <AdminDashboard /> : <AdminLoginFrom />}
          </Route> */}
          {/* <Route exact path="/job">
            {adminLoggedIn ? <Job /> : <AdminLoginFrom />}
          </Route> */}
          {/* <Route exact path="/category">
            {adminLoggedIn ? <Category /> : <AdminLoginFrom />}
          </Route>
          <Route exact path="/employee">
            {adminLoggedIn ? <Employee /> : <AdminLoginFrom />}
          </Route>
          <Route exact path="/employer">
            {adminLoggedIn ? <Employer /> : <AdminLoginFrom />}
          </Route>
          <Route exact path="/adminprofile">
            {adminLoggedIn ? <ManageAdmin /> : <AdminLoginFrom />}
          </Route>
          <Route exact path="/interview">
            {adminLoggedIn ? <ManageInterview /> : <AdminLoginFrom />}
          </Route>
          <Route exact path="/responses">
            {adminLoggedIn ? <JobResponse /> : <AdminLoginFrom />}
          </Route>
          <Route exact path="/resume/:id">
            {adminLoggedIn ? <ResumeGrerator /> : <AdminLoginFrom />}
          </Route> */}
          {/* {adminLoggedIn === null ||
          adminLoggedIn === "" ||
          adminLoggedIn === undefined ||
          adminLoggedIn === false ? ( */}
          {/* ) : ( */}
          {/* <Route path={"/dashboard"} element={<AdminDashboard />} /> */}
          {/* )} */}
          {/* <PrivateRoute
            path="/dashboard"
            element={<AdminDashboard />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />
          <PrivateRoute
            path="/job"
            element={<Job />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/category"
            element={<Category />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/employee"
            element={<Employee />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/employer"
            element={<Employer />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/filterlist"
            element={<FilterList />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/followup"
            element={<Followup />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/interview"
            element={<ManageInterview />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/adminprofile"
            element={<ManageAdmin />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/responses"
            element={<JobResponse />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          />{" "}
          <PrivateRoute
            path="/resume/:id"
            element={<ResumeGrerator />}
            isAuthenticated={isAuthenticated}
            userType={userType}
          /> */}
          {/* <Route path="/adminlogin" element={<AdminLoginFrom />} />
          <PrivateRoute
            path="/dashboard"
            element={<AdminDashboard />}
            isAuthenticated={isAuthenticated}
          /> */}
          {/* <Route path="/adminlogin" element={<AdminLoginFrom />} />
          <Route path="/job" element={<Job />} />
          <Route path="/category" element={<Category />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employer" element={<Employer />} />
          <Route path="/adminprofile" element={<ManageAdmin />} />
          <Route path="/followup" element={<Followup />} />
          <Route path="/filter" element={<FilterList />} />
          <Route path="/adminlogin" element={<AdminLoginFrom />} />
          <Route path="/interview" element={<ManageInterview />} />
          <Route path="/responses" element={<JobResponse />} />
          <Route path="/resume/:id" element={<ResumeGrerator />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainLayout;
