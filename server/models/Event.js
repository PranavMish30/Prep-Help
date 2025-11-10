const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  // Reference to the user who owns this event
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  // Start time (for calendar placement)
  start: {
    type: Date,
    required: [true, 'Please add a start time'],
  },
  // End time (for duration)
  end: {
    type: Date,
    required: [true, 'Please add an end time'],
  },
  type: {
    type: String,
    enum: ['STUDY', 'CLASS', 'EXAM', 'OTHER'], // Categorization for color coding
    default: 'STUDY',
  },
  allDay: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);