const { Permission,Role } = require('./../../utils/db.js');

//List Permissions
module.exports.listPermissions = async (req, res, next) => {
    try {
        const responseList = await Permission.findAll({
            include: [
                {
                    model: Role,
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
        console.log(error)
        res.status(400).json({ successful: false, message: error });
    }
};
