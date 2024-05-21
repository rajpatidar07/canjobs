import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { ADocAnnotation, UpdateDocuentcommentAssign } from "../../../api/api";
import { toast } from "react-toastify";
const MentionAdminInDoc = ({
  adminList,
  commentsList,
  docPreview,
  userId,
  data,
  setTaggedAdmin,
  DocUserType
}) => {
  let AssignedId =
    commentsList.length === 0
      ? ""
      : commentsList[0].assined_to_user_id.split(",").map(Number);
  let AssigneAdmin = adminList.filter((item) =>
    AssignedId.includes(parseInt(item.admin_id))
  );
  const [status, setStatus] = useState(commentsList[0]?.status);
  const [selectedMentionAdmin, setSelectedMentionAdmin] = useState(
    docPreview === true ? AssigneAdmin : [] || []
  );
  const hasRunEffect = useRef(false);
  setTaggedAdmin(selectedMentionAdmin);
  useEffect(() => {
    if (!hasRunEffect.current && AssignedId.length !== 0) {
      setSelectedMentionAdmin(AssigneAdmin);
      hasRunEffect.current = true;
    }
    // eslint-disable-next-line
  }, [AssignedId]);
  /*Function to add Admin to assign */
  const handleUserSelect = (userId) => {
    const userToAdd = adminList.find((user) => user.admin_id === userId);
    if (
      userToAdd &&
      !selectedMentionAdmin.find((user) => user.admin_id === userId)
    ) {
      setSelectedMentionAdmin([...selectedMentionAdmin, userToAdd]);
    }
  };
  /*Function to Remove Admin to assign */
  const handleUserRemove = (userId) => {
    const updatedUsers = selectedMentionAdmin.filter(
      (user) => user.admin_id !== userId
    );
    setSelectedMentionAdmin(updatedUsers);
  };
  /* Function to update status for the task */
  const OnHandleUpdateComment = async (originalData) => {
    let updatedData;
    if (originalData) {
      updatedData = {
        doc_id: originalData.doc_id,
        status: status === "1" ? "0" : "1",
        id: originalData.id,
        is_status_update: true,
      };
    }
    try {
      // Call the API with the updated status for the task
      let res = await UpdateDocuentcommentAssign(updatedData);
      if (res.message === "Task updated successfully!1") {
        status === "0"
          ? toast.success("Task completed Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          })
          : toast.error("Task is incomplete !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        setStatus(status === "1" ? "0" : "1");
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to Add update mention admin */
  const OnMentionAdmin = async () => {
    console.log(selectedMentionAdmin);
    if (selectedMentionAdmin.length === 0) {
      toast.error("The admin is not chosen to assign tasks!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      if (commentsList[0]?.id) {
        let updatedData = {
          // task_creator_user_id: localStorage.getItem("admin_id"),
          // task_creator_user_type: "",
          doc_id: data?.id,
          // user_admin_assigned: "",
          // json: this.annots,
          // assined_to_user_id: "",
          // assigned_user_type: "",
          // document_url: "",
          // subject_description: "N/A",
          // x_axis: "0",
          // y_axis: "0",
          // type: "document",
          // employee_id:  data?.userId,
          doc_parent_id: data?.parentReference.id,
          id: commentsList[0]?.id,
          assigned_to: selectedMentionAdmin
            .map((admin) => admin.email)
            .join(","),
          assined_to_user_id: selectedMentionAdmin
            .map((admin) => admin.admin_id)
            .join(","),
          assigned_to_name: selectedMentionAdmin
            .map((admin) => admin.name)
            .join(","),
          assigned_user_type_new: selectedMentionAdmin
            .map((admin) => admin.admin_type)
            .join(","),
          task_creator_user_id: localStorage.getItem("admin_id"),
          task_creator_user_type: "admin",
        };
        try {
          let res = await UpdateDocuentcommentAssign(updatedData);
          if (res.message === "Task updated successfully!1") {
            toast.success("Admin mentioned Successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            localStorage.setItem("mentionAdmin", JSON.stringify(selectedMentionAdmin))
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(DocUserType)
        try {
          let res = await ADocAnnotation(
            localStorage.getItem("admin_id"),
            data?.id,
            selectedMentionAdmin.map((admin) => admin.admin_id).join(","), //ASSIGNED ADMIN ID
            selectedMentionAdmin.map((admin) => admin.email).join(","), //ASSIGNED ADMIN EMAIL
            "", //SUBJECT
            "N/A", //COMMENT
            "0", //X AXIS
            "0", //Y AXIS
            "document",
            localStorage.getItem("admin_type"), //sender ADMIN type
            localStorage.getItem("admin"), //sender name,
            selectedMentionAdmin.map((admin) => admin.name).join(","), //assigned Admin or user Name,
            "", //follow up status(for notes only)
            "", //Next follow up date(for notes only)
            "admin", //Assign user type,
            "", //Document url(for notes only)
            localStorage.getItem("admin_email"), //Sender email
            userId, //employee id,
            "", //assigned_by_id
            data?.parentReference.id, // document parent code,
            "",// this.annots,//Annotation data,
            commentsList[0]?.id,//annotationId
            DocUserType,//document's uset type
          );
          if (res.data.message === "task inserted successfully!") {
            toast.success("Admin mentioned Successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            localStorage.setItem("callNotification", true);
            localStorage.setItem("mentionAdmin", JSON.stringify(selectedMentionAdmin))
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <div
      className="mention-admin-container"
      style={{ boxShadow: "0 0 4px #ccc", borderRadius: 5, background: "#fff" }}
    >
      <div className="d-flex flex-wrap p-1">
        <div
          className="selected-users-container d-flex flex-wrap align-items-center"
          id="SelectAdmin"
          style={{ gap: 5 }}
        >
          {AssigneAdmin.length === 0 ? null : (
            <span
              className="comment_status_update me-1"
              title="Update Task Status"
              style={{
                cursor: "pointer",
                color: status === "1" ? "white" : "black",
                border: status === "1" ? "solid 1px white" : "solid 1px black",
                backgroundColor: status === "1" && "green",
                borderRadius: "50%",
                width: 20,
                height: 20,
                fontSize: 14,
                textAlign: "center",
              }}
              onClick={(e) => {
                OnHandleUpdateComment(commentsList[0]);
              }}
            >
              &#x2713; {/* Checkmark symbol */}
            </span>
          )}

          {selectedMentionAdmin.map((user, index) => (
            <div
              key={index}
              className="badgebadge badge-pill badge-info"
              style={{
                fontSize: 12, display: AssigneAdmin.find((item) => item.admin_id === user.admin_id)
                  ?.admin_id === user.admin_id
                  ? "none"
                  : "",
              }}
            >
              {user.name}
              <span className="d-none">
                {user.email} {user.admin_id} {user.admin_type}
              </span>

              <IoMdClose
                onClick={() => handleUserRemove(user.admin_id)}
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <select
        multiple
        className="form-control"
        onChange={(e) => handleUserSelect(e.target.value)}
        style={{ fontSize: 15, textTransform: "capitalize", minHeight: 200 }}
      >
        {adminList.map((user, index) => (
          <option
            key={index}
            value={user.admin_id}
            style={{ borderBottom: "1px solid #eee" }}
          >
            {user.name}
          </option>
        ))}
      </select>
      <div className="d-flex justify-content-center p-1">
        <button
          onClick={() => OnMentionAdmin()}
          className="font-size-3 rounded-3 btn btn-primary border-0 btn-sm w-100"
          title="Save Mention Admin"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MentionAdminInDoc;
