const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// Authentication middleware
const jwtAuthMiddleware = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => {
  logger.info('Home page accessed');
  res.render('home');
});

router.post('/register', (req, res) => {
  // Log that a user is attempting to register
  logger.info('User registration attempt');
  userController.registerUser(req, res);
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', (req, res) => {
  logger.info('User login attempt');
  userController.loginUser(req, res);
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', userController.logoutUser);

router.get('/admin-dashboard', jwtAuthMiddleware, (req, res) => {
  logger.info('Admin dashboard accessed');
  userController.adminDashboard(req, res);
});

router.get('/api/sessions/current', jwtAuthMiddleware, (req, res) => {
  logger.info('Current user accessed');
  userController.getCurrentUser(req, res);
});

module.exports = router;
