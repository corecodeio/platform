const { Role } = require('./../../utils/db');
//Delete Role
module.exports = async (req, res, next) => {
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
