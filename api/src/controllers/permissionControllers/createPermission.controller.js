const { Permission } = require('./../../utils/db');
//Create Permission
module.exports = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({ successful: false, message: 'missing data' });
        }
        const nameAvailable = await Permission.findOne({
            where: { name: name }
        });
        if (nameAvailable) {
            return res.status(200).json({ successful: false, message: 'name is busy' });
        }
        await Permission.create({
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
