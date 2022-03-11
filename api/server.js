// Configure your server here
const express = require('express');
const server = express();


// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router')

// Build your actions router in /api/actions/actions-router.js
const actionRouter = require('./actions/actions-router')

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionRouter)

// Do NOT `server.listen()` inside this file!

module.exports = server;
