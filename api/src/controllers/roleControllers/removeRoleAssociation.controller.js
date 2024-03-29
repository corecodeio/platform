const { Role, Permission } = require('./../../utils/db');
const { validateID } = require('./../../helpers/validators');
//Remove Role Association
module.exports = async (req, res, next) => {
    try {
        const { role_id, permission_id } = req.body;
        if (!role_id || !permission_id) {
            return res.status(200).json({ successful: false, message: 'missing data' });
        }
        if (!validateID(role_id)) {
            return res.status(200).json({
                successful: false,
                message: 'invalid role id'
            });
        }
        if (!validateID(permission_id)) {
            return res.status(200).json({
                successful: false,
                message: 'invalid permission id'
            });
        }
        const RoleResult = await Role.findByPk(role_id);
        if (RoleResult === null) {
            return res.status(200).json({
                successful: false,
                message: 'role does not exist'
            });
        }
        const permissionResult = await Permission.findByPk(permission_id);
        if (permissionResult === null) {
            return res.status(200).json({
                successful: false,
                message: 'permission does not exist'
            });
        }
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
