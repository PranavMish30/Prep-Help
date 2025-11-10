const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');

// @desc    Get all events for the logged-in user
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id });
  res.status(200).json(events);
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, start, end, type } = req.body;
  
  if (!title || !start || !end) {
    res.status(400);
    throw new Error('Please include title, start, and end times for the event');
  }

  const event = await Event.create({
    user: req.user.id,
    title,
    description,
    start,
    end,
    type,
    allDay: req.body.allDay || false,
  });
  res.status(201).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  
  // Authorization check
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to update this event');
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Authorization check
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to delete this event');
  }

  await Event.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id, message: 'Event deleted successfully' });
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};