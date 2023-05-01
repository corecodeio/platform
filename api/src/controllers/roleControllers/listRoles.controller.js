const { Role, Permission } = require('./../../utils/db');
//List Roles
module.exports = async (req, res, next) => {
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
