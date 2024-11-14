import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentReplyBox from "../CommentReplyBox";
import { toast } from "react-toastify";
import { CiPaperplane } from "react-icons/ci";
import {
  ADocAnnotation,
  DeleteCommentsAndAssign,
  DeleteReplyCommentsAndAssign,
  GetCommentsAndAssign,
  GetReplyCommit,
  SendReplyCommit,
  UpdateDocuentcommentAssign,
} from "../../../api/api";
import ConvertTime from "../ConvertTime";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
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
  partnerList,
  openAnnotationBox,
  docsection,
}) {
  const [comments, setComments] = useState();
  const [commntData, setCommentData] = useState();
  const [replyCommentData, setReplyCommentData] = useState();
  const [type, setType] = useState();
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
  let admin_id =
    AdminType === "agent"
      ? localStorage.getItem("agent_id")
      : localStorage.getItem("admin_id");
  let admin_name = localStorage.getItem("admin");
  let admin_email = localStorage.getItem("email");

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
        if (res.data.status === (0 || "0")) {
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
  // Handler for link click for comment
  const handleUpdateCommentLinkClick = (commentItem) => {
    setComments(commentItem.subject_description.replace(/<[^>]*>/g, ""));
    setCommentData(commentItem);
  };
  const handleUpdateReplyLinkClick = (item) => {
    setReplyComment(item.msg.replace(/<[^>]*>/g, ""));
    setReplyCommentData(item);
  };
  /* Function to handle input change and set email or other comments */
  const handleInputChange = (event, type) => {
    const inputValue = event.target.value;
    let AddPartnersList = selectedPartner ? [] : partnerList; //.map((partner) => ({ ...partner, name: partner.name + " (Partner)" }));
    let newAssignList = allAdmin;
    AddPartnersList = [...AddPartnersList, ...newAssignList];
    const replacedStr = inputValue.replace(/@([^\s]+)/g, (match, name) => {
      const foundEmail = AddPartnersList.find(
        (email) => email.name.toLowerCase() === name.toLowerCase()
      );
      if (foundEmail) {
        return `<span title="${foundEmail.email}"><b>${foundEmail.name}</b></span>`;
      } else {
        return match; // Keep the original text if email not found
      }
    });
    // Update the input value based on the type
    if (type === "reply") {
      setReplyComment(inputValue);
      setReplyCommentToApi(replacedStr);
      setType("reply");
    } else {
      setComments(inputValue);
      setCommentToApi(replacedStr);
      setType();
    }
    if (type === "reply")
      if (
        replyCommentData &&
        inputValue.includes(
          allAdmin.filter((item) => selectedAdminReply?.includes(item.email))
            ? allAdmin
              .filter((item) => selectedAdminReply?.includes(item.email))
              .map((admin) => admin.name)
              .join(",")
            : ""
        )
      ) {
        setSelectedAdminReplye();
      } else {
        if (
          commntData &&
          inputValue.includes(
            allAdmin.filter((item) => selectedAdmin?.includes(item.email))
              ? allAdmin
                .filter((item) => selectedAdmin?.includes(item.email))
                .map((admin) => admin.name)
                .join(",")
              : ""
          )
        ) {
          setSelectedAdmin();
        }
      }
    const cursorPosition = event.target.selectionStart;
    const textBeforeCursor = inputValue.substring(0, cursorPosition);
    const lastWord = textBeforeCursor.split(" ").pop();
    if (lastWord.startsWith("@")) {
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
        // Filter admin emails based on input
        const filteredAdminEmails = AddPartnersList.filter(
          (admin) =>
            admin.email.toLowerCase().includes(query.toLowerCase()) ||
            admin.name.toLowerCase().includes(query.toLowerCase())
        );
        // Update the filtered emails
        setFilteredEmails(filteredAdminEmails);
      } else {
        setFilteredEmails(AddPartnersList);
      }
    } else {
      setFilteredEmails([]);
    }
  };
  /*Function to get the email to assign */
  const handleEmailClick = (email, type) => {
    if (email.u_id) {
      setSelectedPartner(email);
    }

    if (type === "reply") {
      setSelectedAdminReplye((prevValue) => prevValue + email.email + ",");
      setReplyComment((prevValue) => `${prevValue}${email.name} `);
      setReplyCommentToApi(
        (prevValue) =>
          `${prevValue} <span title="${email.email}" > <b>${email.name}</b></span> `
      );
      setType("reply");
    } else {
      setSelectedAdmin((prevValue) => {
        const updatedAdmin = prevValue + email.email + ",";
        return updatedAdmin.replace("undefined", "");
      });
      setComments(
        (prevValue) =>
          `${prevValue}${email.name + (email.u_id ? " (Partner)" : "")}`
      );
      setCommentToApi(
        (prevValue) =>
          `${prevValue} <span title="${email.email}" > <b>${email.name}</b></span> `
      );
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
    let IspartnerList = selectedPartner ? partnerList : [];
    let newAssinList = [...IspartnerList, ...allAdmin];

    let DocId = docData.id;
    let sender =
      AdminType === "agent"
        ? admin_name
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).name
          : admin_name;
    let senderEmail =
      AdminType === "agent"
        ? admin_email
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).email
          : "";
    // Variables for mentioning admins
    const email = selectedAdmin; // (selectedAdmin + `${selectedPartner && "," + selectedPartner.email}`) || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = newAssinList.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => admin.name)
        .join(",")
      : "";
    const assignedUserId = newAssinList.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => (admin.u_id ? admin.id : admin.admin_id))
        .join(",")
      : "";
    // eslint-disable-next-line no-useless-concat
    const assignedUserType = newAssinList.filter((item) =>
      selectedAdmin?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdmin?.includes(item.email))
        .map((admin) => (admin.u_id ? "agent" : admin.admin_type))
        .join(",")
      : "";

    /*Comment */
    // Step 1: Bold email addresses but avoid interfering with name replacements
    let boldComment = commentToApi.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      "<b>$1</b>"
    );

    // Step 2: Ensure title attributes do not have bold tags inside them
    let removeBTage = boldComment.replace(
      /title="(<b>)(.*?)(<\/b>)"/g,
      'title="$2"'
    );

    // Start with the cleaned comment
    let comment = removeBTage;

    // Step 3: Split names and emails for replacing names with <span> elements
    let namesArray = assignedAdminName?.split(",").map((name) => name.trim());
    let updatedComment = comment; // Start with the original comment

    // Step 4: Replace names in the comment with <span> tags that include email titles
    selectedAdmin
      ?.split(",")
      .map((email) => email.trim())
      .forEach((email, index) => {
        const name = namesArray[index]; // Get the corresponding name for each email
        const admin = newAssinList.find((admin) => admin.email === email); // Find the admin by email

        if (admin && name) {
          // Create the spanTag with the correct formatting
          const spanTag = `<span title="${admin.email}"><b>${name}</b></span>`;

          // Ensure you're replacing the name correctly without creating nested <b> tags
          updatedComment = updatedComment.replace(
            new RegExp(`\\b${name}\\b(?!</b>)`, "g"),
            spanTag
          );
        }
      });
    // Now updatedComment will have properly formatted <span> elements without nested bold tags
    // Send data to the API
    if (
      (comment === "" || comment.trim() === "") &&
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
          DocId,
          assignedUserId,
          email,
          subject,
          commentToApi,
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
          setCommentToApi("");
          setSelectedAdmin("");
          setSelectedPartner("");
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
          setCommentToApi("");
          setSelectedAdmin("");
          setSelectedPartner("");
          setFilteredEmails([]);
        }
      }
    }
    // Update state to include the new annotation
  };
  /*Function to reply for the comment */
  const ReplyAnnotation = async (data) => {
    let newAssinList = [...allAdmin, ...partnerList];

    let sender =
      AdminType === "agent"
        ? admin_name
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).name
          : "";
    let senderId = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).admin_id
      : "";
    let senderEmail =
      AdminType === "agent"
        ? admin_email
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).email
          : "";
    let senderType =
      AdminType === "agent"
        ? "agent"
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).admin_type
          : "";
    // Variables for mentioning admins
    const email = selectedAdminReply || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    let assignedAdminName = newAssinList.filter((item) =>
      selectedAdminReply?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdminReply?.includes(item.email))
        .map((admin) => admin.name)
        .join(",")
      : "";
    const assignedUserId = newAssinList.filter((item) =>
      selectedAdminReply?.includes(item.email)
    )
      ? newAssinList
        .filter((item) => selectedAdminReply?.includes(item.email))
        .map((admin) => (admin.u_id ? admin.id : admin.admin_id))
        .join(",")
      : "";
    const Rec_Admin_Type = //localStorage.getItem("admin_type");
      newAssinList.filter((item) => selectedAdminReply?.includes(item.email))
        ? newAssinList
          .filter((item) => selectedAdminReply?.includes(item.email))
          .map((admin) => (admin.u_id ? "agent" : admin.admin_type))
          .join(",")
        : "";
    /*Reply comment */
    let BoldComment = replyCommentToApi?.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      "<b>$1</b>"
    );
    let removeBTage = BoldComment?.replace(
      /title="(<b>)(.*?)(<\/b>)"/g,
      'title="$2"'
    );
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
          Rec_Admin_Type,
          sender,
          assignedAdminName,
          "document",
          senderId,
          senderEmail,
          AdminType === "agent" ? "agent" : senderType,
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
          setSelectedPartner("");
        }
      } catch (err) {
        console.log(err);
        setSelectedAdminReplye("");
        setFilteredEmails([]);
        setSelectedPartner("");
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

    // Handle newly added admins
    const newAssinList = [...allAdmin, ...partnerList];
    const selectedAdmins = newAssinList.filter((item) =>
      selectedAdmin?.includes(item.email)
    );

    selectedAdmins.forEach((admin) => {
      if (!newEmailsArray.includes(admin.email)) {
        // Add new admin's details to the arrays
        newEmailsArray.push(admin.email);
        newNamesArray.push(admin.name);
        newUserIdArray.push(admin.u_id ? admin.id : admin.admin_id);
        newUserTypeArray.push(admin.u_id ? "agent" : admin.admin_type);
      }
    });

    // Update the comment by ensuring all existing names are wrapped in <span> tags
    updatedCommentToApi = newNamesArray.reduce((comment, name, index) => {
      const email = newEmailsArray[index];
      const nameRegex = new RegExp(`\\b${name}\\b`, "g");

      // Replace names with <span> tags if they aren't already wrapped
      if (!comment.includes(`<span title="${email}"><b>${name}</b></span>`)) {
        const spanTag = `<span title="${email}"><b>${name}</b></span>`;
        comment = comment.replace(nameRegex, spanTag);
      }
      return comment;
    }, updatedCommentToApi);

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
      doc_parent_id: docData.parentReference.id,
      assigned_to: updatedEmails,
      assigned_to_name: updatedNames,
      id: originalData.id,
    };
    // Debug logs to verify the updated values
    // console.log("Assigned User Type: ", updatedUserTypes);
    // console.log("Assigned User ID: ", updatedUserIds);
    // console.log("Assigned To Name: ", updatedNames);
    // console.log("Assigned To: ", updatedEmails);
    // console.log("Updated Comment: ", updatedCommentToApi);
    // console.log("Updated Data: ", updatedData);

    // Call the API to update the document
    try {
      let res = await UpdateDocuentcommentAssign(updatedData, DocUserType);
      if (res.message === "Task updated successfully!") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setCommentData();
        setComments("");
        setCommentToApi("");
        Getcomments();
      }
    } catch (err) {
      console.log(err);
    }
  };
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

    // Handle newly added admins
    const newAssinList = [...allAdmin, ...partnerList];
    const selectedAdmins = newAssinList.filter((item) =>
      selectedAdminReply?.includes(item.email)
    );
    let senderId = newAssinList.find((item) => item.admin_id === admin_id)
      ? newAssinList.find((item) => item.admin_id === admin_id).admin_id
      : "";
    let senderEmail =
      AdminType === "agent"
        ? admin_email
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).email
          : "";
    let senderType =
      AdminType === "agent"
        ? "agent"
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).admin_type
          : "";
    let sender =
      AdminType === "agent"
        ? admin_name
        : newAssinList.find((item) => item.admin_id === admin_id)
          ? newAssinList.find((item) => item.admin_id === admin_id).name
          : "";
    selectedAdmins.forEach((admin) => {
      if (!newEmailsArray.includes(admin.email)) {
        // Add new admin's details to the arrays
        newEmailsArray.push(admin.email);
        newNamesArray.push(admin.name);
        newUserIdArray.push(admin.u_id ? admin.id : admin.admin_id);
        newUserTypeArray.push(admin.u_id ? "agent" : admin.admin_type);
      }
    });

    // Update the comment by ensuring all existing names are wrapped in <span> tags
    updatedCommentToApi = newNamesArray.reduce((comment, name, index) => {
      const email = newEmailsArray[index];
      const nameRegex = new RegExp(`\\b${name}\\b`, "g");

      // Replace names with <span> tags if they aren't already wrapped
      if (!comment.includes(`<span title="${email}"><b>${name}</b></span>`)) {
        const spanTag = `<span title="${email}"><b>${name}</b></span>`;
        comment = comment.replace(nameRegex, spanTag);
      }
      return comment;
    }, updatedCommentToApi);

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
        "document",
        senderId,
        senderEmail,
        AdminType === "agent" ? "agent" : senderType,
        userId, //Userid
        docData.parentReference.id,
        DocUserType,
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
        setAnnotationDrawBox("");
        setSelectedPartner("");
      }
    } catch (err) {
      console.log(err);
      setSelectedAdminReplye("");
      setFilteredEmails([]);
      setSelectedPartner("");
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
  /*Function to delete comment */
  const OnDeleteComment = async (docId, id) => {
    try {
      let res = await DeleteCommentsAndAssign(docId, id);
      if (res.data.message === "Task deleted successfully!") {
        toast.success("Task Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setCommentData();
        setComments("");
        setCommentToApi("");
        Getcomments();
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to delete comment Replies*/
  const OnDeleteCommentReplies = async (id) => {
    try {
      let res = await DeleteReplyCommentsAndAssign(id);
      if (res.data.message === "deleted successfully!") {
        toast.success("Reply Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setReplyComment();
        setReplyCommentData();
        setReplyCommentToApi("");
        getCommentsReplyList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${openAnnotationBox
        ? "col-md-3 col-lg-3 col-sm-2 py-2 bg-light comments_and_replies"
        : "col-md-3 col-lg-3 col-sm-2 py-2 bg-light comments_and_replies d-none"
        } `}
      style={{
        transition: "all .3s",
        maxHeight: docsection ? "100vh" : "calc(100vh - 130px)",
      }}
    >
      {/* //condition for imm pdf
        // (docData.name && docData.name.toLowerCase().includes("imm")
        //   ? replyCommentClick === undefined ||
        //   replyCommentClick === "" ||
        //   replyCommentClick === null
        //   : addCommentFlag === true) ? */}
      <div
        style={{
          // position: "absolute",
          // left: selectedAnnotation.x_axis + 10,
          // top: selectedAnnotation.y_axis + 20,
          // zIndex: 1,
          transition: "all .3s",
        }}
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
              rows={2}
              style={{ outline: 0 }}
            ></textarea>
            {filteredEmails.length > 0 && type !== "reply" ? (
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
                  setCommentToApi("");
                  setAnnotationDrawBox("");
                  setCommentData();
                  setSelectedPartner();
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
                    addAnnotation(annotationDrawBox);
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
            <div className="col mr-2 p-0 form_group">
              {/* <p className="input_label ">Filter by Admin:</p> */}
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
                  style={{ fontSize: 13 }}
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
              {/* <p className="input_label ">Filter by Status:</p> */}
              <div className="select_div">
                <select
                  name="status"
                  id="status"
                  onClick={(e) => {
                    // setAnnotationStatus(e.target.value)
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
                <h5>No comments</h5>
              </div>
            ) : (
              (commentsList || []).map((commentItem, index) => (
                <div
                  className={`card col-12 mb-2 p-0 comment_box_card bg-white
                  ${annotationId === JSON.parse(commentItem?.doctaskjson).id &&
                      annotationId &&
                      JSON.parse(commentItem?.doctaskjson)
                      ? "highlighted-comment"
                      : ""
                    }`}
                  style={{
                    backgroundColor: "#fff",
                    color: "white",
                  }}
                  onClick={() => {
                    setAnnotationId(
                      JSON.parse(commentItem?.doctaskjson).id || ""
                    );
                    setReplyCommentClick(commentItem.id);
                    getCommentsReplyList();
                    setFilteredEmails([]);
                    // setComments("")
                    setCommentToApi("");
                    if (replyCommentClick !== commentItem.id) {
                      setSelectedAdmin("");
                      setReplyCommentData("");
                      setSelectedAdminReplye("");
                      setSelectedPartner();
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
                      className="text-gray pr-1"
                      title="Update Comment"
                      onClick={() => {
                        handleUpdateCommentLinkClick(commentItem);
                      }}
                    >
                      {console.log(commentItem)}
                      <CiEdit />
                    </Link>

                    <Link
                      className=""
                      title={commentItem.status === "2" ? "Task overdue" : "Update status to complete"}
                      onClick={(e) => {
                        OnHandleUpdateCommentStatus(
                          commentItem,
                          commentItem.status === "1" ? "0" : "1"
                        );
                        setFilteredEmails([]);
                        setAnnotationDrawBox("");
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
                            {/* {commentItem.task_creator_user_id
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
                                : ""} */}
                          </div>
                        </div>
                        <div className=" mb-0">
                          <div className="font-size-3 font-weight-bold text-capitalize">
                            {/* {commentItem.task_creator_user_id
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
                                : ""} */}
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
                        allAdmin={allAdmin}
                        determineBackgroundColor={determineBackgroundColor}
                        handleUpdateReplyLinkClick={handleUpdateReplyLinkClick}
                        OnHandleUpdateCommentReply={OnHandleUpdateCommentReply}
                        type={type}
                        replyCommentData={replyCommentData}
                        OnDeleteCommentReplies={OnDeleteCommentReplies}
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
    </div>
  );
}
