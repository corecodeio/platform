const { nodeMailerConfig, clientConfig, jwtStudentConfig } = require('./../config/index.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require("fs");

const transport = nodemailer.createTransport(nodeMailerConfig);


// load the HTML file
const template = fs.readFileSync("../api/src/helpers/emailTemplate.html", "utf-8")

module.exports.sendWelcome = ({ id, first_name, last_name, email }) => {
    try {
        
        const tokenEmail = jwt.sign(
            {
                user: {
                    id
                }
            },
            jwtStudentConfig.secret_key,
            {
                expiresIn: nodeMailerConfig.validateEmailExpiresIn,
                algorithm: jwtStudentConfig.algorithms[0]
            }
        );
        const message = {
            from: nodeMailerConfig.auth.user,
            to: email,
            subject: 'Welcome to Core Code',
            html: template
        };
        transport.sendMail(message);
    } catch (error) {
        console.log(error);
    }
};
