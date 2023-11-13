const cartDAO = require('../dao/cartDAO');

const getCartByUserId = async (userId, logger) => {
  try {
    // Log that we are retrieving the cart for the user
    logger.info(`Getting cart for user with ID: ${userId}`);

    const cart = await cartDAO.getCartByUserId(userId);

    // Log the successful retrieval of the cart
    logger.debug('Cart retrieved successfully');

    return cart;
  } catch (error) {
    // Log the error when retrieving the cart
    logger.error(`Error getting cart for user with ID ${userId}: ${error.message}`);
    throw new Error('Error getting cart: ' + error.message);
  }
};

const updateCart = async (userId, updatedProducts, logger) => {
  try {
    // Log that we are updating the user's cart
    logger.info(`Updating cart for user with ID: ${userId}`);

    await cartDAO.updateCart(userId, updatedProducts);

    // Log the successful update of the cart
    logger.debug('Cart updated successfully');

  } catch (error) {
    // Log the error when updating the cart
    logger.error(`Error updating cart for user with ID ${userId}: ${error.message}`);
    throw new Error('Error updating cart: ' + error.message);
  }
};

module.exports = {
  getCartByUserId,
  updateCart,
};
