const User = require('../models/user.model');

const createUser = async (req, user) => {
  try {
    const createdUser = await User.create(user);
    
    // Log the successful user creation
    req.log.info('User created:', createdUser);
    
    return createdUser;
  } catch (error) {
    // Log the error if there's an issue
    req.log.error('Error creating user:', error.message);

    throw new Error('Error creating user: ' + error.message);
  }
};

const getUserByEmail = async (req, email) => {
  try {
    const user = await User.findOne({ email });
    
    // Log the successful user retrieval
    req.log.info('User retrieved by email:', user);
    
    return user;
  } catch (error) {
    // Log the error if there's an issue
    req.log.error('Error getting user by email:', error.message);

    throw new Error('Error getting user: ' + error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
