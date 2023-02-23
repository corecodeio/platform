const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverConfig: {
        port: process.env.SERVER_PORT
    },
    postgresConfig: {
        user: process.env.SERVER_DB_USER,
        password: process.env.SERVER_DB_PASS,
        host: process.env.SERVER_DB_HOST,
        port: process.env.SERVER_DB_PORT,
        name: process.env.SERVER_DB_NAME
    }
};
