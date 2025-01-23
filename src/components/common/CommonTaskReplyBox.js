import React, { useEffect, useState } from "react";
import { CiEdit, CiPaperplane, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  SendReplyCommit,
  GetReplyCommit,
  DeleteReplyCommentsAndAssign,
  getallAdminData,
} from "../../api/api";
import { toast } from "react-toastify";
import ConvertTime from "./Common function/ConvertTime";
import determineBackgroundColor from "./Common function/DetermineBackgroundColour";

export default function CommonTaskReplyBox(props) {
  let [editableData, setEditableData] = useState();
  const [commntData, setCommentData] = useState();
  const [replyComment, setReplyComment] = useState();
  const [filteredEmails, setFilteredEmails] = useState([]);
  let [dropdownVisible, setDropdownVisible] = useState();
  const [adminList, setAdminList] = useState([]);
  let [selectedAdminReply, setSelectedAdminReplye] = useState([]);
  // const [partnerList, setPartnerist] = useState([]);
  // let [selectedPartner, setSelectedPartner] = useState("");
  const [commentsReplyList, setCommentsReplyList] = useState([]);
  const [apiCall, setApicall] = useState(false);
  const [taskId, setTaskId] = useState(props.taskData.id);

  const AdminType = localStorage.getItem("admin_type");
  let admin_id =
    AdminType === "agent"
      ? localStorage.getItem("agent_id")
      : localStorage.getItem("admin_id");
  let admin_name = localStorage.getItem("admin");
  let admin_email = localStorage.getItem("email");

  /*Function to get admin data */
  const AdminData = async () => {
    try {
      const userData = await getallAdminData();
      // if (window.location.pathname === `/${user_id}`) {
      // //   const Partnerdata = await GetAgent();
      // //   let newPartnerList = Partnerdata.data.data.filter(
      // //     (item) => item.id === partnerId
      // //   );
      //   setPartnerist(newPartnerList);
      // }
      if (userData.data.length === 0) {
        setAdminList([]);
      } else {
        setAdminList(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Generate a list of comments reply
  const getCommentsReplyList = async () => {
    if (props.taskData.id) {
      try {
        let res = await GetReplyCommit("", 1 /*, adminid, annotationStatus*/);
        if (res.data.status === (1 || "1")) {
          setCommentsReplyList(res.data.data);
        }
        if (
          res.data.status === (0 || "0") ||
          res.data.message === "data not found"
        ) {
          setCommentsReplyList([]);
        }
      } catch (err) {
        console.log(err);
        setCommentsReplyList([]);
      }
    } else {
      setCommentsReplyList([]);
    }
  };
  useEffect(() => {
    getCommentsReplyList();
    AdminData();
    if (apiCall === true) {
      setApicall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall, taskId]);

  // Function to add annotation based on conditions
  const handleInputChange = (e, type) => {
    let value = e.target.value;
    setReplyComment(value);
    // let AddPartnersList = selectedPartner ? [] : partnerList;
    // AddPartnersList = [...AddPartnersList, ...newAssignList];
    // Check if the last typed character is '@'
    value = value.trim();
    const lastChar = value.slice(-1);
    if (lastChar === "@") {
      setDropdownVisible(true);
      setFilteredEmails(adminList);
    } else {
      const match = value.match(/@(\w*)$/);
      if (match) {
        const query = match[1].toLowerCase();
        const filtered = adminList.filter((user) =>
          user.name.toLowerCase().includes(query)
        );
        setFilteredEmails(filtered);
      } else {
        setFilteredEmails([]);
        setDropdownVisible(false);
      }
    }
  };
  /*FUnction to clicked the email of the searched admin */
  const handleEmailClick = (user, type) => {
    // Add the selected user to the assigned list
    setSelectedAdminReplye((prev) => [...prev, user]);

    // Replace @username in the comment
    const updatedComment = replyComment.replace(/@\w*$/, `@${user.name} `);
    setReplyComment(updatedComment);

    // Hide the dropdown and update the filtered users list
    setDropdownVisible(false);
    setFilteredEmails((prev) => prev.filter((u) => u.id !== user.id));
  };
  /*Function to reply for the comment */
  const addReplyTask = async (data) => {
    let sender =
      AdminType === "agent"
        ? admin_name
        : adminList.find((item) => item.admin_id === admin_id)
        ? adminList.find((item) => item.admin_id === admin_id).name
        : "";
    let senderId = adminList.find((item) => item.admin_id === admin_id)
      ? adminList.find((item) => item.admin_id === admin_id).admin_id
      : "";
    let senderEmail =
      AdminType === "agent"
        ? admin_email
        : adminList.find((item) => item.admin_id === admin_id)
        ? adminList.find((item) => item.admin_id === admin_id).email
        : "";
    let senderType =
      AdminType === "agent"
        ? "agent"
        : adminList.find((item) => item.admin_id === admin_id)
        ? adminList.find((item) => item.admin_id === admin_id).admin_type
        : "";
    // Variables for mentioning admins
    const email =
      (selectedAdminReply || [])?.map((item) => item.email).toString() || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = adminList.filter((item) =>
      email?.includes(item.email)
    )
      ? adminList
          .filter((item) => email?.includes(item.email))
          .map((admin) => admin.name)
          .join(",")
      : "";
    const assignedUserId = adminList.filter((item) =>
      email?.includes(item.email)
    )
      ? adminList
          .filter((item) => email?.includes(item.email))
          .map((admin) => (admin.u_id ? admin.id : admin.admin_id))
          .join(",")
      : "";
    // eslint-disable-next-line no-useless-concat
    const Rec_Admin_Type = adminList.filter((item) =>
      email?.includes(item.email)
    )
      ? adminList
          .filter((item) => email?.includes(item.email))
          .map((admin) => (admin.u_id ? "agent" : admin.admin_type))
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
          Rec_Admin_Type,
          sender,
          assignedAdminName,
          "task",
          senderId,
          senderEmail,
          AdminType === "agent" ? "agent" : senderType,
          "", // userId, //Userid
          "", //docData.parentReference.id,
          "", // DocUserType,
          data?.task_id ? data.id : "",
          "" //docData.name,//document name
        );
        if (res.data.message === "message sent successfully!") {
          toast.success("Replied Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setReplyComment("");
          setSelectedAdminReplye("");
          setEditableData("");
          setFilteredEmails([]);
          setApicall(true);
        }
      } catch (err) {
        console.log(err);
        setSelectedAdminReplye("");
        setFilteredEmails([]);
      }
    }
  };

  /*FUnction to update replies for he comment */
  const OnHandleUpdateCommentReply = async (originalData) => {
    const { receiver_email, msg, receiver_name, receiver_type, receiver_id } =
      originalData;
    let updatedCommentToApi = replyComment || msg;

    // Parse the original admin details
    let emailsArray = receiver_email?.split(",") || [];
    let namesArray = receiver_name?.split(",") || [];
    let userIdArray = receiver_id?.split(",") || [];
    let userTypeArray = receiver_type?.split(",") || [];

    // Create new arrays for users who should remain after removal
    const newEmailsArray = [];
    const newNamesArray = [];
    const newUserIdArray = [];
    const newUserTypeArray = [];

    // Iterate through names to determine which ones to keep
    namesArray.forEach((name, index) => {
      const nameRegex = new RegExp(`\\b${name}\\b`, "g");

      if (nameRegex.test(updatedCommentToApi)) {
        // If the name is still in the updated comment, keep its corresponding details
        newEmailsArray.push(emailsArray[index]);
        newNamesArray.push(namesArray[index]);
        newUserIdArray.push(userIdArray[index]);
        newUserTypeArray.push(userTypeArray[index]);
      }
    });

    let senderId = adminList.find((item) => item.admin_id === admin_id)
      ? adminList.find((item) => item.admin_id === admin_id).admin_id
      : "";
    let senderEmail =
      AdminType === "agent"
        ? admin_email
        : adminList.find((item) => item.admin_id === admin_id)
        ? adminList.find((item) => item.admin_id === admin_id).email
        : "";
    let senderType =
      AdminType === "agent"
        ? "agent"
        : adminList.find((item) => item.admin_id === admin_id)
        ? adminList.find((item) => item.admin_id === admin_id).admin_type
        : "";
    let sender =
      AdminType === "agent"
        ? admin_name
        : adminList.find((item) => item.admin_id === admin_id)
        ? adminList.find((item) => item.admin_id === admin_id).name
        : "";
    (selectedAdminReply || []).forEach((admin) => {
      if (!newEmailsArray.includes(admin.email)) {
        // Add new admin's details to the arrays
        newEmailsArray.push(admin.email);
        newNamesArray.push(admin.name);
        newUserIdArray.push(admin.u_id ? admin.id : admin.admin_id);
        newUserTypeArray.push(admin.u_id ? "agent" : admin.admin_type);
      }
    });

    // Prepare updated strings for each array
    const updatedEmails = newEmailsArray.join(",");
    const updatedNames = newNamesArray.join(",");
    const updatedUserIds = newUserIdArray.join(",");
    const updatedUserTypes = newUserTypeArray.join(",");

    // Call the API to update the document
    try {
      let res = await SendReplyCommit(
        originalData,
        updatedEmails,
        updatedCommentToApi,
        updatedUserIds,
        updatedUserTypes,
        sender,
        updatedNames,
        "task",
        senderId,
        senderEmail,
        AdminType === "agent" ? "agent" : senderType,
        "", //userId, //Userid
        "", //docData.parentReference.id,
        "", //DocUserType,
        originalData.id
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
        setEditableData();
        setSelectedAdminReplye("");
        setFilteredEmails([]);
        setApicall(true);
      }
    } catch (err) {
      console.log(err);
      setSelectedAdminReplye("");
      setFilteredEmails([]);
    }
  };
  const OnDeleteReplyComment = async (id) => {
    try {
      let res = await DeleteReplyCommentsAndAssign(
        id,
        "",
        "",
        admin_id,
        AdminType
      );
      if (res.data.message === "deleted successfully!") {
        toast.success("Reply Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setReplyComment();
        setEditableData();
        setApicall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${
        props.openReplyBox
          ? "comments_and_replies"
          : "comments_and_replies d-none"
      } `}
      style={{
        transition: "all .3s",
        maxHeight: "calc(100vh - 130px)", // docsection ? "100vh" : "calc(100vh - 130px)"
      }}
    >
      {/* <div className="d-flex flex-row-reverse">
        <button
          className={`btn-sm btn-light border-0 rounded-5 mx-2 flex-end`}
          onClick={() => props.setOpenReplyBox(false)}
        >
          x
        </button>
      </div> */}
      <div
        style={{
          transition: "all .3s",
        }}
        className="pt-0 pb-5"
      >
        <form className="comment-form p-0 rounded bg-white">
          <div className="comment-input-container m-0">
            <label className="input_label m-0 font-size-3">
              Add Task Reply:
            </label>
            <textarea
              type="text"
              value={replyComment || ""}
              onChange={handleInputChange}
              placeholder="Comments or add others with @"
              className={`comment-input ${
                commntData ? "" : "border-0"
              } bg-light`}
              rows={2}
              style={{ outline: 0, border: commntData ? "2px solid blue" : "" }}
            ></textarea>
            {dropdownVisible && filteredEmails.length > 0 ? (
              <ul
                className="email-suggestions"
                style={{
                  maxHeight: 400,
                  overflowY: "auto",
                  zIndex: "999 !important",
                }}
              >
                {filteredEmails.map((email, index) => (
                  <li
                    key={index}
                    onClick={() => handleEmailClick(email)}
                    // onMouseOver={() => handleEmailMouseOver(email.email)}
                    className="email-suggestion-item"
                  >
                    <strong>
                      {email.name +
                        (email.u_id ? " (Partner)" : "") +
                        "(" +
                        email.email +
                        ")"}
                    </strong>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {replyComment === "" ? null : (
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
                  setReplyComment("");
                  setCommentData();
                  setEditableData();
                  // setSelectedPartner();
                }}
              >
                Cancel
              </Link>
              <Link
                type="submit"
                className="save-comment-btn text-muted"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(editableData);
                  if (editableData) {
                    OnHandleUpdateCommentReply(editableData);
                  } else {
                    addReplyTask(props.taskData);
                  }
                }}
                style={{ fontSize: 30, lineHeight: 1 }}
              >
                <CiPaperplane />
              </Link>
            </div>
          )}
        </form>
      </div>
      <div className="row m-0 py-2 flex-column">
        {commentsReplyList.length === 0 ? (
          <div className="col text-center">
            <p className="m-0">No Replies</p>
          </div>
        ) : (
          (commentsReplyList || []).map((item, index) => (
            <div
              className={`card col-12 mb-2 p-0 comment_box_card bg-white`}
              style={{
                backgroundColor: "#fff",
                color: "white",
                transitionDelay: "initial",
              }}
              key={index}
            >
              <div
                className={`comment_status_update ${
                  AdminType === "agent"
                    ? item.sender_id === admin_id
                      ? "d-flex"
                      : "d-none"
                    : "d-flex"
                }`}
                style={{ position: "absolute", right: 5, gap: 5 }}
              >
                <Link
                  className={`text-gray pr-1`}
                  title="Update Comment"
                  onClick={() => {
                    setEditableData(item);
                    setReplyComment(item.msg);
                  }}
                >
                  <CiEdit />
                </Link>

                <Link
                  className="text-danger pr-1"
                  title="Delete Comment"
                  onClick={() => {
                    OnDeleteReplyComment(item.id);
                  }}
                >
                  <CiTrash />
                </Link>
              </div>
              <div className="card-body p-2">
                <div className="text-dark">
                  <div className="d-flex profile_box gx-2 mb-1">
                    <div className="media  align-items-center">
                      <div
                        className={`circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                          item
                        )}`}
                        style={{ fontSize: "16px", fontWeight: 700 }}
                      >
                        {item.sender_name?.charAt(0)}
                      </div>
                    </div>
                    <div className=" mb-0">
                      <div className="font-size-3 font-weight-bold text-capitalize">
                        {item.sender_name}
                      </div>
                      <div
                        className="text-gray font-weight-light m-0 text-capitalize"
                        style={{ fontSize: 10, fontStyle: "italic" }}
                      >
                        <ConvertTime
                          _date={item.created_at}
                          format={"HH:mm D MMM"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {item.msg && (
                  <span className="card-title text-break text-dark m-0 font-size-3">
                    <div
                      className="msg-color"
                      dangerouslySetInnerHTML={{
                        __html: item.msg.replace(" @ ", " "),
                      }}
                    />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
