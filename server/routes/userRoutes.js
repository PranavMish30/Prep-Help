const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Get current user profile data
// @route   GET /api/users/profile
// @access  Private (Requires a valid JWT)
router.get('/profile', protect, (req, res) => {
    // req.user is set by the protect middleware
    res.json(req.user); 
});

module.exports = router;