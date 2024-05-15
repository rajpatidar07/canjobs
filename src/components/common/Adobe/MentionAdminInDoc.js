import React, { useState ,useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const MentionAdminInDoc = ({ adminList, commentsList ,docPreview}) => {
  let AssignedId = commentsList.length === 0 ? "" : commentsList[0].assined_to_user_id.split(",").map(Number)
  let AssigneAdmin = adminList.filter((item) =>
    AssignedId.includes(parseInt(item.admin_id))
  );
  const [selectedMentionAdmin, setSelectedMentionAdmin] = useState(
    AssigneAdmin || []
  );
  useEffect(() => {
    setSelectedMentionAdmin(AssigneAdmin)
     // eslint-disable-next-line
  }, [AssignedId])

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

  return (
    <div
      className="mention-admin-container"
      style={{ boxShadow: "0 0 4px #ccc", borderRadius: 5 }}
    >
      <div className="selected-users-container" id="SelectAdmin">
        {selectedMentionAdmin.map((user, index) => (
          <div key={index} className="badge">
            {user.name}
            <span className="d-none">
              {user.email} {user.admin_id}
            </span>
            <IoMdClose
              onClick={() => handleUserRemove(user.admin_id)}
              style={{ marginLeft: "5px", cursor: "pointer" }}
            />
          </div>
        ))}
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
