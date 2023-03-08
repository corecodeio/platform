const express = require('express');
const cors = require('cors');
const server = express();
const http = require('http').createServer(server);
const studentRoutes = require('./routes/student/index.js');
const managementsRoutes = require('./routes/management/index.js');
const { serverConfig } = require('./config/index.js');

/************* SERVER CONFIG ***********************/
server.use(express.urlencoded({ extended: true, limit: '8MB' }));
server.use(express.json());
server.use(express.json({ limit: '8MB' }));

if (serverConfig.mode) {
    server.use(require('morgan')('dev'));
}

/////////////// ENDS SERVER CONFIG /////////////////////

/*********** CORS CONFIG **********************/
if (serverConfig.mode) {
    server.use(
        cors({
            origin: '*'
        })
    );
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
}
//////////////// ENDS CORS CONFIG ///////////////////////

/********** ROUTES ****************************/
server.use('/api/student', studentRoutes);
server.use('/api/management', managementsRoutes);

server.get('/', (req, res) => res.send("This is the API's Home Page."));

server.get('/api/testing', (req, res) => res.send("This is the testing Page."));

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
