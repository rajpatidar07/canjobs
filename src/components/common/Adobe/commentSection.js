import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaReplyAll } from "react-icons/fa";
import CommentReplyBox from "../CommentReplyBox";
import moment from "moment";
import { toast } from "react-toastify"
import { ADocAnnotation, GetReplyCommit, SendReplyCommit } from "../../../api/api";
export default function CommentSection({ commentsList,
  docData,
  allAdmin,
  userId,
  annotationDrawBox,
  DocUserType ,
  setAnnotationDrawBox}) {
  const [comments, setComments] = useState()
  const [replyComment, setReplyComment] = useState()
  const [commentsReplyList, setCommentsReplyList] = useState()
    const [filteredEmails, setFilteredEmails] = useState([])
  let [adminid, setAdminId] = useState();
  let [annotationStatus, setAnnotationStatus] = useState();
  let [selectedAdminReply, setSelectedAdminReplye] = useState();
  let [replyCommentClick, setReplyCommentClick] = useState();
  let [selectedAdmin, setSelectedAdmin] = useState();
  let [addMention, setAddMention] = useState();
  let admin_id = localStorage.getItem("admin_id");
  // Generate a list of comments reply
  const getCommentsReplyList = async () => {
    if (docData.id) {
      try {
        let res = await GetReplyCommit(docData.id, adminid, annotationStatus);
        if (res.data.status === (1 || "1")) {
          setCommentsReplyList(res.data.data);
        }
      } catch (err) {
        console.log(err);
        setCommentsReplyList([]);
      }
    } else {
      setCommentsReplyList([]);
    }
  };
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
  /*onchange Function to set email or any other comment  */
  const handleInputChange = (event, type) => {
    const inputValue = event.target.value;
    // Update the input value
    if (type === "reply") {
      setReplyComment(inputValue);
    } else {
      setComments(inputValue);
    }

    let lastChar = inputValue.slice(-1);
    const atIndex = inputValue.indexOf("@");

    if (lastChar === "@" || inputValue.includes("@")) {
      if (allAdmin) {
        // Filter admin emails based on input
        let filteredAdminEmails = allAdmin.filter(
          (admin) =>
            admin.email.toLowerCase().includes(
              String(inputValue)
                .substring(atIndex + 1)
                .toLowerCase()
            ) ||
            admin.name.toLowerCase().includes(
              String(inputValue)
                .substring(atIndex + 1)
                .toLowerCase()
            )
        );

        // Update the filtered emails
        setFilteredEmails(filteredAdminEmails);
      }
    } else {
      setFilteredEmails([]);
    }
  };
  /*Function to get the email to assign */
  const handleEmailClick = (email, type) => {
    // Set the selected admin and update the input value
    if (type === "reply") {
      setSelectedAdminReplye((prevValue) => prevValue + email + ",");
      setReplyComment((prevValue) => `${prevValue} ${email} `);
    } else {
      setSelectedAdmin((prevValue) => prevValue + email + ",");
      setComments((prevValue) => `${prevValue} ${email} `);
    }
    setFilteredEmails([]);
  };
  /*Function to get the email to input on hover */
  const handleEmailMouseOver = (email, type) => {
    // Highlight the email on mouseover
    if (type === "reply") {
      setSelectedAdminReplye(email);
    } else {
      setSelectedAdmin(email);
    }
  };
  // Function to add annotation based on conditions
  const addAnnotation = async (annotation) => {
    // setAddCommentFlag(false);
    // Retrieve data from local storage

    const subject = "";
    const comment = comments; ///\S+@\S+\.\S+/.test(comments) ? "" : comments;
    let DocId = docData.id//docId;
    //   ? docId
    //   : docData.find((item) => item.type === docName).id;
    let sender = allAdmin.find((item) => item.admin_id === admin_id)
      ? allAdmin.find((item) => item.admin_id === admin_id).name
      : "";
    let senderEmail = allAdmin.find((item) => item.admin_id === admin_id)
      ? allAdmin.find((item) => item.admin_id === admin_id).email
      : "";
    const AdminType = localStorage.getItem("admin_type");
    // Variables for mentionaing admins
    const email = selectedAdmin || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = allAdmin.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? allAdmin
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => admin.name)
        .join(",")
      : "";
    const assignedUserId = allAdmin.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? allAdmin
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => admin.admin_id)
        .join(",")
      : "";
    const assignedUserType = "admin";
    // allAdmin.filter((item) =>
    //   selectedAdmin.includes(item.email)
    // )
    //   ? allAdmin
    //     .filter((item) => selectedAdmin.includes(item.email))
    //     .map((admin) => admin.admin_type)
    //     .join(",")
    //   : "";
    // Send data to the API
    if ((comment === "" && email === "") ||
      (comment.includes("@") && !/\S+@\S+\.\S+/.test(comment))) {
      toast.error("Comment or email cannot be empty!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      try {
        let res = await ADocAnnotation(
          admin_id,
          DocId,
          assignedUserId,
          email,
          subject,
          comment,
          "",//annotation.x_axis,
          "",//annotation.y_axis,
          "document",
          AdminType, //sender type
          sender, //sender name,
          assignedAdminName, //assigned Admin or user Name,
          "", //follow up status(for notes only)
          "", //Next follow up date(for notes only)
          assignedUserType, //Assign user type,
          "", //Document url(for notes only)
          senderEmail, //Sender email
          userId, //employee id,
          "", //assigned_by_id
          docData.parentReference.id, // document parent code
          annotationDrawBox, //Annotation data,
          "",//annotationId
          DocUserType,//User type of document  
        );
        if (res.data.message === "task inserted successfully!") {
          toast.success("Comment uploaded Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          // setSelectedAnnotation(null);
          setComments("");
          // setCommentApiCall(true);
          setSelectedAdmin("");
          // setAnnotationMode(!isAnnotationMode);
          setFilteredEmails([]);
          // setNotificationApiCall(true);
          localStorage.setItem("callNotification", true);
        }
      } catch (err) {
        console.log(err);
        if (err.response.data.message === "required fields cannot be blank") {
          toast.error(" Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          // setSelectedAnnotation(null);
          setComments("");
          setSelectedAdmin("");
          // setCommentApiCall(true);
          // setAnnotationMode(!isAnnotationMode);
          // setAddCommentFlag();
          setFilteredEmails([]);
        }
      }
    }
    // Update state to include the new annotation
    // setImageAnnotations([...imageAnnotations, { x, y }]);
  };
   /*Function to reply for the comment */
   const ReplyAnnotation = async (data) => {
    // let emailrejex = /\S+@\S+\.\S+/;
    // let id = emailrejex.test(selectedAdminReply)
    //   ? allAdmin.find((item) => item.email === selectedAdminReply).admin_id
    //   : data.assined_to_user_id;
    // let adminType = emailrejex.test(selectedAdminReply)
    //   ? allAdmin.find((item) => item.email === selectedAdminReply).admin_type
    //   : "admin";
    let sender = allAdmin.find((item) => item.admin_id === admin_id)
      ? allAdmin.find((item) => item.admin_id === admin_id).name
      : "";
    let senderId = allAdmin.find((item) => item.admin_id === admin_id)
      ? allAdmin.find((item) => item.admin_id === admin_id).admin_id
      : "";
    let senderEmail = allAdmin.find((item) => item.admin_id === admin_id)
      ? allAdmin.find((item) => item.admin_id === admin_id).email
      : "";
    let senderType = allAdmin.find((item) => item.admin_id === admin_id)
      ? allAdmin.find((item) => item.admin_id === admin_id).admin_type
      : "";
    // let assignedAdminName = allAdmin.find(
    //   (item) => item.email === selectedAdminReply
    // )
    //   ? allAdmin.find((item) => item.email === selectedAdminReply).name
    //   : "";
    // Variables for mentioning admins
    const email = selectedAdminReply || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = allAdmin.filter((item) =>
      selectedAdminReply?.includes(item.email)
    )
      ? allAdmin
        .filter((item) => selectedAdminReply?.includes(item.email))
        .map((admin) => admin.name)
        .join(",")
      : "";
    const assignedUserId = allAdmin.filter((item) =>
      selectedAdminReply?.includes(item.email)
    )
      ? allAdmin
        .filter((item) => selectedAdminReply?.includes(item.email))
        .map((admin) => admin.admin_id)
        .join(",")
      : "";
    const AdminType = //localStorage.getItem("admin_type");
      allAdmin.filter((item) => selectedAdminReply?.includes(item.email))
        ? allAdmin
          .filter((item) => selectedAdminReply?.includes(item.email))
          .map((admin) => admin.admin_type)
          .join(",")
        : "";
    if (replyComment === "" && email === "") {
      toast.error("Comment or email cannot be empty!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      try {
        let res = await SendReplyCommit(
          data,
          email,
          replyComment,
          assignedUserId,
          AdminType,
          sender,
          assignedAdminName,
          "document",
          senderId,
          senderEmail,
          senderType,
          userId, //Userid
          docData.parentReference.id
        );
        if (res.data.message === "message sent successfully!") {
          toast.success("Replied Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          // setNotificationApiCall(true);
          localStorage.setItem("callNotification", true);
          setReplyComment("");
          getCommentsReplyList();
          setSelectedAdminReplye("");
          setFilteredEmails([]);
        }
      } catch (err) {
        console.log(err);
        setSelectedAdminReplye("");
        setFilteredEmails([]);
      }
    }
  };
  return (
    <div className="col-md-4 col-lg-4 col-sm-3 px-2 py-2 comments_and_replies">
      {
        addMention ? //condition for imm pdf
        // (docData.name && docData.name.toLowerCase().includes("imm")
        //   ? replyCommentClick === undefined ||
        //   replyCommentClick === "" ||
        //   replyCommentClick === null
        //   : addCommentFlag === true) ?
        (
          <div
            style={
              {
                // position: "absolute",
                // left: selectedAnnotation.x_axis + 10,
                // top: selectedAnnotation.y_axis + 20,
                // zIndex: 1,
              }
            }
            className="pt-0 pb-5"
          >
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                addAnnotation(annotationDrawBox);
              }}
            >
              <div className="comment-input-container m-0 mb-2">
                <label className="m-0">
                  <b> Add Annotation:</b>
                </label>
                <input
                  type="text"
                  value={comments || ""}
                  onChange={handleInputChange}
                  placeholder="Comments or add others with @"
                  className="comment-input"
                />
                {filteredEmails.length > 0 && (
                  <ul className="email-suggestions">
                    {filteredEmails.map((email) => (
                      <li
                        key={email.email}
                        onClick={() => handleEmailClick(email.email)}
                        onMouseOver={() => handleEmailMouseOver(email.email)}
                        className="email-suggestion-item"
                      >
                        <strong>{email.name}</strong>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="button-container mx-0">
                <button
                  type="submit"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   addAnnotation(selectedAnnotation);

                  // }}
                  className="btn-sm btn-primary save-comment-btn"
                >
                  Save Comment
                </button>
                <button
                  className="btn-sm btn-light cancel-btn"
                  onClick={() => {
                    // setAddCommentFlag();
                    // setSelectedAnnotation(null);
                    setComments("");
                    // setAnnotationMode(!isAnnotationMode);
                    setAddMention(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
        : 
        <div className="button-container mx-0">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddMention(true);

                  }}
                  className="btn-sm btn-primary save-comment-btn"
                >
                  Mention Admin
                </button>
                </div>
      }
      <div>
        <div style={{ marginTop: "0px" }}>
          <div className="row m-0 px-2">
            <div className="col mr-2 p-0 form_group">
              <p className="input_label">Filter by Admin:</p>
              <div className="select_div">
                <select name="admin" id="admin"
                  value={adminid}
                  onChange={(e) => {
                    setAdminId(e.target.value)
                  }} className="text-capitalize form-control">
                  <option value={""}>Select Admin</option>
                  {(allAdmin || []).map((data, index) => {
                    return (
                      <option value={data.admin_id} key={index}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col ml-2 p-0 form_group">
              <p className="input_label">Filter by Status:</p>
              <div className="select_div">
                <select name="status" id="status"
                  onClick={(e) => setAnnotationStatus(e.target.value)}
                  className="text-capitalize form-control">
                  <option value={""}>Select Status</option>
                  <option value={"1"}>Done</option>
                  <option value={"0"}>Pending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row m-0 p-2 flex-column">
            {commentsList.length === 0 ? (
              <div className="col text-center">
                <h5>No comments</h5>
              </div>
            ) : (
              (commentsList || []).map((commentItem, index) => (
                <div
                  className={`card col-12 mb-3 p-0 comment_box_card`}
                  // ${
                  //   //Condition fot imm pdf doc file
                  //   docTypData &&
                  //   docTypData.document_name &&
                  //   docTypData.document_name.toLowerCase().includes("imm")
                  //     ? null
                  //     : selectedAnnotation &&
                  //       selectedAnnotation.x_axis === commentItem.x_axis &&
                  //       selectedAnnotation.y_axis === commentItem.y_axis
                  //     ? "highlighted-comment"
                  //     : ""
                  // }`}
                  style={{
                    backgroundColor: "#fafafa",
                    color: "white",
                  }}
                  onClick={() => {
                    setAnnotationDrawBox(JSON.parse(commentItem.doctaskjson).id)}}
                  key={index}
                >
                  <span
                    className="comment_status_update d-none"
                    style={{
                      cursor: "pointer",
                      // color: commentItem.status === "0" ? "blue" : "white",
                      // border: commentItem.status === "0" ? "solid 1px blue" : "",
                      // backgroundColor: commentItem.status === "1" && "green",
                    }}
                  // onClick={(e) => {
                  //   OnHandleUpdateComment(commentItem);
                  //   setFilteredEmails([]);
                  //   setAddCommentFlag(false);
                  // }}
                  >
                    &#x2713; {/* Checkmark symbol */}
                  </span>
                  <div className="card-body p-2">
                    <div className="text-dark">
                      <div className="d-flex profile_box gx-2 mb-1">
                        <div className="media  align-items-center">
                          <div
                            className={`circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                              commentItem
                            )}`}
                            style={{ fontSize: "20px" }}
                          >
                            {commentItem.task_creator_user_id
                              ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.task_creator_user_id
                              )
                                ? allAdmin
                                  .find(
                                    (item) =>
                                      item.admin_id ===
                                      commentItem.task_creator_user_id
                                  )
                                  .name.charAt(0)
                                : ""
                              : ""}
                          </div>
                        </div>
                        <div className=" mb-0">
                          <div className="font-size-3 font-weight-bold text-capitalize">
                            {commentItem.task_creator_user_id
                              ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.task_creator_user_id
                              )
                                ? allAdmin.find(
                                  (item) =>
                                    item.admin_id ===
                                    commentItem.task_creator_user_id
                                ).name
                                : ""
                              : ""}
                          </div>
                          <div className="text-gray font-size-2 font-weight-normal m-0 text-capitalize">
                            {moment(commentItem.created_on).tz('America/Toronto').format("HH:mm D MMM")}
                            {/* {moment(commentItem.created_on).format("HH:mm D MMM")} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {commentItem.subject_description && (
                      <span className="card-title text-break text-dark m-0 font-size-3">
                        {commentItem.subject_description.replace(/@ /g, " ")}
                      </span>
                    )}
                    {/* {commentItem.assigned_to && (
                    <span
                      className="text-break font-size-3 text-primary"
                      to={`mailto:${commentItem.assigned_to}`}
                      style={{ marginLeft: "5px" }}
                    >
                      {`${commentItem.assigned_to}`}
                    </span>
                  )} */}
                  </div>
                  {replyCommentClick === commentItem.id ? (
                  //Reply box
                  <CommentReplyBox
                    commentsReplyList={commentsReplyList}
                    replyComment={replyComment}
                    handleInputChange={handleInputChange}
                    filteredEmails={filteredEmails}
                    handleEmailClick={handleEmailClick}
                    handleEmailMouseOver={handleEmailMouseOver}
                    ReplyAnnotation={ReplyAnnotation}
                    setReplyCommentClick={setReplyCommentClick}
                    commentItem={commentItem}
                    allAdmin={allAdmin}
                  />
                ) : (
                  <Link
                    className="mx-5 mr-0 ml-auto font-size-3 "
                    onClick={() => {
                      setReplyCommentClick(commentItem.id);
                      getCommentsReplyList();
                      // setAddCommentFlag(false);
                      setFilteredEmails([]);
                    }}
                  >
                    Reply <FaReplyAll />
                  </Link>
                )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
