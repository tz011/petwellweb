const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const AiSignup = require('../models/AiSignup');

// Validation middleware
const validateAiSignup = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .custom(async (email) => {
      const existing = await AiSignup.findOne({ email });
      if (existing) {
        throw new Error('This email is already registered for AI updates');
      }
      return true;
    })
];

router.post('/', validateAiSignup, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, petType, interests } = req.body;

    // Create new AI signup
    const newSignup = new AiSignup({ 
      email,
      petType: petType || 'general',
      interests: interests || [],
      signedUpAt: new Date()
    });

    await newSignup.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for signing up! We\'ll notify you when our AI features are ready.',
      data: {
        email: newSignup.email,
        petType: newSignup.petType,
        signedUpAt: newSignup.date
      }
    });

  } catch (error) {
    console.error('AI signup error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This email is already registered for AI updates'
      });
    }

    res.status(500).json({
      error: 'Failed to register for AI updates. Please try again later.'
    });
  }
});

// Get all AI signups (admin only - you might want to add authentication)
router.get('/', async (req, res) => {
  try {
    const signups = await AiSignup.find()
      .select('-__v')
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: signups.length,
      data: signups
    });
  } catch (error) {
    console.error('Get AI signups error:', error);
    res.status(500).json({
      error: 'Failed to fetch AI signups'
    });
  }
});

// Remove signup endpoint
router.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const signup = await AiSignup.findOneAndDelete({ email });
    
    if (!signup) {
      return res.status(404).json({
        error: 'Email not found in our AI signup list'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully removed from AI updates list'
    });

  } catch (error) {
    console.error('Remove AI signup error:', error);
    res.status(500).json({
      error: 'Failed to remove from AI updates. Please try again later.'
    });
  }
});

module.exports = router;