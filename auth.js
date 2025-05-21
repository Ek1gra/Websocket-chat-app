const jwt = require('jsonwebtoken');
const SECRET = 'mysecretkey';

// Express middleware to validate JWT in HTTP requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Socket.IO middleware
function authenticateSocket(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));

  try {
    const payload = jwt.verify(token, SECRET);
    socket.username = payload.username;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
}

module.exports = {
  authenticateToken,
  authenticateSocket
};
