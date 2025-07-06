const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  preferences: {
    weekly: {
      type: Boolean,
      default: true
    },
    monthly: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    petType: {
      type: String,
      enum: ['dogs', 'cats', 'birds', 'small mammals', 'fish', 'reptiles', 'all'],
      default: 'all'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastEmailSent: {
    type: Date
  },
  emailCount: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    enum: ['website', 'popup', 'footer', 'admin'],
    default: 'website'
  }
}, {
  timestamps: true
});

// Index for better performance
NewsletterSchema.index({ email: 1 });
NewsletterSchema.index({ isActive: 1, 'preferences.petType': 1 });

module.exports = mongoose.model('Newsletter', NewsletterSchema);