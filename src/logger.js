const winston = require('winston');

const logLevels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  debug: 'debug',
};

const developmentLogger = winston.createLogger({
  levels: logLevels,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

const productionLogger = winston.createLogger({
  levels: logLevels,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

function getLogger() {
  if (process.env.NODE_ENV === 'production') {
    return productionLogger;
  }
  return developmentLogger;
}

module.exports = getLogger;
