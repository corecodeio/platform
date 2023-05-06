const { Template } = require('./../../utils/db');
//Create Course
module.exports = async (req, res, next) => {
    try {
        const {
            name,
            title,
            title_second,
            title_extra,
            type,
            duration,
            level,
            technologies,
            price,
            minimum
        } = req.body;
        const nameAvailable = await Template.findOne({
            where: { name: name }
        });
        if (nameAvailable) {
            return res.status(200).json({ successful: false, message: 'name is busy' });
        }
        await Template.create({
            name,
            title,
            title_second,
            title_extra,
            type,
            duration,
            level,
            technologies,
            price,
            minimum
        });
        res.status(200).json({
            successful: true,
            message: 'template created successfully.'
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ successful: false, message: error });
    }
};
