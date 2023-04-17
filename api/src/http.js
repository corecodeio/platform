const express = require('express');
const cors = require('cors');
const server = express();
const http = require('http').createServer(server);
const studentRoutes = require('./routes/student/index.js');
const managementsRoutes = require('./routes/management/index.js');
const { serverConfig, clientConfig } = require('./config/index.js');

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
        cors({ origin: [clientConfig.student_url, clientConfig.management_url], credentials: true })
    );
}
//////////////// ENDS CORS CONFIG ///////////////////////

/********** ROUTES ****************************/
server.use('/api/student', studentRoutes);
server.use('/api/management', managementsRoutes);

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
