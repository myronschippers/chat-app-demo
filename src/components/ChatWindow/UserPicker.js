import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MATERIAL-UI
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

function UserPicker (props) {
  const usersList = useSelector(store => store.usersList);
  const dispatch = useDispatch();

  // component is ready
  useEffect(() => {
    if (usersList.length === 0) {
      dispatch({
        type: 'GET_USERS_LIST',
      });
    }
  });

  const handleSelectUserForChat = (userData) => () => {
    dispatch({ type: 'CHAT_WITH', payload: userData });
  }

  return (
    <div>
      Available Users:
      <List>
        {usersList.map((item, index) => {
          return (
            <ListItem
              key={index}
              dense
              button
              onClick={handleSelectUserForChat(item)}
            >
              <ListItemIcon>
                <IconButton edge="end" aria-label="chat">
                  <CommentIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={item.username} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default UserPicker;
