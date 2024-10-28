const logger = require("./logger");

try {
  // Some code that may throw an error
  throw new Error("Something went wrong!");
} catch (error) {
  // Log the error with a custom status code
  logger.error(`Status: 500, Message: ${error.message}`, {
    stack: error.stack,
  });
}
