import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    MdOutlineDashboardCustomize,

} from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiStudyverse } from "react-icons/si";
import { RiMiniProgramFill } from "react-icons/ri";
const StudyAdminSidebar = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(
        localStorage.getItem("isMenuOpen")
    );
    // let view_as_admin_type = localStorage.getItem("view_as_token_admin_type");
    let admin_type = localStorage.getItem("admin_type");
    let user_type = localStorage.getItem("userType");
    if (admin_type === "" || admin_type === null || admin_type === undefined) {
        // Redirect to the login page
        window.location.href = "/adminlogin";
    }
    /*-- Function to open sidebar --*/
    function sideBar() {
        setIsMenuOpen(!isMenuOpen);
        localStorage.setItem("isMenuOpen", isMenuOpen);
    }

    const clearPageNo = () => {
        localStorage.removeItem("PageNo");
    };
    const liRefs = useRef([]);

    useEffect(() => {
        if (props.heading) {
            const activityLi = liRefs.current[props.heading]
            if (activityLi) {
                activityLi.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [props.heading]);

    return (
        <div
            className={`dashboard-sidebar-wrapper pt-5 sidebar_parent ${isMenuOpen ? "show" : ""
                }`}
            id="sidebar"
        >
            <Link
                to={""}
                onClick={() => {
                    sideBar()
                    clearPageNo()
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
            </Link>
            <div className="brand-logo px-2 mb-5 d-none">
                <Link to={user_type === "agent" ? "/partner_profile" : "/dashboard"}>
                    <img src="image/logo-main-black.png" alt="" />
                </Link>
            </div>
            <ul
                className="list-unstyled dashboard-layout-sidebar"
                style={{
                    marginTop:
                        window.innerWidth === 320 || window.innerWidth === 425
                            ? "4.35rem"
                            : "2.25rem",
                }}
            >
                <li
                    ref={(el) => (liRefs.current["Dashboard"] = el)}
                    className={
                        props.heading === "Dashboard"
                            ? "active"
                            : ""
                    }
                >
                    <Link
                        onClick={() => clearPageNo()}
                        to="/study_dashboard"
                        className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
                    >
                        <MdOutlineDashboardCustomize className="sidebar_icon" />
                        Dashboard
                        {/* <i className="fab fa-blackberry mr-5"></i>Dashboard */}
                    </Link>
                </li>
                <li
                    ref={(el) => (liRefs.current["Programs"] = el)}
                    className={
                        props.heading === "Programs"
                            ? "active"
                            : ""
                    }
                >
                    <Link
                        onClick={() => clearPageNo()}
                        to="/programs"
                        className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
                    >
                        <RiMiniProgramFill className="sidebar_icon" />
                        Programs
                        {/* <i className="fab fa-blackberry mr-5"></i>Dashboard */}
                    </Link>
                </li>
                <li
                    ref={(el) => (liRefs.current["Students"] = el)}
                    className={
                        props.heading === "Students"
                            ? "active"
                            : ""
                    }
                >
                    <Link
                        onClick={() => clearPageNo()}
                        to="/students"
                        className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
                    >
                        <SiStudyverse className="sidebar_icon" />
                        Students
                    </Link>
                </li>
                <li
                    ref={(el) => (liRefs.current["Applied Programs"] = el)}
                    className={
                        props.heading === "Applied Programs"
                            ? "active"
                            : ""
                    }
                >
                    <Link
                        onClick={() => clearPageNo()}
                        to="/applied_programs"
                        className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
                    >
                        <VscGitStashApply className="sidebar_icon" />
                        Applied Programs
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default StudyAdminSidebar;
