import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { UpdateDocuentcommentAssign } from "../../../api/api";
import { toast } from "react-toastify";
const MentionAdminInDoc = ({ adminList, commentsList, docPreview }) => {
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
    console.log(originalData);
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
              style={{ fontSize: 12 }}
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
                  display:
                    AssigneAdmin.find((item) => item.admin_id === user.admin_id)
                      ?.admin_id === user.admin_id
                      ? "none"
                      : "",
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
      >
        {adminList.map((user, index) => (
          <option key={index} value={user.admin_id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MentionAdminInDoc;
