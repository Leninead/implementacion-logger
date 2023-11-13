const userDAO = require('../dao/userDAO');

const createUser = async (user, logger) => {
  try {
    // Log that we are creating a new user
    logger.info('Creating a new user');

    const createdUser = await userDAO.createUser(user);

    // Log the successful creation of the user
    logger.debug('User created successfully');

    return createdUser;
  } catch (error) {
    // Log the error when creating a user
    logger.error(`Error creating user: ${error.message}`);
    throw new Error('Error creating user: ' + error.message);
  }
};

const getUserByEmail = async (email, logger) => {
  try {
    // Log that we are retrieving a user by email
    logger.info(`Getting user by email: ${email}`);

    const user = await userDAO.getUserByEmail(email);

    // Log the successful retrieval of the user
    logger.debug('User retrieved successfully');

    return user;
  } catch (error) {
    // Log the error when getting a user by email
    logger.error(`Error getting user by email ${email}: ${error.message}`);
    throw new Error('Error getting user: ' + error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
