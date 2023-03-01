const bcrypt = require('bcrypt');
const { bcryptConfig } = require('./../config/index.js');

const users = [
    {
        id: 'd706ea7d-03df-484b-975e-749e730d78b8',
        first_name: 'Leonardo',
        last_name: 'Agreda',
        email: 'testing@gmail.com',
        validate_email: true,
        country: 'Argentina',
        password: bcrypt.hashSync('123456', bcryptConfig.rounds)
    }
];

module.exports = users;
