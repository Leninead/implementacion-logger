const Product = require('../models/product.model');

const getAllProducts = async (req) => {
  try {
    const products = await Product.find();
    
    // Log the successful retrieval of all products
    req.log.info('All products retrieved:', products);
    
    return products;
  } catch (error) {
    // Log the error if there's an issue
    req.log.error('Error getting products:', error.message);

    throw new Error('Error getting products: ' + error.message);
  }
};

const getProductById = async (req, productId) => {
  try {
    const product = await Product.findById(productId);

    if (product) {
      // Log the successful retrieval of a specific product
      req.log.info(`Product retrieved by ID ${productId}:`, product);
      
      return product;
    } else {
      // Log that the product was not found
      req.log.warning(`Product not found for ID ${productId}`);
      
      return null; // Return null if the product is not found
    }
  } catch (error) {
    // Log the error if there's an issue
    req.log.error(`Error getting product by ID ${productId}:`, error.message);

    throw new Error('Error getting product: ' + error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
