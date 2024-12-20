import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import NotificationsCard from "./notificationsCard";
import {
  ReadNotification,
  getAllMentionNotification /* getAllAdminNotification,*/,
} from "../../api/api";
import { Link } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import ConvertTime from "../common/ConvertTime";
function Notifications({
  type,
  // userId,
  // setDocId,
  // setNotificationDoc,
  // setSelecttDocTypeName,
  // notificationApiCall,
  // setNotificationApiCall,
  // user_type,
}) {
  const [show, setshow] = useState(false);
  let [totalNotif, setTotalNotif] = useState();
  let [notification, setNotiication] = useState([]);
  const [apicall, setApicall] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  let user_type = localStorage.getItem("userType");
  let admin_type = localStorage.getItem("admin_type");
  let loginuserId =
    user_type === "admin"
      ? localStorage.getItem("admin_id")
      : user_type === "user"
        ? localStorage.getItem("employee_id")
        : user_type === "agent"
          ? localStorage.getItem("agent_id")
          : "";
  /*notification API Call*/
  const Notiication = async () => {
    try {
      let Response = await getAllMentionNotification(
        type,
        loginuserId,
        user_type === "admin" ? admin_type : user_type,
        "",
        1,
        recordsPerPage
      ); //getAllAdminNotification(); //(new) getAllMentionNotification(loginuserId); //getAllAdminNotification();
      if (Response.Data.data.length === 0) {
        setNotiication([]);
        setTotalNotif();
      } else {
        setNotiication(user_type === "agent" ? Response.Data.data.filter((item) => item.document_user_type !== "employer") : Response.Data.data);
        setTotalNotif(
          user_type === "agent"
            ? Response.Data.data.filter((item) => (item.document_user_type !== "employer" && (item.is_read === 0 || item.is_read === "0"))).length :
            Response.Data.data.filter(
              (item) => item.is_read === 0 || item.is_read === "0"
            ).length
        );
      }
    } catch (err) {
      console.log(err);
    }
    setApicall(false);
  };
  useEffect(() => {
    Notiication();
    // if (notificationApiCall === true) {
    //   setNotificationApiCall(false);
    // }
    if (localStorage.getItem("callNotification") === true) {
      localStorage.setItem("callNotification", false);
    }
    // eslint-disable-next-line
  }, [
    apicall,
    // eslint-disable-next-line
    localStorage.getItem("callNotification"),
    recordsPerPage /*notificationApiCall*/,
  ]);
  /*Function to set the color code to the background of the user name */
  const determineBackgroundColor = (commentItem) => {
    const colorClasses = [
      "bg-primary-opacity-7",
      "bg-warning-opacity-7",
      "bg-orange-opacity-6",
      "bg-info-opacity-7",
      "bg-secondary-opacity-7",
      "bg-danger-opacity-6",
      "bg-info-opacity-visible",
    ];

    const assignedUserId = commentItem.assigned_to_user_id;

    // Create a mapping dynamically based on assignedUserId
    const userColorMap = {};

    // Check if assignedUserId is present in the mapping
    if (assignedUserId && userColorMap.hasOwnProperty(assignedUserId)) {
      return userColorMap[assignedUserId];
    }

    // If not found in the mapping, use the colorClasses logic
    const id = commentItem.id;
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return hash;
    };

    const hash = Math.abs(hashCode(id.toString()));
    const index = hash % colorClasses.length;

    return colorClasses[index];
  };
  /*Function to load more data while scrolling */
  let handelScroll = (e) => {
    if ((recordsPerPage === 10 || recordsPerPage + 10) <= notification.length) {
      setRecordsPerPage(recordsPerPage + 10);
    } else {
      // setRecordsPerPage(emailData.length);
    }
  };
  return (
    <div className="global_search_box  position-relative">
      {/* <i
        style={{ cursor: "pointer" }}
        className="fas fa-regular fa-bell text-dark mx-5"
        onClick={() => setshow(true)}
      ></i> */}
      {type === "" ? (
        <span title="Chat Notifications">
          <FaRegBell
            style={{ cursor: "pointer" }}
            className="text-white bold mx-5"
            onClick={() => {
              setshow(true);
              setApicall(true);
            }}
          />
        </span>
      ) : (
        <span title="Document Notifications">
          <CgFileDocument
            style={{ cursor: "pointer" }}
            className="text-white  mx-5"
            onClick={() => {
              setshow(true);
              setApicall(true);
            }}
          />
        </span>
      )}
      {totalNotif > 0 ? (
        <div className="bg-primary text-white notification_count">
          {totalNotif}
        </div>
      ) : (
        ""
      )}
      <div
        className={
          show
            ? " d-flex global_search_content notification_box position-fixed show"
            : " d-flex global_search_content notification_box position-fixed"
        }
      >
        <div className="left_side" onClick={() => setshow(false)}></div>
        <div className="right_side bg-white">
          <div className="global_search d-flex align-items-center p-3 px-5 justify-content-between">
            <h4 className="font-size-5 font-weight-bold m-0 border-bottom text-uppercase px-5">
              Notifications
            </h4>
            <i
              style={{ fontSize: "22px" }}
              className="fas fa-times text-dark ml-4"
              onClick={() => setshow(false)}
            ></i>
          </div>
          <div
            className="row global_search_result notofications_list  px-5 "
            onScroll={handelScroll}
            style={{ overflowY: "scroll", height: "750px" }}
          >
            {notification.length > 0 && (
              <ul className="w-100 col p-0 ">
                {notification.map((data) => (
                  // <li
                  //   key={data.id}
                  //   title={data.message}
                  //   className={
                  //     data.is_read === "1"
                  //       ? " dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap "
                  //       : " font-weight-bold bg-light dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap "
                  //   }
                  // >
                  //   <Link
                  //     to={
                  //       data.subject === "added_new_job"
                  //         ? "/job"
                  //         : data.subject === "applied_on_job"
                  //           ? "/responses"
                  //           : data.subject === "interview_scheduled"
                  //             ? "/interview"
                  //             : data.subject === "mention_document" ? `/${data.employee_id}?docId=${data.mention_id}` : type === "mention_partner"
                  //               ? `/${data.from_id}?partner=${data.from_id}`
                  //               : ""
                  //     }
                  //     onClick={() => {
                  //       try {
                  //         // setDocId(data.mention_id);
                  //         setshow(false);
                  //         ReadNotification(data.id);
                  //         // localStorage.setItem(
                  //         //   type === "mention_document" ? "notificationUser" : type === "mention_partner" ? "notificationPartnerUser" : "",
                  //         //   data.employee_id
                  //         // );
                  //         // setNotificationDoc(1);
                  //         // setSelecttDocTypeName("");
                  //       } catch (err) {
                  //         console.log(err);
                  //       }
                  //       setApicall(true);
                  //       // Notiication();
                  //     }}
                  //     className="text-truncate-2 text-dark"
                  //   >
                  //     <div>
                  //       <div className="d-flex profile_box gx-2 mb-1 ">
                  //         <div className="col-8 flex-start text-start">
                  //           <div className="media  align-items-center">
                  //             <div
                  //               className={`col circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                  //                 data
                  //               )}`}
                  //               style={{ fontSize: "20px" }}
                  //             >
                  //               {data.receiver_name
                  //                 ? data.receiver_name.charAt(0)
                  //                 : ""}
                  //             </div>
                  //             <div className="font-size-3 font-weight-bold text-capitalize col">
                  //               {data.receiver_name ? data.receiver_name : ""}
                  //             </div>
                  //           </div>
                  //         </div>
                  //         <div className="date flex-end text-end col-4">
                  //           {moment(data.created_at).format("HH:mm D MMM")}
                  //         </div>
                  //       </div>
                  //       <div className="message mt-3 mx-3">
                  //         {data.message.replace("a", "Hi")}
                  //       </div>
                  //     </div>
                  //     {/* {data.message.replace("a", "Hi")} */}
                  //   </Link>
                  // </li>
                  <li
                    key={data.id}
                    className={
                      `dropdown-item border-bottom border-hit-gray font-size-3 text-wrap`
                    }
                    style={{
                      padding: "10px", borderBottom: "1px solid #ddd", backgroundColor: data.is_read === "1"
                        ? "#eaeaea" : ""
                    }}
                  >
                    <Link
                      to={
                        data.subject === "new_user_registered"
                          ? "/selfemployee"
                          : data.subject === "new_employer_registered"
                            ? "/adminclient"
                            : data.subject === "added_new_job"//New jobs
                              ? "/job"
                              : data.subject === "applied_on_job"//New job responses
                                ? "/responses"
                                : data.subject === "interview_scheduled"//Interview scheduled
                                  ? "/interview"
                                  : data.subject === "mention_document"//Mention documents
                                    ? data.document_user_type === "employer" //Mention documents for employer
                                      ? `/client_detail?docId=${data.mention_id
                                      }&docParentId=${data.notif_json
                                        ? JSON.parse(data.notif_json).doc_parent_id
                                        : ""
                                      }&annotationId=${data.notif_json
                                        ? JSON.parse(data.notif_json).annotation_id
                                        : ""}&taskId=${JSON.parse(data.notif_json).task_id}`
                                      ://Mention documents for employee
                                      `/${data.employee_id}?docId=${data.mention_id
                                      }&docParentId=${data.notif_json
                                        ? JSON.parse(data.notif_json).doc_parent_id
                                        : ""
                                      }&annotationId=${data.notif_json
                                        ? JSON.parse(data.notif_json).annotation_id
                                        : ""}&taskId=${JSON.parse(data.notif_json).task_id}`
                                    : data.subject === "mention_partner"//Partner admin chat for employee
                                      ? `/${data.employee_id}?partner=${data.from_id}`
                                      : data.subject === "mention_partnerChat"//Partner admin chat for partner
                                        ? `/partner_profile?partner=${data.employee_id}`
                                        : data.subject === "assigned_admin_to_partner"
                                          ?
                                          "/partner_profile"
                                          : data.subject === "mention_notes"//Notes for employer
                                            ? data.document_user_type === "employer"
                                              ? `/client_detail?note=true&noteid=${data.mention_id}`
                                              : data.document_user_type === "agent" && (window.location.pathname === "/partner_profile")//Notes for agent with same path as navigation
                                                ?
                                                `?note=true&noteid=${data.mention_id}`
                                                : data.document_user_type === "agent" ? `/partner_profile?note=true&noteid=${data.mention_id}`//Notes for agent
                                                  : `/${data.employee_id}?note=true&noteid=${data.mention_id}`//Notes for employee
                                            : data.subject === "signed_agreement"
                                              ? data.document_user_type === "employer"//AGREEMENT FOR EMPLOYER
                                                ? `/client_detail?agreement=true`
                                                : `/${data.employee_id}?agreement=true`//AGREEMENT FOR EMPLOYEE
                                              : ""

                      }
                      onClick={() => {
                        try {
                          setshow(false);
                          ReadNotification(data.id);
                          setApicall(true);
                          window.history.replaceState({}, document.title, "/");
                          if (data.subject === "mention_partnerChat") {
                            localStorage.setItem("agent_id", data.employee_id);
                          } else if (data.subject === "assigned_admin_to_partner" || (data.document_user_type === "agent" && data.subject === "mention_notes")) {
                            localStorage.setItem("agent_id",
                              data.document_user_type === "agent" ? data.employee_id : data.action_id);
                          } else if ((data.subject === "mention_document" || data.subject === "mention_notes" || data.subject === "signed_agreement")
                            && data.document_user_type === "employer") {
                            localStorage.setItem("company_id", data.employee_id);
                          }
                        } catch (err) {
                          console.log(err);
                        }
                        setApicall(true);
                      }}
                      className="text-dark text-decoration-none d-flex justify-content-between"
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className={`circle-48 mx-2 text-center text-capitalize  text-white font-weight-bold  ${determineBackgroundColor(
                            data
                          )}`}
                        >
                          {data.receiver_name ? data.receiver_name.charAt(0) : ""}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="font-weight-bold text-truncate w-60 intervire-msg">
                              {data.receiver_name ? data.receiver_name : ""}
                            </div>
                          </div>
                          <div
                            className={`${data.is_read !== "1" ? "font-weight-bold" : ""}  mw-80 notification_text_msg`}
                            style={{ fontSize: "14px" }}
                          >
                            <div className="intervire-msg" dangerouslySetInnerHTML={{ __html: data.message }} />
                          </div>
                        </div>
                      </div>
                      <div className="text-muted font-size-2 line-height-1 ml-2">
                        <ConvertTime _date={data.created_at} format={'LLL'} />
                        {/* {moment(data.created_at).format("HH:mm")} */}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Notifications;
