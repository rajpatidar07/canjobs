import React from 'react';
import { IoMdClose } from 'react-icons/io';

const MentionAdminInDoc = ({ adminList, selectedMentionAdmin, setSelectedMentionAdmin }) => {
  const handleUserSelect = (userId) => {
    const userToAdd = adminList.find((user) => user.admin_id === userId);
    if (userToAdd && !selectedMentionAdmin.find((user) => user.admin_id === userId)) {
      setSelectedMentionAdmin([...selectedMentionAdmin, userToAdd]);
    }
  };

  const handleUserRemove = (userId) => {
    const updatedUsers = selectedMentionAdmin.filter((user) => user.admin_id !== userId);
    setSelectedMentionAdmin(updatedUsers);
  };

  return (
    <div className="mention-admin-container">
      <select
        multiple
        className='form-control'
        onChange={(e) => handleUserSelect(e.target.value)}
      >
        {adminList.map((user, index) => (
          <option key={index} value={user.admin_id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="selected-users-container">
        {selectedMentionAdmin.map((user, index) => (
          <div key={index} className="badge">
            {user.name}
            <IoMdClose
              onClick={() => handleUserRemove(user.admin_id)
                
              }
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentionAdminInDoc;
