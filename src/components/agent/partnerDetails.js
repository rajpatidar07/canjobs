import React, { useState, useEffect } from "react";
import EmployeeHeader from "../common/header";
import CustomButton from "../common/button";
import { GetAgent } from "../../api/api";
import { ToastContainer } from "react-toastify";
import Loader from "../common/loader";
import { Link, useNavigate } from "react-router-dom";
import { PiPencilDuotone } from "react-icons/pi";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import { BsEnvelope } from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";
import ContactPage from "../common/contactPage"
import AgentsEmployee from "../common/AgentEmployee";
import AddAgent from "../forms/admin/addAgent";
// import AgentConversation from "../common/AgentConversation";
export default function PartnerDetails() {
    const user_type = localStorage.getItem("userType");
    const agent_id = localStorage.getItem("agent_id");
    let Pid = agent_id;
    let navigate = useNavigate();
    /*Show modal and data state */
    // const [lima, setLmia] = useState(false);
    let [apiCall, setApiCall] = useState(false);
    let [isLoading, setIsLoading] = useState(true);
    // const [lmiaStatusRejectComment, setLmiaStatusRejectComment] = useState([]);
    const [showPartnerInfoModal, setShowPartnerInfoModal] = useState(false);
    useState(false);
    const [TabActive, setTabActive] = useState("profile");
    const [data, setData] = useState("");

    /*Function to get Partner data */
    const PartnerData = async () => {
        try {
            let userData = await GetAgent(Pid);
            if (user_type === "agent") {
                localStorage.setItem(
                    "profile_photo",
                    userData.data.data[0].logo
                );
                localStorage.setItem(
                    "name",
                    userData.data.data[0].company_name
                );
            }
            if (userData === undefined) {
                setData("");
            }
            else {
                setData(userData.data.data[0]);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
    /*Render method to get Partner data */
    useEffect(() => {
        PartnerData();
        if (apiCall === true) {
            setApiCall(false);
        }

    }, [apiCall, agent_id]);
    return (
        <div>
            {(user_type === "admin" || user_type === "agent") ? (
                <>
                    <AdminHeader
                        heading={
                            <Link
                                className="d-flex align-items-center "
                                onClick={() => navigate(-1)}
                            >
                                <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                                <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                                    <h3 className="font-size-6 mb-0 text-capitalize">
                                        Partner's Profile
                                    </h3>
                                </span>
                            </Link>
                        }
                    />
                    <AdminSidebar />
                </>
            ) : null}
            <ToastContainer />
            {user_type === "admin" || user_type === "agent" ? null : <EmployeeHeader />}
            <div
                className={
                    user_type === "admin" || user_type === "agent"
                        ? "dashboard-main-container bg-light mt-12 mt-lg-12"
                        : "bg-default-2 pt-30 pt-lg-22 pb-lg-27"
                }
            >
                <div className={`container${user_type === "admin" || user_type === "agent" ? "-fluid" : ""}`}>
                    <div className="row text-left mt-5 pt-0">
                        <div className="col-12 order-2 order-xl-1">
                            <div className="bg-white">
                                {/*----Profile Header----*/}
                                <ul
                                    className="nav border-top border-bottom border-mercury user_profile_tab"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="tab-menu-items nav-item">
                                        <Link
                                            className={
                                                TabActive === "profile"
                                                    ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                                                    : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                                            }
                                            id="home-tab"
                                            data-toggle="tab"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                            onClick={() => setTabActive("profile")}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="tab-menu-items nav-item">
                                        <Link
                                            className={
                                                TabActive === "applicants"
                                                    ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                                                    : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                                            }
                                            id="applicants"
                                            data-toggle="tab"
                                            role="tab"
                                            aria-controls="applicants"
                                            aria-selected="true"
                                            onClick={() => setTabActive("applicants")}
                                        >
                                            Applicants
                                        </Link>
                                    </li>
                                    <li className="tab-menu-items nav-item">
                                        <Link
                                            className={
                                                TabActive === "support"
                                                    ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                                                    : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                                            }
                                            id="support"
                                            data-toggle="tab"
                                            role="tab"
                                            aria-controls="support"
                                            aria-selected="true"
                                            onClick={() => setTabActive("support")}
                                        >
                                            Support
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            user_type === "admin" || user_type === "agent"
                                                ? "tab-menu-items nav-item"
                                                : "d-none"
                                        }
                                    >
                                        {/*Take off "d-none" when you use the activity log API or when you're told to remove it*/}
                                        <Link
                                            className={
                                                TabActive === "contact"
                                                    ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                                                    : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                                            }
                                            id="activityTab"
                                            data-toggle="tab"
                                            role="tab"
                                            aria-controls="activityTab"
                                            aria-selected="true"
                                            onClick={() => setTabActive("contact")}
                                        >
                                            Contact Us
                                        </Link>
                                    </li>

                                </ul>
                                {/*---Profile Details----*/}
                                <div
                                    className={TabActive === "profile" ? "tab-content" : "d-none"}
                                    id="myTabContent"
                                >
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                        aria-labelledby="home-tab"
                                    >
                                        {/*----About Employee----*/}
                                        {isLoading ? (
                                            <div className="table-responsive main_table_div">
                                                <Loader />
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    user_type === "admin" || user_type === "agent" ? "row m-0" : "row m-0"
                                                }
                                            >
                                                {/* <!-- Company Profile --> */}

                                                <div className="company_detail_box w-100 row m-0 p-8">
                                                    <div className="bg-white row m-0 w-100 ">
                                                        <div className="col-md-12 col-sm-12 p-0 media align-items-center company_box media bg-light rounded p-8">
                                                            <div className="text_box text-left">
                                                                <img
                                                                    className="company_logo"
                                                                    src={
                                                                        data.profile_image === null
                                                                            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                                                            : data.profile_image
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="text_box text-left w-100">
                                                                <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center text-break text-capitalize">
                                                                    <span>
                                                                        <b title="Partner Name">
                                                                            {data.name
                                                                                ? data.name
                                                                                : "Unknown Partner"}
                                                                        </b>
                                                                    </span>
                                                                </h3>
                                                                <CustomButton
                                                                    className={
                                                                        user_type === "user"
                                                                            ? "d-none"
                                                                            : "font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                                                                    }
                                                                    onClick={() => setShowPartnerInfoModal(true)}
                                                                >
                                                                    <PiPencilDuotone />
                                                                </CustomButton>
                                                                <p className="font-size-3 text-default-color line-height-2 m-0 text-break">
                                                                    <span className="mr-3" title="Unique Id">
                                                                        {data.u_id}
                                                                    </span>

                                                                </p>

                                                                <hr className="my-3" />
                                                                <div className="position-relative">
                                                                    {data.country && <span
                                                                        className="font-size-3 text-smoke  mr-7 text-capitalize"
                                                                        title="Currently Located Country"
                                                                    >
                                                                        <img
                                                                            className="mr-1"
                                                                            height={"16px"}
                                                                            src="image/icons/address-book.svg"
                                                                            alt="Address"
                                                                        />
                                                                        {data.country}
                                                                    </span>}
                                                                    {(data.address || data.city || data.state) && <span
                                                                        className="font-size-3 text-smoke  mr-7 text-capitalize"
                                                                        title="Current Location"
                                                                    >
                                                                        <img
                                                                            className="mr-1"
                                                                            height={"16px"}
                                                                            src="image/icons/marker.svg"
                                                                            alt="Location"
                                                                        />
                                                                        {`${data.address} ${data.city ? " , " + data.city : ""} ${data.state ? " , " + data.state : ""}`}
                                                                    </span>}
                                                                </div>
                                                                <hr className="my-3" />
                                                                {!data.email || user_type === "user" ? (
                                                                    ""
                                                                ) : (
                                                                    <div
                                                                        className="d-flex"
                                                                        style={{ gap: "10px" }}
                                                                    >
                                                                        {data.contact_no && data.contact_no !== (0 || "0") && <Link
                                                                            className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4"
                                                                            to={`tel:${data.contact_no}`}
                                                                        >
                                                                            <BiPhoneCall className="text-secondary font-size-5 mr-2" />
                                                                            {data.contact_no}
                                                                        </Link>}
                                                                        {data.email && <Link
                                                                            className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4"
                                                                            to={`mailto:${data.email}`}
                                                                        >
                                                                            <BsEnvelope className="font-size-3 mr-4" />
                                                                            {data.email}
                                                                        </Link>}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* <div className="col-md-2 col-sm-6 d-flex justify-content-between">           
                              <CustomButton
                                className=" font-size-4 rounded-3 btn-primary border-0"
                                onClick={() => setShowDoc(true)}
                              >
                                Add Document
                              </CustomButton>
                            </div> */}
                                                    </div>
                                                    {/* <div className="col-md-12 col-lg-12 p-8 mt-5 bg-light rounded">
                                                        <div>
                                                            <h4 className="text-black-2 mb-0 font-size-5 d-flex align-items-center justify-content-space-between text-break">
                                                                <span>About {data.company_name}</span>
                                                             
                                                            </h4>
                                                            <div className="pt-5 text-left">
                                                                {data.about ? (
                                                                    // <p className="font-size-4 mb-8">
                                                                    //   {data.about}
                                                                    // </p>
                                                                    <div className="w-100 card p-5 shadow-8 border-0 m-0 text-break">
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: data.about,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <p className="font-size-4 mb-8 text-center">
                                                                        No data Found
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- Sidebar End --> */}
                                <div
                                    className={
                                        TabActive === "applicants"
                                            ? "row m-0  justify-content-center"
                                            : "d-none"
                                    }
                                    id="applicants"
                                    role="tabpanel"
                                    aria-labelledby="applicants"
                                >
                                    <div className="response_main_div w-100">
                                        <AgentsEmployee
                                            Agentid={Pid}
                                            apiCall={apiCall}
                                            setApiCall={setApiCall}
                                            heading={"Dashboard"}
                                            user_of_page={"agentAssigned"}
                                        />                                    </div>
                                    {/* <!-- Top Start --> */}
                                </div>
                                <div
                                    className={
                                        TabActive === "contact"
                                            ? "justify-content-center "
                                            : "d-none"
                                    }
                                >
                                    {TabActive === "contact" ? (
                                        <ContactPage email={data.email} />
                                    ) : null}
                                </div>
                                <div
                                    className={
                                        TabActive === "support"
                                            ? "justify-content-center "
                                            : "d-none"
                                    }
                                >
                                    Support
                                    {/* {TabActive === "support" ? (
                                      <AgentConversation
                                      userEmail={data.email}
                                      userName={data.name}
                                      assignusertype={"agent"}
                                    //   partnerChat={partnerChat}
                                      reffer_by={Pid}/>
                                    ) : null} */}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showPartnerInfoModal ?
                    <AddAgent
                        show={showPartnerInfoModal}
                        agentId={Pid}
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                        close={() => setShowPartnerInfoModal(false)} />
                    : null
            }
        </div>
    )
}
