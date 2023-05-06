const { Role } = require('./../../utils/db');
const { validateID } = require('./../../helpers/validators');
//Delete Role
module.exports = async (req, res, next) => {
    try {
        const { role_id } = req.body;
        if (!role_id) {
            return res.status(200).json({ successful: false, message: 'missing data' });
        }
        if (!validateID(role_id)) {
            return res.status(200).json({
                successful: false,
                message: 'invalid id'
            });
        }
        const RoleResult = await Role.findByPk(role_id);
        if (RoleResult === null) {
            return res.status(200).json({
                successful: false,
                message: 'role does not exist'
            });
        }
        await RoleResult.destroy();
        res.status(200).json({
            successful: true,
            message: 'role deleted successfully'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
