const { Role } = require('./../../utils/db');
//Remove Role Association
module.exports = async (req, res, next) => {
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
