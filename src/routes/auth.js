const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

// Authentication middleware
const jwtAuthMiddleware = passport.authenticate('jwt', { session: false });

// Define your authentication route using the imported middleware
router.post('/', jwtAuthMiddleware, (req, res) => {
  req.log.info('User authentication requested'); // Log authentication request
  authController.authenticateUser(req, res);
});

module.exports = router;
