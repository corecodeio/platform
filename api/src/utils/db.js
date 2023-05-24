const { Sequelize } = require('sequelize');
const { postgresConfig, serverConfig } = require('./../config/index.js');
const sequelizeConfig = {
    database: postgresConfig.name,
    username: postgresConfig.user,
    password: postgresConfig.password,
    host: postgresConfig.host,
    port: postgresConfig.port,
    dialect: 'postgres',
    logging: false
};
if (!serverConfig.mode) {
    sequelizeConfig.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}
const sequelize = new Sequelize(sequelizeConfig);
const modelDefiners = [
    require('./../models/User'),
    require('./../models/Role'),
    require('./../models/Permission'),
    require('./../models/Course'),
    require('./../models/Postulation'),
    require('./../models/Message'),
    require('./../models/Template'),
    require('./../models/Event'),
    require('./../models/Session')
];

modelDefiners.forEach((model) => model(sequelize));

const { User, Role, Permission, Course, Postulation, Message, Session } = sequelize.models;

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

Course.belongsToMany(Session, {
    as: 'sessions',
    through: 'CourseSession'
});
Session.belongsToMany(Course, {
    as: 'sessions',
    through: 'CourseSession'
});

module.exports = {
    ...sequelize.models,
    db: sequelize
};
