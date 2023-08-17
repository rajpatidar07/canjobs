import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboardCustomize, MdOutlinePhotoFilter } from "react-icons/md"
import { LiaUsersSolid, LiaAddressCardSolid, LiaCcVisa } from "react-icons/lia"
import { BsBuildings, BsQrCodeScan } from "react-icons/bs"
import { PiApplePodcastsLogoThin } from "react-icons/pi"
import { AiOutlineUserAdd } from "react-icons/ai"
import { TbFilterPlus } from "react-icons/tb"
const AdminSidebar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let view_as_admin_type = localStorage.getItem("view_as_token_admin_type")
  /*-- Function to open sidebar --*/
  function sideBar() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <Link
        to={""}
        onClick={sideBar}
        className="sidebar-mobile-button"
        data-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        <i className="icon icon-sidebar-2"></i>
      </Link>
      <div
        className={`dashboard-sidebar-wrapper pt-5 ${isMenuOpen ? "show" : ""}`}
        id="sidebar"
      >
        <div className="brand-logo px-11">
          <Link to="">
            <img src="image/logo-main-black.png" alt="" />
          </Link>
        </div>
        <div className="my-9 px-11"></div>
        <ul className="list-unstyled dashboard-layout-sidebar">
          <li className={props.heading === "Dashboard" ? "active" : ""}>
            <Link
              to="/dashboard"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <MdOutlineDashboardCustomize className="mr-5" />Dashboard
              {/* <i className="fab fa-blackberry mr-5"></i>Dashboard */}
            </Link>
          </li>
          <li className={props.heading === "Manage Applicants" ? "active" : ""}>
            <Link
              to="/employee"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <LiaUsersSolid className="mr-5" />Manage Applicants
              {/* <i className="far fa-user mr-5"></i>Manage Applicants{" "} */}
            </Link>
          </li>
          <li
            className={
              props.heading === "Manage Self Applicants" ? "active" : ""
            }
          >
            <Link
              to="/selfemployee"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="far fa-user mr-5"></i> */}
              <LiaUsersSolid className="mr-5" /> Self Registered Applicants{" "}
            </Link>
          </li>
          <li className={props.heading === "Manage Companies" ? "active" : ""}>
            <Link
              to="/employer"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="far fa-building mr-5"></i> */}
              <BsBuildings className="mr-5" />Manage Companies
            </Link>
          </li>
          <li className={props.heading === "Manage Jobs" ? "active" : ""}>
            <Link
              to="/job"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="far fa-address-card mr-5"></i> */}
              <LiaAddressCardSolid className="mr-5" />Manage Jobs
            </Link>
          </li>
          <li className={props.heading === "Manage Self Jobs" ? "active" : ""}>
            <Link
              to="/selfjob"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="far fa-address-card mr-5"></i> */}
              <LiaAddressCardSolid className="mr-5" />Manage Self Applied
              Jobs
            </Link>
          </li>
          <li className={props.heading === "Visa status" ? "active" : ""}>
            <Link
              to="/visa"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="fab fa-cc-visa mr-5"></i> */}
              <LiaCcVisa className="mr-5" />Manage Visa
            </Link>
          </li>
          {/* <li className={props.heading === "Document Upload & Verification" ? "active" : ""}>
            <Link
              to="/document"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-file mr-5"></i>Manage Documents
            </Link>
          </li> */}
          <li className={props.heading === "LIMIA status" ? "active" : ""}>
            <Link
              to="/lmia"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="fas fa-filter mr-5"></i> */}
              <MdOutlinePhotoFilter className="mr-5" />Manage LMIA Status
            </Link>
          </li>
          {/* <li className={props.heading === "Response" ? "active" : ""}>
            <Link
              to="/responses"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-reply mr-5"></i>Manage Response
            </Link>
          </li> */}
          {/* <li className={props.heading === "Manage Follow-ups" ? "active" : ""}>
            <Link
              to="/followup"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="far fa-comments mr-5"></i>Manage Follow-ups
            </Link>
          </li> */}
          <li className={props.heading === "Interview" ? "active" : ""}>
            <Link
              to="/interview"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="fas fa-podcast mr-5"></i> */}
              <PiApplePodcastsLogoThin className="mr-5" />Manage Interview
            </Link>
          </li>


          <li className={props.heading === "Manage Admin" ? "active" : ""}>
            <Link
              to="/adminprofile"
              className={view_as_admin_type === "manager" ? "d-none" : "px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"}
            >
              {/* <i className="fas fa-user mr-5"></i> */}
              <AiOutlineUserAdd className="mr-5" />Manage Admin
            </Link>
          </li>
          <li
            className={props.heading === "Manage Job Category" ? "active" : ""}
          >
            <Link
              to="/category"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="fas fa-qrcode mr-5"></i> */}
              <BsQrCodeScan className="mr-5" />Manage Job Category
            </Link>
          </li>
          <li className={props.heading === "Filter List" ? "active" : ""}>
            <Link
              to="/filter"
              className="px-8 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              {/* <i className="fas fa-filter mr-5"></i> */}
              <TbFilterPlus className="mr-5" />Manage Filter List
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default AdminSidebar;
