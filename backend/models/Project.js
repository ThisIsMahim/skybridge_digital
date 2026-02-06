const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  client: {
    type: String,
  },
  industry: {
    type: String,
    enum: ["SEO", "Web Design", "Marketing", "Branding", "Fintech", "Health", "Other"], // Added some likely needed ones or just remove enum restrict if strictly needed, but let's keep it loose
  },
  challenge: {
    type: String,
  },
  solution: {
    type: String,
  },
  metric: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  challengeImage: {
    type: String,
  },
  solutionImage: {
    type: String,
  },
  logo: {
    type: String,
  },
  summary: {
    type: String,
  },
  overview: {
    type: String,
  },
  problemDetail: {
    type: String,
  },
  approach: {
    type: String,
  },
  outcome: {
    type: String,
  },
  testimonial: {
    quote: { type: String },
    author: { type: String },
    role: { type: String },
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

// Create slug from title if not provided
projectSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    if (!this.slug) {
      this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
