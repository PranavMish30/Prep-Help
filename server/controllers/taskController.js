const Task = require('../models/task');
const asyncHandler = require('express-async-handler');

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title for the task');
  }

  const task = await Task.create({
    user: req.user.id, // Set the user ID from the protect middleware
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    subject: req.body.subject,
  });
  res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure the logged-in user owns the task
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to update this task');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure the logged-in user owns the task
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to delete this task');
  }

  await Task.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id, message: 'Task deleted successfully' });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};