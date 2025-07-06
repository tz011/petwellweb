const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// Validation middleware
const validateNewsletterSignup = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .custom(async (email) => {
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        throw new Error('This email is already subscribed to our newsletter');
      }
      return true;
    })
];

router.post('/', validateNewsletterSignup, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email } = req.body;

    // Create new subscriber
    const newSubscriber = new Newsletter({ 
      email,
      subscribedAt: new Date()
    });

    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        email: newSubscriber.email,
        subscribedAt: newSubscriber.date
      }
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This email is already subscribed to our newsletter'
      });
    }

    res.status(500).json({
      error: 'Failed to subscribe to newsletter. Please try again later.'
    });
  }
});

// Get all subscribers (admin only - you might want to add authentication)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .select('-__v')
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      error: 'Failed to fetch subscribers'
    });
  }
});

// Unsubscribe endpoint
router.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const subscriber = await Newsletter.findOneAndDelete({ email });
    
    if (!subscriber) {
      return res.status(404).json({
        error: 'Email not found in our newsletter list'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      error: 'Failed to unsubscribe. Please try again later.'
    });
  }
});

module.exports = router;