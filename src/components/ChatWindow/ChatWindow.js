import React, { Component } from 'react';
import io from 'socket.io-client';
import styles from './ChatWindow.module.css';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Grid,
} from '@material-ui/core';

const socket = io.connect('http://localhost:3000');

class ChatWindow extends Component {
  state = {
    typedMsg: '',
  }

  changeMessage(event) {
    this.setState({
      typedMsg: event.target.value,
    });
  }

  onSubmitChatter(event) {
    event.preventDefault();
    // submit new message to the server
    console.log('Send Message');

    // testing socket connection
    socket.emit('message',
      {
        user: this.props.store.user,
        message: this.state.typedMsg
      },
      (testArg) => {
        console.log('Emit message:', testArg);
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
          <List component="ul" aria-label="messages">
            <ListItem>
              <ListItemIcon>
                <Chip label="trashPanda" />
              </ListItemIcon>
              <ListItemText primary="Some message is here" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Some message is here" />
              <ListItemIcon>
                <Chip label="newDugg" color="primary" />
              </ListItemIcon>
            </ListItem>
          </List>
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
