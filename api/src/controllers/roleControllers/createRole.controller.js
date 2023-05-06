const { Role } = require('./../../utils/db');
//Create Role
module.exports = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({ successful: false, message: 'missing data' });
        }
        const nameAvailable = await Role.findOne({
            where: { name: name }
        });
        if (nameAvailable) {
            return res.status(200).json({ successful: false, message: 'name is busy' });
        }
        await Role.create({
            name
        });
        res.status(200).json({
            successful: true,
            message: 'role created successfully'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
