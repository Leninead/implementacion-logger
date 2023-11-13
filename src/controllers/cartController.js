const Cart = require('../models/cart.model');

const getUserIdFromRequest = (req) => {
  // Extract the user ID based on your authentication method
  // For example, if using JWT tokens, you might have the user ID in req.user.id
  return req.user.id;
};

const getCartByUserId = async (req, res) => {
  const userId = getUserIdFromRequest(req);

  try {
    // Call the service function with the user ID:
    const cart = await cartService.getCartByUserId(userId, req.log);
    return res.status(200).json(cart);
  } catch (error) {
    // Handle errors and send an appropriate response
    return res.status(500).json({ error: 'Internal server error' });
  }
};




const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const updatedQuantity = req.body.quantity;

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    // If the cart doesn't exist, create a new cart for the user
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    req.log.info('Cart:', cart);

    // Check if the product is in the cart
    const productIndex = cart.products.findIndex((product) => product.productId === productId);

    if (productIndex !== -1) {
      // Update the quantity of the product
      cart.products[productIndex].quantity = updatedQuantity;
      await cart.save();

      req.log.info('Cart updated successfully.');

      res.status(200).json({ message: 'Cart updated.' });
    } else {
      req.log.warning('Product not found in the cart.');
      res.status(404).json({ message: 'Product not found in the cart.' });
    }
  } catch (error) {
    req.log.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    // Filter out the product to remove from the cart
    cart.products = cart.products.filter((product) => product.productId !== productId);

    await cart.save();

    req.log.info('Product removed from cart.');
    res.status(200).json({ message: 'Product removed from cart.' });
  } catch (error) {
    req.log.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming an authenticated user

    // Find the cart for the user and populate the product details
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (cart) {
      req.log.info('Cart contents retrieved.');
      res.status(200).json({ cartContents: cart.products });
    } else {
      req.log.warning('Cart not found.');
      res.status(404).json({ message: 'Cart not found.' });
    }
  } catch (error) {
    req.log.error('Error viewing cart:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
getCartByUserId,
  updateCart,
  removeFromCart,
  viewCart,
};
