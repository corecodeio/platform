const express = require('express');
const cors = require('cors');
const server = express();
const http = require('http').createServer(server);

/************* SERVER CONFIG ***********************/
server.use(express.urlencoded({ extended: true, limit: '8MB' }));
server.use(express.json());
server.use(express.json({ limit: '8MB' }));
server.use(
    cors({
        origin: '*'
    })
);
/////////////// ENDS SERVER CONFIG /////////////////////

/*********** CORS CONFIG **********************/
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//////////////// ENDS CORS CONFIG ///////////////////////

/********** ROUTES ****************************/
server.use('/api_v1', require('./routes/index.js'));
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
