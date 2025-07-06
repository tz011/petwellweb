const mongoose = require('mongoose');

const AiSignupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  petType: {
    type: String,
    enum: ['dogs', 'cats', 'birds', 'small mammals', 'fish', 'reptiles', 'general'],
    default: 'general'
  },
  interests: [{
    type: String,
    enum: ['health', 'nutrition', 'training', 'grooming', 'behavior', 'emergency', 'general']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastNotified: {
    type: Date
  },
  notificationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
AiSignupSchema.index({ email: 1 });
AiSignupSchema.index({ petType: 1, isActive: 1 });

module.exports = mongoose.model('AiSignup', AiSignupSchema);