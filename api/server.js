const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');

const authRouter = require('../auth/auth-router.js');
const eventsRouter = require('../events/event-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/events',eventsRouter)


module.exports = server;
