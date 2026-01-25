const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  // Book a Call / Meeting Info
  isBookingRequest: {
    type: Boolean,
    default: false,
  },
  preferredDate: {
    type: Date, // User's preferred date for the meeting
    required: false,
  },
  preferredTimeRange: {
    type: String, // e.g., "10:00 AM - 12:00 PM"
    required: false,
  },
  meetingTopic: {
    type: String, // e.g., "New Website", "Marketing Strategy"
    required: false,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Meeting Scheduled', 'Closed'],
    default: 'New',
  },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
