const express = require('express');
const router = express.Router();
const { generatePlanController } = require('../controllers/llmController');
const { protect } = require('../middleware/authMiddleware');

// Route to generate a plan, protected by JWT
router.post('/generate-plan', protect, generatePlanController);

module.exports = router;