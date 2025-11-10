const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  // Reference to the user who owns this task
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Links this to the User model
  },
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false, // Tasks can exist without a strict due date
  },
  subject: {
    type: String,
    required: false, // Optional: for filtering by subject
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);