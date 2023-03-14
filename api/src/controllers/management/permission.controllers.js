const { Permission } = require('./../../utils/db.js');

//List Permissions
module.exports.listPermissions = async (req, res, next) => {
    try {
        const responseList = await Permission.findAll();
        res.status(200).json({
            successful: true,
            list: responseList
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
