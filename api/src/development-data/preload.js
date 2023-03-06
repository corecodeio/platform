const { User, Staff, Permission, Role } = require('./../utils/db');
const users = require('./users');
const staffs = require('./staff');
const roles = require('./roles');
const permissions = require('./permissions');

const preload = async () => {
    try {
        //-------------- Users --------------
        const usersCreated = await User.bulkCreate(users);
        //-------------- Staffs --------------
        const staffsCreated = await Staff.bulkCreate(staffs);
        const rolesCreated = await Role.bulkCreate(roles);
        const permissionsCreated = await Permission.bulkCreate(permissions);
        // Staff: testing@gmail.com add roles:
        await staffsCreated[0].addRole(rolesCreated[0].id);
        await staffsCreated[0].addRole(rolesCreated[1].id);
        await staffsCreated[0].addRole(rolesCreated[2].id);
        // Role: owner add permissions:
        await rolesCreated[0].addPermission(permissionsCreated[0].id);
        await rolesCreated[0].addPermission(permissionsCreated[1].id);
        await rolesCreated[0].addPermission(permissionsCreated[2].id);
        await rolesCreated[0].addPermission(permissionsCreated[3].id);
        await rolesCreated[0].addPermission(permissionsCreated[4].id);
        await rolesCreated[0].addPermission(permissionsCreated[5].id);
        await rolesCreated[0].addPermission(permissionsCreated[6].id);
        await rolesCreated[0].addPermission(permissionsCreated[7].id);
        await rolesCreated[0].addPermission(permissionsCreated[8].id);
        await rolesCreated[0].addPermission(permissionsCreated[9].id);
        await rolesCreated[0].addPermission(permissionsCreated[10].id);
        await rolesCreated[0].addPermission(permissionsCreated[11].id);
        // Role: admin add permissions:
        await rolesCreated[1].addPermission(permissionsCreated[4].id);
        await rolesCreated[1].addPermission(permissionsCreated[5].id);
        await rolesCreated[1].addPermission(permissionsCreated[6].id);
        await rolesCreated[1].addPermission(permissionsCreated[7].id);
        await rolesCreated[1].addPermission(permissionsCreated[8].id);
        await rolesCreated[1].addPermission(permissionsCreated[9].id);
        await rolesCreated[1].addPermission(permissionsCreated[10].id);
        await rolesCreated[1].addPermission(permissionsCreated[11].id);
        // Role: techlead add permissions:
        await rolesCreated[2].addPermission(permissionsCreated[8].id);
        console.log('development data uploaded successfully');
    } catch (error) {
        console.log('error loading development data');
        console.log('error: ', error);
    }
};

module.exports = preload;
