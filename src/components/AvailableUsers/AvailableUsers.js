import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AvailableUsers(props) {
  const [selectedUser, setSelectedUser] = useState({});
  const dispatch = useDispatch();
  const usersList = useSelector((store) => store.usersList);

  useEffect(() => {
    if (usersList.length === 0) {
      dispatch({
        type: 'FETCH_USERS_LIST',
      });
    }
  });

  const handleClickSelectUser = (user) => (event) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h3>Available Users</h3>

      {selectedUser.id && <p>You have selected {selectedUser.username}</p>}

      {usersList.length === 0 ? (
        <p>There are no available users.</p>
      ) : (
        <ul>
          {usersList.map((item, index) => {
            return (
              <li key={index} onClick={handleClickSelectUser(item)}>
                {item.username}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AvailableUsers;
