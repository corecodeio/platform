const { Sequelize } = require('sequelize');
const { postgresConfig } = require('./../config/index.js');

const sequelize = new Sequelize({
    database: postgresConfig.name,
    username: postgresConfig.user,
    password: postgresConfig.password,
    host: postgresConfig.host,
    port: postgresConfig.port,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const modelDefiners = [
    require('./../models/User'),
    require('./../models/Role'),
    require('./../models/Permission'),
    require('./../models/Course'),
    require('./../models/Postulation'),
    require('./../models/Message'),
    require('./../models/Template')
];

modelDefiners.forEach((model) => model(sequelize));

const { User, Role, Permission, Course, Postulation, Message } = sequelize.models;

User.belongsToMany(Course, { as: 'courses', through: 'UserCourse' });
Course.belongsToMany(User, { as: 'courses', through: 'UserCourse' });

User.belongsToMany(Role, { as: 'roles', through: 'UserRole' });
Role.belongsToMany(User, { as: 'roles', through: 'UserRole' });

Role.belongsToMany(Permission, {
    as: 'permissions',
    through: 'RolePermission'
});
Permission.belongsToMany(Role, {
    as: 'permissions',
    through: 'RolePermission'
});

Postulation.belongsToMany(Message, {
    as: 'messages',
    through: 'PostulationMessage'
});
Message.belongsToMany(Postulation, {
    as: 'messages',
    through: 'PostulationMessage'
});

module.exports = {
    ...sequelize.models,
    db: sequelize
};
