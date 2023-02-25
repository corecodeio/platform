const { User } = require('./../utils/db');
const users = require('./users');

const preload = async () => {
    try {
        const usersCreated = await User.bulkCreate(users);
        console.log('development data uploaded successfully');
    } catch (error) {
        console.log('error loading development data');
        console.log('error: ', error);
    }
};

module.exports = preload;
