const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverConfig: {
        port: process.env.PORT || '3001',
        mode: process.env.SERVER_MODE === 'dev' ? true : false,
        client_url: process.env.CLIENT_URL
    },
    stytchConfig: {
        project_id: process.env.STYTCH_PROJECT_ID,
        secret: process.env.STYTCH_SECRET,
        login_magic_link_url: 'http://localhost:3500',
        signup_magic_link_url: 'http://localhost:3500'
    },
    postgresConfig: {
        user: process.env.SERVER_DB_USER,
        password: process.env.SERVER_DB_PASS,
        host: process.env.SERVER_DB_HOST,
        port: process.env.SERVER_DB_PORT,
        name: process.env.SERVER_DB_NAME
    },
    slackConfig: {
        token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        appToken: process.env.SLACK_APP_LEVEL_TOKEN,
        socketMode: true,
        developerMode: process.env.SERVER_MODE_SLACK === 'dev' ? true : false
    },
    googleConfig: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        secret_client: process.env.GOOGLE_SECRET_CLIENT,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    }
};
