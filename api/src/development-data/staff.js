const bcrypt = require('bcrypt');
const { bcryptConfig } = require('./../config/index.js');

const staffs = [
    {
        id: '3683eced-567d-40ac-aee7-bed48fe6e449',
        first_name: process.env.SERVER_DEVELOPMENT_USER_FIRST_NAME
            ? process.env.SERVER_DEVELOPMENT_USER_FIRST_NAME
            : 'First Name',
        last_name: process.env.SERVER_DEVELOPMENT_USER_LAST_NAME
            ? process.env.SERVER_DEVELOPMENT_USER_LAST_NAME
            : 'Last Name',
        email: process.env.SERVER_DEVELOPMENT_USER_EMAIL
            ? process.env.SERVER_DEVELOPMENT_USER_EMAIL
            : 'testing@gmail.com',
        password: bcrypt.hashSync(
            process.env.SERVER_DEVELOPMENT_USER_PASSWORD
                ? process.env.SERVER_DEVELOPMENT_USER_PASSWORD
                : '123456',
            bcryptConfig.rounds
        ),
        phone: process.env.SERVER_DEVELOPMENT_USER_PHONE
            ? process.env.SERVER_DEVELOPMENT_USER_PHONE
            : '',
        invite_slack: true,
        slack_id: process.env.SERVER_DEVELOPMENT_USER_SLACK_ID
            ? process.env.SERVER_DEVELOPMENT_USER_SLACK_ID
            : ''
    }
];

module.exports = staffs;
