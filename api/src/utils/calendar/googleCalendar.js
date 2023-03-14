const { googleConfig } = require('./../../config/index');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(googleConfig.client_id, googleConfig.secret_client);

oAuth2Client.setCredentials({
    refresh_token: googleConfig.refresh_token
});

const googleCalendar = google.calendar({ version: 'v3', auth: oAuth2Client });

module.exports = googleCalendar;
