const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');

// Authentication middleware
const jwtAuthMiddleware = passport.authenticate('jwt', { session: false });

// PUT endpoint to update product quantity in the cart
router.put('/update-cart/:productId', jwtAuthMiddleware, cartController.updateCart);

// DELETE endpoint to remove a product from the cart
router.delete('/remove-from-cart/:productId', jwtAuthMiddleware, cartController.removeFromCart);

// GET endpoint logic for viewing the cart
router.get('/view-cart', jwtAuthMiddleware, cartController.viewCart);

module.exports = router;
