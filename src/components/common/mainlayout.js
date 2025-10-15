import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  useParams,
  useNavigate,
  matchPath,
} from "react-router-dom";

// Non-lazy imports for critical components
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { ToastContainer } from "react-toastify";
import Loader from "../common/loader";

// Lazy load all route components for code splitting
const EmployerHome = lazy(() => import("../company/home"));
const CompanyProfile = lazy(() => import("../company/profile"));
const ManageJobs = lazy(() => import("../company/manageJob"));
const Response = lazy(() => import("../company/response"));
const EmployeeHomePage = lazy(() => import("../user/Home2"));
const JobDetail = lazy(() => import("../user/jobdetail"));
const JobSearch = lazy(() => import("../user/jobs"));
const UserProfile = lazy(() => import("../user/profile"));
const AdminDashboard = lazy(() => import("../admin/dashboard"));
const Job = lazy(() => import("../admin/job"));
const Category = lazy(() => import("../admin/category"));
const Employee = lazy(() => import("../admin/employee"));
const Employer = lazy(() => import("../admin/employer"));
const EmployeeSearch = lazy(() => import("../company/employeeSearch"));
const ManageAdmin = lazy(() => import("../admin/manageadmin"));
const Followup = lazy(() => import("../admin/followup"));
const AdminLoginFrom = lazy(() => import("../admin/login"));
const FilterList = lazy(() => import("../admin/filterList"));
const ResumeGrerator = lazy(() => import("../admin/Resume"));
const ManageInterview = lazy(() => import("../admin/interview"));
const JobResponse = lazy(() => import("../admin/response"));
const NotFound = lazy(() => import("./notfound"));
const ResetPassword = lazy(() => import("./resetPassword"));
const EmailTemplate = lazy(() => import("../admin/email"));

const Visa = lazy(() => import("../admin/visa"));
const Document = lazy(() => import("../admin/document"));
const EmployerLMIA = lazy(() => import("../company/lmia"));
const SelfApplicat = lazy(() => import("../admin/selfApplicat"));
const SelfJob = lazy(() => import("../admin/selfJob"));
const LimaContainer = lazy(() => import("../admin/lmiaContainer"));
const NewUserProfile = lazy(() => import("../user/user_profile"));
const CompanyProfileDetail = lazy(() => import("../company/company_profile"));
const JobDetailpageAdmim = lazy(() => import("../admin/job_Detail_page"));
const PDFViewer = lazy(() => import("../user/user_pdf"));
const JobAssignedDashboard = lazy(() => import("../admin/jobAssignedDashboard"));
const RazorPay = lazy(() => import("./payButton"));
const Agent = lazy(() => import("../admin/agent"));
const Notes = lazy(() => import("../admin/notes"));
const AgentLogin = lazy(() => import("../agent/agentLogin"));
const MainEmailPage = lazy(() => import("../email/mainemailPage"));
const SinUpPage = lazy(() => import("../user/sinUpPage"));
const CandidateLoginForm = lazy(() => import("../user/candidate_login"));
const CandidateSignup = lazy(() => import("../user/candidate_signup"));
const CompanyLoginForm = lazy(() => import("../company/company_login"));
const CompanySingupForm = lazy(() => import("../company/company_singup"));
const GoogleDrive = lazy(() => import("./googleDrive"));
const Anotation = lazy(() => import("./anotation"));
const BusinessVIsa = lazy(() => import("../admin/businessVisa"));
const ExpressEntry = lazy(() => import("../admin/expressEntry"));
const VisitorVisa = lazy(() => import("../admin/visitorVisa"));
const Pnp = lazy(() => import("../admin/pnp"));
const PartnerDashboard = lazy(() => import("./partner_dashboard"));
const ActivityLog = lazy(() => import("./activity_log"));
const Credentional = lazy(() => import("../admin/Credentional"));
const AsiignedAdmin = lazy(() => import("./asiigned_admin"));
const Federalpr = lazy(() => import("../admin/federalpr"));
const PartnerDetails = lazy(() => import("../agent/partnerDetails"));
const SharePointDocument = lazy(() => import("./Document folder/SharePointDocument"));
const Newpdf = lazy(() => import("./Adobe/newpdf"));
const ExpressEntryPdf = lazy(() => import("./Retaineragreement/Agreement native/ExpressEntryPdf"));
const SignaturePadComponent = lazy(() => import("./Retaineragreement/SignaturePadComponent"));
const ExpressEntryHtml = lazy(() => import("./Retaineragreement/Html/ExpressEntryHtml"));
const WebhookComponent = lazy(() => import("./webHook"));
const UserSigningPage = lazy(() => import("./Retaineragreement/UserSigningPage"));
const AboutUs = lazy(() => import("../user/AboutUs"));
const LocalCandidate = lazy(() => import("../admin/localCandidate"));
const PGWP = lazy(() => import("../admin/pgwp"));
const DemoJob = lazy(() => import("../user/demoJob"));
const StudyPermit = lazy(() => import("../admin/studyPermit"));
const ViewPdf = lazy(() => import("./Retaineragreement/viewPdf"));
const TemporaryResident = lazy(() => import("../admin/TemporaryResident"));
const EconomicImmigration = lazy(() => import("../admin/EcomonicImmigration"));
const FamilySponsorship = lazy(() => import("../admin/FamilySponsorship"));
const ManageTask = lazy(() => import("../admin/manageTask"));
const Humanitarian = lazy(() => import("../admin/humanitarian"));
const TypePassport = lazy(() => import("../admin/typePassport"));
const TypeCitizenship = lazy(() => import("../admin/typeCitizenship"));
const ParmanentResidentCard = lazy(() => import("../admin/ParmanentResidentCard"));
const StudyHome = lazy(() => import("../Study/StudyComman/studyHome"));
const StudentProfile = lazy(() => import("../Study/student/studentProfile"));
const StudentDocument = lazy(() => import("../Study/student/studentDocument"));
const MainHomePage = lazy(() => import("../Study/mainHomePage"));
const Programs = lazy(() => import("../Study/student/programs"));
const EducationLoan = lazy(() => import("../Study/student/educationLoans"));
const PersonalLoan = lazy(() => import("../Study/student/personalLoan"));
const Accommodation = lazy(() => import("../Study/student/accommodation"));
const StudyDashboard = lazy(() => import("../Study/Study admin/studyDashboard"));
const StudentList = lazy(() => import("../Study/Study admin/studentsList"));
const StudyAdminLoginFrom = lazy(() => import("../Study/Study admin/studyAdminLogin"));
const AppliedPrograms = lazy(() => import("../Study/Study admin/appliedPrograms"));
const StudyPartnerLogin = lazy(() => import("../Study/StudyComman/studyPartnerLogin"));
const InitialConsultationAgreement = lazy(() => import("./Retaineragreement/Agreement native/initialConsulation"));
const RecruitmentAgrement = lazy(() => import("./Retaineragreement/Agreement native/RecruitmentAgrement"));
const Wes = lazy(() => import("../admin/wes"));
const Atip = lazy(() => import("../admin/atip"));
const CommonApplicatTypePage = lazy(() => import("./CommonApplicatTypePage"));
const MangeApplicantType = lazy(() => import("../admin/MangeApplicantType"));
const ManageDailyCallLog = lazy(() => import("../admin/ManageDailyCallLog"));
const ManagePayment = lazy(() => import("../admin/ManagePaymentInvoices"));
const RenewalApplicantionsPdf = lazy(() => import("./Retaineragreement/Agreement native/RenewalApplicantionsPdf"));
const MoreThanOneApplicantAgreementPdf = lazy(() => import("./Retaineragreement/Agreement native/MoreThanOneApplicantAgreementPdf"));
const EmployerRetainerAgreementPdf = lazy(() => import("./Retaineragreement/Agreement native/EmployerRetainerAgreementPdf"));
const ThreeColumnRerainerAgreement = lazy(() => import("./Retaineragreement/Agreement native/ThreeColumnRerainerAgreement"));
const ManageHourlyLog = lazy(() => import("../admin/ManageHourlyLog"));
const ConvertAnyFileToPdf = lazy(() => import("./Common function/ConvertAnyFileTopdf"));
const WorkPermitPdf = lazy(() => import("./Retaineragreement/Agreement native/WorkPermitPdf"));
const AlbertaPnpPdf = lazy(() => import("./Retaineragreement/Agreement native/AlbertaPnpPdf"));
const AdminMain = lazy(() => import("../admin/AdminMain"));
const CommonAdminExtraLinkSetting = lazy(() => import("../admin/CommonAdminExtraLinkSetting"));
const ManageConsultation = lazy(() => import("../admin/ManageConsultation"));
const CommonDailyPage = lazy(() => import("./CommonDailyPage"));
const WorkPermitApplicantTwoStagePdf = lazy(() => import("./Retaineragreement/Agreement native/WorkPermitApplicantTwoStagePdf"));
const DynamicRA = lazy(() => import("./Retaineragreement/Agreement native/DynamicRA"));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa'
  }}>
    <Loader load={"yes"} />
  </div>
);
// import PreviewEmail from "../email/emailPreview";
// function CurrentRoute() {
//   const path = location.pathname;
//   // Use the path variable in your component
//   return path;
// }
// const location = useLocation();
function MainLayout() {
  const [loginCondition, setLoginCondition] = useState(false);
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const employeeId = localStorage.getItem("employee_id"); // Assuming employee_id is stored in localStorage

  /*Function to check the employee profile with just its id  */
  const ValidateRoute = () => {
    const { eid } = useParams();
    const isValidEid = /^\d+$/.test(eid); // Check if eid is a number

    if (userType === "user" && eid === employeeId && isValidEid) {
      return <NewUserProfile setLoginCondition={setLoginCondition} />;
    } else if (isValidEid && userType !== "user") {
      return <NewUserProfile />;
    } else {
      return <NotFound userType={userType} />;
    }
  };

  function RouterHandler({ token, userType, employeeId }) {
    const navigate = useNavigate();
    const path = window.location.pathname;

    const allowedPaths = {
      admin: [
        "/adminprofile", "/dashboard", "/job", "/selfjob", "/category", "/lmia", "/visa", "/document", "/employee", "/selfemployee",
        "/adminclient", "/assignedjobs", "/:eid", "/userpdf", "/managetasks", "/sharepoint_document",
        "/client_detail", "/job_detail", "/partner_profile", "/followup", "/partner", "/partner_dashboard", "/daily_call_log",
        "/daily_hours_log", "/consultation", "/assigned_admin", "/activity_log", "/filter", "/interview", "/responses",
        "/lmia_dashboard", "/emailtemplate", "/notes", "/credentials", "/testpdfurl", "/resume/:id", "/daily_pages", "/email",
        "/googledrive", "/anotation", "/slots", "/setting", "/manage_applicant_type", "/businessvisa", "/expressentry",
        "/visitorsvisa", "/studypermit", "/temporaryresident", "/economicimmigration", "/familysponsorship", "/pnp", "/passport",
        "/citizenship", "/humanitarian_and_Compassionate", "/permanent_resident_cards", "/pgwp", "/wes", "/atip", "/localcandidates",
        "/federal_pr", "/view_pdf_Agreement", "/study_dashboard", "/programs", "/students", "/student_profile", "/applied_programs",
        "/payment_records"
      ],
      user: [
        `/${employeeId}`, "/", "/student_profile", "/student_document", "/programs", "/education_loan", "/personal_loan", "/accommodation",
        "/jobs", "/jobdetail", "/profile", "/:eid", "/job_detail", "/client_detail", "/userpdf", "/view_pdf_Agreement", "/resume/:id"
      ],
      company: [
        `/${employeeId}`, "/:eid", "/client_detail", "/clientprofile", "/managejobs", "/response", "/empsearch", "/profile", "/lmia", "/resume/:id",
        "/job_detail", "/view_pdf_Agreement"
      ],
      agent: [ // same as admin list, assuming they share same paths
        `/${employeeId}`, "/partner_dashboard", "/employee", "/selfemployee", "/assignedjobs", "/:eid", "/userpdf", "/client_detail", "/job_detail", "/partner_profile", "/followup", "/partner", "/partner_dashboard", "/testpdfurl", "/resume/:id",
      ]
    };

    const redirectPath = {
      admin: "/dashboard",
      user: `/${employeeId}`,
      company: "/client_detail",
      agent: "/partner_dashboard"
    };

    const loginRoutes = {
      admin: "/adminlogin",
      user: "/candidate_login",
      company: "/client_login",
      agent: "/partnerlogin"
    };

    // Public routes that don't require authentication
    const publicRoutes = [
      "/",
      "/main_home",
      "/study",
      "/signup",
      "/candidate_login",
      "/candidate_signup",
      "/client_login",
      "/client_singup",
      "/jobs",
      "/jobdetail",
      "/aboutus",
      "/demojob",
      "/adminlogin",
      "/partnerlogin",
      "/study_partner_login",
      "/study_admin_login",
      "/resetpassword/:id",
      "/outside_booking",
      "/signagreement",
      `/initial_consultation `,
      `/recruitment_service`,
      `/renewal_application`,
      "/more_than_one_applicant",
      "/employers_agreement",
      "/three_column",
      "/work_permit",
      '/alberta_pnp',
      '/work_permit_application_2_stage',
      `/dynamic_ra`,
      `/agreeone`
    ];

    useEffect(() => {
      // Check if the current path is a public route
      const isPublicRoute = publicRoutes.some(route => {
        if (route.includes("/:id")) {
          const baseRoute = route.split("/:")[0];
          return path.startsWith(baseRoute);
        }
        return route === path;
      });
      // If no token and trying to access protected route, redirect to login
      if (!token || token === "null" || token === "undefined") {
        if (!isPublicRoute) {
          // Try to determine user type from path
          let targetUserType = null;

          // Check if path matches any user type patterns based on allowedPaths
          const pathLower = path.toLowerCase();
          // console.log("first", allowedPaths.user.some(route => pathLower.includes(route)), "pp", (allowedPaths.company.some(route => pathLower.includes(route))))
          if (allowedPaths.company.some(route => pathLower.includes(route)) === true) {
            targetUserType = "company";
            // console.log("company", allowedPaths.company, allowedPaths.company.some(route => pathLower.includes(route)), pathLower)
          } else if (allowedPaths.agent.some(route => pathLower.includes(route)) === true) {
            // Check agent routes
            targetUserType = "agent";
            // console.log("agent", allowedPaths.agent, allowedPaths.agent.some(route => pathLower.includes(route)), pathLower)
          } else if (allowedPaths.admin.some(route => pathLower.includes(route)) === true) {
            // Check admin routes (default fallback)
            targetUserType = "admin";
            // console.log("admin", allowedPaths.agent, allowedPaths.agent.some(route => pathLower.includes(route)), pathLower)
          } else if (allowedPaths.user.some(route => pathLower.includes(route)) === true) {
            // Check user routes (default fallback)
            targetUserType = "user";
            // console.log("user", allowedPaths.user, allowedPaths.user.some(route => route, pathLower), pathLower)
          }
          // console.log(targetUserType, "pppppppppppppppp", loginRoutes[targetUserType])
          if (targetUserType && loginRoutes[targetUserType]) {
            navigate(loginRoutes[targetUserType]);
          } else {
            // Default to candidate login
            navigate("/");
          }
        }
        return;
      }

      // If token exists, check if path is allowed for this user type
      const allowed = allowedPaths[userType] || [];
      const isAllowed = allowed.some((allowedPath) => matchPath(allowedPath, path));

      if (!isAllowed) {
        navigate(redirectPath[userType]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, userType, path, navigate]);

    return null;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      {/* <CurrentRoute /> */}
      <RouterHandler token={token} userType={userType} employeeId={employeeId} />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/main_home" element={<MainHomePage />} />
        <Route path="/study" element={<StudyHome />} />
        <Route path="/signup" element={<SinUpPage />} />
        <Route
          path="/candidate_login"
          element={<CandidateLoginForm setLoginCondition={setLoginCondition} />}
        />
        <Route path="/candidate_signup" element={<CandidateSignup />} />
        <Route
          path="/client_login"
          element={<CompanyLoginForm setLoginCondition={setLoginCondition} />}
        />
        <Route path="/client_singup" element={<CompanySingupForm />} />
        <Route path="/rozarepay" element={<RazorPay />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobdetail" element={<JobDetail />} />
        <Route path="/outside_booking" element={<WebhookComponent />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        <Route path="/linkedin" element={<LinkedInCallback />} />
        <Route path="/signagreement" element={<UserSigningPage />} />
        <Route path="/agreeone" element={<ExpressEntryPdf />} />
        <Route path="/dynamic_ra" element={<DynamicRA />} />
        <Route path="/work_permit_application_2_stage" element={<WorkPermitApplicantTwoStagePdf />} />
        <Route
          path="/initial_consultation"
          element={<InitialConsultationAgreement />}
        />
        <Route path="/recruitment_service" element={<RecruitmentAgrement />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/demojob" element={<DemoJob />} />

        {/* <Route path="*" element={<NotFound userType={userType}/>} /> */}
        {userType === "user" &&
          (token !== "" ||
            token !== null ||
            token !== undefined ||
            token !== "null" ||
            token !== "undefined") ? (
          <>
            <Route
              path="/student_profile"
              element={<StudentProfile setLoginCondition={setLoginCondition} />}
            />
            <Route path="/student_document" element={<StudentDocument />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/education_loan" element={<EducationLoan />} />
            <Route path="/personal_loan" element={<PersonalLoan />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route
              path="/"
              element={
                <EmployeeHomePage setLoginCondition={setLoginCondition} />
              }
            />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/:eid" element={<ValidateRoute />} />
            <Route path="*" element={<NotFound userType={userType} />} />
            <Route path="/job_detail" element={<JobDetailpageAdmim />} />
            <Route path="/client_detail" element={<CompanyProfileDetail />} />
            <Route path="/userpdf" element={<PDFViewer />} />
            <Route path="/view_pdf_Agreement" element={<ViewPdf />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
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
        {userType === "company" &&
          (token !== "" ||
            token !== null ||
            token !== undefined ||
            token !== "null" ||
            token !== "undefined") ? (
          <>
            <Route
              path="/client"
              element={<EmployerHome setLoginCondition={setLoginCondition} />}
            />
            <Route path="/clientprofile" element={<CompanyProfile />} />
            <Route path="/managejobs" element={<ManageJobs />} />
            <Route path="/response" element={<Response />} />
            <Route path="/empsearch" element={<EmployeeSearch />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/:eid" element={<ValidateRoute />} />
            {/* <Route path="/lmia_dashboard" element={<EmployerLMIA />} /> */}
            <Route path="/lmia" element={<LimaContainer />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            <Route path="*" element={<NotFound userType={userType} />} />
            <Route path="/job_detail" element={<JobDetailpageAdmim />} />
            <Route path="/userpdf" element={<PDFViewer />} />
            <Route path="/client_detail" element={<CompanyProfileDetail />} />
            <Route path="/view_pdf_Agreement" element={<ViewPdf />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            {/* <Route path="*" element={<NotFound userType={userType}/>} /> */}
          </>
        )}
        {/* Agent */}
        <Route
          path="/partnerlogin"
          element={<AgentLogin setLoginCondition={setLoginCondition} />}
        />
        {/* Study partner login page */}
        <Route
          path="/study_partner_login"
          element={<StudyPartnerLogin setLoginCondition={setLoginCondition} />}
        />
        {/* Admin */}
        <Route
          path="/adminlogin"
          element={<AdminLoginFrom setLoginCondition={setLoginCondition} />}
        />
        <Route
          path="/study_admin_login"
          element={
            <StudyAdminLoginFrom setLoginCondition={setLoginCondition} />
          }
        />
        <Route path="/agreepreivew" element={<ExpressEntryHtml />} />
        <Route
          path="/more_than_one_applicant"
          element={<MoreThanOneApplicantAgreementPdf />}
        />
        <Route
          path="/renewal_application"
          element={<RenewalApplicantionsPdf />}
        />
        <Route
          path="/employers_agreement"
          element={<EmployerRetainerAgreementPdf />}
        />
        <Route
          path="/three_column"
          element={<ThreeColumnRerainerAgreement />}
        />
        <Route path="/work_permit" element={<WorkPermitPdf />} />
        <Route path="/alberta_pnp" element={<AlbertaPnpPdf />} />

        <Route path="/addsign" element={<SignaturePadComponent />} />
        {(userType === "company" ||
          userType === "user" ||
          userType === "" ||
          userType === null ||
          userType === "null") &&
          (token === "" ||
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
            {/* Layout Route */}
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            <Route element={<AdminMain />}>
              <Route
                path="/dashboard"
                element={
                  <AdminDashboard setLoginCondition={setLoginCondition} />
                }
              />
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
              <Route path="/:eid" element={<ValidateRoute />} />
              <Route path="/userpdf" element={<PDFViewer />} />
              <Route path="/managetasks" element={<ManageTask />} />
              <Route
                path="/sharepoint_document"
                element={<SharePointDocument />}
              />
              <Route path="/job_detail" element={<JobDetailpageAdmim />} />
              <Route path="/client_detail" element={<CompanyProfileDetail />} />
              <Route
                path="/partner_profile"
                element={
                  <PartnerDetails setLoginCondition={setLoginCondition} />
                }
              />
              <Route path="/followup" element={<Followup />} />
              <Route path="/partner" element={<Agent />} />
              <Route path="/partner_dashboard" element={<PartnerDashboard />} />
              <Route path="/daily_call_log" element={<ManageDailyCallLog />} />
              <Route path="/daily_hours_log" element={<ManageHourlyLog />} />
              <Route path="/consultation" element={<ManageConsultation />} />
              <Route path="/assigned_admin" element={<AsiignedAdmin />} />
              <Route path="/activity_log" element={<ActivityLog />} />
              <Route path="/filter" element={<FilterList />} />
              <Route path="/interview" element={<ManageInterview />} />
              <Route path="/responses" element={<JobResponse />} />
              <Route path="/lmia_dashboard" element={<EmployerLMIA />} />
              <Route path="/emailtemplate" element={<EmailTemplate />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/credentials" element={<Credentional />} />
              <Route path="/testpdfurl" element={<ConvertAnyFileToPdf />} />
              <Route path="/daily_pages" element={<CommonDailyPage />} />
              <Route path="/email" element={<MainEmailPage />} />
              <Route path="*" element={<NotFound userType={userType} />} />
              <Route path="/googledrive" element={<GoogleDrive />} />
              <Route path="/anotation" element={<Anotation />} />
              <Route path="/slots" element={<CommonApplicatTypePage />} />
              <Route path="/setting" element={<CommonAdminExtraLinkSetting />} />
              <Route
                path="/manage_applicant_type"
                element={<MangeApplicantType />}
              />
              <Route path="/businessvisa" element={<BusinessVIsa />} />
              <Route path="/expressentry" element={<ExpressEntry />} />
              <Route path="/visitorsvisa" element={<VisitorVisa />} />
              <Route path="/studypermit" element={<StudyPermit />} />
              <Route
                path="/temporaryresident"
                element={<TemporaryResident />}
              />
              <Route
                path="/economicimmigration"
                element={<EconomicImmigration />}
              />
              <Route
                path="/familysponsorship"
                element={<FamilySponsorship />}
              />
              <Route path="/pnp" element={<Pnp />} />
              <Route path="/passport" element={<TypePassport />} />
              <Route path="/citizenship" element={<TypeCitizenship />} />
              <Route
                path="/humanitarian_and_Compassionate"
                element={<Humanitarian />}
              />
              <Route
                path="/permanent_resident_cards"
                element={<ParmanentResidentCard />}
              />
              <Route path="/pgwp" element={<PGWP />} />
              <Route path="/wes" element={<Wes />} />
              <Route path="/atip" element={<Atip />} />
              <Route path="/localcandidates" element={<LocalCandidate />} />
              <Route path="/federal_pr" element={<Federalpr />} />
              <Route path="/view_pdf_Agreement" element={<ViewPdf />} />
              {/* Study pages as for admin */}
              <Route path="/study_dashboard" element={<StudyDashboard />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/student_profile" element={<StudentProfile />} />
              <Route path="/applied_programs" element={<AppliedPrograms />} />
              <Route path="*" element={<Loader load={"yes"} />} />
              <Route path="/payment_records" element={<ManagePayment />} />
              {/* <Route path="/:eid" element={<NewUserProfile />} /> */}
            </Route>

            {/* <Route path="/*" element={<AdminMain />} /> */}
          </>
        )}
        <Route path="/Newpdf" element={<Newpdf />} />

        {loginCondition === true ? null : (
          <Route path="*" element={<NotFound userType={userType} />} />
        )}
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainLayout;
