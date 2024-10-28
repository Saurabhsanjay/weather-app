const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "error", 
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), 
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${
        stack ? `\nStack: ${stack}` : ""
      }`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "error.log"),
      level: "error",
      handleExceptions: true, 
      maxsize: 5 * 1024 * 1024, 
      maxFiles: 5, 
    }),
  ],
  exitOnError: false, 
});


if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;
