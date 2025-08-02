import React, { useEffect, useRef, useState } from "react";
import { Link ,useLocation } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdOutlinePhotoFilter,
  MdAssignmentAdd,
  MdRealEstateAgent,
  // MdOutlineAddIcCall,
  MdOutlinePayments,
  // MdOutlineAddIcCall,
} from "react-icons/md";
import { BiLogoDailymotion } from "react-icons/bi";
// import { LuFileKey } from "react-icons/lu";
import { LuMessagesSquare } from "react-icons/lu";
import {
  LiaUsersSolid,
  LiaAddressCardSolid,
  LiaCcVisa,
  LiaHourglassHalfSolid,
  // LiaHourglassHalfSolid,
} from "react-icons/lia";
import {
  BsBuildings,
  // BsQrCodeScan,
  // BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
// import { toast } from "react-toastify";
import { PiApplePodcastsLogoThin } from "react-icons/pi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbUser } from "react-icons/tb";
import {
  // FaAddressCard,
  // FaChevronDown,
  FaNotesMedical,
  FaTasks,
  // FaTrashAlt,
} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { SiStudyverse } from "react-icons/si";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaGear, FaPersonShelter } from "react-icons/fa6";
// import {
//   AddApplicanTypeApi,
//   DeleteApplicanTypeApi,
//   getApplicanTypeApi,
// } from "../../api/api";
// import TableInput from "../common/TableInput";
// import SAlert from "../common/sweetAlert";
// import { CiUser } from "react-icons/ci";
const AdminSidebar = (props) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(
  //   localStorage.getItem("isMenuOpen")
  // );
  // let [applicanttypedata, setApplicanttypedata] = useState([]);
  let admin_type = localStorage.getItem("admin_type");
  let user_type = localStorage.getItem("userType");
  let portal = localStorage.getItem("portal")
  // const [openParent, setOpenParent] = useState(null);
  const [apiCall, setApiCall] = useState(false);
    const location = useLocation();
  // const [items, setItems] = useState(
  //   applicanttypedata.filter((item) => item.parent_id === "0")
  // );
  // let [showDropDown, setShowDropDown] = useState();
  // const [deleteAlertApplicantTypeData, setDeleteAlertApplicantTypeData] =
  //   useState(false);
  // const [deleteAlertApplicant, setDeleteAlertApplicant] = useState(false);
  // const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  // const admin_id = localStorage.getItem("admin_id");
  let userType = localStorage.getItem("userType");
  useEffect(() => {
    // Keep parent open if a child is active
    // const activeChild = applicanttypedata.find(
    //   (child) => child.title === props.heading
    // );
    // if (activeChild) {
    //   setOpenParent(activeChild.parent_id);
    // }
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, props.heading]);

  // const toggleChildren = (parentId, hasChildren) => {
  //   if (hasChildren) {
  //     setOpenParent(openParent === parentId ? null : parentId);
  //   } else {
  //     clearPageNo();
  //   }
  // };
  if (admin_type === "" || admin_type === null || admin_type === undefined) {
    // Redirect to the login page
    window.location.href = "/adminlogin";
  }
  /*-- Function to open sidebar --*/
  // function sideBar() {
  //   setIsMenuOpen(!isMenuOpen);
  //   localStorage.setItem("isMenuOpen", isMenuOpen);
  // }

  const clearPageNo = (title) => {
    localStorage.removeItem("PageNo");
    localStorage.setItem("admin_heading", title);
    props.setPageHeading(title);
  };
  const liRefs = useRef([]);

  // const getAllSlotsData = async () => {
  //   try {
  //     let response = await getApplicanTypeApi(
  //       admin_type === "super-admin" ? "" : admin_id
  //     );
  //     setApplicanttypedata(response.data.data);
  //     setItems(response.data.data.filter((item) => item.parent_id === "0"));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    if (props.heading) {
      const activityLi = liRefs.current[props.heading];
      if (activityLi) {
        activityLi.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [props.heading]);
  useEffect(() => {
    // getAllSlotsData();
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall]);

  // const handleDragStart = (index) => {
  //   setDraggedItemIndex(index);
  // };

  // const handleDragOver = (e, index) => {
  //   e.preventDefault();
  //   if (draggedItemIndex === index) return;

  //   const updatedItems = [...items];
  //   const draggedItem = updatedItems.splice(draggedItemIndex, 1)[0];
  //   updatedItems.splice(index, 0, draggedItem);

  //   setDraggedItemIndex(index);
  //   setItems(updatedItems);
  // };

  // const handleDragEnd = () => {
  //   setDraggedItemIndex(null);
  // };
  //  Handle Update Input Change
  // const handleUpdateChange = async (e, item, field) => {
  //   if (e && e.preventDefault) {
  //     e.preventDefault();
  //   }
  //   console.log(
  //     e.target.value !==
  //     applicanttypedata.find((data) => data.id === item.id).title
  //   );
  //   if (
  //     e.target.value !==
  //     applicanttypedata.find((data) => data.id === item.id).title
  //   ) {
  //     let data = {
  //       id: item.id,
  //       level: item.level,
  //       parent_id: item.parent_id,
  //       [field]: e.target.value,
  //       admin_access_id: item.admin_access_id,
  //     };
  //     let res = await AddApplicanTypeApi(data);
  //     if (res.status === 1 || res.status === "1") {
  //       setApiCall(true);
  //     }
  //   }
  // };
  // /*To call Api to delete employee */
  // async function deleteApplicantType(id) {
  //   let data = {
  //     id: id,
  //   };
  //   try {
  //     const response = await DeleteApplicanTypeApi(data);
  //     if (response.status === 1 || response.status === "1") {
  //       toast.error("Applicant Type deleted Successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setDeleteAlertApplicant(false);
  //       setDeleteAlertApplicantTypeData();
  //       setApiCall(true);
  //       setShowDropDown();
  //     }
  //     if (
  //       response.message ===
  //       "This applicant type cannot be deleted because it is used for applicant"
  //     ) {
  //       toast.error(response.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setDeleteAlertApplicant(false);
  //       setDeleteAlertApplicantTypeData();
  //       setShowDropDown();
  //     }
  //     if (
  //       response.message ===
  //       "This applicant type cannot be deleted because it has a sub-applicant type."
  //     ) {
  //       toast.error(response.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setDeleteAlertApplicant(false);
  //       setDeleteAlertApplicantTypeData();
  //       setShowDropDown();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  useEffect(() => {
    const pathToHeadingMap = {
      "/partner_profile": "Partner Dashboard",
      "/students": "Students",
      "/dashboard": "Dashboard",
      "/managetasks": "Task Dashboard",
      "/selfemployee": "New Applicants",
      "/employee": "Manage Applicants",
      "/adminclient": "Manage Employers",
      "/job": "Manage Jobs",
      "/selfjob": "Manage Self Jobs",
      "/visa": "Visa",
      "/lmia": "LMIA status",
      "/localcandidates": "Local Candidate",
      "/slots": "Application types",
      "/payment_records": "Manage Payment",
      "/interview": "Interview",
      "/notes": "Manage Notes",
      "/assignedjobs": "Manager's Dashboard",
      "/adminprofile": "Manage Admin",
      "/partner_dashboard": "Manage Partner",
      "/daily_pages": "Manage Daily Pages",
      "/daily_hours_log": "Manage Daily Hourly Log",
      "/consultation": "Manage Consultation",
      "/setting": "Setting",
    };

    const currentPath = location.pathname;
    const matchedHeading = pathToHeadingMap[currentPath];
    if (matchedHeading && props.heading !== matchedHeading) {
      // If your parent component controls `props.heading`, call a function to update it
      localStorage.removeItem("PageNo");
      localStorage.setItem("admin_heading", matchedHeading);
      props.setPageHeading(matchedHeading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
  return (
    <div className={`sidebar_parent show`} id="sidebar">
      {/* <SAlert
        show={deleteAlertApplicant}
        title={deleteAlertApplicantTypeData?.title}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteApplicantType(deleteAlertApplicantTypeData.id)}
        showCancelButton={true}
        onCancel={() => setDeleteAlertApplicant(false)}
      /> */}
      {/* <Link
        to={""}
        onClick={() => {
          sideBar();
          clearPageNo();
        }}
        className="sidebar-mobile-button"
        data-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        {isMenuOpen ? (
          <FaChevronLeft />
        ) : (
          <FaChevronRight style={{ paddingLeft: "0" }} />
        )}
      </Link> */}
      <div className="brand-logo px-2 py-4">
        <Link to={userType === "agent" ? "/partner_profile" : "/dashboard"}>
          <img src="image/logo-main-black.png" alt="" />
        </Link>
      </div>
      <ul
        className="list-unstyled dashboard-layout-sidebar"
      // style={{
      //   marginTop:
      //     window.innerWidth === 320 || window.innerWidth === 425
      //       ? "4.35rem"
      //       : "2.25rem",
      // }}
      >
        {user_type === "agent" || portal === "study" ? (
          <>
            <li
              ref={(el) => (liRefs.current["Partner Dashboard"] = el)}
              className={
                user_type === "agent" ?
                  props.heading === "Partner Dashboard"
                    ? "active"
                    : ""
                  : "d-none"
              }
            >
              <Link
                onClick={() => clearPageNo()}
                to="/partner_profile"
                className={
                  "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
                }
              >
                <FaRegUser className="sidebar_icon" />
                <span className="text-truncate">Partner Dashboard</span>
              </Link>
            </li>
            <li
              ref={(el) => (liRefs.current["Students"] = el)}
              className={
                portal === "study"
                  ? `${props.heading === "Students" ? "active" : ""}`
                  : "d-none"
              }
            >
              <Link
                onClick={() => clearPageNo()}
                to="/students"
                className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
              >
                <SiStudyverse className="sidebar_icon" />
                <span className="text-truncate">Students</span>
              </Link>
            </li>
          </>
        ) : null}
        <li
          ref={(el) => (liRefs.current["Dashboard"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Dashboard"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Dashboard")}
            to="/dashboard"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <MdOutlineDashboardCustomize className="sidebar_icon" />
            <span className="text-truncate">Dashboard</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Task Dashboard"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Task Dashboard"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Task Dashboard")}
            to="/managetasks"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <FaTasks className="sidebar_icon" />
            <span className="text-truncate">Task Dashboard</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["New Applicants"] = el)}
          className={
            localStorage.getItem("portal") === "study"
              ? "d-none"
              : `
          ${props.heading === "New Applicants" ? "active" : ""}`
          }
        >
          <Link
            onClick={() => clearPageNo("New Applicants")}
            to="/selfemployee"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <LiaUsersSolid className="sidebar_icon" />
            <span className="text-truncate">New Applicants</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Applicants"] = el)}
          className={
            localStorage.getItem("portal") === "study"
              ? "d-none"
              : `${props.heading === "Manage Applicants" ? "active" : ""}`
          }
        >
          <Link
            onClick={() => clearPageNo("Manage Applicants")}
            to="/employee"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <LiaUsersSolid className="sidebar_icon" />
            <span className="text-truncate">Manage Applicants</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Employers"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : `${props.heading === "Manage Employers" ? "active" : ""}`
          }
        >
          <Link
            onClick={() => clearPageNo("Manage Employers")}
            to="/adminclient"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <BsBuildings className="sidebar_icon" />
            <span className="text-truncate">Manage Employers</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Jobs"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Jobs"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Manage Jobs")}
            to="/job"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <LiaAddressCardSolid className="sidebar_icon" />
            <span className="text-truncate">Manage Jobs</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Self Jobs"] = el)}
          className={`d-none 
             ${user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Self Jobs"
                ? "active"
                : ""
            }`}
        >
          <Link
            onClick={() => clearPageNo("Manage Self Jobs")}
            to="/selfjob"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <LiaAddressCardSolid className="sidebar_icon" />
            <span className="text-truncate">Other Jobs</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Visa"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Visa"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Visa")}
            to="/visa"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <LiaCcVisa className="sidebar_icon" />
            <span className="text-truncate">Visa</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["LMIA status"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "LMIA status"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("LMIA status")}
            to="/lmia"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <MdOutlinePhotoFilter className="sidebar_icon" />
            <span className="text-truncate">Manage LMIA</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Local Candidate"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Local Candidate"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Local Candidate")}
            to="/localcandidates"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <FaPersonShelter className="sidebar_icon" />
            <span className="text-truncate">Local Candidate</span>
          </Link>
        </li>
        {/* <li
          ref={(el) => (liRefs.current["PNP"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "PNP"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo()}
            to="/pnp"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <IoLogoPinterest className="sidebar_icon" />
            <span className="text-truncate">Alberta PNP</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["PGWP"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "PGWP"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("PGWP")}
            to="/pgwp"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <FaGraduationCap className="sidebar_icon" />
            <span className="text-truncate">PGWP</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["WES"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "WES"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("WES")}
            to="/wes"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <TbMapWest className="sidebar_icon" />
            <span className="text-truncate">WES</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["ATIP"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "ATIP"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo()}
            to="/atip"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <FaAcquisitionsIncorporated className="sidebar_icon" />
            <span className="text-truncate">ATIP</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Visitors Visa"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Visitors Visa"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Visitors Visa")}
            to="/visitorsvisa"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <GrVisa className="sidebar_icon" />
            <span className="text-truncate">Visitors Visa</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Study Permit"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Study Permit"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Study Permit")}
            to="/studypermit"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <SiStudyverse className="sidebar_icon" />
            <span className="text-truncate">Study Permit</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Temporary Resident (Visiting , Studying , Working)"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Temporary Resident (Visiting , Studying , Working)"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Temporary Resident")}
            to="/temporaryresident"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <GiTemporaryShield className="sidebar_icon" />
            <span className="text-truncate">Temporary Resident</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Economic Immigration"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Economic Immigration"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Economic Immigration")}
            to="/economicimmigration"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <TbUserDollar className="sidebar_icon" />
            <span className="text-truncate">Economic Immigration</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Family Sponsorship"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Family Sponsorship"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Family Sponsorship")}
            to="/familysponsorship"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <MdFamilyRestroom className="sidebar_icon" />
            <span className="text-truncate">Family Sponsorship</span>
          </Link>
        </li>

        <li
          ref={(el) => (liRefs.current["Express Entry"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Express Entry"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Express Entry")}
            to="/expressentry"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <SiExpress className="sidebar_icon" />
            <span className="text-truncate">Express Entry</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Business VIsa"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Business VIsa"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Business Visa")}
            to="/businessvisa
              "
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <TiBusinessCard className="sidebar_icon" />
            <span className="text-truncate">Business Visa</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Federal PR"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Federal PR"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Federal PR")}
            to="/federal_pr
              "
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <TiBusinessCard className="sidebar_icon" />
            <span className="text-truncate">Federal PR</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Humanitarian and Compassionate Cases"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Humanitarian and Compassionate Cases"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Humanitarian and Compassionate Cases")}
            to="/humanitarian_and_Compassionate
              "
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <span className="sidebar_icon">
              <TbLetterH className="pl-2" /><LuAmpersand className="pr-2 pl-2" /><TbLetterC className="pr-2" />
            </span>
            Humanitarian and Compassionate Cases
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Passport"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Passport"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Passport")}
            to="/passport
              "
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <span className="sidebar_icon">
              <FaPassport />
            </span>
            Passport
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Citizenship"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Citizenship"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Citizenship")}
            to="/citizenship
              "
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <span className="sidebar_icon">
              <FaUsersBetweenLines />
            </span>
            Citizenship
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Permanent Resident Cards"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Permanent Resident Cards"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Permanent Resident Cards" )}
            to="/permanent_resident_cards
              "
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <span className="sidebar_icon">
              <FaRegCreditCard />
            </span>
            Permanent Resident Cards
          </Link>
        </li> */}
        {/* {applicanttypedata
          .filter((item) => item.parent_id === "0")
          .map((item) => (
            <li
              key={item.id}
              className={`position-relative ${user_type === "agent" ||portal === "study"
                  ? "d-none"
                  : props.heading === item.title
                    ? "active"
                    : ""
                }`}
              title={item.title}
              ref={(el) => (liRefs.current[item.title] = el)}
            >
              <Link
                onClick={() => {
                  clearPageNo(item.title);
                }}
                to={`/slots`}
                state={{ applicantType: item.id, folderId: item.doc_folder_id }}
                className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center text-Capitalize"
              >
                <BsReverseLayoutTextSidebarReverse className="sidebar_icon" />
                <span className="text-truncate">{item.title}</span>
              </Link>
            </li>
          ))} */}
        {/* {items.map((item, index) => {
          const children = applicanttypedata.filter(
            (child) => child.parent_id === item.id
          );
          const hasChildren = children.length > 0;

          return (
            <li
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`position-relative ${
                user_type === "agent" ||portal === "study"
                  ? "d-none"
                  : props.heading === item.title
                  ? "active"
                  : ""
              }`}
              title={item.title}
            >
              <div
                className={`d-flex position-relative ${
                  props.heading === item.title ? "active" : ""
                }`}
              >
                <Link
                  className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center text-truncate w-100"
                  to={`/slots`}
                  state={{
                    applicantType: item.id,
                    folderId: item.doc_folder_id,
                  }}
                  onClick={() => {
                    clearPageNo(item.title);
                    localStorage.setItem("applicantType", "");
                    localStorage.setItem("applicantTypeFolderId", "");
                    localStorage.setItem("applicantTypeChild", "");
                    if (!item.doc_folder_id) {
                      AddApplicanTypeApi(item);
                    }
                  }}
                  style={{ textDecoration: "none" }}
                  onContextMenu={(e) => {
                    e.preventDefault(); // prevent the default behavior when right clicked
                    setShowDropDown(item.id);
                  }}
                >
                  <span className="sidebar_icon">
                    <TbUser />
                  </span>
                  <span>
                    {" "}
                    <TableInput
                      value={item.title}
                      onChange={(newValue) =>
                        handleUpdateChange(newValue, item, "title")
                      }
                      type="text"
                      id="title"
                      name="title"
                    />
                  </span>
                  {showDropDown === item.id && (
                    <ul className="list-group">
                      <li
                        className="list-group-item text-danger"
                        // onClick={() => {
                        //   clearPageNo(item.title);
                        // }}
                      >
                        <Link
                          onClick={() => {
                            setDeleteAlertApplicant(true);
                            setDeleteAlertApplicantTypeData(item);
                          }}
                          className="text-danger"
                        >
                          <FaTrashAlt className="ml-2" />
                        </Link>
                      </li>
                    </ul>
                  )}
                </Link>
                <div
                  className="text-white"
                  style={{
                    textDecoration: "none",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    padding: "2px",
                    background: "rgba(153, 43, 50, .5)",
                    margin: "1px 0",
                  }}
                  onClick={() => toggleChildren(item.id, hasChildren)}
                >
                  {hasChildren && <FaChevronDown />}
                </div>
              </div>

              {openParent === item.id && hasChildren && (
                <ul
                  className="pl-0 list-unstyled"
                  style={{ transition: "all 0.2s ease" }}
                >
                  {children.map((child) => (
                    <li key={child.id} className="position-relative">
                      <Link
                        to={`/slots`}
                        state={{
                          applicantTypeChild: child.id,
                          folderId: child.doc_folder_id,
                        }}
                        onClick={() => {
                          if (!item.doc_folder_id) {
                            AddApplicanTypeApi(child);
                          }
                        }}
                        className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center text-truncate w-100"
                        style={{ textDecoration: "none" }}
                        onContextMenu={(e) => {
                          e.preventDefault(); // prevent the default behaviour when right clicked
                          setShowDropDown(item.id);
                        }}
                      >
                        <TbUsers className="sidebar_icon" />
                        <span className="text-truncate">
                          <TableInput
                            value={child.title}
                            onChange={(newValue) =>
                              handleUpdateChange(newValue, child, "title")
                            }
                            type="text"
                            id="title"
                            name="title"
                          />
                        </span>
                      </Link>
                      {showDropDown === item.id && (
                        <ul
                          className="list-group"
                          style={{ transition: "all 0.2s ease" }}
                        >
                          <li className="list-group-item text-danger">
                            <Link
                              onClick={() => {
                                setDeleteAlertApplicant(true);
                                setDeleteAlertApplicantTypeData(item);
                              }}
                              className="text-danger"
                            >
                              <FaTrashAlt className="ml-2" />
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })} */}
        <li
          ref={(el) => (liRefs.current["Application types"] = el)}
          className={
            admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Application types"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => {
              clearPageNo("Application types");
            }}
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            title={"Application types"}
            to="/slots"
          >
            <TbUser className="sidebar_icon" />
            <span className="text-truncate">Application types</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Payment"] = el)}
          className={
            admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Payment"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => {
              clearPageNo("Manage Payment");
            }}
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            title={"Manage Payment"}
            to="/payment_records"
          >
            <MdOutlinePayments className="sidebar_icon" />
            <span className="text-truncate">Manage Payment</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Interview"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Interview"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Interview")}
            to="/interview"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <PiApplePodcastsLogoThin className="sidebar_icon" />
            <span className="text-truncate">Manage Interview</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Notes"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Notes"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Manage Notes")}
            to="/notes"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center d-none"
          >
            <FaNotesMedical className="sidebar_icon" />
            <span className="text-truncate">Manage Notes</span>
          </Link>
        </li>

        <li
          ref={(el) => (liRefs.current["Manager's Dashboard"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manager's Dashboard"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Manager's Dashboard")}
            to="/assignedjobs"
            className={
              "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            }
          >
            <MdAssignmentAdd className="sidebar_icon" />
            <span className="text-truncate">Manager's Dashboard</span>
          </Link>
        </li>

        <li
          ref={(el) => (liRefs.current["Manage Admin"] = el)}
          className={
            user_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Admin"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Manage Admin")}
            to="/adminprofile"
            className={
              "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            }
          >
            <AiOutlineUserAdd className="sidebar_icon" />
            <span className="text-truncate">Manage Admin</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Partner"] = el)}
          className={
            admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Partner"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Manage Partner")}
            to="/partner_dashboard"
            className={
              "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            }
          >
            <MdRealEstateAgent className="sidebar_icon" />
            <span className="text-truncate">Manage Partner</span>
          </Link>
        </li>

        {/* <li
          ref={(el) => (liRefs.current["Job Category"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Job Category"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Job Category")}
            to="/category"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <BsQrCodeScan className="sidebar_icon" />
            <span className="text-truncate">Job Category</span>
          </Link>
        </li> */}
        {/* <li
          ref={(el) => (liRefs.current["Filter List"] = el)}
          className={
            user_type === "agent" ||portal === "study"
              ? "d-none"
              : props.heading === "Filter List"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => clearPageNo("Filter List")}
            to="/filter"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <TbFilterPlus className="sidebar_icon" />
            <span className="text-truncate">Filter List</span>
          </Link>
        </li> */}
        {/* <li
          ref={(el) => (liRefs.current["Credentials"] = el)}
          className={
            admin_type === "super-admin"
              ? props.heading === "Credentials"
                ? "active"
                : ""
              : "d-none"
          }
        >
          <Link
            onClick={() => clearPageNo("Credentials")}
            to="/credentials"
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
          >
            <LuFileKey className="sidebar_icon" />
            <span className="text-truncate">Credentials</span>
          </Link>
        </li> */}
        <li
          ref={(el) => (liRefs.current["Manage Daily Pages"] = el)}
          className={
            admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Daily Pages"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => {
              clearPageNo("Manage Daily Pages");
            }}
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            title={"Manage Daily Pages"}
            to="/daily_pages"
          >
            <BiLogoDailymotion className="sidebar_icon" />
            <span className="text-truncate">Manage Daily Pages</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Daily Hourly Log"] = el)}
          className={`d-none ${admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Daily Hourly Log"
                ? "active"
                : ""}`
          }
        >
          <Link
            onClick={() => {
              clearPageNo("Manage Daily Hourly Log");
            }}
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            title={"Manage Daily Hourly Log"}
            to="/daily_hours_log"
          >
            <LiaHourglassHalfSolid className="sidebar_icon" />
            <span className="text-truncate">Manage Daily Hour Log</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Manage Consultation"] = el)}
          className={
            `d-none ${admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Manage Consultation"
                ? "active"
                : ""}`
          }
        >
          <Link
            onClick={() => {
              clearPageNo("Manage Consultation");
            }}
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            title={"Manage Consultation"}
            to="/consultation"
          >
            <LuMessagesSquare className="sidebar_icon" />
            <span className="text-truncate">Manage Consultation</span>
          </Link>
        </li>
        <li
          ref={(el) => (liRefs.current["Setting"] = el)}
          className={
            admin_type === "agent" || portal === "study"
              ? "d-none"
              : props.heading === "Setting"
                ? "active"
                : ""
          }
        >
          <Link
            onClick={() => {
              clearPageNo("Setting");
            }}
            className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            title={"Setting"}
            to="/setting"
          >
            <FaGear className="sidebar_icon" />
            <span className="text-truncate">Setting</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default AdminSidebar;
