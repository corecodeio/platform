const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverConfig: {
        port: process.env.SERVER_PORT,
        mode: process.env.SERVER_MODE === 'dev' ? true : false
    },
    postgresConfig: {
        user: process.env.SERVER_DB_USER,
        password: process.env.SERVER_DB_PASS,
        host: process.env.SERVER_DB_HOST,
        port: process.env.SERVER_DB_PORT,
        name: process.env.SERVER_DB_NAME
    },
    clientConfig: {
        student_url: process.env.CLIENT_STUDENT_URL,
        management_url: process.env.CLIENT_MANAGEMENT_URL
    },
    jwtStudentConfig: {
        algorithms: ['HS256'],
        secret_key: process.env.JWT_SECRET_KEY_STUDENT,
        expiresIn: process.env.JWT_EXPIRES_STUDENT,
        rounds: 8
    },
    jwtManagementConfig: {
        algorithms: ['HS256'],
        secret_key: process.env.JWT_SECRET_KEY_MANAGEMENT,
        expiresIn: process.env.JWT_EXPIRES_MANAGEMENT,
        rounds: 8
    },
    bcryptConfig: {
        rounds: 8
    },
    nodeMailerConfig: {
        host: process.env.NODE_MAILER_HOST,
        port: process.env.NODE_MAILER_PORT,
        auth: {
            user: process.env.NODE_MAILER_USER,
            pass: process.env.NODE_MAILER_PASSWORD
        },
        validateEmailExpiresIn: '20m'
    }
};
