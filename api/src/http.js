const express = require('express');
const cors = require('cors');
const server = express();
const morgan = require('morgan');
const http = require('http').createServer(server);
const routes = require('./routes');
const { serverConfig } = require('./config/index.js');

/************* SERVER CONFIG ***********************/
server.use(express.urlencoded({ extended: true, limit: '8MB' }));
server.use(express.json());
server.use(express.json({ limit: '8MB' }));

server.use(morgan('dev'));

/////////////// ENDS SERVER CONFIG /////////////////////

/*********** CORS CONFIG **********************/
server.use(
    cors({ origin: [serverConfig.client_url], credentials: true })
);
//////////////// ENDS CORS CONFIG ///////////////////////

/********** ROUTES ****************************/
server.use('/api', routes);
server.get('/hello', (req, res) => {
    res.send('Hello World!')
  })
////////////////////////////////////////////////

/*********** ERROR HANDLER ********************/
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
////////////////////////////////////////////////

module.exports = http;
