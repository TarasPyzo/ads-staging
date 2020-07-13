import winston from 'winston';

const options = {
  console: {
    level: 'verbose',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'HH:mm:ss',
      }),
      winston.format.json(),
      winston.format.printf(({ level, message, timestamp }) => `[ ${level} ] ${timestamp} ${message}`),
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
  ],
});

export default logger;
