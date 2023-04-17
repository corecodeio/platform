const { Role, Permission } = require('./../../utils/db.js');

//List Roles
module.exports.listRoles = async (req, res, next) => {
    try {
        const responseList = await Role.findAll({
            include: [
                {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json({
            successful: true,
            list: responseList
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Delete Role
module.exports.deleteRole = async (req, res, next) => {
    try {
        const { role_id } = req.body;
        await Role.destroy({
            where: {
                id: role_id
            }
        });
        res.status(200).json({
            successful: true,
            message: 'role deleted successfully'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Remove Role Association
module.exports.removeRoleAssociation = async (req, res, next) => {
    try {
        const { role_id, permission_id } = req.body;
        const RoleResult = await Role.findOne({
            where: { id: role_id }
        });
        await RoleResult.removePermission(permission_id);
        res.status(200).json({
            successful: true,
            message: 'association removed successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, message: error });
    }
};
