const express = require('express');
const router = express.Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// All event routes require authentication
router.route('/')
  .get(protect, getEvents) // GET /api/events
  .post(protect, createEvent); // POST /api/events

router.route('/:id')
  .put(protect, updateEvent) // PUT /api/events/:id
  .delete(protect, deleteEvent); // DELETE /api/events/:id

module.exports = router;