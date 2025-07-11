import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { GetCommentsAndAssign, ADocAnnotation, getallAdminData } from "../../api/api";
import AddNotesConversation from "../forms/admin/AddNotesConversation";
import useValidation from "./useValidation";
import moment from "moment";
import { toast } from "react-toastify";
export default function JobChatBox({
  userId,
  partnerChatNav,
  type,
  emp_user_type
}) {
  const [allData, setAllData] = useState([]);
  const [apicall, setApiCall] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(30);
  const [AdminList, setAdminList] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userErrorforadminAssign, setUserErrorforadminAssign] = useState(false);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    // status: type === "partnerChat" ? "" : "normal",
    nxtfollowupdate:
      type === "partnerChat"
        ? ""
        : moment().add(1, "week").format("YYYY-MM-DD"),
    subject: "",
    message: "",
    DocUrl: "",
  };

  // VALIDATION CONDITIONS
  const validators = {
    message: [
      (value) =>
        (value === "" || value.trim() === "") && state.DocUrl === ""
          ? "Message is required"
          : /[-]?\d+(\.\d+)?/.test(value)
            ? "Message can not have a number."
            : value.length < 2
              ? "Message should have 2 or more letters"
              : /[^A-Za-z 0-9]/g.test(value)
                ? "Cannot use special character "
                : "",
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const {
    state,
    setState /*, setErrors*/,
    // onInputChange,
    errors /* validate*/,
  } = useValidation(initialFormState, validators);

  // Admin details
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type");
  let admin_name = localStorage.getItem("admin");
  let admin_email = localStorage.getItem("admin_email");

  // User details
  let user_type = localStorage.getItem("userType");

  //   Render data
  useEffect(() => {
    GetNotesData();
    if (apicall === true) {
      setApiCall(false);
    }
    //Condition to clear docid from url after navigation from notification
    if (partnerChatNav) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      localStorage.setItem("navigation_url", "")
    }
    // eslint-disable-next-line
  }, [apicall, partnerChatNav, userId]);

  //   Get the notes list
  const GetNotesData = async () => {
    try {
      let res = await GetCommentsAndAssign(
        "",
        "",
        "",
        type,
        "1",
        recordsPerPage,
        "DESC",
        "created_on",
        "",
        "",
        userId,
        emp_user_type
      ); let adminRes = await getallAdminData();
      // console.log(userData.data.data)
      if (adminRes.data.length > 0) {
        setAdminList(adminRes.data);
      } else {
        setAdminList([]);
      }
      if (res.data.status === 1 || res.data.status === "1") {
        setAllData(res.data.data.data.reverse());
      } else if (res.data.message === "Task data not found") {
        setAllData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Submit function to add notes conversation
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const assignedAdminsemail = selectedAdmin
      ? selectedAdmin?.map((item) => item.email).toString()
      : "";
    const assignedAdmins = AdminList.filter((item) =>
      assignedAdminsemail.includes(item.email)
    );
    const assignedAdminName =
      assignedAdmins.map((admin) => admin.name).join(",") || "";

    const assignedUserType =
      assignedAdmins
        .map((admin) => (admin.u_id ? "agent" : admin.admin_type))
        .join(",") || "";
    const assigned_by_id =
      assignedAdmins.map((admin) => admin.u_id || admin.admin_id).join(",") ||
      "";
    try {
      setIsApiLoading(true)
      let res = await ADocAnnotation(
        admin_id,
        "", //doc id
        assigned_by_id || "",
        assignedAdminsemail, //assigne email
        state.subject, //subject
        state.message, //Comment
        0, //x_axis
        0, //y_axis
        type, // Type for the api
        admin_type, //sender type
        admin_name, //sender name,
        assignedAdminName || "", //assigned Admin or user Name,
        state.status, //follow up status
        state.nxtfollowupdate, //Next follow up date
        assignedUserType, //Assign user type,
        state.DocUrl,
        admin_email, //Sender email,
        userId,//employee id
        assigned_by_id,//user admin assigned id
        "",
        "",
        "",
        emp_user_type
      );
      if (res.data.message === "task inserted successfully!") {
        // toast.success("Message sent Successfully", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 1000,
        // });
        setApiCall(true);
        setIsApiLoading(false)
        setState(initialFormState);
        setFileNames("");
        setSelectedAdmin([])
        setFilteredEmails([]);
      }
      //   console.log(res, "This is the response");
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "required fields cannot be blank") {
        toast.error(" Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setIsApiLoading(false)
        setState(initialFormState);
        setFilteredEmails([]);
        setFileNames("");
        setSelectedAdmin([])
      }
    }
    // }
  };

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /*On change fnction to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;
    {
      // Check the number of files selected
      if (files.length > 15) {
        toast.error("You can only upload a maximum of 15 files at a time", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return;
      }

      // Continue with file validation and processing
      const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
      const maxSize = 1024 * 8000; // 8 MB

      const fileList = [];
      let DocRealName;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check file type
        const fileType = `.${file.name.split(".").pop()}`;
        if (!allowedTypes.includes(fileType.toLowerCase())) {
          toast.error(
            `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            }
          );
          return;
        }

        // Check file size
        if (file.size > maxSize) {
          toast.error(
            `Document size can't be more than 8 MB for file '${file.name}'`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            }
          );
          return;
        }

        // Read file as data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const encoded = await convertToBase64(file);
        const base64Name = encoded.base64;

        // Construct file object with base64 data
        const DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]
          }`;

        // Use DocRealName as the key for DocFile
        DocRealName = file.name.split(".")[0].replace(/ /g, "_");
        fileList.push({
          // type: "notes",
          docName: DocRealName,
          docUrl: DocFile,
        });
      }
      let newFileNames = [];
      newFileNames.push(DocRealName);
      // Store the object of files
      setState({ ...state, DocUrl: fileList });
      setFileNames(newFileNames);
      // bulkUpload === "no" ? setDocName(DocRealName) : setDocName("");
      // setShowSaveDoc(true);
    }
  };

  //Function to Remove any attechment
  const handleRemoveFile = (fileName) => {
    const newFileBase = { ...state.DocUrl };
    const newFileNames = fileNames.filter((name) => name !== fileName);
    delete newFileBase[fileName];
    setState({ ...state, DocUrl: newFileBase });
    setFileNames(newFileNames);
    if (newFileNames) {
      setState({ ...state, DocUrl: "" });
    }
  };

  // Function to add annotation based on conditions
  const handleInputChange = (e, type) => {
    let value = e.target.value;
    const lastChar = value.slice(-1);
    // setType(type); // Set type once, as it is common in both cases
    // if (type === "reply") {
    //   setReplyComment(value);
    // } else {
    setState({ ...state, message: value });
    // }

    setUserErrorforadminAssign("");
    // console.log(user_type);
    if (user_type === "admin") {
      if (lastChar === "@") {
        setDropdownVisible(true);
        setFilteredEmails(AdminList);
      } else {
        const match = value.match(/@(\w*)$/);
        if (match) {
          const query = match[1].toLowerCase();
          const filtered = AdminList.filter((user) =>
            user.name?.toLowerCase().includes(query)
          );
          setFilteredEmails(filtered);
        } else {
          setFilteredEmails([]);
          setDropdownVisible(false);
        }
      }
    } else {
      if (lastChar === "@") {
        setUserErrorforadminAssign(`Sorry ! you can't assign admin`);
      } else {
        setUserErrorforadminAssign("");
      }
    }
  };
  const handleEmailClick = (user, type) => {
    // Add the selected user to the assigned list
    // if (type === "reply") {
    //   setSelectedAdminReplye((prev) => [...prev, user]);

    //   // Replace @username in the comment
    //   const updatedComment = replyComment.replace(/@\w*$/, `@${user.name} `);
    //   setReplyComment(updatedComment);

    //   // Hide the dropdown and update the filtered users list
    //   setDropdownVisible(false)
    //   setFilteredEmails((prev) =>
    //     prev.filter((u) => u.id !== user.id)
    //   );
    // } else {
    setSelectedAdmin((prev) => [...prev, user]);

    // Replace @username in the comment
    const updatedComment = state.message.replace(
      /@\w*$/,
      `@${user.name} `
    );
    setState({ ...state, message: updatedComment });

    // Hide the dropdown and update the filtered users list
    setDropdownVisible(false);
    setFilteredEmails((prev) => prev.filter((u) => u.id !== user.id));
    // }
  };
  return (
    <div className="chat_box_container bg-white row m-0">
      {<div className="chat-container col-md-6">
        <MessageList
          data={allData}
          loginuser={admin_id
          }
          loginusertype={admin_type}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
        />
        {dropdownVisible && filteredEmails.length > 0 ? (
          <ul
            // className="email-suggestions"
            style={{
              height: filteredEmails.length >= 6 ? "250px" : "auto",
              padding: "10px",
              overflowY: "auto",
              background: "rgb(248, 248, 248)",
              borderBottom: "1px solid rgb(221, 221, 221)",
              listStyle: "none",
              width: "100%"
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
        <AddNotesConversation
          handleMessageSubmit={handleMessageSubmit}
          onInputChange={handleInputChange}
          state={state}
          errors={errors}
          handleBulkFileChange={handleBulkFileChange}
          handleRemoveFile={handleRemoveFile}
          fileNames={fileNames}
          setState={setState}
          isApiLoading={isApiLoading}
        />

        {userErrorforadminAssign ? (
          <span className="text-danger font-size-3">
            {userErrorforadminAssign}
          </span>
        ) : null}
      </div>

      }
    </div>
  );
}
