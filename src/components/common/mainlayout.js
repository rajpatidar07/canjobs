import React, { useState } from "react";
import {
  Route,
  BrowserRouter,
  Routes, useParams /*, useLocation */,
} from "react-router-dom";
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
import NotFound from "./notfound";
import ResetPassword from "./resetPassword";
import EmailTemplate from "../admin/email";
import Loader from "../common/loader";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Visa from "../admin/visa";
import Document from "../admin/document";
import EmployerLMIA from "../company/lmia";
import SelfApplicat from "../admin/selfApplicat";
import SelfJob from "../admin/selfJob";
import LimaContainer from "../admin/lmiaContainer";
import NewUserProfile from "../user/user_profile";
import CompanyProfileDetail from "../company/company_profile";
import JobDetailpageAdmim from "../admin/job_Detail_page";
import PDFViewer from "../user/user_pdf";
import JobAssignedDashboard from "../admin/jobAssignedDashboard";
import RazorPay from "./payButton";
import Agent from "../admin/agent";
import Notes from "../admin/notes";
import AgentLogin from "../agent/agentLogin";
import MainEmailPage from "../email/mainemailPage";
import SinUpPage from "../user/sinUpPage";
import CandidateLoginForm from "../user/candidate_login";
import CandidateSignup from "../user/candidate_signup";
import CompanyLoginForm from "../company/company_login";
import CompanySingupForm from "../company/company_singup";
import GoogleDrive from "./googleDrive";
import Anotation from "./anotation";
import BusinessVIsa from "../admin/businessVisa";
import ExpressEntry from "../admin/expressEntry";
import VisitorVisa from "../admin/visitorVisa";
import Pnp from "../admin/pnp";
import PartnerDashboard from "./partner_dashboard";
import ActivityLog from "./activity_log";
import Credentional from "../admin/Credentional";
import AsiignedAdmin from "./asiigned_admin";
import Federalpr from "../admin/federalpr";
import PartnerDetails from "../agent/partnerDetails";
import SharePointDocument from "./Document folder/SharePointDocument";
import Newpdf from "./Adobe/newpdf";
import AgreementOne from "./Retaineragreement/AgreementOne";
import SignaturePadComponent from "./Retaineragreement/SignaturePadComponent";
import HtmlAgreementOne from "./Retaineragreement/Html/HtmlAgreementOne";
import WebhookComponent from "./webHook";
import { ToastContainer } from "react-toastify";
import UserSigningPage from "./Retaineragreement/UserSigningPage";
import AboutUs from "../user/AboutUs";
import LocalCandidate from "../admin/localCandidate";
import PGWP from "../admin/pgwp";
import DemoJob from "../user/demoJob";
import StudyPermit from "../admin/studyPermit";
// import PreviewEmail from "../email/emailPreview";
// function CurrentRoute() {
//   const location = useLocation();
//   const path = location.pathname;
//   // Use the path variable in your component
//   return path;
// }
function MainLayout() {
  const [loginCondition, setLoginCondition] = useState(false)
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  // let adminType = localStorage.getItem("admin_type");
  /*FUnction to check the employee profile with just its id  */
  const ValidateRoute = () => {
    const { eid } = useParams();
    const isValidEid = /^\d+$/.test(eid); // Check if eid is a number
    const userType = localStorage.getItem('userType'); // Assuming userType is stored in localStorage
    const employeeId = localStorage.getItem('employee_id'); // Assuming employee_id is stored in localStorage

    if (userType === "user" && eid === employeeId && isValidEid) {
      return <NewUserProfile setLoginCondition={setLoginCondition} />;
    } else if (isValidEid && userType !== "user") {
      return <NewUserProfile />;
    } else {
      return <NotFound userType={userType} />;
    }
  };
  return (
    <BrowserRouter>
        <ToastContainer/>
      {/* <CurrentRoute /> */}
      <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/signup" element={<SinUpPage />} />
        <Route path="/candidate_login" element={<CandidateLoginForm setLoginCondition={setLoginCondition} />} />
        <Route path="/candidate_signup" element={<CandidateSignup />} />
        <Route path="/client_login" element={<CompanyLoginForm setLoginCondition={setLoginCondition} />} />
        <Route path="/client_singup" element={<CompanySingupForm />} />
        <Route path="/rozarepay" element={<RazorPay />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobdetail" element={<JobDetail />} />
        <Route path="/outside_booking" element={<WebhookComponent />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        <Route exact path="/linkedin" component={LinkedInCallback} />
        <Route exact path="/signagreement" element={<UserSigningPage/>} />
        <Route path="/agreeone" element={<AgreementOne />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/demojob" element={<DemoJob />} />
        
        {/* <Route path="*" element={<NotFound userType={userType}/>} /> */}
        {(userType === "user" && (token !== "" ||
          token !== null ||
          token !== undefined ||
          token !== "null" ||
          token !== "undefined")) ? (
          <>
            <Route path="/" element={<EmployeeHomePage setLoginCondition={setLoginCondition} />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/:eid" element={<NewUserProfile />} /> */}
            <Route path="/:eid" element={<ValidateRoute />} />
            <Route path="*" element={<NotFound userType={userType} />} />
            <Route path="/job_detail" element={<JobDetailpageAdmim />} />
            <Route path="/client_detail" element={<CompanyProfileDetail />} />
            <Route path="/userpdf" element={<PDFViewer />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            {/* <Route path="*" element={<NotFound userType={userType}/>} /> */}
          </>
        )}
        {/* Employer */}
        {(userType === "company" && (token !== "" ||
          token !== null ||
          token !== undefined ||
          token !== "null" ||
          token !== "undefined")) ? (
          <>
            <Route path="/client" element={<EmployerHome setLoginCondition={setLoginCondition} />} />
            <Route path="/clientprofile" element={<CompanyProfile />} />
            <Route path="/managejobs" element={<ManageJobs />} />
            <Route path="/response" element={<Response />} />
            <Route path="/empsearch" element={<EmployeeSearch />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/lmia_dashboard" element={<EmployerLMIA />} /> */}
            <Route path="/lmia" element={<LimaContainer />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            <Route path="*" element={<NotFound userType={userType} />} />
            <Route path="/job_detail" element={<JobDetailpageAdmim />} />
            <Route path="/userpdf" element={<PDFViewer />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            {/* <Route path="*" element={<NotFound userType={userType}/>} /> */}
          </>
        )}
         {/* Agent */}
         <Route path="/partnerlogin" element={<AgentLogin setLoginCondition={setLoginCondition} />} />
        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLoginFrom setLoginCondition={setLoginCondition} />} />
        {(userType === "company" ||
          userType === "user" ||
          userType === "" ||
          userType === null ||
          userType === "null") && (token === "" ||
            token === null ||
            token === undefined ||
            token === "null") ? (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            {/* <Route path="*" element={<NotFound userType={userType}/>} /> */}
          </>
        ) : (
          <>
            {userType !== "admin" || userType === ""}
            <Route path="/dashboard" element={<AdminDashboard setLoginCondition={setLoginCondition} />} />
            <Route path="/job" element={<Job />} />
            <Route path="/selfjob" element={<SelfJob />} />
            <Route path="/category" element={<Category />} />
            <Route path="/lmia" element={<LimaContainer />} />
            <Route path="/visa" element={<Visa />} />
            <Route path="/document" element={<Document />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/selfemployee" element={<SelfApplicat />} />
            <Route path="/adminclient" element={<Employer />} />
            <Route path="/adminprofile" element={<ManageAdmin />} />
            <Route path="/assignedjobs" element={<JobAssignedDashboard />} />
            {/* <Route path="/:eid" element={<NewUserProfile />} /> */}
            <Route path="/:eid" element={<ValidateRoute />} />
            <Route path="/userpdf" element={<PDFViewer />} />
            <Route path="/sharepoint_document" element={<SharePointDocument />} />
            <Route path="/job_detail" element={<JobDetailpageAdmim />} />
            <Route path="/client_detail" element={<CompanyProfileDetail />} />
            <Route path="/partner_profile" element={<PartnerDetails setLoginCondition={setLoginCondition} />} />
            <Route path="/followup" element={<Followup />} />
            <Route path="/partner" element={<Agent />} />
            <Route path="/partner_dashboard" element={<PartnerDashboard />} />
            
            <Route path="/agreepreivew" element={<HtmlAgreementOne />} />
            <Route path="/addsign" element={<SignaturePadComponent />} />
            <Route path="/assigned_admin" element={<AsiignedAdmin />} />
            <Route path="/activity_log" element={<ActivityLog />} />
            <Route path="/filter" element={<FilterList />} />
            <Route path="/interview" element={<ManageInterview />} />
            <Route path="/responses" element={<JobResponse />} />
            <Route path="/lmia_dashboard" element={<EmployerLMIA />} />
            <Route path="/emailtemplate" element={<EmailTemplate />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/credentials" element={<Credentional />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            {/* <Route path="/emailpreview" element={<PreviewEmail />} /> */}
            <Route path="/email" element={<MainEmailPage />} />
            <Route path="*" element={<NotFound userType={userType} />} />
            <Route path="/googledrive" element={<GoogleDrive />} />
            <Route path="/anotation" element={<Anotation />} />
            <Route path="/businessvisa" element={<BusinessVIsa />} />
            <Route path="/expressentry" element={<ExpressEntry />} />
            <Route path="/visitorsvisa" element={<VisitorVisa />} />
            <Route path="/studypermit" element={<StudyPermit />} />
            <Route path="/pnp" element={<Pnp />} />
            <Route path="/pgwp" element={<PGWP />} />
            <Route path="/localcandidates" element={<LocalCandidate />} />
            <Route path="/Newpdf" element={<Newpdf />} />
            <Route path="/federal_pr" element={<Federalpr />} />
            <Route path="*" element={<Loader load={"yes"} />} />
          </>
        )}
       
        {loginCondition === true ? null : <Route path="*" element={<NotFound userType={userType} />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;
