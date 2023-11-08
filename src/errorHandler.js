const errorDictionary = require('./errorDictionary');

// Function to handle custom errors
const handleCustomError = (error, errorCode) => {
  const errorDetails = errorDictionary[errorCode];
  if (!errorDetails) {
    // If the error code is not found in the dictionary, use a generic error message.
    return {
      status: 500,
      message: 'An error occurred',
    };
  }

  return {
    status: errorDetails.status,
    message: errorDetails.message,
  };
};

// Function to handle unexpected errors
const handleUnexpectedError = (error) => {
  console.error('Unexpected error:', error);

  return {
    status: 500,
    message: 'An unexpected error occurred',
  };
};

module.exports = {
  handleCustomError,
  handleUnexpectedError,
};
