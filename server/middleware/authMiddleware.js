const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Used to fetch the user details
const asyncHandler = require('express-async-handler'); // Helper for handling async errors

// Helper to wrap controller logic and handle errors gracefully
// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check for token in headers (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (split "Bearer <token>" and take the second part)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token payload (it contains the user ID)
      // We exclude the password field for security
      req.user = await User.findById(decoded.id).select('-password'); 

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // Proceed to the next middleware/controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // 2. Handle missing token
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };