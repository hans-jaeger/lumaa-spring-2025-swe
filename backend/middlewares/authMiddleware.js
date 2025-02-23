/**
 * Authentication middleware module
 * 
 * This module provides a middleware function to verify JSON Web Tokens (JWTs) and authenticate incoming requests.
 * 
 */

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Expect header format: "Bearer <token>" which we split based on whitespace 
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    // Attach user information to the request
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
