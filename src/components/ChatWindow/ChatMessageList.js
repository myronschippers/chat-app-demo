import React from 'react';
import { useSelector } from 'react-redux';

// MATERIAL-UI
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@material-ui/core';

function ChatMessageList(props) {
  const {
    user,
  } = props;
  const messages = useSelector(store => store.chatMessages);

  return (
    <List component="ul" aria-label="messages">
      {messages.length > 0 ?
        messages.map((item, index) => {
          return (
            <ListItem key={index}>
              {item.displayName === user.username ?
                <>
                  <ListItemText primary={item.message} />
                  <ListItemIcon>
                    <Chip label={item.displayName} color="primary" />
                  </ListItemIcon>
                </> :
                <>
                  <ListItemIcon>
                    <Chip label={item.displayName} />
                  </ListItemIcon>
                  <ListItemText primary={item.message} />
                </>
              }
            </ListItem>
          );
        }) :
        (<ListItem>
          <ListItemText primary="There are no messages in this thread." />
        </ListItem>)
      }
    </List>
  );
}

export default ChatMessageList;
