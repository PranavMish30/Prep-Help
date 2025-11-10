const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All task routes require authentication
router.route('/')
  .get(protect, getTasks) // GET /api/tasks
  .post(protect, createTask); // POST /api/tasks

router.route('/:id')
  .put(protect, updateTask) // PUT /api/tasks/:id
  .delete(protect, deleteTask); // DELETE /api/tasks/:id

module.exports = router;