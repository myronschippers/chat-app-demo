
const express = require('express');
// importing Socket IO dependency
const SocketIO = require('socket.io');
// importing http from node environment for socket.io (no npm install needed)
const http = require('http');
require('dotenv').config();

const app = express();
// needed for socket.io connection
const httpServer = http.createServer(app);
// initializing socket.io with the server app
const io = SocketIO(httpServer);
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

//
// IO CONNECTION
// ------------------------------
io.on('connection', (socket) => {
  console.log('a user connected');
  const chatRooms = {};

  // watches for a specific emitted event
  socket.on('CHAT_MESSAGE', (data, callbackFn) => {
    try {
      const {
        message,
        displayName,
        room,
      } = data;

      if (!chatRooms[room]) {
        throw('Now active chat.');
      }

      chatRooms[room].messages.push({
        displayName,
        message,
      });

      callbackFn({ chats: chatRooms });
      socket.emit(`new_message_${room}`, chatRooms[room]);
    } catch(err) {
      callbackFn({
        error: err,
        errorMsg: 'There was a problem sending your message.',
      });
    }
    console.log('Socket Message:', data);
  });

  // watches for when someone joins a new chat
  socket.on('JOIN_CHAT', (data, callbackFn) => {
    try {
      const {
        displayName,
        room,
      } = data;

      if (!chatRooms[room]) {
        chatRooms[room] = {
          users: [displayName],
          messages: [],
        }
      } else if (chatRooms[room].users.length < 2) {
        chatRooms[room].users.push(displayName);
      }

      callbackFn({ chats: chatRooms });
    } catch(err) {
      callbackFn({
        error: err,
        errorMsg: 'There was a problem connecting chat.',
      });
    }
  });

  socket.on('disconnect', (data) => {
    console.log('Disconnect Socket:', data);
  });
});

/** Listen * */
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
