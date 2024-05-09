import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { addAdmin } from '../../../Store';
import {  useDispatch } from 'react-redux'

const MentionAdminInDoc = ({ adminList, selectedMentionAdmin, setSelectedMentionAdmin }) => {
  const admin = useSelector((state) => state.adminList)
  const dispatch = useDispatch()

  console.log(admin)
  const handleUserSelect = (userId) => {
    const userToAdd = adminList.find((user) => user.admin_id === userId);
    if (userToAdd && !selectedMentionAdmin.find((user) => user.admin_id === userId)) {
      setSelectedMentionAdmin([...selectedMentionAdmin, userToAdd]);
       dispatch(addAdmin(userToAdd))
    }
  };

  const handleUserRemove = (userId) => {
    const updatedUsers = selectedMentionAdmin.filter((user) => user.admin_id !== userId);
    setSelectedMentionAdmin(updatedUsers);
     dispatch(addAdmin(updatedUsers))
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
