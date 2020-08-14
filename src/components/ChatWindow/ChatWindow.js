import React, { Component } from 'react';
import io from 'socket.io-client';
import styles from './ChatWindow.module.css';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import ChatMessageList from './ChatMessageList';
import UserPicker from './UserPicker';

let socket = {};

class ChatWindow extends Component {
  isChatty =  false;
  roomKey = null;
  messageKey = null;

  state = {
    typedMsg: '',
    messages: [],
  }

  componentDidMount() {
    // connect to socket.io
    socket = io.connect('http://localhost:3000');
  }

  initWatchers() {
    if (!this.props.store.user.id || !this.props.store.chatWith.id || this.isChatty) {
      return false;
    }
    this.isChatty = true;

    const currentUser = this.props.store.user.id;
    const chatWithUser = this.props.store.chatWith.id;
    // room key combines the id of the logged in user with
    // the id of the selected user to chat with
    // the lesser ID value will always come first to ensure consistency
    this.roomKey = currentUser < chatWithUser ?
      `room_${currentUser}_${chatWithUser}`
      : `room_${chatWithUser}_${currentUser}`;
    this.messageKey = `new_message_${this.roomKey}`;

    socket.emit('JOIN_CHAT', {
      displayName: this.props.store.user.username,
      room: this.roomKey,
    },
    (joinData) => {
      console.log('Joined Chat: ', joinData);
    });

    //
    // SOCKET WATCHERS
    // ------------------------------

    socket.on(this.messageKey, (data) => {
      const { messages } = data;
      this.setState({
          messages,
      });
    });
  }

  componentWillUnmount() {
    // disconnect from socket.io
    if (socket.emit) {
      socket.emit('disconnect');
      // closes this socket instance
      socket.off();
    }
  }

  changeMessage(event) {
    this.setState({
      typedMsg: event.target.value,
    });
  }

  onSubmitChatter(event) {
    event.preventDefault();
    // submit new message to the server
    console.log('Send Message', socket);

    // testing socket connection
    socket.emit('CHAT_MESSAGE',
      {
        room: this.roomKey,
        displayName: this.props.store.user.username,
        message: this.state.typedMsg
      },
      (chatData) => {
        console.log('Emit message:', chatData);
      }
    );

    this.setState({
      typedMsg: '', // clear message input
    });
  }

  render() {
    // kick off the socket watchers
    this.initWatchers();

    const disableChat = !this.props.store.chatWith.id;
    console.log('disableChat:', disableChat);

    return (
      <div className={styles.chatPanel}>
        <div
          className={styles['chatPanel-window']}
        >
          {disableChat ?
            <UserPicker /> :
            <ChatMessageList
              messages={this.state.messages}
              user={this.props.store.user}
            />
          }
        </div>

        <form
          className={styles['chatPanel-actions']}
          onSubmit={(event) => this.onSubmitChatter(event)}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                variant="filled"
                fullWidth
                label="Message"
                disabled={disableChat}
                value={this.state.typedMsg}
                onChange={(event) => this.changeMessage(event)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                size="large"
                disabled={disableChat}
              >
                SEND
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChatWindow);
