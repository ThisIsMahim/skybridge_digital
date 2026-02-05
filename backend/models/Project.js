const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  client: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    enum: ["SEO", "Web Design", "Marketing", "Branding"],
  },
  challenge: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  metric: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  challengeImage: {
    type: String,
    required: true,
  },
  solutionImage: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  problemDetail: {
    type: String,
    required: true,
  },
  approach: {
    type: String,
    required: true,
  },
  outcome: {
    type: String,
    required: true,
  },
  testimonial: {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true },
  },
  tags: [{
    type: String,
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
