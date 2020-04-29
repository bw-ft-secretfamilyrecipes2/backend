const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticator = require('./auth/authenticator.js');
const authRouter = require('./auth/authRouter.js');
const recipesRouter = require('./recipes/recipesRouter.js')
const usersRouter = require('./users/usersRouter.js')

const server = express();

const fileupload = require("express-fileupload");
server.use(fileupload({ useTempFiles: true }));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",  '*');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);
    next(); 
});

server.get('/', (req, res) => {
    res.status(200).json({ message: `hey! you've reached the '/' endpoint.`})
});

server.use('/api/auth', authRouter);
//will need authenticator for bottom routes
server.use('/api/recipes', authenticator, recipesRouter) 
server.use('/api/users', authenticator, usersRouter);     

module.exports = server;