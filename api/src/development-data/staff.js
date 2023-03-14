const bcrypt = require('bcrypt');
const { bcryptConfig } = require('./../config/index.js');

const staffs = [
    {
        id: '3683eced-567d-40ac-aee7-bed48fe6e449',
        first_name: process.env.SERVER_DEVELOPMENT_FIRST_NAME
            ? process.env.SERVER_DEVELOPMENT_FIRST_NAME
            : 'First Name',
        last_name: process.env.SERVER_DEVELOPMENT_LAST_NAME
            ? process.env.SERVER_DEVELOPMENT_LAST_NAME
            : 'Last Name',
        email: process.env.SERVER_DEVELOPMENT_EMAIL
            ? process.env.SERVER_DEVELOPMENT_EMAIL
            : 'testing@gmail.com',
        password: bcrypt.hashSync(
            process.env.SERVER_DEVELOPMENT_PASSWORD
                ? process.env.SERVER_DEVELOPMENT_PASSWORD
                : '123456',
            bcryptConfig.rounds
        ),
        phone: process.env.SERVER_DEVELOPMENT_PHONE ? process.env.SERVER_DEVELOPMENT_PHONE : '',
        invite_slack: true,
        slack_id: process.env.SERVER_DEVELOPMENT_SLACK_ID
            ? process.env.SERVER_DEVELOPMENT_SLACK_ID
            : ''
    }
];

module.exports = staffs;
