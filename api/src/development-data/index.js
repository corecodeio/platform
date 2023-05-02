const { Sequelize } = require('sequelize');
const { postgresConfig, serverConfig } = require('./../config');
const permissions = require('./permissions');

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
    require('./../models/Permission')
];

modelDefiners.forEach((model) => model(sequelize));

const { User, Role, Permission } = sequelize.models;

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
const preload = async () => {
    try {
        console.log('\x1b[32m%s\x1b[0m', 'creating permissions...');
        const responsePermissions = await Promise.all(
            permissions.map(async (permission) => {
                const permissionResult = await Permission.findOne({
                    where: { name: permission.name }
                });
                if (permissionResult) {
                    console.log(
                        '\x1b[37m%s\x1b[31m%s\x1b[0m',
                        `${permission.name} `,
                        'already exists'
                    );
                    return permissionResult;
                } else {
                    const newPermission = await Permission.create({
                        name: permission.name
                    });
                    console.log(
                        '\x1b[37m%s\x1b[32m%s\x1b[0m',
                        `${permission.name} `,
                        'created successfully'
                    );
                    return newPermission;
                }
            })
        );
        console.log('\x1b[32m%s\x1b[0m', 'creating rol owner...');
        const ownerResult = await Role.findOne({
            where: { name: 'owner' }
        });
        if (ownerResult) {
            console.log('\x1b[37m%s\x1b[31m%s\x1b[0m', `owner `, 'already exists');
        } else {
            const newOwner = await Role.create({
                name: 'owner'
            });
            console.log('\x1b[37m%s\x1b[32m%s\x1b[0m', `owner `, 'created successfully');
            // Role: owner add permissions:
            await newOwner.addPermission(responsePermissions[0].id); //read:dashboard
            await newOwner.addPermission(responsePermissions[1].id); //read:role
            await newOwner.addPermission(responsePermissions[2].id); //write:role
            await newOwner.addPermission(responsePermissions[3].id); //delete:role
            await newOwner.addPermission(responsePermissions[4].id); //read:permission
            await newOwner.addPermission(responsePermissions[5].id); //write:permission
            await newOwner.addPermission(responsePermissions[6].id); //delete:permission
            await newOwner.addPermission(responsePermissions[7].id); //read:course
            await newOwner.addPermission(responsePermissions[8].id); //write:course
            await newOwner.addPermission(responsePermissions[9].id); //delete:course
            await newOwner.addPermission(responsePermissions[10].id); //read:event
            await newOwner.addPermission(responsePermissions[11].id); //write:event
            await newOwner.addPermission(responsePermissions[12].id); //delete:event
        }
        if (process.env.SERVER_DEVELOPMENT_USER_ID) {
            console.log('\x1b[32m%s\x1b[0m', 'assigning owner role to development ID...');
            const userResult = await User.findOne({
                where: { id: process.env.SERVER_DEVELOPMENT_USER_ID },
                include: [
                    {
                        model: Role,
                        as: 'roles',
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            });
            if (userResult) {
                if (userResult.roles.length !== 0) {
                    console.log('\x1b[31m%s\x1b[0m', 'development user already has roles');
                } else {
                    const RoleOwner = await Role.findOne({
                        where: { name: 'owner' }
                    });
                    await userResult.addRole(RoleOwner.id);
                    console.log('\x1b[32m%s\x1b[0m', 'role owner assigned successfully');
                }
            } else {
                console.log('\x1b[31m%s\x1b[0m', 'dev ID does not exist');
            }
        } else {
            console.log('\x1b[31m%s\x1b[0m', 'no development user exists');
        }
    } catch (error) {
        console.log(error);
    }
};
preload();
