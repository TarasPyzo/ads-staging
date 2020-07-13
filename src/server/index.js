import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv-safe';
import * as Sentry from '@sentry/node';

import logger from './helpers/logger';
import errorLogger from './helpers/errorLogger';

import api from './api';
// import './models';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ads';

Sentry.init({ dsn: process.env.SENTRY_DNS });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(helmet());
app.use(express.static('dist'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/api', api);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Capture all 404 and 500 errors
    if (error.status === 404 || error.status === 500) {
      return true;
    }
    return false;
  },
}));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  keepAlive: 300000,
});

mongoose.connection.on('error', (err) => {
  errorLogger(err, { method: 'Mongoose connect', url: ENV });

  mongoose.disconnect();
});

mongoose.connection.on('connected', () => {
  app.listen(PORT);

  logger.info('Mongoose connected successfully');
});
