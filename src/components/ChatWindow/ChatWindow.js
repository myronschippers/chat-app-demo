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

let socket = {};

class ChatWindow extends Component {
  state = {
    typedMsg: '',
    messages: [],
  }

  componentDidMount() {
    // connect to socket.io
    socket = io.connect('http://localhost:3000');
    socket.emit('JOIN_CHAT', {
      displayName: this.props.store.user.username,
      room: `room_${this.props.store.user.id}`,
    },
    (joinData) => {
      console.log('Joined Chat: ', joinData);
    });

    socket.on(`new_message_room_${this.props.store.user.id}`, (data) => {
      const { messages } = data;
      this.setState({
          messages,
      });
    })
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
        room: `room_${this.props.store.user.id}`,
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
    return (
      <div className={styles.chatPanel}>
        <div
          className={styles['chatPanel-window']}
        >
          <ChatMessageList
            messages={this.state.messages}
            user={this.props.store.user}
          />
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
