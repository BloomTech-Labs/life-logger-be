require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');

const authRouter = require('../auth/auth-router.js');
const tasksRouter = require('../tasks/tasks-router.js');

const server = express();

server.use(helmet());
server.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://lyfe-logger-fe.herokuapp.com',
      'https://lyfe-logger.com',
      '192.68.0.79:3000',
    ],
    credentials: true,
  })
);
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/tasks', authenticate, tasksRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Up and running' });
});

module.exports = server;
