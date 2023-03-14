const { Role } = require('./../../utils/db.js');

//List Roles
module.exports.listRoles = async (req, res, next) => {
    try {
        const responseList = await Role.findAll();
        res.status(200).json({
            successful: true,
            list: responseList
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
