const errorDictionary = {
    PRODUCT_NOT_FOUND: {
      code: 'PRODUCT_NOT_FOUND',
      message: 'Product with ID {productId} not found.',
      status: 404,
    },
    USER_NOT_FOUND: {
      code: 'USER_NOT_FOUND',
      message: 'User with ID {userId} not found.',
      status: 404,
    },
    INVALID_REQUEST: {
      code: 'INVALID_REQUEST',
      message: 'Invalid request. Please check your request data.',
      status: 400,
    },
    INTERNAL_SERVER_ERROR: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error. Please try again later.',
      status: 500,
    },
    QUANTITY_INVALID: {
      code: 'QUANTITY_INVALID',
      message: 'Invalid quantity. Please provide a valid quantity.',
      status: 422,
    },
    CART_EMPTY: {
      code: 'CART_EMPTY',
      message: 'Cart is empty. Add products to your cart.',
      status: 422,
    },
    CART_PRODUCT_NOT_FOUND: {
      code: 'CART_PRODUCT_NOT_FOUND',
      message: 'Product with ID {productId} not found in the cart.',
      status: 404,
    },
    CART_UPDATE_FAILED: {
      code: 'CART_UPDATE_FAILED',
      message: 'Failed to update the cart.',
      status: 500,
    },
    PRODUCT_ADD_FAILED: {
      code: 'PRODUCT_ADD_FAILED',
      message: 'Failed to add the product.',
      status: 500,
    },
    PRODUCT_UPDATE_FAILED: {
      code: 'PRODUCT_UPDATE_FAILED',
      message: 'Failed to update the product with ID {productId}.',
      status: 500,
    },
  };
  
  module.exports = errorDictionary;
  