
const express = require('express');
const SocketIO = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const httpServer = http.createServer(app);
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
  socket.on('message', (data) => {
    console.log('Socket Message:', data);
  });
});

/** Listen * */
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
