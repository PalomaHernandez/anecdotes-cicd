const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
app.use(express.json());
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const path = require('path');
const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
