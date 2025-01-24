import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentReplyBox from "./CommentReplyBox";
import { toast } from "react-toastify";
import { CiPaperplane } from "react-icons/ci";
import { ADocAnnotation, DeleteCommentsAndAssign, DeleteReplyCommentsAndAssign, GetCommentsAndAssign, GetReplyCommit, SendReplyCommit, UpdateDocuentcommentAssign, } from "../../api/api";
import ConvertTime from "./Common function/ConvertTime";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import determineBackgroundColor from "./Common function/DetermineBackgroundColour";
import { getallAdminData } from "../../api/api";
export default function CommentTaskBox(props) {
    const [comments, setComments] = useState("");
    const [commntData, setCommentData] = useState();
    const [replyCommentData, setReplyCommentData] = useState();
    const [type, setType] = useState();
    const [endDate, setEndDate] = useState("");
    const [subject, setSubject] = useState("");
    const [commentsList, setCommentsList] = useState([]);
    const [adminList, setAdminList] = useState([]);
    const [replyComment, setReplyComment] = useState();
    const [commentsReplyList, setCommentsReplyList] = useState();
    const [filteredEmails, setFilteredEmails] = useState([]);
    let [dropdownVisible, setDropdownVisible] = useState();
    let [selectedAdminReply, setSelectedAdminReplye] = useState([]);
    let [replyCommentClick, setReplyCommentClick] = useState(props.TaskId || "");
    let [selectedAdmin, setSelectedAdmin] = useState([]);
    const AdminType = localStorage.getItem("admin_type");
    let admin_id = AdminType === "agent" ? localStorage.getItem("agent_id") : localStorage.getItem("admin_id");
    let admin_name = localStorage.getItem("admin");
    let admin_email = localStorage.getItem("email");
    /*Function to get all user data */
    const GetAllUserData = async () => {
        try {
            const AdminData = await getallAdminData();
            if (AdminData.data.length === 0) {
                setAdminList([]);
            } else {
                setAdminList(AdminData.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    // Generate a list of comments reply
    const getCommentsReplyList = async () => {
        try {
            let res = await GetReplyCommit(
                /*docData.id , adminid, annotationStatus*/
            );
            if (res.data.status === (1 || "1")) {
                setCommentsReplyList(res.data.data);
            }
            if (res.data.status === (0 || "0")) {
                setCommentsReplyList([]);
            }
        } catch (err) {
            console.log(err);
            setCommentsReplyList([]);
        }
    };
    useEffect(() => {
        if (props.TaskId) {
            getCommentsReplyList()
        }
        GetAllUserData()
        Getcomments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.TaskId])



    // Handler for link click for comment
    const handleUpdateCommentLinkClick = (commentItem) => {
        setComments(commentItem.subject_description);
        setCommentData(commentItem);
    };
    //Handler for link click for reply of comment
    const handleUpdateReplyLinkClick = (item) => {
        setReplyComment(item.msg);
        setReplyCommentData(item);
        // const idsToMatch = item.receiver_id.split(",");

        // const filteredData = adminList.filter(
        //   (item) => idsToMatch.includes(item.id) || idsToMatch.includes(item.admin_id)
        // );
        // setSelectedAdminReplye(filteredData)
    };

    // Function to add annotation based on conditions
    const handleInputChange = (e, type) => {
        let value = e.target.value;
        if (type === "reply") {
            setType(type)
            setReplyComment(value)
        } else {
            setComments(value)
            setType(type)
        }
        // Check if the last typed character is '@'
        value = value.trim()
        const lastChar = value.slice(-1);
        if (lastChar === "@") {
            setDropdownVisible(true)
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
                setDropdownVisible(false)
            }
        }
    };
    /*FUnction to clicked the email of the searched admin */
    const handleEmailClick = (user, type) => {
        // Add the selected user to the assigned list
        if (type === "reply") {
            setSelectedAdminReplye((prev) => [...prev, user]);

            // Replace @username in the comment
            const updatedComment = replyComment.replace(/@\w*$/, `@${user.name} `);
            setReplyComment(updatedComment);

            // Hide the dropdown and update the filtered users list
            setDropdownVisible(false)
            setFilteredEmails((prev) =>
                prev.filter((u) => u.id !== user.id)
            );
        } else {
            setSelectedAdmin((prev) => [...prev, user]);

            // Replace @username in the comment
            const updatedComment = comments.replace(/@\w*$/, `@${user.name} `);
            setComments(updatedComment);

            // Hide the dropdown and update the filtered users list
            setDropdownVisible(false)
            setFilteredEmails((prev) =>
                prev.filter((u) => u.id !== user.id)
            );
        }
    };
    /*Add function to add comment */
    const addAnnotation = async (annotation) => {
        // Retrieve data from local storage
        // let IspartnerList = selectedPartner ? partnerList : []; // let DocId = docData.id;
        const email = (selectedAdmin || []).map((item) => item.email).toString() || ""
        let sender =
            AdminType === "agent"
                ? admin_name
                : adminList.find((item) => item.admin_id === admin_id)
                    ? adminList.find((item) => item.admin_id === admin_id).name
                    : admin_name;
        let senderEmail =
            AdminType === "agent"
                ? admin_email
                : adminList.find((item) => item.admin_id === admin_id)
                    ? adminList.find((item) => item.admin_id === admin_id).email
                    : "";
        // Variables for mentioning admins
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
        const assignedUserType = adminList.filter((item) =>
            email?.includes(item.email)
        )
            ? adminList
                .filter((item) => email?.includes(item.email))
                .map((admin) => (admin.u_id ? "agent" : admin.admin_type))
                .join(",")
            : "";
        // Now updatedComment will have properly formatted <span> elements without nested bold tags
        // Send data to the API
        if (
            (comments === "" || comments.trim() === "") &&
            email === ""
            // || (comment.includes("@") && !/\S+@\S+\.\S+/.test(comment))
        ) {
            toast.error("Comment or email cannot be empty!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } else {
            try {
                let res = await ADocAnnotation(
                    admin_id,
                    "",
                    assignedUserId,
                    email,
                    subject,
                    comments,//actual
                    "", //annotation.x_axis,
                    "", //annotation.y_axis,
                    props.taskType,
                    AdminType, //sender type
                    sender, //sender name,
                    assignedAdminName, //assigned Admin or user Name,
                    "", //follow up status(for notes only)
                    "", //Next follow up date(for notes only)
                    assignedUserType, //Assign user type,
                    "", //Document url(for notes only)
                    senderEmail, //Sender email
                    props.userId, //employee id,
                    "", //assigned_by_id
                    "",//docData.parentReference.id, // document parent code
                    "",//annotationDrawBox, //Annotation data,
                    "", //annotationId
                    props.taskUserType, //User type of document
                    "",// docData.name,//document name
                    "",//start date
                    endDate,//end date
                );
                if (res.data.message === "task inserted successfully!") {
                    toast.success("Comment uploaded Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    setComments("");
                    setSelectedAdmin("");
                    setEndDate("")
                    setSubject("")
                    setFilteredEmails([]);
                    Getcomments();
                    localStorage.setItem("callNotification", true);
                }
            } catch (err) {
                console.log(err);
                if (err.response.data.message === "required fields cannot be blank") {
                    toast.error(" Please try again later.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    if (err.response.data.message === "required fields cannot be blank doc_parent_id") {
                        toast.error("Folder not found", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                    // setSelectedAnnotation(null);
                    setComments("");
                    setSelectedAdmin("");

                    setFilteredEmails([]);
                }
            }
        }
    };
    /*Function to reply for the comment */
    const ReplyAnnotation = async (data) => {
        console.log(data, selectedAdminReply)
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
        const email = (selectedAdminReply || [])?.map((item) => item.email).toString() || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";

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
                    props.taskType,
                    senderId,
                    senderEmail,
                    AdminType === "agent" ? "agent" : senderType,
                    props.userId, //props.userId
                    //docData.parentReference.id,
                    props.taskUserType,
                    data?.task_id ? data.id : "",
                    //          docData.name,//document name

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
                    setReplyCommentData("")
                    setFilteredEmails([]);

                }
            } catch (err) {
                console.log(err);
                setSelectedAdminReplye("");
                setFilteredEmails([]);

            }
        }
    };
    /*Function to update comment */
    const OnHandleUpdateCommentStatus = async (originalData, status) => {
        const {
            assigned_to,
            subject_description,
            assigned_to_name,
            assigned_user_type,
            assined_to_user_id,
        } = originalData;

        let updatedCommentToApi = comments || subject_description;

        // Parse the original admin details
        let emailsArray = assigned_to?.split(",") || [];
        let namesArray = assigned_to_name?.split(",") || [];
        let userIdArray = assined_to_user_id?.split(",") || [];
        let userTypeArray = assigned_user_type?.split(",") || [];

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

        (selectedAdmin || []).forEach((admin) => {
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
        // Construct the final data to send to the API
        const updatedData = {
            // ...originalData,
            doc_id: originalData.doc_id,
            status: status,
            is_status_update: true,
            subject_description: updatedCommentToApi,
            task_creator_user_id: admin_id,
            task_creator_user_type:
                localStorage.getItem("userType") === "admin" ? "admin" : "agent",
            assined_to_user_id: updatedUserIds,
            assigned_user_type: updatedUserTypes,
            // doc_parent_id: docData.parentReference.id,
            assigned_to: updatedEmails,
            assigned_to_name: updatedNames,
            id: originalData.id,
            type: originalData.type,
            end_date: endDate,
            subject: subject
            // document_name: docData.name,
            // json: JSON.parse(originalData.doctaskjson)
        };
        // console.log(updatedData)
        // Call the API to update the document
        try {
            let res = await UpdateDocuentcommentAssign(updatedData, props.taskUserType);
            if (res.message === "Task updated successfully!") {
                toast.success("Task completed Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setReplyCommentClick(status === 1 || status === "1" ? "" : updatedData.id)
                setCommentData();
                setComments("");
                setEndDate("")
                setSubject("")
                Getcomments();
            }
        } catch (err) {
            console.log(err);
        }
    };
    /*FUnction to update replies for he comment */
    const OnHandleUpdateCommentReply = async (originalData) => {
        console.log(originalData)
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
                props.taskType,
                senderId,
                senderEmail,
                AdminType === "agent" ? "agent" : senderType,
                props.userId, //props.userId
                "",// docData.parentReference.id,
                props.taskUserType,
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
                setSelectedAdminReplye("");
                setFilteredEmails([]);

            }
        } catch (err) {
            console.log(err);
            setSelectedAdminReplye("");
            setFilteredEmails([]);

        }
    };
    /*Function to get comment list */
    const Getcomments = async (annotStatus, adminfilter) => {
        let CommentRes = await GetCommentsAndAssign(
            "", //docId,
            adminfilter, // adminid,
            annotStatus, // annotationStatus,
            props.taskType
        );
        if (CommentRes.data.status === (1 || "1")) {
            setCommentsList(CommentRes.data.data.data);

        }
    };
    /*Function to delete comment */
    const OnDeleteComment = async (docId, id) => {
        try {
            let res = await DeleteCommentsAndAssign("", id, props.userId, props.taskUserType, admin_id, AdminType);
            if (res.data.message === "Task deleted successfully!") {
                toast.success("Task Deleted Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setCommentData();
                setComments("");
                Getcomments();
            }
        } catch (err) {
            console.log(err);
        }
    };
    /*Function to delete comment Replies*/
    const OnDeleteCommentReplies = async (id) => {
        try {
            let res = await DeleteReplyCommentsAndAssign(id, props.userId, props.taskUserType, admin_id, AdminType);
            if (res.data.message === "deleted successfully!") {
                toast.success("Reply Deleted Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setReplyComment();
                setReplyCommentData();
                getCommentsReplyList();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className={`py-2 bg-light comments_and_replies
         `}
            style={{
                transition: "all .3s",
                maxHeight: "calc(100vh - 130px)",
            }}
        >
            <div
                style={{
                    transition: "all .3s",
                }}
                className="pt-0 pb-5"
            >
                <form className="comment-form p-5 rounded bg-white row" >
                    <div className="comment-input-container col-12 m-0">
                        <label className="input_label m-0">Add new {props.taskType}:</label>

                        <textarea
                            type="text"
                            value={comments || ""}
                            onChange={handleInputChange}
                            placeholder={`${props.taskType} or add others with @`}
                            className={`comment-input ${commntData ? "" : "border-0"} bg-light`}
                            rows={2}
                            style={{ outline: 0, border: commntData ? "2px solid blue" : "" }}
                        ></textarea>
                        {dropdownVisible && filteredEmails.length > 0 && type !== "reply" ? (
                            <ul
                                className="email-suggestions"
                                style={{ maxHeight: 400, overflowY: "auto", zIndex: "999 !important" }}
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
                    <div className={props.taskType === "note" ? "mb-0 comment-input-container col-12" : "d-none"}>
                        <label
                            htmlFor="subject"
                            className="input_label m-0"
                        >
                            Subject
                        </label>
                        <input
                            id="subject"
                            type="text"
                            className="comment-input "
                            value={subject}
                            placeholder="Enter subject"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className={props.taskType === "note" ? "mb-0 comment-input-container col-12" : "d-none"}>
                        <label
                            htmlFor="end_date"
                            className="input_label m-0"
                        >
                            {props.taskType === "note" ? "Next Follow Up date" : "End date"}
                        </label>
                        <input
                            id="end_date"
                            type="date"
                            className="comment-input"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
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
                                    setCommentData();
                                    setEndDate("")
                                    setSubject("")
                                    setSubject("")
                                }}
                            >
                                Cancel
                            </Link>
                            <Link
                                type="submit"
                                className="save-comment-btn text-muted"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (commntData) {
                                        OnHandleUpdateCommentStatus(commntData);
                                    } else {
                                        addAnnotation();
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
            <div>
                <div style={{ marginTop: "0px" }}>
                    <div className="row m-0 p-0">
                        <div className={props.taskType === "document" ? "col ml-2 p-0 form_group" : "d-none"}>
                            <div className="select_div">
                                <select
                                    name="admin"
                                    id="admin"
                                    onChange={(e) => {
                                        Getcomments("", e.target.value);
                                    }}
                                    className="text-capitalize form-control"
                                    style={{ fontSize: 13 }}
                                >
                                    <option value={""}>Filter by Admin</option>
                                    {(adminList || []).map((data, index) => {
                                        return (
                                            <option value={data.admin_id} key={index}>
                                                {data.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={props.taskType === "document" ? "col ml-2 p-0 form_group" : "d-none"}>
                            <div className="select_div">
                                <select
                                    name="status"
                                    id="status"
                                    onClick={(e) => {
                                        Getcomments(e.target.value);
                                    }}
                                    className="text-capitalize form-control"
                                    style={{ fontSize: 13 }}
                                >
                                    <option value={""}>Filter by Status</option>
                                    <option value={"1"}>Complete</option>
                                    <option value={"0"}>Incomplete</option>
                                    <option value={"2"}>Overdue</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 py-2 flex-column">
                        {commentsList.length === 0 ? (
                            <div className="col text-center">
                                <h5>No {props.taskType}</h5>
                            </div>
                        ) : (
                            (commentsList || []).map((commentItem, index) => (
                                <div
                                    className={`card col-12 mb-2 p-0 comment_box_card bg-white`}
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "white",
                                        transitionDelay: "initial"
                                    }}
                                    onClick={() => {
                                        if (commentItem.status !== "1") {
                                            setReplyCommentClick(commentItem.id);
                                            getCommentsReplyList();
                                        }
                                        setFilteredEmails([]);
                                        if (replyCommentClick !== commentItem.id) {
                                            setSelectedAdmin("");
                                            setReplyCommentData("");
                                            setSelectedAdminReplye("");
                                            setReplyComment("");
                                        }
                                    }}
                                    key={index}
                                >
                                    <div
                                        className={`comment_status_update ${AdminType === "agent"
                                            ? commentItem.task_creator_user_id === admin_id
                                                ? "d-flex"
                                                : "d-none"
                                            : "d-flex"}`}
                                        style={{ position: "absolute", right: 5, gap: 5 }}
                                    >
                                        <Link
                                            className={`text-gray pr-1 ${commentItem.status !== "0" ? "d-none" : ""}`}
                                            title="Update Comment"
                                            onClick={() => {
                                                handleUpdateCommentLinkClick(commentItem);
                                                setEndDate(commentItem.end_date.split(" ")[0])
                                                setSubject(commentItem.subject)
                                                console.log(commentItem)
                                            }}
                                        >
                                            <CiEdit />
                                        </Link>

                                        <Link
                                            className={props.taskType === "note" ? "d-none" : ""}
                                            title={commentItem.status === "2" ? "Task overdue" : "Update status to complete"}
                                            onClick={(e) => {
                                                OnHandleUpdateCommentStatus(
                                                    commentItem,
                                                    commentItem.status === "1" ? "0" : "1"
                                                );
                                                setFilteredEmails([]);
                                            }}
                                        >
                                            <IoIosCheckmarkCircle
                                                style={{
                                                    cursor: "pointer",
                                                    color: commentItem.status === "1" ? "green" : "#ccc",
                                                    fontSize: 18,
                                                }}
                                            />
                                        </Link>
                                        <Link
                                            className="text-danger pr-1"
                                            title="Delete Comment"
                                            onClick={() => {
                                                OnDeleteComment(commentItem.doc_id, commentItem.id);
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
                                                            commentItem
                                                        )}`}
                                                        style={{ fontSize: "16px", fontWeight: 700 }}
                                                    >
                                                        {commentItem.task_creator_user_name?.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className=" mb-0">
                                                    <div className="font-size-3 font-weight-bold text-capitalize">
                                                        {commentItem.task_creator_user_name}
                                                    </div>
                                                    <div
                                                        className="text-gray font-weight-light m-0 text-capitalize"
                                                        style={{ fontSize: 10, fontStyle: "italic" }}
                                                    >
                                                        <ConvertTime
                                                            _date={commentItem.created_on}
                                                            format={"HH:mm D MMM"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={props.taskType !== "note" ? "d-none" : "m-0 d-flex justify-content-between align-items-center"}>
                                            <b className="font-size-4 font-weight-bold text-dark text-break">
                                                {commentItem.subject}
                                            </b>
                                            <div className="d-flex flex-column align-items-end">
                                                <p className="m-0 text-capitalize font-size-3 mb-1 d-flex justify-content-between align-items-center w-100">
                                                    <b>Created by: {commentItem.task_creator_user_name}</b>
                                                </p>
                                                {commentItem?.assigned_to_name && <span className="font-size-3 text-gray">
                                                    Assigned admin:
                                                    {commentItem?.assigned_to_name?.split(",").map((item, index) => <span className="badge-light rounded-pill p-1 m-1">{item}</span>)}
                                                </span>}
                                                <i className="font-size-2">
                                                    Created on:
                                                    <ConvertTime
                                                        _date={commentItem.created_at}
                                                        format={"Do MM YYYY, h:mm:ss a"}
                                                    />
                                                </i>
                                            </div>
                                        </div>
                                        {commentItem.subject_description && (
                                            <span className="card-title text-break text-dark m-0 font-size-3">
                                                <div
                                                    className="msg-color"
                                                    dangerouslySetInnerHTML={{
                                                        __html: commentItem.subject_description.replace(
                                                            " @ ",
                                                            " "
                                                        ),
                                                    }}
                                                />
                                            </span>
                                        )}
                                    </div>
                                    {
                                        replyCommentClick === commentItem.id ? (
                                            //Reply box
                                            <CommentReplyBox
                                                admin_id={admin_id}
                                                AdminType={AdminType}
                                                commentsReplyList={commentsReplyList}
                                                replyComment={replyComment}
                                                handleInputChange={handleInputChange}
                                                filteredEmails={filteredEmails}
                                                handleEmailClick={handleEmailClick}
                                                // handleEmailMouseOver={handleEmailMouseOver}
                                                ReplyAnnotation={ReplyAnnotation}
                                                setReplyCommentClick={setReplyCommentClick}
                                                commentItem={commentItem}
                                                allAdmin={adminList}
                                                determineBackgroundColor={determineBackgroundColor}
                                                handleUpdateReplyLinkClick={handleUpdateReplyLinkClick}
                                                OnHandleUpdateCommentReply={OnHandleUpdateCommentReply}
                                                type={type}
                                                replyCommentData={replyCommentData}
                                                OnDeleteCommentReplies={OnDeleteCommentReplies}
                                                dropdownVisible={dropdownVisible}
                                                taskType={props.taskType}
                                            />
                                        ) : null
                                    }
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
