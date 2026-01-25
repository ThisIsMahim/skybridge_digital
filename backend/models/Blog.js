const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Markdown or HTML content
    required: true,
  },
  coverImage: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    default: 'Admin',
  },
  tags: [{
    type: String,
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
