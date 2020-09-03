import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AvailableUsers.module.css';

function AvailableUsers(props) {
  const [selectedUser, setSelectedUser] = useState({});
  const dispatch = useDispatch();
  const usersList = useSelector((store) => store.usersList);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const matchedUser = usersList.filter((item) => user.id === item.id);
    if (usersList.length === 0 || matchedUser.length > 0) {
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
        <ul className={styles.profList}>
          {usersList.map((item, index) => {
            return (
              <li
                key={index}
                className={styles['profList-item']}
                onClick={handleClickSelectUser(item)}
              >
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
