const express = require('express');
const server = express();
const router = require('./router');
const session = require('express-session');



server.use(
    session({
      name: 'notsession',
      secret: 'nobody tosses a dwarf!',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false
      },
      httpOnly: false,
      resave: false,
      saveUninitialized: false,
    })
  );

server.use('/api', router);


 


module.exports = server; 