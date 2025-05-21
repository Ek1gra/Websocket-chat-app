const express = require('express');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const { users } = require('./users');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

const SECRET = 'mysecretkey';

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, SECRET);
  res.json({ token });
});

// Middleware to authenticate socket connections
const { authenticateSocket } = require('./auth');
io.use(authenticateSocket);


// Handle socket connections
io.on('connection', socket => {
  console.log(`${socket.username} connected`);

  socket.on('message', msg => {
    io.emit('message', `${socket.username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.username} disconnected`);
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});