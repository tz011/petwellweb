const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

// Middleware to generate or get session ID
const getSessionId = (req, res, next) => {
  let sessionId = req.headers['x-session-id'] || req.cookies?.sessionId;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'strict'
    });
  }
  
  req.sessionId = sessionId;
  next();
};

// Validation middleware
const validateCartItem = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  
  body('quantity')
    .isInt({ min: 1, max: 99 })
    .withMessage('Quantity must be between 1 and 99')
];

const validateUpdateQuantity = [
  param('itemId')
    .isMongoId()
    .withMessage('Invalid item ID'),
  
  body('quantity')
    .isInt({ min: 1, max: 99 })
    .withMessage('Quantity must be between 1 and 99')
];

// Get cart
router.get('/', getSessionId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ 
      sessionId: req.sessionId, 
      isActive: true 
    }).populate({
      path: 'items.product',
      select: 'name price image category brand inStock stockQuantity'
    });

    if (!cart) {
      cart = new Cart({ sessionId: req.sessionId });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: cart
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      error: 'Failed to fetch cart'
    });
  }
});

// Add item to cart
router.post('/add', getSessionId, validateCartItem, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { productId, quantity } = req.body;

    // Check if product exists and is in stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    if (!product.inStock || product.stockQuantity < quantity) {
      return res.status(400).json({
        error: 'Product is out of stock or insufficient quantity available'
      });
    }

    // Get or create cart
    let cart = await Cart.findOne({ 
      sessionId: req.sessionId, 
      isActive: true 
    });

    if (!cart) {
      cart = new Cart({ sessionId: req.sessionId });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (product.stockQuantity < newQuantity) {
        return res.status(400).json({
          error: 'Insufficient stock for requested quantity'
        });
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].price = product.price;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate({
      path: 'items.product',
      select: 'name price image category brand inStock stockQuantity'
    });

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      error: 'Failed to add item to cart'
    });
  }
});

// Update item quantity
router.put('/update/:itemId', getSessionId, validateUpdateQuantity, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ 
      sessionId: req.sessionId, 
      isActive: true 
    });

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Item not found in cart'
      });
    }

    // Check stock availability
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product || !product.inStock || product.stockQuantity < quantity) {
      return res.status(400).json({
        error: 'Insufficient stock for requested quantity'
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: 'items.product',
      select: 'name price image category brand inStock stockQuantity'
    });

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart
    });

  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      error: 'Failed to update cart'
    });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', getSessionId, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ 
      sessionId: req.sessionId, 
      isActive: true 
    });

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Item not found in cart'
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate({
      path: 'items.product',
      select: 'name price image category brand inStock stockQuantity'
    });

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      error: 'Failed to remove item from cart'
    });
  }
});

// Clear cart
router.delete('/clear', getSessionId, async (req, res) => {
  try {
    const cart = await Cart.findOne({ 
      sessionId: req.sessionId, 
      isActive: true 
    });

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      error: 'Failed to clear cart'
    });
  }
});

// Get cart summary (for header display)
router.get('/summary', getSessionId, async (req, res) => {
  try {
    const cart = await Cart.findOne({ 
      sessionId: req.sessionId, 
      isActive: true 
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          itemCount: 0,
          total: 0
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        itemCount: cart.itemCount,
        total: cart.total
      }
    });

  } catch (error) {
    console.error('Get cart summary error:', error);
    res.status(500).json({
      error: 'Failed to fetch cart summary'
    });
  }
});

module.exports = router; 