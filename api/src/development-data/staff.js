const bcrypt = require('bcrypt');
const { bcryptConfig } = require('./../config/index.js');

const staffs = [
    {
        id: '3683eced-567d-40ac-aee7-bed48fe6e449',
        first_name: 'Leonardo',
        last_name: 'Agreda',
        email: 'testing@gmail.com',
        phone:'+543415313878',
        password: bcrypt.hashSync('123456', bcryptConfig.rounds)
    }
];

module.exports = staffs;
