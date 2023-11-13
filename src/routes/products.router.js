const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const passport = require('passport');

// Authentication middleware
const jwtAuthMiddleware = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => {
  // Log that the product listing route is accessed
  req.log.info('Product listing route accessed');
  productController.paginationFilteringSorting(req, res);
});

router.get('/:productId', (req, res) => {
  // Log that an individual product details route is accessed
  req.log.info('Individual product details route accessed');
  productController.productId(req, res);
});

router.post('/add-product', (req, res) => {
  // Log that a product is being added
  req.log.info('Adding a new product');
  productController.addProduct(req, res);
});

router.post('/add-to-cart', (req, res) => {
  // Log that a product is being added to the cart
  req.log.info('Adding a product to the cart');
  productController.addToCart(req, res);
});

router.put('/update-cart/:productId', jwtAuthMiddleware, (req, res) => {
  // Log that a product quantity in the cart is being updated
  req.log.info('Updating product quantity in the cart');
  productController.updateCartProductId(req, res);
});

router.put('/update-quantity/:productId', jwtAuthMiddleware, (req, res) => {
  // Log that a product quantity is being updated
  req.log.info('Updating product quantity');
  productController.updateQuantityProductId(req, res);
});

router.get('/view-cart', jwtAuthMiddleware, (req, res) => {
  // Log that the cart is being viewed
  req.log.info('Viewing the cart');
  productController.viewCart(req, res);
});

router.delete('/remove-from-cart/:productId', jwtAuthMiddleware, (req, res) => {
  // Log that a product is being removed from the cart
  req.log.info('Removing a product from the cart');
  productController.removeFromCartProductId(req, res);
});

module.exports = router;
