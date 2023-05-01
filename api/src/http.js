const express = require('express');
const cors = require('cors');
const server = express();
const path = require('path');
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
server.use(cors({ origin: [serverConfig.client_url], credentials: true }));
//////////////// ENDS CORS CONFIG ///////////////////////

/********** ROUTES ****************************/
server.use(express.static('../frontend/build'));
server.use('/api', routes);
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});
//server.use(express.static(path.join(__dirname, '../../frontend/build')));

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
