const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authenticate = require('../auth/authenticator.js');
const authRouter = require('./auth/authRouter.js');
const recipesRouter = require('./recipes/recipesRouter.js')
const usersRouter = require('./users/usersRouter.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: `hey! you've hit the '/' endpoint.`})
});

server.use('/api/auth', authRouter);
//will need authenticator for bottom routes
server.use('/api/recipes', recipesRouter) 
server.use('/api/users', usersRouter);     

module.exports = server;