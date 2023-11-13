const Product = require('../models/product.model');
const Cart = require('../models/cart.model'); // Adjust the path as needed
const errorHandler = require('../errorHandler.js');
const errorDictionary = require('../errorDictionary.js');

const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    // Add more products as needed
];

const paginationFilteringSorting = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(limit);

        req.log.info('Pagination, filtering, and sorting request processed successfully.');
        res.json(products);
    } catch (error) {
        req.log.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const productId = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        if (product) {
            req.log.info('Product details request processed successfully.');
            res.render('product-details', { product });
        } else {
            req.log.warning('Product not found');
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        req.log.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, description, stock, quantity } = req.body;

        req.log.info('Creating a new product:', { name, price, description, stock, quantity });

        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            quantity,
        });

        await newProduct.save();

        req.log.info('Product added successfully');
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        const customError = errorHandler.handleCustomError(error, errorDictionary.SOME_ERROR_CODE);
        req.log.error('Error adding product:', customError);
        res.status(customError.status).json(customError);
    }
};

const addToCart = async (req, res) => {
    const userId = req.body.userId || req.headers['user-id'];

    if (!userId) {
        req.log.error('User ID is required');
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const productId = req.body.productId;
    const quantity = req.body.quantity;

    try {
        req.log.info('Adding product to cart:', { productId, quantity });
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex((product) => product.productId === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();

        req.log.info('Product added to cart.');
        res.status(200).json({ message: 'Product added to cart.', cart });
    } catch (error) {
        req.log.error('Error while adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCartProductId = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const updatedQuantity = req.body.quantity;

        req.log.info('Received request to update cart. User ID:', userId);
        req.log.info('Product ID:', productId);
        req.log.info('Updated quantity:', updatedQuantity);

        const cart = await Cart.findOne({ userId });

        req.log.info('User cart:', cart);

        const productIndex = cart.products.findIndex((product) => product.productId === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity = updatedQuantity;
            await cart.save();

            req.log.info('Cart updated successfully.');
            res.status(200).json({ message: 'Cart updated.' });
        } else {
            req.log.warning('Product not found in the cart.');
            res.status(404).json({ message: 'Product not found in the cart.' });
        }
    } catch (error) {
        req.log.error('Error updating cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateQuantityProductId = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const updatedQuantity = req.body.quantity;

        req.log.info('Updating quantity for product:', productId);
        req.log.info('Updated quantity:', updatedQuantity);

        const cart = await Cart.findOne({ userId });

        req.log.info('User cart:', cart);

        const productIndex = cart.products.findIndex((product) => product.productId === productId);

        if (productIndex !== -1) {
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


const viewCart = async (req, res) => {
  try {
      const userId = req.user._id;

      const cart = await Cart.findOne({ userId }).populate('products.productId');

      if (cart) {
          req.log.info('User cart contents retrieved successfully.');
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

    const removeFromCartProductId = async (req, res) => {
      try {
        const userId = req.user._id;
        const productId = req.params.productId;
    
        const cart = await Cart.findOne({ userId });
    
        const productIndex = cart.products.findIndex((product) => product.productId === productId);
    
        if (productIndex !== -1) {
          cart.products = cart.products.filter((product) => product.productId !== productId);
          await cart.save();
    
          req.log.info('Product removed from cart.');
          res.status(200).json({ message: 'Product removed from cart.' });
        } else {
          req.log.warning('Product not found in the cart.');
          res.status(404).json({ message: 'Product not found in the cart.' });
        }
      } catch (error) {
        req.log.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    };
    
    module.exports = {
      paginationFilteringSorting,
      productId,
      addProduct,
      addToCart,
      updateCartProductId,
      updateQuantityProductId,
      viewCart,
      removeFromCartProductId,
    };