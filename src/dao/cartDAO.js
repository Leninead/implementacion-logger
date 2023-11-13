const Cart = require('../models/cart.model');

const getCartByUserId = async (req, userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    
    // Log the successful retrieval of the cart
    req.log.info(`Cart retrieved for user ${userId}:`, cart);

    return cart;
  } catch (error) {
    // Log the error if there's an issue
    req.log.error(`Error getting cart for user ${userId}:`, error.message);

    throw new Error('Error getting cart: ' + error.message);
  }
};

const updateCart = async (req, userId, updatedProducts) => {
  try {
    await Cart.updateOne({ userId }, { products: updatedProducts });
    
    // Log the successful update
    req.log.info(`Cart updated for user ${userId}:`, updatedProducts);

  } catch (error) {
    // Log the error if there's an issue
    req.log.error(`Error updating cart for user ${userId}:`, error.message);

    throw new Error('Error updating cart: ' + error.message);
  }
};

module.exports = {
  getCartByUserId,
  updateCart,
};
