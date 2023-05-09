const { Permission } = require('./../../utils/db');
const { validateID } = require('./../../helpers/validators');
//Delete Permission
module.exports = async (req, res, next) => {
    try {
        const { permission_id } = req.body;
        if (!permission_id) {
            return res.status(200).json({ successful: false, message: 'missing data' });
        }
        if (!validateID(permission_id)) {
            return res.status(200).json({
                successful: false,
                message: 'invalid id'
            });
        }
        const permissionResult = await Permission.findByPk(permission_id);
        if (permissionResult === null) {
            return res.status(200).json({
                successful: false,
                message: 'permission does not exist'
            });
        }
        await permissionResult.destroy();
        res.status(200).json({
            successful: true,
            message: 'permission deleted successfully'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
