const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // URL to image (can be hosted elsewhere or uploaded)
    required: true,
  },
  tags: [{
    type: String, // e.g., ["React", "Node.js"]
  }],
  liveLink: {
    type: String,
    required: false,
  },
  repoLink: {
    type: String,
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
