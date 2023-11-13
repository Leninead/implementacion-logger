const productDAO = require('../dao/productDAO');

const getAllProducts = async (logger) => {
  try {
    // Log that we are retrieving all products
    logger.info('Getting all products');

    const products = await productDAO.getAllProducts();

    // Log the successful retrieval of products
    logger.debug('Products retrieved successfully');

    return products;
  } catch (error) {
    // Log the error when getting products
    logger.error(`Error getting products: ${error.message}`);
    throw new Error('Error getting products: ' + error.message);
  }
};

const getProductById = async (productId, logger) => {
  try {
    // Log that we are retrieving a product by ID
    logger.info(`Getting product by ID: ${productId}`);

    const product = await productDAO.getProductById(productId);

    // Log the successful retrieval of the product
    logger.debug('Product retrieved successfully');

    return product;
  } catch (error) {
    // Log the error when getting a product by ID
    logger.error(`Error getting product by ID ${productId}: ${error.message}`);
    throw new Error('Error getting product: ' + error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
