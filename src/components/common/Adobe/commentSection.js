import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentReplyBox from "../CommentReplyBox";
import { toast } from "react-toastify";
import { CiPaperplane } from "react-icons/ci";
import {
  ADocAnnotation,
  GetCommentsAndAssign,
  GetReplyCommit,
  SendReplyCommit,
  UpdateDocuentcommentAssign,
} from "../../../api/api";
import ConvertTime from "../ConvertTime";
export default function CommentSection({
  commentsList,
  docData,
  allAdmin,
  userId,
  annotationDrawBox,
  DocUserType,
  setAnnotationId,
  annotationId,
  setCommentsList,
  setAnnotationData,
  setAnnotationDrawBox,
  partnerList
}) {
  const [comments, setComments] = useState();
  const [commentToApi, setCommentToApi] = useState();
  const [replyCommentToApi, setReplyCommentToApi] = useState();
  const [replyComment, setReplyComment] = useState();
  const [commentsReplyList, setCommentsReplyList] = useState();
  const [filteredEmails, setFilteredEmails] = useState([]);
  // let [adminid, setAdminId] = useState();
  // let [annotationStatus, setAnnotationStatus] = useState();
  let [selectedAdminReply, setSelectedAdminReplye] = useState("");
  let [replyCommentClick, setReplyCommentClick] = useState();
  let [selectedAdmin, setSelectedAdmin] = useState("");
  let [selectedPartner, setSelectedPartner] = useState("");
  const AdminType = localStorage.getItem("admin_type");
  let admin_id = AdminType === "agent" ? localStorage.getItem("agent_id") : localStorage.getItem("admin_id");
  // Generate a list of comments reply
  const getCommentsReplyList = async () => {
    if (docData.id) {
      try {
        let res = await GetReplyCommit(
          docData.id /*, adminid, annotationStatus*/
        );
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
  // /*onchange Function to set email or any other comment  */
  // const handleInputChange = (event, type) => {
  //   const inputValue = event.target.value;
  //   // Update the input value
  //   if (type === "reply") {
  //     setReplyComment(inputValue);
  //   } else {
  //     setComments(inputValue);
  //   }

  //   let lastChar = inputValue.slice(-1);
  //   const atIndex = inputValue.indexOf("@");

  //   if (lastChar === "@" || inputValue.includes("@")) {
  //     if (allAdmin) {
  //       // Filter admin emails based on input
  //       let filteredAdminEmails = allAdmin.filter(
  //         (admin) =>
  //           admin.email.toLowerCase().includes(
  //             String(inputValue)
  //               .substring(atIndex + 1)
  //               .toLowerCase()
  //           ) ||
  //           admin.name.toLowerCase().includes(
  //             String(inputValue)
  //               .substring(atIndex + 1)
  //               .toLowerCase()
  //           )
  //       );

  //       // Update the filtered emails
  //       setFilteredEmails(filteredAdminEmails);
  //     }
  //   } else {
  //     setFilteredEmails([]);
  //   }
  // };
  /* Function to handle input change and set email or other comments */
  const handleInputChange = (event, type) => {
    const inputValue = event.target.value;
    const replacedStr = inputValue.replace(/@([^\s]+)/g, (match, name) => {
      const foundEmail = allAdmin.find(email => email.name.toLowerCase() === name.toLowerCase());
      if (foundEmail) {
        return `<span title="${foundEmail.email}"><b>${foundEmail.name}</b></span>`;
      } else {
        return match; // Keep the original text if email not found
      }
    });

    // Update the input value based on the type
    if (type === "reply") {
      setReplyComment(inputValue);
      setReplyCommentToApi(replacedStr)
    } else {
      setComments(inputValue);
      setCommentToApi(replacedStr)
    }

    const cursorPosition = event.target.selectionStart;
    const textBeforeCursor = inputValue.substring(0, cursorPosition);
    const lastWord = textBeforeCursor.split(' ').pop();
    if (lastWord.startsWith('@')) {
      // const query = lastWord.substring(1);
      // if (query && allAdmin) {
      //   // Filter admin emails based on input
      //   const filteredAdminEmails = allAdmin.filter(
      //     (admin) =>
      //       admin.email.toLowerCase().includes(query.toLowerCase()) ||
      //       admin.name.toLowerCase().includes(query.toLowerCase())
      //   );

      //   // Update the filtered emails
      //   setFilteredEmails(filteredAdminEmails);
      // } else {
      //   setFilteredEmails(allAdmin);
      // }
      const query = lastWord.substring(1);
      if (query && allAdmin) {
        let newAssignList = allAdmin
        let AddPartnersList = (selectedPartner || commentsList?.map((item) => item.assigned_user_type.includes("agent") === true) === false)
          ? [] : partnerList.map((partner) => ({ ...partner, name: partner.name + " (Partner)" }));
        newAssignList = [...newAssignList, ...AddPartnersList];
        // Filter admin emails based on input
        const filteredAdminEmails = newAssignList.filter(
          (admin) =>
            admin.email.toLowerCase().includes(query.toLowerCase()) ||
            admin.name.toLowerCase().includes(query.toLowerCase())
        );
        // Update the filtered emails
        setFilteredEmails(filteredAdminEmails);
      } else {
        let newAssignList = allAdmin
        let AddPartnersList = (selectedPartner || commentsList?.map((item) => item.assigned_user_type.includes("agent") === true) === false)
          ? [] : partnerList.map((partner) => ({ ...partner, name: partner.name + " (Partner)" }));
        newAssignList = [...newAssignList, ...AddPartnersList];
        setFilteredEmails(newAssignList);
      }
    } else {
      setFilteredEmails([]);
    }
  };
  /*Function to get the email to assign */
  const handleEmailClick = (email, type) => {
    if (email.name.includes("(Partner)")) {
      setSelectedPartner(email)
    }
    // Set the selected item and update the input value
    if (type === "reply") {
      setSelectedAdminReplye(prevValue => prevValue + email.email + ",");
      setReplyComment(prevValue => `${prevValue}${email.name} `);
      setReplyCommentToApi(prevValue => `${prevValue} <span title="${email.email}" > <b>${email.name}</b></span> `);
    } else {
      setSelectedAdmin(prevValue => prevValue + email.email + ",");
      setComments(prevValue => `${prevValue}${email.name}`);
      setCommentToApi(prevValue => `${prevValue} <span title="${email.email}" > <b>${email.name}</b></span> `);
    }
    setFilteredEmails([]); // Clear filtered emails
  };

  /*Function to get the email to input on hover */
  // const handleEmailMouseOver = (email, type) => {
  //   let newItem = email;
  //   // Highlight the email on mouseover
  //   if (type === "reply") {
  //     // setSelectedAdminReplye(email);

  //     setSelectedAdminReplye(prevItems => [...prevItems, newItem]);
  //   } else {
  //     setSelectedAdmin(email);
  //   }
  // };
  // Function to add annotation based on conditions
  const addAnnotation = async (annotation) => {
    // setAddCommentFlag(false);
    // Retrieve data from local storage
    const subject = "";
    let IspartnerList = selectedPartner ? partnerList : []
    let newAssinList = [...allAdmin, ...IspartnerList]
    /*Comment */
    let boldComment = commentToApi.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, '<b>$1</b>')
    let removeBTage = boldComment.replace(/title="(<b>)(.*?)(<\/b>)"/g, 'title="$2"')
    const comment = removeBTage//comments; ///\S+@\S+\.\S+/.test(comments) ? "" : comments;
    let DocId = docData.id;
    let sender = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).name
      : "";
    let senderEmail = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).email
      : "";
    // Variables for mentioning admins
    const email = selectedAdmin// (selectedAdmin + `${selectedPartner && "," + selectedPartner.email}`) || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = (((newAssinList).filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => admin.name)
        .join(",")
      : ""))
    const assignedUserId = (newAssinList.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => admin.u_id ? admin.id : admin.admin_id)
        .join(",")
      : "")
    // eslint-disable-next-line no-useless-concat
    const assignedUserType = ((newAssinList.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => admin.u_id ? "agent" : admin.admin_type)
        .join(",")
      : ""))
    console.log(assignedAdminName, "assignedUserType", assignedUserType, "assignedUserId", assignedUserId)
    // Send data to the API
    if (
      (comment === "" && email === "") ||
      (comment.includes("@") && !/\S+@\S+\.\S+/.test(comment))
    ) {
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
          "", //annotation.x_axis,
          "", //annotation.y_axis,
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
          "", //annotationId
          DocUserType //User type of document
        );
        if (res.data.message === "task inserted successfully!") {
          toast.success("Comment uploaded Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setComments("");
          setCommentToApi("")
          setSelectedAdmin("");
          setSelectedPartner("")
          setFilteredEmails([]);
          setAnnotationDrawBox("");
          localStorage.setItem("callNotification", true);
          Getcomments();
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
          setCommentToApi("")
          setSelectedAdmin("");
          setSelectedPartner("")
          setFilteredEmails([]);
        }
      }
    }
    // Update state to include the new annotation
  };
  /*Function to reply for the comment */
  const ReplyAnnotation = async (data) => {
    let newAssinList = [...allAdmin, ...partnerList]

    let sender = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).name
      : "";
    let senderId = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).admin_id
      : "";
    let senderEmail = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).email
      : "";
    let senderType = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).admin_type
      : "";
    // Variables for mentioning admins
    const email = selectedAdminReply || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = (newAssinList.filter((item) =>
      selectedAdminReply?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdminReply?.includes(item.email))
        .map((admin) => admin.name)
        .join(",")
      : "")
    const assignedUserId = (newAssinList.filter((item) =>
      selectedAdminReply?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdminReply?.includes(item.email))
        .map((admin) => admin.u_id ? admin.id : admin.admin_id)
        .join(",")
      : "");
    const AdminType = //localStorage.getItem("admin_type");
      (newAssinList.filter((item) => selectedAdminReply?.includes(item.email))
        ? newAssinList
          .filter((item) => selectedAdminReply?.includes(item.email))
          .map((admin) => admin.u_id ? "agent" : admin.admin_type)
          .join(",")
        : "");
    /*Reply comment */
    let BoldComment = replyCommentToApi.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, '<b>$1</b>')
    let removeBTage = BoldComment.replace(/title="(<b>)(.*?)(<\/b>)"/g, 'title="$2"')
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
          removeBTage,
          assignedUserId,
          AdminType,
          sender,
          assignedAdminName,
          "document",
          senderId,
          senderEmail,
          senderType,
          userId, //Userid
          docData.parentReference.id,
          DocUserType
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
          setAnnotationDrawBox("");
        }
      } catch (err) {
        console.log(err);
        setSelectedAdminReplye("");
        setFilteredEmails([]);
      }
    }
  };
  /* Function to update comment and assign */
  const OnHandleUpdateComment = async (originalData) => {
    let updatedData;
    //Condtion to update x and y axis on documet update

    updatedData = { ...originalData };
    updatedData = {
      doc_id: originalData.doc_id,
      status: originalData.status === "1" ? "0" : "1",
      id: originalData.id,
      is_status_update: true,
    }; //.status = originalData.status === "1" ? "0" : "1";

    try {
      // Call the API with the updated data
      let res = await UpdateDocuentcommentAssign(updatedData);
      if (res.message === "Task updated successfully!1") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setComments("");
        setCommentToApi("")
        Getcomments();
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*FUnction to get comment list */
  const Getcomments = async (annotStatus, adminfilter) => {
    let CommentRes = await GetCommentsAndAssign(
      docData.id, //docId,
      adminfilter, // adminid,
      annotStatus, // annotationStatus,
      "document"
    );
    if (CommentRes.data.status === (1 || "1")) {
      setCommentsList(CommentRes.data.data.data);
      setAnnotationData(
        CommentRes.data.data.data.map((item) => JSON.parse(item.doctaskjson))
      );
    }
  };
  return (
    <div className="col-md-4 col-lg-4 col-sm-3 py-2 bg-light comments_and_replies">
      {annotationDrawBox ? ( //condition for imm pdf
        // (docData.name && docData.name.toLowerCase().includes("imm")
        //   ? replyCommentClick === undefined ||
        //   replyCommentClick === "" ||
        //   replyCommentClick === null
        //   : addCommentFlag === true) ?
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
            className="comment-form p-5 rounded bg-white"
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   addAnnotation(annotationDrawBox);
          // }}
          >
            <div className="comment-input-container m-0">
              <label className="input_label m-0">Add new comment:</label>
              {/* <input
                type="text"
                value={comments || ""}
                onChange={handleInputChange}
                placeholder="Comments or add others with @"
                className="comment-input"
              /> */}
              <textarea
                type="text"
                value={comments || ""}
                onChange={handleInputChange}
                placeholder="Comments or add others with @"
                className="comment-input border-0 bg-light"
                rows={4}
                style={{ outline: 0 }}
              ></textarea>
              {filteredEmails.length > 0 && (
                <ul
                  className="email-suggestions"
                  style={{ maxHeight: 400, overflowY: "auto" }}
                >
                  {filteredEmails.map((email, index) => (
                    <li
                      key={index}
                      onClick={() => handleEmailClick(email)}
                      // onMouseOver={() => handleEmailMouseOver(email.email)}
                      className="email-suggestion-item"
                    >
                      <strong>{email.name + "(" + email.email + ")"}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {comments === "" ? null : (
              <div
                className="button-container mx-0 w-100"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <Link
                  className="btn_cancel text-muted"
                  onClick={() => {
                    setComments("");
                    setCommentToApi("")
                    setAnnotationDrawBox("");
                  }}
                >
                  Cancel
                </Link>
                <Link
                  type="submit"
                  className="save-comment-btn text-muted"
                  onClick={(e) => {
                    e.preventDefault()
                    addAnnotation(annotationDrawBox)
                  }}
                  style={{ fontSize: 30, lineHeight: 1 }}
                >
                  <CiPaperplane />
                </Link>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div>
          <div style={{ marginTop: "0px" }}>
            <div className="row m-0 px-2">
              <div className="col mr-2 p-0 form_group">
                <p className="input_label ">Filter by Admin:</p>
                <div className="select_div">
                  <select
                    name="admin"
                    id="admin"
                    // value={adminid}
                    onChange={(e) => {
                      // setAdminId(e.target.value)
                      Getcomments("", e.target.value);
                    }}
                    className="text-capitalize form-control"
                  >
                    <option value={""}>Filter by Admin</option>
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
                <p className="input_label ">Filter by Status:</p>
                <div className="select_div">
                  <select
                    name="status"
                    id="status"
                    onClick={(e) => {
                      // setAnnotationStatus(e.target.value)
                      Getcomments(e.target.value);
                    }}
                    className="text-capitalize form-control"
                  >
                    <option value={""}>Filter by Status</option>
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
                    className={`card col-12 mb-3 p-0 comment_box_card bg-white
                  ${annotationId === JSON.parse(commentItem.doctaskjson).id
                        ? "highlighted-comment"
                        : ""
                      }`}
                    style={{
                      backgroundColor: "#fff",
                      color: "white",
                    }}
                    onClick={() => {
                      setAnnotationId(JSON.parse(commentItem.doctaskjson).id);
                      setReplyCommentClick(commentItem.id);
                      getCommentsReplyList();
                      setFilteredEmails([]);
                      setComments("")
                      setCommentToApi("")
                      setSelectedAdmin("")
                      // setSelectedAdminReplye("")
                    }}
                    key={index}
                  >
                    <span
                      className="comment_status_update "
                      style={{
                        cursor: "pointer",
                        color: commentItem.status === "0" ? "blue" : "white",
                        border:
                          commentItem.status === "0" ? "solid 1px blue" : "",
                        backgroundColor: commentItem.status === "1" && "green",
                      }}
                      onClick={(e) => {
                        OnHandleUpdateComment(commentItem);
                        setFilteredEmails([]);
                        setAnnotationDrawBox("");
                      }}
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
                              style={{ fontSize: "16px", fontWeight: 700 }}
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
                              <ConvertTime _date={commentItem.created_on} format={"HH:mm D MMM"} />
                              {/* {moment(commentItem.created_on).format("HH:mm D MMM")} */}
                            </div>
                          </div>
                        </div>
                      </div>

                      {commentItem.subject_description && (
                        <span className="card-title text-break text-dark m-0 font-size-3">
                          <div className="msg-color" dangerouslySetInnerHTML={{ __html: commentItem.subject_description.replace(" @ ", " ") }} />
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
                    {
                      replyCommentClick === commentItem.id ? (
                        //Reply box
                        <CommentReplyBox
                          commentsReplyList={commentsReplyList}
                          replyComment={replyComment}
                          handleInputChange={handleInputChange}
                          filteredEmails={filteredEmails}
                          handleEmailClick={handleEmailClick}
                          // handleEmailMouseOver={handleEmailMouseOver}
                          ReplyAnnotation={ReplyAnnotation}
                          setReplyCommentClick={setReplyCommentClick}
                          commentItem={commentItem}
                          allAdmin={allAdmin}
                          determineBackgroundColor={determineBackgroundColor}
                        />
                      ) : null
                      // <Link
                      //   className="mx-5 mr-0 ml-auto font-size-3 "
                      //   onClick={() => {
                      //     setReplyCommentClick(commentItem.id);
                      //     getCommentsReplyList();
                      //     setFilteredEmails([]);
                      //   }}
                      // >
                      //   Reply <FaReplyAll />
                      // </Link>
                    }
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
